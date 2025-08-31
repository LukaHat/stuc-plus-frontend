import { useState } from "react";
import { useJobsQuery } from "../../hooks/useJobsQuery";
import { useDashboardUIStore } from "../../stores/dashboardUI";
import { Button } from "../../components/atoms/Button";
import Modal from "../../components/atoms/Modal/Modal";
import JobForm from "../../components/atoms/Job/JobForm";
import DashboardStats from "../../components/organisms/Dashboard/DashboardStats";
import RecentJobs from "../../components/molecules/Dashboard/RecentJobs";
import RecentWorkEntries from "../../components/molecules/Dashboard/RecentWorkEntries";
import CVPreview from "../Cv/CVPreview";
import CVTemplatePicker from "../Cv/CVTemplatePicker";
import CVActions from "../Cv/CVActions";
import NavBrand from "../../components/molecules/NavBrand/NavBrand";

export default function Dashboard() {
  const { data: jobs = [], isLoading, error } = useJobsQuery();
  const { jobModalOpen, openJobModal, closeJobModal } = useDashboardUIStore();
  const [selectedTemplate, setSelectedTemplate] = useState("default");
  if (isLoading)
    return (
      <div className="text-[#23243a] text-center">Loading dashboard...</div>
    );
  if (error)
    return (
      <div className="text-[#23243a] text-center">
        Error: {(error as any)?.message || String(error)}
      </div>
    );
  return (
    <div className="py-8 max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex items-center justify-between mb-12">
        <div>
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Dashboard</h1>
          <p className="text-gray-600">
            Welcome back! Here's your work overview.
          </p>
        </div>
        <Button
          onClick={openJobModal}
          variant="primary"
          className="shadow-lg hover:shadow-xl transition-shadow duration-200 bg-primary-600 text-black hover:cursor-pointer"
        >
          Add New Job
        </Button>
      </div>
      <Modal open={jobModalOpen} onClose={closeJobModal} size="md">
        <JobForm onSuccess={closeJobModal} />
      </Modal>
      {jobs.length === 0 ? (
        <div className="card flex flex-col items-center justify-center py-16 ">
          <NavBrand />
          <h2 className="text-2xl font-semibold text-gray-900 mb-2">
            Welcome to Your Dashboard
          </h2>
          <p className="text-gray-600 text-center mb-8 max-w-md">
            You haven't added any jobs yet. Start tracking your work by adding
            your first job!
          </p>
          <Button
            onClick={openJobModal}
            variant="primary"
            size="lg"
            className="shadow-lg hover:shadow-xl transition-shadow duration-200 text-black"
          >
            Add Your First Job
          </Button>
        </div>
      ) : (
        <div className="space-y-10">
          <DashboardStats jobs={jobs} />
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-8">
              <div className="bg-white rounded-xl shadow-md overflow-hidden">
                <div className="border-b border-gray-200 bg-gray-50 px-6 py-4">
                  <h2 className="text-xl font-semibold text-gray-900">
                    Recent Jobs
                  </h2>
                </div>
                <div className="p-6">
                  <RecentJobs jobs={jobs} />
                </div>
              </div>
              <div className="bg-white rounded-xl shadow-md overflow-hidden">
                <div className="border-b border-gray-200 bg-gray-50 px-6 py-4">
                  <h2 className="text-xl font-semibold text-gray-900">
                    Recent Work Entries
                  </h2>
                </div>
                <div className="p-6">
                  <RecentWorkEntries jobs={jobs} />
                </div>
              </div>
            </div>
            <div className="lg:col-span-1">
              <div className="bg-white rounded-xl shadow-md overflow-hidden">
                <div className="border-b border-gray-200 bg-gray-50 px-6 py-4">
                  <h2 className="text-xl font-semibold text-gray-900">
                    Your CV
                  </h2>
                  <p className="text-sm text-gray-600 mt-1">
                    Preview and manage your CV template
                  </p>
                </div>
                <div className="p-6 space-y-6">
                  <CVPreview templateId={selectedTemplate} />
                  <div className="space-y-4">
                    <CVTemplatePicker onSelect={setSelectedTemplate} />
                    <CVActions templateId={selectedTemplate} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
