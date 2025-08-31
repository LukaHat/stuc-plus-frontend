import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import { request, Method } from "../../api/base";
import WorkEntryForm from "./WorkEntryForm";
import Button from "../../components/atoms/Button/Button";
import { useDeleteJobMutation } from "../../hooks/useDeleteJobMutation";
import { useToast } from "../../hooks/useToast";

interface Job {
  id: string;
  title: string;
  description: string;
  hourlyRate: number;
  status: "Active" | "Completed" | "Cancelled";
  startDate: string;
  endDate?: string;
  workEntries?: WorkEntry[];
}

interface WorkEntry {
  id: string;
  entryDate: string;
  hoursWorked: number;
  notes: string;
}

export default function JobDetail() {
  const { id } = useParams<{ id: string }>();
  const [job, setJob] = useState<Job | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showWorkEntry, setShowWorkEntry] = useState(false);
  const { mutate: deleteJob } = useDeleteJobMutation();
  const { showToast } = useToast();
  const navigate = useNavigate();

  const fetchJob = () => {
    if (!id) return;
    setLoading(true);
    request<Job>({ url: "/Job", method: Method.GET, id })
      .then(setJob)
      .catch((e) => setError(e?.message || "Failed to load job"))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchJob();
    // eslint-disable-next-line
  }, [id]);

  if (loading) return <div className="text-[#D5D2E2]">Loading job...</div>;
  if (error) return <div className="text-[#D5D2E2]">Error: {error}</div>;
  if (!job) return <div className="text-[#D5D2E2]">Job not found.</div>;

  const totalHours =
    job.workEntries?.reduce((sum, entry) => sum + entry.hoursWorked, 0) || 0;
  const totalEarnings = totalHours * job.hourlyRate;

  const handleDelete = () => {
    if (!job.id) return;
    deleteJob(job.id, {
      onSuccess: () => {
        showToast("Job deleted successfully", 2500);
        navigate("/dashboard");
      },
      onError: (err: unknown) => {
        const message =
          typeof err === "object" && err && "message" in err
            ? (err as any).message
            : "Failed to delete job";
        showToast(message, 3500);
      },
    });
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <h1 className="text-3xl font-bold text-gray-900">{job.title}</h1>
            <span
              className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-sm font-medium ${
                job.status === "Active"
                  ? "bg-success-50 text-success-500"
                  : job.status === "Completed"
                  ? "bg-primary-50 text-primary-600"
                  : "bg-gray-100 text-gray-600"
              }`}
            >
              {job.status}
            </span>
          </div>
          <p className="text-gray-600">
            Started {new Date(job.startDate).toLocaleDateString()}
            {job.endDate &&
              ` • Ended ${new Date(job.endDate).toLocaleDateString()}`}
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Button onClick={() => navigate("/dashboard")} variant="secondary">
            Back to Dashboard
          </Button>
          <Button
            onClick={handleDelete}
            variant="outline"
            className="text-error-500 border-error-500 hover:bg-error-50"
          >
            Delete Job
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          {/* Job Details Card */}
          <div className="card space-y-6">
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                Job Details
              </h2>
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Hourly Rate</p>
                  <p className="text-lg font-medium text-gray-900">
                    €{job.hourlyRate}/hr
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 mb-1">Total Hours</p>
                  <p className="text-lg font-medium text-gray-900">
                    {totalHours}h
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 mb-1">Total Earnings</p>
                  <p className="text-lg font-medium text-primary-600">
                    €{totalEarnings}
                  </p>
                </div>
              </div>
            </div>
            {job.description && (
              <div>
                <h3 className="text-sm font-medium text-gray-900 mb-2">
                  Description
                </h3>
                <p className="text-gray-600 whitespace-pre-line">
                  {job.description}
                </p>
              </div>
            )}
          </div>

          <div className="card space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-semibold text-gray-900 mb-1">
                  Work Entries
                </h2>
                <p className="text-sm text-gray-600">
                  Track your work hours and notes
                </p>
              </div>
              <Button
                onClick={() => setShowWorkEntry((v) => !v)}
                variant={showWorkEntry ? "secondary" : "primary"}
                className="text-black hover:cursor-pointer"
              >
                {showWorkEntry ? "Cancel" : "Add Work Entry"}
              </Button>
            </div>

            {showWorkEntry && (
              <div className="card bg-gray-50 border border-gray-200">
                <WorkEntryForm jobId={job.id} onSuccess={fetchJob} />
              </div>
            )}

            {job.workEntries && job.workEntries.length > 0 ? (
              <div className="divide-y divide-gray-200">
                {job.workEntries.map((entry) => (
                  <div key={entry.id} className="py-4 first:pt-0 last:pb-0">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-900">
                          {new Date(entry.entryDate).toLocaleDateString(
                            "en-US",
                            {
                              weekday: "short",
                              year: "numeric",
                              month: "short",
                              day: "numeric",
                            }
                          )}
                        </p>
                        {entry.notes && (
                          <p className="mt-1 text-sm text-gray-600">
                            {entry.notes}
                          </p>
                        )}
                      </div>
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-primary-50 text-primary-700">
                        {entry.hoursWorked}h
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-6">
                <p className="text-gray-600">
                  No work entries yet. Start logging your hours!
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Stats and Actions Card */}
        <div className="lg:col-span-1">
          <div className="card space-y-6 sticky top-24">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                Job Stats
              </h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center py-2 border-b border-gray-200">
                  <span className="text-gray-600">Average Hours/Week</span>
                  <span className="font-medium text-gray-900">
                    {(
                      totalHours /
                      Math.max(
                        1,
                        Math.ceil(
                          (new Date(job.endDate || new Date()).getTime() -
                            new Date(job.startDate).getTime()) /
                            (1000 * 60 * 60 * 24 * 7)
                        )
                      )
                    ).toFixed(1)}
                    h
                  </span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-gray-200">
                  <span className="text-gray-600">Days Active</span>
                  <span className="font-medium text-gray-900">
                    {Math.ceil(
                      (new Date(job.endDate || new Date()).getTime() -
                        new Date(job.startDate).getTime()) /
                        (1000 * 60 * 60 * 24)
                    )}
                  </span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-gray-200">
                  <span className="text-gray-600">Average Earnings/Month</span>
                  <span className="font-medium text-gray-900">
                    €
                    {(
                      totalEarnings /
                      Math.max(
                        1,
                        Math.ceil(
                          (new Date(job.endDate || new Date()).getTime() -
                            new Date(job.startDate).getTime()) /
                            (1000 * 60 * 60 * 24 * 30)
                        )
                      )
                    ).toFixed(2)}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
