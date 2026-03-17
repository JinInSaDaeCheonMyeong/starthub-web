export default async function handler(req, res) {
  // Vercel 환경변수에서 API URL 가져오기
  const apiBaseUrl = process.env.VITE_API_BASE_URL;

  if (!apiBaseUrl) {
    return res.status(500).json({ error: 'API configuration missing' });
  }

  // 요청 경로 재구성
  const { path } = req.query;
  const pathString = Array.isArray(path) ? path.join('/') : path || '';

  // 쿼리 스트링 유지
  const queryString = req.url.includes('?') ? req.url.substring(req.url.indexOf('?')) : '';
  const targetUrl = `${apiBaseUrl}/api/${pathString}${queryString}`;

  try {
    // 원본 요청 헤더 복사 (Host 헤더 제외)
    const headers = { ...req.headers };
    delete headers.host;

    // 백엔드로 요청 전달
    const response = await fetch(targetUrl, {
      method: req.method,
      headers: headers,
      body: req.method !== 'GET' && req.method !== 'HEAD' ? req.body : undefined,
    });

    // 응답 헤더 설정
    const contentType = response.headers.get('content-type');
    if (contentType) {
      res.setHeader('Content-Type', contentType);
    }

    // 응답 처리
    if (contentType && contentType.includes('application/json')) {
      const data = await response.json();
      res.status(response.status).json(data);
    } else {
      const buffer = await response.arrayBuffer();
      res.status(response.status).send(Buffer.from(buffer));
    }
  } catch (error) {
    console.error('Proxy error:', error);
    res.status(500).json({ error: 'Failed to proxy request' });
  }
}