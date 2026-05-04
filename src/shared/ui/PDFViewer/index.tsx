interface PDFViewerProps {
  pdfUrl: string;
  name?: string;
}

const PDFViewer = ({ pdfUrl, name }: PDFViewerProps) => {
  const displayName = name || pdfUrl.split("/").pop() || "document.pdf";
  const proxyUrl = `/api/files/${encodeURIComponent(displayName)}?url=${encodeURIComponent(pdfUrl)}`;

  return (
    <div className="w-full flex flex-col gap-4 my-8">
      <div className="w-full h-[800px] border border-hub-gray-4 rounded-lg overflow-hidden bg-[#525659] select-text">
        <iframe
          src={proxyUrl}
          title={name || "PDF Viewer"}
          width="100%"
          height="100%"
          style={{ border: "none" }}
        />
      </div>
    </div>
  );
};

export default PDFViewer;
