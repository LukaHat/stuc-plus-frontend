export interface WorkEntry {
  id: string;
  entryDate: string;
  hoursWorked: number;
  notes: string;
}

export type JobStatus = "Active" | "Completed" | "Cancelled";

export interface Job {
  id: string;
  title: string;
  description: string;
  hourlyRate: number;
  status: JobStatus;
  startDate: string;
  endDate?: string;
  workEntries?: WorkEntry[];
}
