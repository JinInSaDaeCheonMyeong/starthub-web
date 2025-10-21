import { useEffect, useState, useRef } from "react";
import * as S from "./style";
import { getNoticeCategoryInfo } from "@/shared/utils/NoticeCategory/noticeCategory";
import { NoticeType } from "@/entities/notice/model/notice.type";
import { useNoticeLike } from "@/features/notice/NoticeLike/ useNoticeLike";
import { useNoticeUnlike } from "@/features/notice/NoticeUnlike/useNoticeUnlike";
import { ReactComponent as Heart } from "@assets/icons/heart.svg";
import { ReactComponent as Share } from "@assets/icons/share.svg";
import { ReactComponent as FillHeart } from "@assets/icons/fill_heart.svg";

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
    []
  );
  const [activeId, setActiveId] = useState<string>("");
  const [safeContent, setSafeContent] = useState(item.content);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!item.content) return;
    const fixed = item.content.replace(
      /href="javascript:fn_open_window\('([^']+)'\);?"/g,
      'href="$1" target="_blank" rel="noopener noreferrer"'
    );
    setSafeContent(fixed);
  }, [item.content]);

  useEffect(() => {
    if (!contentRef.current) return;

    const headings = contentRef.current.querySelectorAll(
      "h1, h2, h3, h4, p.title"
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
            <span>{categoryInfo.text}</span>
          </S.CategoryContainer>

          <h1 className="title">{item.title}</h1>

          {item.receptionPeriod && (
            <p className="reception-period">모집 기간 {item.receptionPeriod}</p>
          )}
        </S.NoticeTitle>

        <S.ContentWrapper ref={contentRef}>
          <div
            className="dot_list-wrap"
            dangerouslySetInnerHTML={{ __html: safeContent }}
          />
        </S.ContentWrapper>
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
