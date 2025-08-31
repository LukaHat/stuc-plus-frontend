import React from "react";

interface DatePickerProps {
  value: string;
  onChange: (value: string) => void;
  min?: string;
  max?: string;
}

export default function DatePicker({
  value,
  onChange,
  min,
  max,
}: DatePickerProps) {
  return (
    <input
      type="date"
      value={value}
      min={min}
      max={max}
      onChange={(e) => onChange(e.target.value)}
    />
  );
}
