import React from "react";

interface TableProps {
  columns: string[];
  data: Array<Record<string, React.ReactNode>>;
}

export default function Table({ columns, data }: TableProps) {
  return (
    <table style={{ width: "100%", borderCollapse: "collapse" }}>
      <thead>
        <tr>
          {columns.map((col) => (
            <th
              key={col}
              style={{ borderBottom: "1px solid #ccc", padding: 8 }}
            >
              {col}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((row, i) => (
          <tr key={i}>
            {columns.map((col) => (
              <td key={col} style={{ padding: 8 }}>
                {row[col]}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
