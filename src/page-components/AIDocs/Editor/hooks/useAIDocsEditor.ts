import { useEffect, useMemo, useRef, useState } from "react";
import { toast } from "react-toastify";
import { documentApi } from "@/entities/document";
import type { DocumentDetail, DocumentHistoryItem } from "@/entities/document";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { Document, Packer, Paragraph, TextRun } from "docx";

type UseAIDocsEditorParams = {
  documentId: number;
};

const escapeHtml = (value: string): string =>
  value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/\"/g, "&quot;")
    .replace(/'/g, "&#39;");

const stripDocumentMarkers = (text: string): string =>
  text
    .replace(/^\uFEFF/, "")
    .replace(/^\s*\*{3,}\s*#\s*```[\w-]*\s*/g, "")
    .replace(/^\s*\*{3,}\s*/g, "")
    .replace(/^```[\w-]*\s*/g, "")
    .replace(/```\s*$/g, "")
    .trim();

const formatMarkdownInline = (text: string): string =>
  escapeHtml(
    text.replace(
      /<u>([^<]+)<\/u>/g,
      "__STARTHUB_UNDERLINE__$1__STARTHUB_UNDERLINE__",
    ),
  )
    .replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>")
    .replace(/\*([^*]+)\*/g, "<em>$1</em>")
    .replace(
      /__STARTHUB_UNDERLINE__([^]+?)__STARTHUB_UNDERLINE__/g,
      "<u>$1</u>",
    );

const hasHtmlBlockMarkup = (text: string): boolean =>
  /<\s*(?:!doctype|html|body|head|title|meta|link|style|script|section|article|main|header|footer|nav|aside|h[1-6]|p|ul|ol|li|blockquote|div|table|thead|tbody|tfoot|tr|td|th|figure|figcaption|pre|code)\b/i.test(
    text,
  );

const markdownToHtml = (text: string): string => {
  const lines = text.split(/\r?\n/);
  const blocks: string[] = [];
  let isListOpen = false;

  const closeList = () => {
    if (isListOpen) {
      blocks.push("</ul>");
      isListOpen = false;
    }
  };

  for (const rawLine of lines) {
    const line = rawLine.trim();

    if (!line) {
      closeList();
      blocks.push("<p></p>");
      continue;
    }

    const headingMatch = line.match(/^(#{1,6})\s+(.*)$/);
    if (headingMatch) {
      closeList();
      const level = Math.min(6, headingMatch[1].length);
      blocks.push(
        `<h${level}>${formatMarkdownInline(headingMatch[2])}</h${level}>`,
      );
      continue;
    }

    if (line.startsWith("- ")) {
      if (!isListOpen) {
        blocks.push("<ul>");
        isListOpen = true;
      }
      blocks.push(`<li>${formatMarkdownInline(line.slice(2))}</li>`);
      continue;
    }

    if (line.startsWith("> ")) {
      closeList();
      blocks.push(
        `<blockquote><p>${formatMarkdownInline(line.slice(2))}</p></blockquote>`,
      );
      continue;
    }

    closeList();
    blocks.push(`<p>${formatMarkdownInline(line)}</p>`);
  }

  closeList();
  return blocks.join("");
};

const buildRenderableBodyHtml = (content: string): string => {
  const cleaned = stripDocumentMarkers(content);

  if (!cleaned) {
    return "";
  }

  if (hasHtmlBlockMarkup(cleaned)) {
    const parser = new DOMParser();
    const parsed = parser.parseFromString(cleaned, "text/html");
    const bodyHtml = parsed.body.innerHTML.trim();

    if (bodyHtml) {
      return bodyHtml;
    }
  }

  return markdownToHtml(cleaned);
};

const cleanMarkdownForExport = (text: string): string => {
  const renderedHtml = buildRenderableBodyHtml(text);

  if (!renderedHtml) {
    return "";
  }

  const wrapper = document.createElement("div");
  wrapper.innerHTML = renderedHtml;

  return (wrapper.textContent || "").replace(/\n\n\n+/g, "\n\n").trim();
};

// 미리보기용 HTML 생성
const generatePreviewHtml = (
  title: string,
  content: string,
  includeTitle = true,
): string => {
  const htmlContent = buildRenderableBodyHtml(content);
  const titleHtml = includeTitle
    ? `<h1 class="document__title">${escapeHtml(title || "Untitled Document")}</h1>`
    : "";

  return `<!DOCTYPE html>
<html lang="ko">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body {
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
      line-height: 1.8;
      color: #222;
      padding: 40px 20px;
    }
    .document {
      margin: 0 auto;
      background: #fff;
    }
    .document__title {
      font-size: 34px;
      line-height: 1.25;
      margin-bottom: 28px;
      font-weight: 800;
      letter-spacing: -0.03em;
    }
    h1, h2, h3, h4, h5, h6 { margin: 1.2em 0 0.55em; font-weight: 800; line-height: 1.3; letter-spacing: -0.02em; }
    h1 { font-size: 30px; }
    h2 { font-size: 24px; }
    h3 { font-size: 20px; }
    h4 { font-size: 18px; }
    p { margin: 0.9em 0; }
    strong { font-weight: bold; }
    em { font-style: italic; }
    u { text-decoration: underline; }
    ul, ol { margin: 1em 0; padding-left: 1.6em; }
    li { margin: 0.45em 0; }
    blockquote {
      margin: 1.25em 0;
      padding: 0.95em 1.2em;
      border-left: 4px solid #cbd5e1;
      background: #f8fafc;
      color: #334155;
      border-radius: 0 14px 14px 0;
    }
    blockquote p { margin: 0; }
  </style>
</head>
<body>
  <article class="document">
    ${titleHtml}
    ${htmlContent}
  </article>
</body>
</html>`;
};

const createHiddenPreviewFrame = (html: string): Promise<HTMLIFrameElement> =>
  new Promise((resolve, reject) => {
    const iframe = document.createElement("iframe");
    iframe.setAttribute("aria-hidden", "true");
    iframe.style.position = "fixed";
    iframe.style.left = "-10000px";
    iframe.style.top = "0";
    iframe.style.width = "1024px";
    iframe.style.height = "1400px";
    iframe.style.border = "0";
    iframe.srcdoc = html;

    const timeoutId = window.setTimeout(() => {
      reject(new Error("미리보기 프레임을 불러오지 못했습니다."));
    }, 10000);

    iframe.onload = () => {
      window.clearTimeout(timeoutId);
      resolve(iframe);
    };

    iframe.onerror = () => {
      window.clearTimeout(timeoutId);
      reject(new Error("미리보기 프레임을 생성하지 못했습니다."));
    };

    document.body.appendChild(iframe);
  });

const htmlToDocxRuns = (
  node: Node,
  styles: { bold?: boolean; italic?: boolean; underline?: boolean } = {},
): TextRun[] => {
  const runs: TextRun[] = [];

  const walk = (
    currentNode: Node,
    currentStyles: { bold?: boolean; italic?: boolean; underline?: boolean },
  ) => {
    if (currentNode.nodeType === Node.TEXT_NODE) {
      const text = currentNode.textContent ?? "";

      if (!text) {
        return;
      }

      runs.push(
        new TextRun({
          text,
          bold: currentStyles.bold,
          italics: currentStyles.italic,
          underline: currentStyles.underline ? { type: "single" } : undefined,
        }),
      );
      return;
    }

    if (currentNode.nodeType !== Node.ELEMENT_NODE) {
      return;
    }

    const element = currentNode as HTMLElement;
    const tagName = element.tagName.toLowerCase();

    if (tagName === "br") {
      runs.push(new TextRun({ break: 1 }));
      return;
    }

    const nextStyles = {
      bold: currentStyles.bold || tagName === "strong" || tagName === "b",
      italic: currentStyles.italic || tagName === "em" || tagName === "i",
      underline: currentStyles.underline || tagName === "u",
    };

    Array.from(element.childNodes).forEach((child) => walk(child, nextStyles));
  };

  walk(node, styles);
  return runs;
};

const htmlToDocxParagraphs = (html: string): Paragraph[] => {
  const wrapper = document.createElement("div");
  wrapper.innerHTML = html;
  const paragraphs: Paragraph[] = [];

  const pushParagraphsFromElement = (element: HTMLElement) => {
    const tagName = element.tagName.toLowerCase();

    if (/^h[1-6]$/.test(tagName)) {
      const level = Number(tagName.slice(1));
      const heading =
        level === 1
          ? "Heading1"
          : level === 2
            ? "Heading2"
            : level === 3
              ? "Heading3"
              : level === 4
                ? "Heading4"
                : level === 5
                  ? "Heading5"
                  : "Heading6";

      paragraphs.push(
        new Paragraph({
          children: htmlToDocxRuns(element),
          heading,
          spacing: { after: 180 },
        }),
      );
      return;
    }

    if (tagName === "p") {
      paragraphs.push(
        new Paragraph({
          children: htmlToDocxRuns(element),
          spacing: { after: 120, line: 360, lineRule: "auto" },
        }),
      );
      return;
    }

    if (tagName === "blockquote") {
      paragraphs.push(
        new Paragraph({
          children: htmlToDocxRuns(element),
          indent: { left: 720 },
          spacing: { after: 120 },
        }),
      );
      return;
    }

    if (tagName === "ul") {
      Array.from(element.children).forEach((child) => {
        if (child.tagName.toLowerCase() !== "li") return;
        paragraphs.push(
          new Paragraph({
            children: htmlToDocxRuns(child),
            bullet: { level: 0 },
            spacing: { after: 60 },
          }),
        );
      });
      return;
    }

    if (tagName === "ol") {
      Array.from(element.children).forEach((child, index) => {
        if (child.tagName.toLowerCase() !== "li") return;
        paragraphs.push(
          new Paragraph({
            children: [
              new TextRun({ text: `${index + 1}. ` }),
              ...htmlToDocxRuns(child),
            ],
            spacing: { after: 60 },
          }),
        );
      });
      return;
    }

    if (tagName === "li") {
      paragraphs.push(
        new Paragraph({
          children: htmlToDocxRuns(element),
          bullet: { level: 0 },
          spacing: { after: 60 },
        }),
      );
      return;
    }

    Array.from(element.children).forEach((child) => {
      if (child instanceof HTMLElement) {
        pushParagraphsFromElement(child);
      }
    });
  };

  Array.from(wrapper.children).forEach((child) => {
    if (child instanceof HTMLElement) {
      pushParagraphsFromElement(child);
    }
  });

  if (paragraphs.length === 0) {
    const fallbackText = wrapper.textContent?.trim();

    if (fallbackText) {
      paragraphs.push(
        new Paragraph({
          children: [new TextRun({ text: fallbackText })],
        }),
      );
    }
  }

  return paragraphs;
};

export const useAIDocsEditor = ({ documentId }: UseAIDocsEditorParams) => {
  const [documentDetail, setDocumentDetail] = useState<DocumentDetail | null>(
    null,
  );
  const [history, setHistory] = useState<DocumentHistoryItem[]>([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [saveState, setSaveState] = useState("자동 저장 준비");
  const [aiPrompt, setAiPrompt] = useState("");
  const [isAiEditing, setIsAiEditing] = useState(false);
  const [exportFormat, setExportFormat] = useState<
    "txt" | "pdf" | "docx" | "hwp"
  >("pdf");
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (!documentId) return;

    let isMounted = true;

    const fetchAll = async () => {
      try {
        setIsLoading(true);
        const [docRes, historyRes] = await Promise.all([
          documentApi.getDocumentDetail(documentId),
          documentApi.getDocumentHistory(documentId),
        ]);

        if (!isMounted) return;

        setDocumentDetail(docRes.data);
        setTitle(docRes.data.title || "");
        setContent(docRes.data.content || "");
        setHistory(historyRes.data || []);
      } catch {
        toast.error("문서를 불러오지 못했습니다.");
      } finally {
        if (isMounted) setIsLoading(false);
      }
    };

    fetchAll();

    return () => {
      isMounted = false;
    };
  }, [documentId]);

  useEffect(() => {
    if (!documentDetail || isLoading) return;

    const timeoutId = setTimeout(async () => {
      try {
        setIsSaving(true);
        setSaveState("자동 저장 중...");
        await documentApi.updateDocument(documentId, {
          title,
          content,
        });
        setSaveState("실시간 자동 저장됨");
      } catch {
        setSaveState("자동 저장 실패");
      } finally {
        setIsSaving(false);
      }
    }, 1000);

    return () => clearTimeout(timeoutId);
  }, [content, title, documentDetail, isLoading, documentId]);

  const charCount = useMemo(() => content.length, [content]);

  const applyWrap = (prefix: string, suffix: string = prefix) => {
    const el = textareaRef.current;
    if (!el) return;

    const start = el.selectionStart;
    const end = el.selectionEnd;
    const selected = content.slice(start, end);

    const next = `${content.slice(0, start)}${prefix}${selected}${suffix}${content.slice(end)}`;
    setContent(next);

    requestAnimationFrame(() => {
      el.focus();
      const cursor = end + prefix.length + suffix.length;
      el.setSelectionRange(cursor, cursor);
    });
  };

  const saveNow = async () => {
    if (!documentDetail) return;

    try {
      setIsSaving(true);
      await documentApi.updateDocument(documentId, {
        title,
        content,
      });
      toast.success("저장되었습니다.");
      setSaveState("수동 저장 완료");
    } catch {
      toast.error("저장에 실패했습니다.");
    } finally {
      setIsSaving(false);
    }
  };

  const exportAsText = () => {
    try {
      const cleanedContent = cleanMarkdownForExport(content);
      const textContent = cleanedContent;
      const blob = new Blob([textContent], {
        type: "text/plain;charset=utf-8",
      });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `${title || "document"}.txt`;
      a.click();
      URL.revokeObjectURL(url);
      toast.success("텍스트로 내보내기 완료되었습니다.");
    } catch (error) {
      console.error(error);
      toast.error("텍스트 내보내기에 실패했습니다.");
    }
  };

  const exportAsPdf = async () => {
    let previewFrame: HTMLIFrameElement | null = null;

    try {
      previewFrame = await createHiddenPreviewFrame(
        generatePreviewHtml(title, content, false),
      );
      const previewBody = previewFrame.contentDocument?.body;

      if (!previewBody) {
        throw new Error("미리보기 내용을 불러오지 못했습니다.");
      }

      const canvas = await html2canvas(previewBody, {
        backgroundColor: "#ffffff",
        scale: 2,
        useCORS: true,
        logging: false,
      });

      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: "a4",
      });

      const pageWidth = pdf.internal.pageSize.getWidth();
      const pageHeight = pdf.internal.pageSize.getHeight();
      const marginMm = 12;
      const bottomGapPx = 0;
      const printableWidthMm = pageWidth - marginMm * 2;
      const printableHeightMm = pageHeight - marginMm * 2;
      const renderScale = printableWidthMm / canvas.width;
      const pageSliceHeightPx =
        Math.floor(printableHeightMm / renderScale) - bottomGapPx;

      for (
        let sourceY = 0, pageIndex = 0;
        sourceY < canvas.height;
        pageIndex += 1
      ) {
        const sliceHeightPx = Math.min(
          pageSliceHeightPx,
          canvas.height - sourceY,
        );
        const pageCanvas = document.createElement("canvas");
        pageCanvas.width = canvas.width;
        pageCanvas.height = sliceHeightPx;

        const pageContext = pageCanvas.getContext("2d");
        if (!pageContext) {
          throw new Error("PDF 캔버스를 생성하지 못했습니다.");
        }

        pageContext.fillStyle = "#ffffff";
        pageContext.fillRect(0, 0, pageCanvas.width, pageCanvas.height);
        pageContext.drawImage(
          canvas,
          0,
          sourceY,
          canvas.width,
          sliceHeightPx,
          0,
          0,
          canvas.width,
          sliceHeightPx,
        );

        const pageImageData = pageCanvas.toDataURL("image/png");
        const pageImageHeightMm = sliceHeightPx * renderScale;

        if (pageIndex > 0) {
          pdf.addPage();
        }

        pdf.addImage(
          pageImageData,
          "PNG",
          marginMm,
          marginMm,
          printableWidthMm,
          pageImageHeightMm,
        );

        sourceY += sliceHeightPx;
      }

      pdf.save(`${title || "document"}.pdf`);
      toast.success("PDF로 내보내기 완료되었습니다.");
    } catch (error) {
      console.error(error);
      toast.error("PDF 내보내기에 실패했습니다.");
    } finally {
      previewFrame?.remove();
    }
  };

  const exportAsDocx = async () => {
    try {
      const renderedHtml = buildRenderableBodyHtml(content);
      const contentParagraphs = htmlToDocxParagraphs(renderedHtml);

      const doc = new Document({
        sections: [
          {
            children: [...contentParagraphs],
          },
        ],
      });

      await Packer.toBlob(doc).then((blob) => {
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `${title || "document"}.docx`;
        a.click();
        URL.revokeObjectURL(url);
        toast.success("Word로 내보내기 완료되었습니다.");
      });
    } catch (error) {
      console.error(error);
      toast.error("DOCX 내보내기에 실패했습니다.");
    }
  };

  const exportAsHwp = () => {
    try {
      const hwpContent = generatePreviewHtml(title, content, false);
      const blob = new Blob([hwpContent], {
        type: "application/x-hwp;charset=utf-8",
      });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `${title || "document"}.hwp`;
      a.click();
      URL.revokeObjectURL(url);
      toast.success("한글로 내보내기 완료되었습니다.");
    } catch (error) {
      console.error(error);
      toast.error("HWP 내보내기에 실패했습니다.");
    }
  };

  const exportContent = async () => {
    switch (exportFormat) {
      case "pdf":
        await exportAsPdf();
        break;
      case "docx":
        await exportAsDocx();
        break;
      case "hwp":
        exportAsHwp();
        break;
      case "txt":
      default:
        exportAsText();
        break;
    }
  };

  const aiEdit = async () => {
    if (!aiPrompt.trim()) {
      toast.info("AI 수정 요청을 입력해주세요.");
      return;
    }

    try {
      setIsAiEditing(true);
      const res = await documentApi.aiEditDocument(documentId, {
        prompt: aiPrompt,
      });
      setDocumentDetail(res.data);
      setTitle(res.data.title || "");
      setContent(res.data.content || "");
      setAiPrompt("");
      toast.success("AI 수정이 반영되었습니다.");
    } catch {
      toast.error("AI 수정 요청에 실패했습니다.");
    } finally {
      setIsAiEditing(false);
    }
  };

  return {
    document: documentDetail,
    history,
    title,
    setTitle,
    content,
    setContent,
    isLoading,
    isSaving,
    saveState,
    aiPrompt,
    setAiPrompt,
    isAiEditing,
    charCount,
    textareaRef,
    applyWrap,
    saveNow,
    exportFormat,
    setExportFormat,
    exportContent,
    generatePreviewHtml,
    aiEdit,
  } as const;
};
