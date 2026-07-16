export default function LimitGauge({ length, limit, color }) {
  const pct = Math.min((length / limit) * 100, 100);
  const isOver = length > limit;
  const isNear = !isOver && pct >= 90;

  let barColor = color;
  if (isOver) barColor = 'var(--danger)';
  else if (isNear) barColor = 'var(--warning)';

  return (
    <div className="limit-gauge" aria-hidden="true">
      <div className="limit-gauge__track">
        <div
          className="limit-gauge__fill"
          style={{ width: `${pct}%`, background: barColor }}
        />
        {Array.from({ length: 9 }).map((_, i) => (
          <span key={i} className="limit-gauge__tick" style={{ left: `${(i + 1) * 10}%` }} />
        ))}
      </div>
    </div>
  );
}
