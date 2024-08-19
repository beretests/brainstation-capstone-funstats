import "./StatsTable.scss";

function StatsTable({ stats, friend_stats }) {
  const rows = [];

  for (const key in stats) {
    if (key !== "name" || key !== "profile_pic") {
      rows.push(
        <div key={key} className="stats-stack__items">
          <h3 className="stats-stack__name">{key.replace(/_/g, " ")}</h3>
          <p className="stats-stack__value">{stats[key]}</p>
        </div>
      );
    }
  }

  return (
    <>
      <div className="stats-stack">
        <div className="stats-stack__header">
          <h2 className="stats-stack__title">Stat</h2>
          <h2 className="stats-stack__title">Value</h2>
        </div>

        <div className="stats-stack__rows">{rows}</div>
      </div>
    </>
  );
}

export default StatsTable;
