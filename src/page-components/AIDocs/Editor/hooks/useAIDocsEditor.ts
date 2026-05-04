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
  const [exportFormat, setExportFormat] = useState<"txt" | "pdf" | "docx" | "hwp">("pdf");
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
    const blob = new Blob([content], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${title || "document"}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const exportAsPdf = async () => {
    try {
      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: "a4",
      });

      const pageWidth = pdf.internal.pageSize.getWidth();
      const pageHeight = pdf.internal.pageSize.getHeight();
      const margin = 15;
      const lineHeight = 7;
      const fontSize = 11;

      pdf.setFontSize(18);
      pdf.text(title || "Untitled Document", margin, margin);
      pdf.setFontSize(fontSize);

      let yPosition = margin + 15;
      const lines = pdf.splitTextToSize(content, pageWidth - margin * 2);

      lines.forEach((line: string) => {
        if (yPosition > pageHeight - margin) {
          pdf.addPage();
          yPosition = margin;
        }
        pdf.text(line, margin, yPosition);
        yPosition += lineHeight;
      });

      pdf.save(`${title || "document"}.pdf`);
    } catch (error) {
      toast.error("PDF 내보내기에 실패했습니다.");
    }
  };

  const exportAsDocx = async () => {
    try {
      const contentLines = content.split("\n").map(
        (line) =>
          new Paragraph({
            children: [
              new TextRun({
                text: line || " ",
              }),
            ],
            spacing: { line: 360, lineRule: "auto" },
          }),
      );

      const doc = new Document({
        sections: [
          {
            children: [
              new Paragraph({
                children: [
                  new TextRun({
                    text: title || "Untitled Document",
                    bold: true,
                    size: 28,
                  }),
                ],
                spacing: { after: 400 },
              }),
              ...contentLines,
            ],
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
      });
    } catch (error) {
      toast.error("DOCX 내보내기에 실패했습니다.");
    }
  };

  const exportAsHwp = () => {
    try {
      const hwpContent = `[문서]\n제목: ${title || "무제문서"}\n\n${content}`;
      const blob = new Blob([hwpContent], { type: "application/x-hwp;charset=utf-8" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `${title || "document"}.hwp`;
      a.click();
      URL.revokeObjectURL(url);
    } catch (error) {
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
    aiEdit,
  } as const;
};
