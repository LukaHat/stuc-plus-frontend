import toast from "react-hot-toast";
import { Method, request } from "../../api/base";

export default function CVActions({ templateId }: { templateId: string }) {
  const downloadPdf = async () => {
    const downloadToast = toast.loading(`Generating PDF for ${templateId}...`);

    try {
      const apiResult = await request<Blob>({
        method: Method.GET,
        url: `cv/generate/pdf?templateId=${templateId}`,
        responseType: "blob",
      });

      if (!(apiResult instanceof Blob)) {
        throw new Error(
          "API did not return a PDF file. Received unexpected data."
        );
      }

      const blob: Blob = apiResult;

      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `cv_${templateId}_${new Date()
        .toISOString()
        .slice(0, 10)}.pdf`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(url);

      toast.success("Download complete!", { id: downloadToast });
    } catch (error: any) {
      toast.error(`Download failed: ${error.message || "Server error"}`, {
        id: downloadToast,
      });
    }
  };

  return (
    <div className="flex items-center gap-2">
      <button onClick={downloadPdf} className="btn btn-outline">
        Download
      </button>
    </div>
  );
}
