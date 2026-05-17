import { L } from "../lex";
import { Lx } from "../components/Lx";
import { Seal } from "../components/Seal";
import { CaptureAction } from "../mcpui/CaptureAction";
import { useSealed } from "../hooks/useSealed";

function fmtDate(ts) {
  if (!ts) return "—";
  return new Date(ts).toLocaleDateString(undefined, {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export function Chronicle({ tasks, personName, onEdit, onDrop, onToggle }) {
  const { unseal, isOpen } = useSealed();
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
            <li key={t.id} className={`chr-i ${t.dn ? "chr-i--dn" : ""} ${isOpen(t.id) ? "chr-i--on" : ""}`} data-id={t.id}>
              <Seal open={isOpen(t.id)} id={t.id} onUnseal={unseal} className="chr-sl">
                <>
                  <CaptureAction
                    testid={`task-toggle-${t.id}`}
                    label={t.dn ? `Mark task incomplete: ${t.t}` : `Mark task done: ${t.t}`}
                  >
                    <button
                      type="button"
                      className="chr-tog"
                      data-op="k4"
                      onClick={() => onToggle(t.id)}
                      aria-pressed={t.dn}
                    >
                      {t.dn ? "✓" : "○"}
                    </button>
                  </CaptureAction>
                  <CaptureAction testid={`task-${t.id}`} label={`Edit task: ${t.t}`}>
                    <button type="button" className="chr-hit" data-op="k3" onClick={() => onEdit(t)}>
                      <span className="chr-t">{t.t}</span>
                      <span className="chr-meta">
                        <span data-pr={t.pr}>{L(t.pr)}</span>
                        <span>{fmtDate(t.d)}</span>
                        <span>{personName(t.pid)}</span>
                      </span>
                    </button>
                  </CaptureAction>
                  <button type="button" className="chr-rm" data-op="k2" onClick={() => onDrop(t.id)}>
                    ×
                  </button>
                </>
              </Seal>
            </li>
          ))}
        </ul>
      )}
    </motion-list>
  );
}
