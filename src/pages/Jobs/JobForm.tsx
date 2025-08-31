import { useState } from "react";
import { request, Method } from "../../api/base";

interface JobFormProps {
  initialData?: {
    id?: string;
    title: string;
    description: string;
    hourlyRate: number;
    status?: "Active" | "Completed" | "Cancelled";
    endDate?: string;
  };
  onSuccess?: () => void;
}

export default function JobForm({ initialData, onSuccess }: JobFormProps) {
  const [form, setForm] = useState({
    title: initialData?.title || "",
    description: initialData?.description || "",
    hourlyRate: initialData?.hourlyRate || 0,
    status: initialData?.status || "Active",
    endDate: initialData?.endDate || "",
  });
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      if (form.endDate && new Date(form.endDate) <= new Date()) {
        setError("End date must be after today.");
        setLoading(false);
        return;
      }
      if (initialData?.id) {
        await request({
          url: "/Job",
          method: Method.PUT,
          id: initialData.id,
          data: form,
        });
      } else {
        await request({ url: "/Job", method: Method.POST, data: form });
      }
      onSuccess?.();
    } catch (e) {
      setError((e as any)?.message || "Failed to save job");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Title</label>
        <input
          name="title"
          value={form.title}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>Description</label>
        <textarea
          name="description"
          value={form.description}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>Hourly Rate</label>
        <input
          name="hourlyRate"
          type="number"
          value={form.hourlyRate}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>Status</label>
        <select
          name="status"
          value={form.status}
          onChange={handleChange}
          required
        >
          <option value="Active">Active</option>
          <option value="Completed">Completed</option>
          <option value="Cancelled">Cancelled</option>
        </select>
      </div>
      <div>
        <label>End Date</label>
        <input
          name="endDate"
          type="date"
          value={form.endDate}
          onChange={handleChange}
        />
      </div>
      {error && <div style={{ color: "red" }}>{error}</div>}
      <button type="submit" disabled={loading}>
        {loading ? "Saving..." : "Save Job"}
      </button>
    </form>
  );
}
