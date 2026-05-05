import { useEffect, useState, useRef } from "react";
import { getNoticeCategoryInfo } from "@/shared/utils/NoticeCategory/noticeCategory";
import { NoticeType } from "@/entities/notice/model/notice.type";
import { useNoticeLike } from "@/features/notice/NoticeLike/ useNoticeLike";
import { useNoticeUnlike } from "@/features/notice/NoticeUnlike/useNoticeUnlike";
import { ReactComponent as Heart } from "@assets/icons/heart.svg";
import { ReactComponent as FillHeart } from "@assets/icons/fill_heart.svg";
import { ReactComponent as Share } from "@assets/icons/share.svg";
import PDFViewer from "@/shared/ui/PDFViewer";
import { showSuccessToast, showErrorToast } from "@/shared/ui/Toast/toastUtil";

interface NoticeDetailProps {
  item: NoticeType;
}


const NoticeDetail = ({ item }: NoticeDetailProps) => {
  const categoryInfo = getNoticeCategoryInfo(item.supportField);

  const likeMutation = useNoticeLike();
  const unlikeMutation = useNoticeUnlike();

  const [safeContent, setSafeContent] = useState(item.content);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!item.content) return;
    const fixed = item.content.replace(
      /href="javascript:fn_open_window\('([^']+)'\);?"/g,
      (_, p1) => {
        const url = p1.startsWith("http") ? p1 : `https://${p1}`;
        return `href="${url}" target="_blank" rel="noopener noreferrer"`;
      },
    );
    setSafeContent(fixed);
  }, [item.content]);



  const handleLikeClick = () => {
    if (likeMutation.isPending || unlikeMutation.isPending) return;
    likeMutation.mutate(item.id);
  };

  const handleUnlikeClick = () => {
    if (likeMutation.isPending || unlikeMutation.isPending) return;
    unlikeMutation.mutate(item.id);
  };

  const isLoading = likeMutation.isPending || unlikeMutation.isPending;

  const handleShareClick = async () => {
    try {
      const currentUrl = window.location.href;
      await navigator.clipboard.writeText(currentUrl);
      showSuccessToast("링크가 복사되었습니다!");
    } catch (error) {
      console.error('Failed to copy link:', error);
      // Fallback: 수동 선택으로 복사
      const textArea = document.createElement('textarea');
      textArea.value = window.location.href;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      showSuccessToast("링크가 복사되었습니다!");
    }
  };

  const getSourceTagStyles = (source: string) => {
    const baseClasses = "font-pt-body2-semibold px-3 py-1 rounded-[5px]";
    switch (source) {
      case "BIZINFO":
        return `${baseClasses} bg-[#E8F4FE] text-[#0066CC]`;
      case "K_STARTUP":
        return `${baseClasses} bg-[#FFF4E6] text-[#FF9500]`;
      default:
        return `${baseClasses} bg-[#F0F0F0] text-[#333333]`;
    }
  };


  return (
    <div className="w-full mt-[120px] sm:mt-[130px] md:mt-[140px] lg:mt-[150px] mb-[150px]">
      <div className="w-full px-4 md:px-8 lg:w-[1040px] lg:mx-auto lg:px-0">
        <div className="w-full select-text">
          <div className="border-b border-hub-gray-3 pb-6 select-text">
            <div className="flex flex-wrap items-center mb-2 gap-1.5">
              <div className="w-5 h-5 text-hub-primary [&>svg]:w-5 [&>svg]:h-5">{categoryInfo.icon}</div>
              <span className="font-pt-h2-semibold text-hub-primary">{categoryInfo.text}</span>
            {item.source && (
              <span className={getSourceTagStyles(item.source)}>
                {item.source === "BIZINFO"
                  ? "기업마당"
                  : item.source === "K_STARTUP"
                    ? "K-Startup"
                    : item.source}
              </span>
            )}
            </div>

            <div className="flex items-start gap-4 mt-4 mb-5">
              <h1 className="font-pt-h1-bold flex-1 text-hub-black-1">{item.title}</h1>
              <div className="flex items-center gap-2">
                {item.isLiked ? (
                  <button
                    className="bg-transparent cursor-pointer border-none p-0 transition-transform hover:scale-110"
                    onClick={handleUnlikeClick}
                    disabled={isLoading}
                  >
                    <FillHeart className="w-8 h-[33px]" style={{ color: '#2466F4' }} />
                  </button>
                ) : (
                  <button
                    className="bg-transparent cursor-pointer border-none p-0 transition-transform hover:scale-110"
                    onClick={handleLikeClick}
                    disabled={isLoading}
                  >
                    <Heart className="w-8 h-[33px]" style={{ color: '#9B9B9B' }} />
                  </button>
                )}
                <button
                  className="bg-transparent cursor-pointer border-none p-0 transition-transform hover:scale-110"
                  onClick={handleShareClick}
                >
                  <Share className="w-8 h-[33px]" style={{ color: '#9B9B9B' }} />
                </button>
              </div>
            </div>

            {item.receptionPeriod && (
              <p className="font-pt-body1-medium">모집 기간 {item.receptionPeriod}</p>
            )}

            {item.originalFiles && item.originalFiles.length > 0 && (
              <div className="flex flex-col gap-1 mt-3 sm:mt-4">
              {item.originalFiles.map((file, index) => {
                const isPDF = file.name.toLowerCase().endsWith(".pdf");
                return isPDF ? (
                  <a
                    key={index}
                    className="font-pt-caption1-regular text-hub-primary no-underline"
                    href={file.url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {file.name}
                  </a>
                ) : (
                  <a
                    key={index}
                    className="font-pt-caption1-regular text-hub-primary no-underline"
                    href={file.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    download
                  >
                    {file.name}
                  </a>
                );
              })}
            </div>
          )}
          </div>

          <div
            className="leading-[1.6] w-full overflow-x-auto select-text mt-8"
            ref={contentRef}
          >
          <div
            className="notice-detail-content"
            dangerouslySetInnerHTML={{ __html: safeContent }}
          />
          </div>

          {item.pdfFiles && item.pdfFiles.length > 0 && (
            <div className="mt-8 sm:mt-12 pt-6 sm:pt-8 border-t border-hub-gray-3">
              <h2 className="font-pt-h2-semibold mb-4">첨부 문서</h2>
              {item.pdfFiles.map((pdf, index) => (
              <PDFViewer
                key={`pdf-${index}`}
                pdfUrl={pdf.url}
                name={pdf.name}
              />
            ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default NoticeDetail;
