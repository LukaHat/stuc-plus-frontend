export default function CVPreview({ templateId }: { templateId: string }) {
  return (
    <div className="border rounded-md p-4 min-h-[120px] bg-gray-50">
      <div className="text-sm text-gray-500">Template: {templateId}</div>
      <div className="mt-3 text-gray-800">John Doe — Frontend Developer</div>
    </div>
  );
}
