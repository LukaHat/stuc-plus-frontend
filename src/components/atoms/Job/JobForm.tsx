import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { createJob } from "../../../domain/jobs/jobService";

type Props = {
  onSuccess?: () => void;
};

export default function JobForm({ onSuccess }: Props) {
  const { register, handleSubmit, formState } = useForm<{
    title: string;
    description?: string;
    hourlyRate?: number;
  }>();
  const qc = useQueryClient();
  const mutation = useMutation({
    mutationFn: (payload: {
      title: string;
      description?: string;
      hourlyRate?: number;
    }) => createJob(payload),
    onSuccess: () => {
      qc.invalidateQueries(["jobs"]);
      toast.success("Job created");
      onSuccess?.();
    },
    onError: (err: any) => {
      toast.error(err?.message || "Failed to create job");
    },
  });
  return (
    <form
      onSubmit={handleSubmit((v) => mutation.mutate(v))}
      className="p-6 space-y-4"
    >
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Title
        </label>
        <input {...register("title", { required: true })} className="input" />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Description
        </label>
        <input {...register("description")} className="input" />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Hourly rate
        </label>
        <input type="number" {...register("hourlyRate")} className="input" />
      </div>
      <div className="flex items-center justify-end gap-3 pt-2">
        <button
          type="button"
          onClick={() => onSuccess?.()}
          className="btn btn-outline"
        >
          Cancel
        </button>
        <button
          disabled={formState.isSubmitting || mutation.isLoading}
          type="submit"
          className="btn btn-primary"
        >
          {mutation.isLoading ? "Saving..." : "Save Job"}
        </button>
      </div>
    </form>
  );
}
