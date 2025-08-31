import type { Job } from "../../../types/jobTypes";

export default function RecentWorkEntries({ jobs }: { jobs: Job[] }) {
  const entries = jobs.flatMap((j) =>
    (j.workEntries || []).map((e) => ({ ...e, jobTitle: j.title }))
  );
  const sorted = entries.sort(
    (a, b) => Number(new Date(b.entryDate)) - Number(new Date(a.entryDate))
  );
  return (
    <div className="space-y-3">
      {sorted.slice(0, 8).map((e) => (
        <div
          key={e.id}
          className="flex items-center justify-between border rounded-md p-3"
        >
          <div>
            <div className="font-medium text-gray-900">{e.jobTitle}</div>
            <div className="text-sm text-gray-500">
              {new Date(e.entryDate).toLocaleDateString()}
            </div>
          </div>
          <div className="text-sm text-gray-700">
            {Math.round((e.hoursWorked / 60) * 100) / 100}h
          </div>
        </div>
      ))}
      {entries.length === 0 ? (
        <div className="text-sm text-gray-500">No recent entries</div>
      ) : null}
    </div>
  );
}
