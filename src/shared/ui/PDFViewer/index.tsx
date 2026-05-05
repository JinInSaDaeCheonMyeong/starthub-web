interface PDFViewerProps {
  pdfUrl: string;
  name?: string;
}

const PDFViewer = ({ pdfUrl, name }: PDFViewerProps) => {
  const displayName = name || pdfUrl.split("/").pop() || "document.pdf";

  // Google Docs Viewer를 사용하여 PDF 표시
  const viewerUrl = `https://docs.google.com/viewer?url=${encodeURIComponent(pdfUrl)}&embedded=true`;

  return (
    <div className="w-full flex flex-col gap-4 my-6">
      <div className="flex items-center justify-between p-3 bg-hub-gray-4 rounded-t-lg">
        <span className="font-pt-body2-medium text-hub-black-1">{displayName}</span>
        <a
          href={pdfUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="font-pt-caption1-semibold text-hub-primary hover:text-hub-secondary transition-colors"
        >
          새 창에서 열기 →
        </a>
      </div>
      <div className="w-full h-[600px] sm:h-[700px] lg:h-[800px] border border-hub-gray-3 rounded-b-lg overflow-hidden bg-white">
        <iframe
          src={viewerUrl}
          title={name || "PDF Viewer"}
          width="100%"
          height="100%"
          style={{ border: "none" }}
          allow="autoplay"
        />
      </div>
    </div>
  );
};

export default PDFViewer;
