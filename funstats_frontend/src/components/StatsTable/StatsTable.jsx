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

  // console.log("Stats: ", stats.goals_scored);
  // const headers = Object.keys(stats);
  // const rows = Object.values(stats);

  // return (
  /* <table>
      <thead>
        <tr>
          <th colSpan={2}></th>
        </tr>
      </thead>
      <tbody>
        {headers.map((header) => (
          <tr key={header}>
            <td key="safe">{header.replace(/_/g, " ")}</td>
            {console.log("Row: ", header)}
            <td key="key">{stats.header}</td>
          </tr>
        ))}
        {/* <tr key="key">
          {rows.map((cell) => (
            <td key="key">{cell}</td>
          ))}
        </tr> */
  //   </tbody>
  // </table> */}

  // const rows = [];

  // // Using for...in loop to iterate over the stats object
  // for (const key in stats) {
  //   if (Object.hasOwnProperty.call(stats, key)) {
  //     rows.push(
  //       <tr key={key}>
  //         <td>{key.replace(/_/g, " ")}</td>
  //         <td>{stats[key]}</td>
  //       </tr>
  //     );
  //   }
  // }

  // return (
  //   <table
  //     border="1"
  //     cellPadding="10"
  //     style={{ margin: "20px auto", borderCollapse: "collapse", width: "50%" }}
  //   >
  //     <thead>
  //       <tr>
  //         <th>Stat</th>
  //         <th>Value</th>
  //       </tr>
  //     </thead>
  //     <tbody>{rows}</tbody>
  //   </table>
  // );
}

export default StatsTable;
