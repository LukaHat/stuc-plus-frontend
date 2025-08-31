import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { request, Method } from "../../api/base";
import {
  BriefcaseIcon,
  PlusIcon,
  CurrencyEuroIcon,
  CalendarIcon,
  ClockIcon,
  ChevronRightIcon,
} from "@heroicons/react/24/outline";
import Button from "../../components/atoms/Button/Button";

interface Job {
  id: string;
  title: string;
  description: string;
  hourlyRate: number;
  status: "Active" | "Completed" | "Cancelled";
  startDate: string;
  endDate?: string;
}

export default function JobList() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    request<Job[]>({ url: "/Job", method: Method.GET })
      .then(setJobs)
      .catch((e) => setError(e?.message || "Failed to load jobs"))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="h-[50vh] flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mb-4"></div>
          <p className="text-gray-600">Loading your jobs...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="h-[50vh] flex items-center justify-center">
        <div className="text-center max-w-md">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-error-100 text-error-600 mb-4">
            <svg
              className="w-[20px] h-[20px]"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              />
            </svg>
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            Failed to load jobs
          </h3>
          <p className="text-gray-600">{error}</p>
        </div>
      </div>
    );
  }

  if (!jobs.length) {
    return (
      <div className="text-center py-12 px-4">
        <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-gray-100 text-gray-600 mb-4">
          <BriefcaseIcon className="w-[20px] h-[20px]" />
        </div>
        <h3 className="text-lg font-semibold text-gray-900 mb-2">
          No jobs found
        </h3>
        <p className="text-gray-600 mb-4">
          Get started by adding your first job position.
        </p>
        <Link to="/jobs/new" className="no-underline">
          <Button variant="primary">
            <PlusIcon className="w-[20px] h-[20px] mr-2" />
            Add New Job
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-fadeIn">
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <BriefcaseIcon className="w-[32px] h-[32px] text-primary-600" />
            <h1 className="text-3xl font-bold text-gray-900">Jobs</h1>
          </div>
          <p className="text-gray-600">
            Manage and track your current and past positions
          </p>
        </div>
        <Link to="/jobs/new" className="no-underline">
          <Button variant="primary" className="group">
            <PlusIcon className="w-[20px] h-[20px] mr-2 transition-transform group-hover:scale-110" />
            Add New Job
          </Button>
        </Link>
      </div>

      <div className="grid gap-6">
        {jobs.map((job) => (
          <div
            key={job.id}
            className="bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow p-6 group"
          >
            <div className="flex items-start justify-between gap-4">
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-3 mb-3">
                  <Link
                    to={`/jobs/${job.id}`}
                    className="text-xl font-semibold text-gray-900 hover:text-primary-600 no-underline group-hover:text-primary-600 transition-colors"
                  >
                    {job.title}
                  </Link>
                  <span
                    className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                      job.status === "Active"
                        ? "bg-success-50 text-success-500"
                        : job.status === "Completed"
                        ? "bg-primary-50 text-primary-600"
                        : "bg-gray-100 text-gray-600"
                    }`}
                  >
                    {job.status === "Active" && (
                      <div className="w-2 h-2 rounded-full bg-success-500 mr-2 animate-pulse" />
                    )}
                    {job.status}
                  </span>
                </div>
                <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 mb-3">
                  <span className="inline-flex items-center gap-1.5">
                    <CurrencyEuroIcon className="w-4 h-4" />
                    {job.hourlyRate}/hr
                  </span>
                  <span className="inline-flex items-center gap-1.5">
                    <CalendarIcon className="w-4 h-4" />
                    Started {new Date(job.startDate).toLocaleDateString()}
                  </span>
                  {job.endDate && (
                    <span className="inline-flex items-center gap-1.5">
                      <ClockIcon className="w-4 h-4" />
                      Ended {new Date(job.endDate).toLocaleDateString()}
                    </span>
                  )}
                </div>
                {job.description && (
                  <p className="text-sm text-gray-600 line-clamp-2">
                    {job.description}
                  </p>
                )}
              </div>
              <div>
                <Link to={`/jobs/${job.id}`} className="no-underline">
                  <Button
                    variant="secondary"
                    size="sm"
                    className="group/btn hover:border-primary-500"
                  >
                    <span className="flex items-center gap-2">
                      View Details
                      <ChevronRightIcon className="w-4 h-4 transition-transform group-hover/btn:translate-x-0.5" />
                    </span>
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
