import { useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { fetchJobs } from "../domain/jobs/jobService";

export function useJobsQuery() {
  return useQuery({
    queryKey: ["jobs"],
    queryFn: fetchJobs,
    onError: (error: any) => {
      toast.error(error?.message || "Failed to load jobs");
    },
    staleTime: 1000 * 60 * 2,
  });
}
