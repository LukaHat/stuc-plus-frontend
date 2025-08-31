import { useState } from "react";
import { request, Method } from "../../api/base";
import Input from "../../components/atoms/Input/Input";
import Label from "../../components/atoms/Label/Label";
import Button from "../../components/atoms/Button/Button";
import Text from "../../components/atoms/Text/Text";

interface WorkEntryFormProps {
  jobId: string;
  onSuccess?: () => void;
}

export default function WorkEntryForm({
  jobId,
  onSuccess,
}: WorkEntryFormProps) {
  const [form, setForm] = useState({
    jobId: jobId,
    entryDate: "",
    hoursWorked: 0,
    notes: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "number" ? Number(value) : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      await request({
        url: "/Job/workentry",
        method: Method.POST,
        data: { ...form, jobId },
      });
      onSuccess?.();
      setForm({ jobId: jobId, entryDate: "", hoursWorked: 0, notes: "" });
    } catch (e) {
      setError((e as any)?.message || "Failed to add work entry");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <Label htmlFor="entryDate">Date</Label>
          <Input
            id="entryDate"
            name="entryDate"
            type="date"
            value={form.entryDate}
            onChange={handleChange}
            required
            className="mt-1.5"
          />
        </div>
        <div>
          <Label htmlFor="hoursWorked">Hours Worked</Label>
          <Input
            id="hoursWorked"
            name="hoursWorked"
            type="number"
            value={form.hoursWorked}
            onChange={handleChange}
            required
            min={0}
            step="0.5"
            placeholder="0.0"
            className="mt-1.5"
          />
        </div>
      </div>
      <div>
        <Label htmlFor="notes">Notes (Optional)</Label>
        <Text
          id="notes"
          name="notes"
          value={form.notes}
          onChange={handleChange}
          placeholder="Any additional notes or comments about this work session..."
          className="mt-1.5"
        />
      </div>
      {error && (
        <div className="rounded-md bg-error-50 p-4">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg
                className="h-5 w-5 text-error-400"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.28 7.22a.75.75 0 00-1.06 1.06L8.94 10l-1.72 1.72a.75.75 0 101.06 1.06L10 11.06l1.72 1.72a.75.75 0 101.06-1.06L11.06 10l1.72-1.72a.75.75 0 00-1.06-1.06L10 8.94 8.28 7.22z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm text-error-700">{error}</p>
            </div>
          </div>
        </div>
      )}
      <div className="flex justify-end">
        <Button
          type="submit"
          disabled={loading}
          variant="primary"
          className="text-black hover:cursor-pointer"
        >
          {loading ? "Adding Entry..." : "Add Work Entry"}
        </Button>
      </div>
    </form>
  );
}
