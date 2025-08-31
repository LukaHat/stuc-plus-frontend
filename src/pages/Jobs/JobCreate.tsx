import { useNavigate } from "react-router";
import JobForm from "../../components/atoms/Job/JobForm";

export default function JobCreate() {
  const navigate = useNavigate();

  const handleSuccess = () => {
    navigate("/jobs");
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Create New Job
        </h1>
        <p className="text-gray-600">
          Add a new job position to track your work and earnings.
        </p>
      </div>

      <JobForm onSuccess={handleSuccess} />
    </div>
  );
}
