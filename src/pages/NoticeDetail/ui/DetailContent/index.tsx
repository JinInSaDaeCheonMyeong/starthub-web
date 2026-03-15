import { useEffect, useState, useRef } from "react";
import * as S from "./style";
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

  return (
    <S.Container>
      <S.MainContent>
        <S.NoticeTitle>
          <S.CategoryContainer>
            {categoryInfo.icon}
            <p>{categoryInfo.text}</p>
            {item.source && (
              <S.SourceTag $source={item.source}>
                {item.source === "BIZINFO"
                  ? "기업마당"
                  : item.source === "K_STARTUP"
                    ? "K-Startup"
                    : item.source}
              </S.SourceTag>
            )}
          </S.CategoryContainer>

          <h1 className="title">{item.title}</h1>

          {item.receptionPeriod && (
            <p className="reception-period">모집 기간 {item.receptionPeriod}</p>
          )}

          {item.originalFiles && item.originalFiles.length > 0 && (
            <S.FileLinksSection>
              {item.originalFiles.map((file, index) => {
                const isPDF = file.name.toLowerCase().endsWith(".pdf");
                return isPDF ? (
                  <S.FileLink
                    key={index}
                    href={file.url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {file.name}
                  </S.FileLink>
                ) : (
                  <S.FileLink
                    key={index}
                    href={file.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    download
                  >
                    {file.name}
                  </S.FileLink>
                );
              })}
            </S.FileLinksSection>
          )}
        </S.NoticeTitle>

        <S.ContentWrapper ref={contentRef}>
          <div
            className="dot_list-wrap"
            dangerouslySetInnerHTML={{ __html: safeContent }}
          />
        </S.ContentWrapper>

        {item.pdfFiles && item.pdfFiles.length > 0 && (
          <S.PDFSection>
            <p>첨부 문서</p>
            {item.pdfFiles.map((pdf, index) => (
              <PDFViewer
                key={`pdf-${index}`}
                pdfUrl={pdf.url}
                name={pdf.name}
              />
            ))}
          </S.PDFSection>
        )}
      </S.MainContent>

      <S.Sidebar>
        {item.isLiked ? (
          <S.HeartButton onClick={handleUnlikeClick} disabled={isLoading}>
            <FillHeart />
          </S.HeartButton>
        ) : (
          <S.HeartButton onClick={handleLikeClick} disabled={isLoading}>
            <Heart />
          </S.HeartButton>
        )}
        <Share />
        <S.TableOfContents>
          {tableOfContents.map((item) => (
            <S.TOCItem
              key={item.id}
              level={item.level}
              $isActive={activeId === item.id}
              onClick={() => scrollToHeading(item.id)}
            >
              {item.text}
            </S.TOCItem>
          ))}
        </S.TableOfContents>
      </S.Sidebar>
    </S.Container>
  );
};

export default NoticeDetail;
