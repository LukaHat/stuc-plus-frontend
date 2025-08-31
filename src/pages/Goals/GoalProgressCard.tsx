interface GoalProgressCardProps {
  title: string;
  current: number;
  target: number;
  status: string;
  startDate: string;
  endDate: string;
}

export default function GoalProgressCard({
  title,
  current,
  target,
  status,
  startDate,
  endDate,
}: GoalProgressCardProps) {
  return (
    <div style={{ border: "1px solid #ccc", padding: 12, marginBottom: 8 }}>
      <h4>{title}</h4>
      <div>Status: {status}</div>
      <div>
        Progress: {current} / {target}
      </div>
      <progress value={current} max={target} />
      <div>
        {startDate} - {endDate}
      </div>
    </div>
  );
}
