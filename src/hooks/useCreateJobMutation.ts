import { useMutation, useQueryClient } from "@tanstack/react-query";
import { request, Method } from "../api/base";
import type { Job } from "../types/jobTypes";

export function useCreateJobMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: Omit<Job, "id" | "workEntries">) =>
      request<Job>({ url: "/Job", method: Method.POST, data }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["jobs"] });
    },
  });
}
