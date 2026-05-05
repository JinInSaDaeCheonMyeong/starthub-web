import { toast } from "react-toastify";
import { bmcApi } from "@/entities/bmc/api/bmc";
import { competitorApi } from "@/entities/competitor/api/competitor";
import html2canvas from "html2canvas";
import { createElement } from "react";
import { createRoot } from "react-dom/client";
import { BmcCanvas } from "@/widgets/bmc/BmcCanvas";
import { jsPDF } from "jspdf";

interface CompetitorComparison {
  name: string;
  estimatedScale: string;
  marketShare: string;
  similarities: string[];
  differences: string[];
}

// <<>> 안의 텍스트 볼드 처리
const processBoldText = (text: string) => {
  if (!text) return "";
  return text.replace(/<<([^>]+)>>/g, "<strong>$1</strong>");
};

export const downloadBmc = async (id: number) => {
  try {
    const response = await bmcApi.getCanvasesDetail(id.toString());
    const bmcData = response.data;

    const TARGET_WIDTH = 1300;
    const wrapper = document.createElement("div");
    wrapper.style.padding = "40px";
    wrapper.style.backgroundColor = "#FFFFFF";
    wrapper.style.display = "inline-block";
    wrapper.style.position = "fixed";
    wrapper.style.left = "-9999px";
    wrapper.style.top = "0";

    const container = document.createElement("div");
    const contentWidth = TARGET_WIDTH - 80;
    container.style.width = `${contentWidth}px`;
    container.style.maxWidth = `${contentWidth}px`;
    container.style.minWidth = `${contentWidth}px`;

    wrapper.appendChild(container);
    document.body.appendChild(wrapper);

    const root = createRoot(container);
    root.render(
      createElement(BmcCanvas, {
        bmcData: bmcData,
        isEdit: false,
        onSectionChange: undefined,
      }),
    );

    await new Promise((resolve) => setTimeout(resolve, 500));

    const headerWrapper = wrapper.querySelector(
      '[class*="BmcCanvasHeaderWrapper"]',
    ) as HTMLElement;
    if (headerWrapper) {
      headerWrapper.style.display = "flex";
      headerWrapper.style.justifyContent = "space-between";
      headerWrapper.style.alignItems = "center";
      headerWrapper.style.width = `${contentWidth}px`;
      headerWrapper.style.maxWidth = `${contentWidth}px`;
      headerWrapper.style.margin = "0 auto 20px auto";
    }

    const bmcCanvas = wrapper.querySelector(
      '[class*="BmcCanvas"]',
    ) as HTMLElement;
    if (bmcCanvas) {
      bmcCanvas.style.width = `${contentWidth}px`;
      bmcCanvas.style.maxWidth = `${contentWidth}px`;
      bmcCanvas.style.margin = "0 auto";
    }

    const canvas = await html2canvas(wrapper, {
      backgroundColor: "#FFFFFF",
      useCORS: true,
      allowTaint: true,
      scale: 2,
      logging: false,
      width: wrapper.offsetWidth,
      height: wrapper.offsetHeight,
    });

    root.unmount();
    document.body.removeChild(wrapper);

    const link = document.createElement("a");
    const date = new Date().toISOString().split("T")[0];
    link.download = `BMC_${bmcData.title}_${date}.png`;
    link.href = canvas.toDataURL("image/png", 1.0);
    link.click();

    toast.success("BMC가 다운로드되었습니다!");
  } catch (error) {
    console.error("BMC 다운로드 오류:", error);
    toast.error("BMC 다운로드에 실패했습니다.");
  }
};

export const downloadCompetitorAnalysis = async (id: number, title: string) => {
  try {
    const analysesResponse = await competitorApi.getCompetitorAnalyses();
    const analysisData = analysesResponse.data.find(
      (item) => item.bmcId === id,
    );

    if (!analysisData) {
      toast.error("경쟁사 분석 데이터를 찾을 수 없습니다.");
      return;
    }

    const wrapper = document.createElement("div");
    wrapper.style.width = "794px";
    wrapper.style.padding = "40px";
    wrapper.style.backgroundColor = "#FFFFFF";
    wrapper.style.position = "fixed";
    wrapper.style.left = "-9999px";
    wrapper.style.top = "0";
    wrapper.style.fontFamily = "Pretendard, -apple-system, sans-serif";

    wrapper.innerHTML = `
      <div style="max-width: 714px; margin: 0 auto;">
        <!-- 헤더 -->
        <div style="margin-bottom: 40px; padding-bottom: 20px; border-bottom: 2px solid #CFCFCF;">
          <h1 style="font-size: 32px; color: #000000; margin-bottom: 10px;">
            경쟁사 분석 리포트
          </h1>
          <p style="font-size: 18px; color: #242424; margin-bottom: 5px;">
            ${analysisData.userBmc.title}
          </p>
          <p style="font-size: 14px; color: #9B9B9B;">
            생성일: ${new Date(analysisData.createdAt || new Date()).toLocaleDateString("ko-KR")}
          </p>
        </div>

        <!-- 1. 사업 개요 -->
        <div style="margin-bottom: 35px;">
          <h2 style="font-size: 24px; color: #2466F4; margin-bottom: 15px;">
            1. 사업 개요
          </h2>
          <div style="background: #F3F4F6; padding: 20px; border-radius: 8px;">
            <p style="font-size: 16px; line-height: 1.8; margin-bottom: 10px;">
              <strong>가치 제안:</strong> ${processBoldText(analysisData.userBmc.valueProposition)}
            </p>
            <p style="font-size: 16px; line-height: 1.8; margin-bottom: 10px;">
              <strong>타겟 고객:</strong> ${processBoldText(analysisData.userBmc.targetCustomer)}
            </p>
            <p style="font-size: 16px; line-height: 1.8;">
              <strong>핵심 강점:</strong> ${analysisData.userBmc.keyStrengths.map(processBoldText).join(", ")}
            </p>
          </div>
        </div>

        <!-- 2. 시장 규모 및 위치 -->
        <div style="margin-bottom: 35px;">
          <h2 style="font-size: 24px; color: #2466F4; margin-bottom: 15px;">
            2. 시장 규모 및 위치
          </h2>
          <div style="background: #F3F4F6; padding: 20px; border-radius: 8px;">
            <p style="font-size: 16px; line-height: 1.8; margin-bottom: 10px;">
              <strong>예상 사용자 규모:</strong> ${processBoldText(analysisData.userScale.estimatedUserBase)}
            </p>
            <p style="font-size: 16px; line-height: 1.8; margin-bottom: 10px;">
              <strong>시장 포지션:</strong> ${processBoldText(analysisData.userScale.marketPosition)}
            </p>
            <p style="font-size: 16px; line-height: 1.8;">
              <strong>성장 잠재력:</strong> ${processBoldText(analysisData.userScale.growthPotential)}
            </p>
          </div>
        </div>

        <!-- 3. 주요 경쟁사 분석 -->
        <div style="margin-bottom: 35px;">
          <h2 style="font-size: 24px; color: #2466F4; margin-bottom: 15px;">
            3. 주요 경쟁사 분석
          </h2>
          ${analysisData.userScale.competitorComparison
            .map(
              (comp: CompetitorComparison) => `
            <div style="background: #F3F4F6; padding: 20px; border-radius: 8px; margin-bottom: 15px;">
              <h3 style="font-size: 18px; color: #000000; margin-bottom: 10px;">
                ${comp.name}
              </h3>
              <p style="font-size: 14px; line-height: 1.6; margin-bottom: 8px;">
                <strong>예상 규모:</strong> ${processBoldText(comp.estimatedScale)} | <strong>시장 점유율:</strong> ${processBoldText(comp.marketShare)}
              </p>
              <p style="font-size: 14px; line-height: 1.6; margin-bottom: 8px;">
                <strong>유사점:</strong> ${comp.similarities.map(processBoldText).join(", ")}
              </p>
              <p style="font-size: 14px; line-height: 1.6;">
                <strong>차별점:</strong> ${comp.differences.map(processBoldText).join(", ")}
              </p>
            </div>
          `,
            )
            .join("")}
        </div>

        <!-- 4. 강점 분석 -->
        <div style="margin-bottom: 35px;">
          <h2 style="font-size: 24px; color: #2466F4; margin-bottom: 15px;">
            4. 강점 분석
          </h2>
          <div style="background: #F3F4F6; padding: 20px; border-radius: 8px;">
            <div style="margin-bottom: 15px;">
              <h3 style="font-size: 16px; color: #000000; margin-bottom: 8px;">경쟁 우위</h3>
              <ul style="margin: 0; padding-left: 20px;">
                ${analysisData.strengths.competitiveAdvantages
                  .map(
                    (adv: string) =>
                      `<li style="line-height: 1.6; margin-bottom: 5px;">${processBoldText(adv)}</li>`,
                  )
                  .join("")}
              </ul>
            </div>
            <div style="margin-bottom: 15px;">
              <h3 style="font-size: 16px; color: #000000; margin-bottom: 8px;">시장 기회</h3>
              <ul style="margin: 0; padding-left: 20px;">
                ${analysisData.strengths.marketOpportunities
                  .map(
                    (opp: string) =>
                      `<li style="line-height: 1.6; margin-bottom: 5px;">${processBoldText(opp)}</li>`,
                  )
                  .join("")}
              </ul>
            </div>
          </div>
        </div>

        <!-- 5. 약점 분석 -->
        <div style="margin-bottom: 35px;">
          <h2 style="font-size: 24px; color: #2466F4; margin-bottom: 15px;">
            5. 약점 분석
          </h2>
          <div style="background: #F3F4F6; padding: 20px; border-radius: 8px;">
            <div style="margin-bottom: 15px;">
              <h3 style="font-size: 16px; color: #000000; margin-bottom: 8px;">경쟁 열위</h3>
              <ul style="margin: 0; padding-left: 20px;">
                ${analysisData.weaknesses.competitiveDisadvantages
                  .map(
                    (dis: string) =>
                      `<li style="line-height: 1.6; margin-bottom: 5px;">${processBoldText(dis)}</li>`,
                  )
                  .join("")}
              </ul>
            </div>
            <div style="margin-bottom: 15px;">
              <h3 style="font-size: 16px; color: #000000; margin-bottom: 8px;">개선 영역</h3>
              <ul style="margin: 0; padding-left: 20px;">
                ${analysisData.weaknesses.improvementAreas
                  .map(
                    (area: string) =>
                      `<li style="line-height: 1.6; margin-bottom: 5px;">${processBoldText(area)}</li>`,
                  )
                  .join("")}
              </ul>
            </div>
          </div>
        </div>

        <!-- 6. 글로벌 확장 전략 -->
        <div style="margin-bottom: 35px;">
          <h2 style="font-size: 24px; color: #2466F4; margin-bottom: 15px;">
            6. 글로벌 확장 전략
          </h2>
          <div style="background: #F3F4F6; padding: 20px; border-radius: 8px;">
            <p style="font-size: 16px; line-height: 1.8; margin-bottom: 10px;">
              <strong>우선 진출 시장:</strong> ${analysisData.globalExpansionStrategy.priorityMarkets.map(processBoldText).join(", ")}
            </p>
            <p style="font-size: 16px; line-height: 1.8; margin-bottom: 10px;">
              <strong>진입 전략:</strong> ${analysisData.globalExpansionStrategy.entryStrategies.map(processBoldText).join(", ")}
            </p>
            <p style="font-size: 16px; line-height: 1.8;">
              <strong>예상 도전과제:</strong> ${analysisData.globalExpansionStrategy.expectedChallenges.map(processBoldText).join(", ")}
            </p>
          </div>
        </div>

        <!-- 푸터 -->
        <div style="margin-top: 40px; padding-top: 20px; border-top: 1px solid #CFCFCF; text-align: center;">
          <p style="font-size: 14px; color: #9B9B9B;">
            © 2024 StartHub. 모든 권리 보유.
          </p>
        </div>
      </div>
    `;

    document.body.appendChild(wrapper);

    await new Promise((resolve) => setTimeout(resolve, 500));

    try {
      const canvas = await html2canvas(wrapper, {
        backgroundColor: "#FFFFFF",
        scale: 2,
        useCORS: true,
        allowTaint: true,
        logging: false,
      });

      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: "a4",
      });

      // A4 크기 설정 (210mm x 297mm)
      const pdfWidth = 210;
      const pdfHeight = 297;
      const margin = 10;

      // 캔버스 크기에서 PDF 크기로 변환
      // 실제 콘텐츠 너비를 PDF 너비에 맞춤
      const contentWidth = pdfWidth - margin * 2;
      const imgWidth = canvas.width;
      const imgHeight = canvas.height;

      const ratio = contentWidth / (imgWidth / 2); // scale 2로 생성했으므로 /2
      const scaledHeight = (imgHeight / 2) * ratio;

      const pageContentHeight = pdfHeight - margin * 2;
      const totalPages = Math.ceil(scaledHeight / pageContentHeight);

      if (totalPages === 1) {
        // 한 페이지에 들어가는 경우
        pdf.addImage(
          imgData,
          "PNG",
          margin,
          margin,
          contentWidth,
          scaledHeight,
        );
      } else {
        // 여러 페이지에 걸쳐 있는 경우
        let position = 0;

        for (let i = 0; i < totalPages; i++) {
          if (i > 0) {
            pdf.addPage();
          }

          // 현재 페이지에서 그릴 높이 계산
          const pageHeight = Math.min(
            pageContentHeight,
            scaledHeight - position,
          );

          // sourceY 계산 (원본 이미지에서의 위치)
          const sourceY = (position / ratio) * 2; // scale 2 보정
          const sourceHeight = (pageHeight / ratio) * 2; // scale 2 보정

          // 페이지별로 이미지 조각 추가
          const pageCanvas = document.createElement("canvas");
          pageCanvas.width = imgWidth;
          pageCanvas.height = sourceHeight;
          const pageCtx = pageCanvas.getContext("2d");

          if (pageCtx) {
            pageCtx.drawImage(
              canvas,
              0,
              sourceY,
              imgWidth,
              sourceHeight,
              0,
              0,
              imgWidth,
              sourceHeight,
            );

            const pageImgData = pageCanvas.toDataURL("image/png");
            pdf.addImage(
              pageImgData,
              "PNG",
              margin,
              margin,
              contentWidth,
              pageHeight,
            );
          }

          position += pageHeight;
        }
      }

      // PDF 다운로드
      const date = new Date().toISOString().split("T")[0];
      const filename = `경쟁사분석리포트_${title}_${date}.pdf`;
      pdf.save(filename);

      document.body.removeChild(wrapper);
    } catch (error) {
      console.error("이미지 생성 오류:", error);
      if (document.body.contains(wrapper)) {
        document.body.removeChild(wrapper);
      }
      toast.error("리포트 생성에 실패했습니다.");
    }

    toast.success("경쟁사 분석 리포트가 다운로드되었습니다!");
  } catch (error) {
    console.error("경쟁사 분석 데이터 조회 오류:", error);
    toast.error("경쟁사 분석 데이터를 불러오지 못했습니다.");
  }
};
