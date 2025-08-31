import { useState } from "react";

export default function CVTemplatePicker({
  onSelect,
}: {
  onSelect: (id: string) => void;
}) {
  const templates = ["default", "modern", "compact"];
  const [active, setActive] = useState("default");
  return (
    <div className="grid grid-cols-3 gap-2">
      {templates.map((t) => (
        <button
          key={t}
          onClick={() => {
            setActive(t);
            onSelect(t);
          }}
          className={`p-3 rounded-md border ${
            active === t
              ? "border-primary-600 bg-primary-50"
              : "border-gray-200 bg-white"
          }`}
        >
          {t}
        </button>
      ))}
    </div>
  );
}
