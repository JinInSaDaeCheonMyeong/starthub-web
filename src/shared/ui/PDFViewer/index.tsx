import * as S from "./style";

interface PDFViewerProps {
  pdfUrl: string;
  name?: string;
}

const PDFViewer = ({ pdfUrl, name }: PDFViewerProps) => {
  const displayName = name || pdfUrl.split('/').pop() || 'document.pdf';
  const proxyUrl = `/api/files/${encodeURIComponent(displayName)}?url=${encodeURIComponent(pdfUrl)}`;

  return (
    <S.Container>
      <S.ViewerWrapper>
        <iframe
          src={proxyUrl}
          title={name || "PDF Viewer"}
          width="100%"
          height="100%"
          style={{ border: 'none' }}
        />
      </S.ViewerWrapper>
    </S.Container>
  );
};

export default PDFViewer;
