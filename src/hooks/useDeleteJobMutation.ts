import { useMutation, useQueryClient } from "@tanstack/react-query";
import { request, Method } from "../api/base";
import type { Job } from "../types/jobTypes";

export function useDeleteJobMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) =>
      request<void>({ url: "/Job", method: Method.DELETE, id }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["jobs"] });
    },
  });
}
