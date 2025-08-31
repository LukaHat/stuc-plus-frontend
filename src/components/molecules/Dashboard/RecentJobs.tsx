import { Link } from "react-router";
import type { Job } from "../../../types/jobTypes";

export default function RecentJobs({ jobs }: { jobs: Job[] }) {
  const sorted = [...jobs].sort(
    (a, b) =>
      Number(new Date(b.startDate || "")) - Number(new Date(a.startDate || ""))
  );
  return (
    <div className="space-y-3">
      {sorted.slice(0, 6).map((j) => (
        <div
          key={j.id}
          className="flex items-center justify-between border rounded-md p-3"
        >
          <div>
            <div className="font-medium text-gray-900">{j.title}</div>
            <div className="text-sm text-gray-500">{j.description}</div>
          </div>
          <div className="flex items-center gap-3">
            <div className="text-sm text-gray-500">
              {j.workEntries?.length || 0} entries
            </div>
            <Link
              to={`/jobs/${j.id}`}
              className="text-primary-600 no-underline"
            >
              Open
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
}
