import React from "react";

function StatsTable({ stats }) {
  const rows = [];

  // Using for...in loop to iterate over the stats object
  for (const key in stats) {
    if (Object.hasOwnProperty.call(stats, key)) {
      rows.push(
        <tr key={key}>
          <td>{key.replace(/_/g, " ")}</td>
          <td>{stats[key]}</td>
        </tr>
      );
    }
  }

  return (
    <table
      border="1"
      cellPadding="10"
      style={{ margin: "20px auto", borderCollapse: "collapse", width: "50%" }}
    >
      <thead>
        <tr>
          <th>Stat</th>
          <th>Value</th>
        </tr>
      </thead>
      <tbody>{rows}</tbody>
    </table>
  );
}

export default StatsTable;
