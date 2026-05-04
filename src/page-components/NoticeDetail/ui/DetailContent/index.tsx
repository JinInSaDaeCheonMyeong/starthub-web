import { useEffect, useState, useRef } from "react";
import { getNoticeCategoryInfo } from "@/shared/utils/NoticeCategory/noticeCategory";
import { NoticeType } from "@/entities/notice/model/notice.type";
import { useNoticeLike } from "@/features/notice/NoticeLike/ useNoticeLike";
import { useNoticeUnlike } from "@/features/notice/NoticeUnlike/useNoticeUnlike";
import { ReactComponent as Heart } from "@assets/icons/heart.svg";
import { ReactComponent as Share } from "@assets/icons/share.svg";
import { ReactComponent as FillHeart } from "@assets/icons/fill_heart.svg";
import PDFViewer from "@/shared/ui/PDFViewer";

interface NoticeDetailProps {
  item: NoticeType;
}

interface TableOfContentsItem {
  id: string;
  text: string;
  level: number;
}

const NoticeDetail = ({ item }: NoticeDetailProps) => {
  const categoryInfo = getNoticeCategoryInfo(item.supportField);

  const likeMutation = useNoticeLike();
  const unlikeMutation = useNoticeUnlike();

  const [tableOfContents, setTableOfContents] = useState<TableOfContentsItem[]>(
    [],
  );
  const [activeId, setActiveId] = useState<string>("");
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

  useEffect(() => {
    if (!contentRef.current) return;

    const headings = contentRef.current.querySelectorAll(
      "h1, h2, h3, h4, p.title",
    );
    const tocItems: TableOfContentsItem[] = [];

    headings.forEach((heading, index) => {
      const id = `heading-${index}`;
      heading.id = id;

      let level = 1;
      if (heading.tagName.toLowerCase() !== "p") {
        level = parseInt(heading.tagName.charAt(1));
      }

      tocItems.push({
        id,
        text: heading.textContent || "",
        level: level,
      });
    });

    setTableOfContents(tocItems);

    const handleScroll = () => {
      const headingsArray = Array.from(headings);
      const scrollTop = window.scrollY;
      const viewportHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;

      let currentActiveId = "";

      for (let i = headingsArray.length - 1; i >= 0; i--) {
        const heading = headingsArray[i];
        const rect = heading.getBoundingClientRect();

        if (rect.top <= 200) {
          currentActiveId = heading.id;
          break;
        }
      }

      if (!currentActiveId && headingsArray.length > 0) {
        const isNearBottom = scrollTop + viewportHeight >= documentHeight - 100;
        if (isNearBottom) {
          currentActiveId = headingsArray[headingsArray.length - 1].id;
        }
      }

      if (currentActiveId !== activeId) {
        setActiveId(currentActiveId);
      }
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [item.content, activeId]);

  const scrollToHeading = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  const handleLikeClick = () => {
    if (likeMutation.isPending || unlikeMutation.isPending) return;
    likeMutation.mutate(item.id);
  };

  const handleUnlikeClick = () => {
    if (likeMutation.isPending || unlikeMutation.isPending) return;
    unlikeMutation.mutate(item.id);
  };

  const isLoading = likeMutation.isPending || unlikeMutation.isPending;

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

  const getTOCItemClasses = (level: number, isActive: boolean) => {
    const paddingLeft = 16 + (level - 1) * 20;
    const baseClasses =
      "font-pt-body1-regular p-2 rounded-[6px] cursor-pointer mb-1";
    const activeClasses = isActive
      ? "bg-hub-gray-2 text-hub-primary"
      : "text-hub-black-1";
    return `${baseClasses} ${activeClasses}`;
  };

  return (
    <div className="flex max-w-[1200px] w-full p-[50px_65px] md:flex-col md:gap-5 mb-[150px]">
      <div className="flex-1 min-w-0 select-text">
        <div className="border-b border-[#dadada] pb-6 select-text">
          <div className="flex items-center mb-2 gap-1">
            {categoryInfo.icon}
            <p>{categoryInfo.text}</p>
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

          <h1 className="title">{item.title}</h1>

          {item.receptionPeriod && (
            <p className="reception-period">모집 기간 {item.receptionPeriod}</p>
          )}

          {item.originalFiles && item.originalFiles.length > 0 && (
            <div className="flex flex-col gap-0.5 mt-4">
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
          className="leading-6 w-full overflow-x-auto select-text"
          ref={contentRef}
        >
          <div
            className="dot_list-wrap"
            dangerouslySetInnerHTML={{ __html: safeContent }}
          />
        </div>

        {item.pdfFiles && item.pdfFiles.length > 0 && (
          <div className="mt-12 pt-8 border-t border-hub-gray-4">
            <p>첨부 문서</p>
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

      <aside className="flex-shrink-0 w-[250px] sticky top-[170px] h-fit pl-6">
        {item.isLiked ? (
          <button
            className="bg-none cursor-pointer border-none"
            onClick={handleUnlikeClick}
            disabled={isLoading}
          >
            <FillHeart />
          </button>
        ) : (
          <button
            className="bg-none cursor-pointer border-none"
            onClick={handleLikeClick}
            disabled={isLoading}
          >
            <Heart />
          </button>
        )}
        <Share />
        <ul className="list-none p-0 m-0 h-fit border-l-2 border-hub-black-1">
          {tableOfContents.map((item) => (
            <li
              key={item.id}
              className={getTOCItemClasses(item.level, activeId === item.id)}
              style={{ paddingLeft: `${16 + (item.level - 1) * 20}px` }}
              onClick={() => scrollToHeading(item.id)}
            >
              {item.text}
            </li>
          ))}
        </ul>
      </aside>
    </div>
  );
};

export default NoticeDetail;
