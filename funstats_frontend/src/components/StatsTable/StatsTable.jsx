import "./StatsTable.scss";

function StatsTable({ stats, friend_stats }) {
  const rows = [];

  for (const key in stats) {
    rows.push(
      <div key={key} className="stats__items">
        <h3 className="stats__name">{key.replace(/_/g, " ")}</h3>
        <p className="stats__value">{stats[key]}</p>
      </div>
    );
  }

  return (
    <>
      <div className="stats">
        <div className="stats__header">
          <h2 className="stats__title">Stat</h2>
          <h2 className="stats__title">Value</h2>
        </div>

        <div className="stats__rows">{rows}</div>
      </div>
    </>
  );
}

export default StatsTable;
