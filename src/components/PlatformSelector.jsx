import { PLATFORM_LIST } from '../utils/platforms';

export default function PlatformSelector({ value, onChange }) {
  return (
    <div className="platform-selector">
      <label htmlFor="platform-select" className="field-label">
        Platform
      </label>
      <select id="platform-select" value={value} onChange={onChange} className="platform-select">
        {PLATFORM_LIST.map((p) => (
          <option key={p.id} value={p.id}>
            {p.label}
          </option>
        ))}
      </select>
    </div>
  );
}
