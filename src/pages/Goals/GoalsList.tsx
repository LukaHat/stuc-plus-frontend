import { useEffect, useState } from "react";
import { request, Method } from "../../api/base";

interface Goal {
  id: string;
  title: string;
  target: number;
  current: number;
  status: string;
  startDate: string;
  endDate: string;
}

export default function GoalsList() {
  const [goals, setGoals] = useState<Goal[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    request<Goal[]>({ url: "/Goal", method: Method.GET })
      .then(setGoals)
      .catch((e) => setError(e?.message || "Failed to load goals"))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div>Loading goals...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!goals.length) return <div>No goals found.</div>;

  return (
    <div>
      <h2>Earning Goals</h2>
      <ul>
        {goals.map((goal) => (
          <li key={goal.id}>
            <strong>{goal.title}</strong> - {goal.status}
            <br />
            Progress: {goal.current} / {goal.target}
            <br />
            <progress value={goal.current} max={goal.target} />
            <br />
            {goal.startDate} - {goal.endDate}
          </li>
        ))}
      </ul>
    </div>
  );
}
