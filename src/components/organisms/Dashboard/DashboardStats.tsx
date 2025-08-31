import type { Job } from "../../../types/jobTypes";

export default function DashboardStats({ jobs }: { jobs: Job[] }) {
  const totalJobs = jobs.length;
  const totalEntries = jobs.reduce(
    (acc, j) => acc + (j.workEntries?.length || 0),
    0
  );
  const totalMinutes = jobs.reduce(
    (acc, j) =>
      acc + (j.workEntries?.reduce((a, e) => a + e.hoursWorked, 0) || 0),
    0
  );
  const totalHours = Math.round((totalMinutes / 60) * 100) / 100;
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
      <div className="bg-white rounded-xl shadow-md p-6">
        <div className="text-sm text-gray-500">Total jobs</div>
        <div className="text-2xl font-bold text-gray-900">{totalJobs}</div>
      </div>
      <div className="bg-white rounded-xl shadow-md p-6">
        <div className="text-sm text-gray-500">Work entries</div>
        <div className="text-2xl font-bold text-gray-900">{totalEntries}</div>
      </div>
      <div className="bg-white rounded-xl shadow-md p-6">
        <div className="text-sm text-gray-500">Tracked hours</div>
        <div className="text-2xl font-bold text-gray-900">{totalHours}h</div>
      </div>
    </div>
  );
}
