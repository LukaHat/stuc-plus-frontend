import { Method, request } from "../../api/base";
import type { Job } from "../../types/jobTypes";

const base = "job";

export async function fetchJobs(): Promise<Job[]> {
  return await request<Job[]>({
    method: Method.GET,
    url: base,
  });
}

export async function createJob(payload: {
  title: string;
  company?: string;
  hourlyRate?: number;
}): Promise<Job> {
  return await request<Job>({
    method: Method.POST,
    url: base,
    data: payload,
  });
}
