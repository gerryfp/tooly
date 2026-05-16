import { L } from "../lex";
import { Lx } from "../components/Lx";

function fmtDate(ts) {
  if (!ts) return "—";
  return new Date(ts).toLocaleDateString(undefined, {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export function Chronicle({ tasks, personName, onEdit, onDrop, onToggle }) {
  const sorted = [...tasks].sort((a, b) => (a.d || 0) - (b.d || 0));

  return (
    <motion-list className="chr">
      {sorted.length === 0 ? (
        <p className="chr-empty">
          <Lx k="e2" />
        </p>
      ) : (
        <ul className="chr-ul" role="presentation">
          {sorted.map((t) => (
            <li key={t.id} className={`chr-i ${t.dn ? "chr-i--dn" : ""}`} data-id={t.id}>
              <button
                type="button"
                className="chr-tog"
                data-op="k4"
                onClick={() => onToggle(t.id)}
                aria-pressed={t.dn}
              >
                {t.dn ? "✓" : "○"}
              </button>
              <button type="button" className="chr-hit" data-op="k3" onClick={() => onEdit(t)}>
                <span className="chr-t">{t.t}</span>
                <span className="chr-meta">
                  <span data-pr={t.pr}>{L(t.pr)}</span>
                  <span>{fmtDate(t.d)}</span>
                  <span>{personName(t.pid)}</span>
                </span>
              </button>
              <button type="button" className="chr-rm" data-op="k2" onClick={() => onDrop(t.id)}>
                ×
              </button>
            </li>
          ))}
        </ul>
      )}
    </motion-list>
  );
}
