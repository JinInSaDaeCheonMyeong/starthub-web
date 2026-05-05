import React, { useState, useEffect } from "react";
import SideBar from "@/features/profile/users/sideBar";
import NoticeCard from "@/shared/ui/NoticeCard";
import { ReactComponent as LikeIcon } from "@/assets/icons/LikeIcon.svg";
import { useGetLikedAnnouncements } from "@/features/notice/getLikedAnnouncements/useGetLikedAnnouncements";
import { NoticeSkeleton } from "@/shared/ui/NoticeSkeleton";
import Pagination from "@/shared/ui/pagination";
import NotMyPage from "../profileForm/ui/NotMyPage";
import { useAuthStore } from "@/app/model/stores/useAuthStore";
import { useRouter } from "next/navigation";

const LikeListForm: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [mounted, setMounted] = useState(false);
  const router = useRouter();

  const { data, isLoading, isError, refetch } = useGetLikedAnnouncements({
    page: currentPage - 1,
    size: 12,
    sort: "createdAt,desc",
  });

  const notices = data?.content || [];
  const { isLoggedIn } = useAuthStore();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="w-full min-h-screen bg-white">
        <SideBar />
        <div className="pt-[150px] sm:pt-[150px] md:pt-[160px] lg:pt-0">
          <div className="w-full max-w-[1280px] mx-auto">
            <div className="px-4 lg:pl-[384px] lg:pr-[120px] lg:pt-[158px] pb-[50px]">
              <div className="text-center text-base">
                로딩 중...
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen bg-white">
      <SideBar />

      <div className="pt-[150px] sm:pt-[150px] md:pt-[160px] lg:pt-0">
        {isLoggedIn ? (
          <div className="w-full">
            {/* 메인 컨텐츠 영역 */}
            <div className="px-4 lg:pl-[250px] lg:pr-[40px] lg:pt-[40px] pb-[50px]">
          <div className="mb-6">
            <div className="flex items-center gap-3">
              <LikeIcon
                className="w-[25px] h-[25px]"
                aria-label="좋아요 아이콘"
              />
              <h1 className="font-pt-h1-semibold text-hub-black-1 text-xl lg:text-2xl">
                좋아요 누른 공고
              </h1>
            </div>
          </div>

          <div className="flex-1 flex flex-col">
            <div className="flex-1">
              {isLoading ? (
                <>
                  {/* 모바일: 리스트 스켈레톤 */}
                  <div className="lg:hidden space-y-3">
                    {Array.from({ length: 8 }).map((_, idx) => (
                      <div key={idx} className="bg-hub-gray-4 rounded-lg p-4 animate-skeleton-pulse h-16" />
                    ))}
                  </div>

                  {/* 데스크톱: 카드 스켈레톤 */}
                  <div className="hidden lg:grid lg:grid-cols-[repeat(auto-fill,minmax(250px,1fr))] lg:gap-4">
                    {Array.from({ length: 12 }).map((_, idx) => (
                      <NoticeSkeleton key={idx} />
                    ))}
                  </div>
                </>
              ) : isError ? (
                <div className="flex flex-col items-center justify-center h-[200px] p-5">
                  <p className="font-pt-body1-regular text-hub-error mb-2.5 text-center text-sm lg:text-base">
                    좋아요한 공고를 불러오는 중 오류가 발생했습니다.
                  </p>
                  <button
                    onClick={() => refetch()}
                    className="mt-2.5 py-2 px-4 bg-[#007bff] text-white border-none rounded cursor-pointer text-sm lg:text-base"
                  >
                    다시 시도
                  </button>
                </div>
              ) : notices.length === 0 ? (
                <div className="flex justify-center items-center h-[200px]">
                  <p className="font-pt-body1-regular text-hub-primary text-sm lg:text-base">
                    좋아요를 추가해보세요!
                  </p>
                </div>
              ) : (
                <>
                  {/* 모바일: 리스트 형태 */}
                  <div className="lg:hidden space-y-3">
                    {notices.map((notice) => (
                      <div
                        key={notice.url}
                        className="bg-hub-white-1 border border-hub-gray-3 rounded-lg p-4 hover:shadow-md transition-shadow cursor-pointer"
                        onClick={() => router.push(`/notice/${notice.id}`)}
                      >
                        <div className="flex items-start justify-between gap-4">
                          <div className="flex-1 min-w-0">
                            <h3 className="font-pt-body2-semibold text-hub-black-1 text-sm mb-2 line-clamp-2">
                              {notice.title}
                            </h3>
                            <p className="font-pt-caption1-regular text-hub-gray-2 text-xs mb-3 overflow-hidden">
                              <span className="line-clamp-3">
                                {notice.content && notice.content.length > 150
                                  ? notice.content.substring(0, 150) + "..."
                                  : notice.content || "내용이 없습니다."}
                              </span>
                            </p>
                            <div className="flex flex-wrap items-center gap-2 text-xs text-hub-gray-2">
                              <span className="bg-hub-gray-4 px-2 py-1 rounded-md">{notice.region || "전국"}</span>
                              <span className="bg-hub-gray-4 px-2 py-1 rounded-md">{notice.supportField || "전체 분야"}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* 데스크톱: 카드 형태 */}
                  <div className="hidden lg:grid lg:grid-cols-3 lg:gap-6" style={{gridTemplateColumns: 'repeat(3, 250px)'}}>
                    {notices.map((notice) => (
                      <NoticeCard key={notice.url} notice={notice} />
                    ))}
                  </div>
                </>
              )}
            </div>

            {data && data.totalPages > 1 && (
              <div className="flex justify-center w-full mt-6">
                <Pagination
                  currentPage={currentPage}
                  totalPages={data.totalPages}
                  onPageChange={(page) => setCurrentPage(page)}
                />
              </div>
            )}
          </div>

          {/* 모바일: 추가 메뉴 */}
          <div className="lg:hidden border-t border-hub-gray-3 pt-6 space-y-4">
            <button
              onClick={() => window.open("https://various-bougon-d76.notion.site/27f507c40eaf80acbf4afba41b9964b7", "_blank")}
              className="w-full text-left font-pt-body2-regular text-hub-gray-2 py-2"
            >
              서비스 이용 약관
            </button>
            <button
              onClick={() => window.open("https://various-bougon-d76.notion.site/27f507c40eaf80bbb86dfc3db0b06e04", "_blank")}
              className="w-full text-left font-pt-body2-regular text-hub-gray-2 py-2"
            >
              개인정보처리방침
            </button>
            <hr className="border-t border-hub-gray-3" />
            <button
              onClick={async () => {
                if (confirm("로그아웃 하시겠습니까?")) {
                  const { default: StartHubAxios } = await import("@/shared/api/customAxios/StartHubAxios");
                  const { default: Cookies } = await import("js-cookie");
                  const { toast } = await import("react-toastify");
                  try {
                    await StartHubAxios.post("/user/sign-out");
                    Cookies.remove("access_token");
                    Cookies.remove("refresh_token");
                    toast.success("로그아웃에 성공했습니다");
                    window.location.href = "/";
                  } catch (error) {
                    toast.error("로그아웃에 실패했습니다");
                  }
                }
              }}
              className="w-full text-left font-pt-body2-regular text-hub-error py-2"
            >
              로그아웃
            </button>
          </div>
            </div>
          </div>
        ) : (
          <NotMyPage />
        )}
      </div>
    </div>
  );
};

export default LikeListForm;
