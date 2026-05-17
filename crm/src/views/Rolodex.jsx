import { Lx } from "../components/Lx";
import { SealHit } from "../components/Seal";
import { CaptureAction } from "../mcpui/CaptureAction";
import { useSealed } from "../hooks/useSealed";

export function Rolodex({ people, query, onEdit, onDrop }) {
  const { unseal, isOpen } = useSealed();
  const q = query.trim().toLowerCase();
  const rows = people.filter((p) => {
    if (!q) return true;
    const blob = [p.n, p.e, p.co, p.ph, ...(p.tg || [])].join(" ").toLowerCase();
    return blob.includes(q);
  });

  return (
    <motion-grid className="rdx">
      {rows.length === 0 ? (
        <p className="rdx-empty">
          <Lx k="e1" />
        </p>
      ) : (
        <table className="rdx-t" role="presentation">
          <tbody>
            {rows.map((p) =>
              isOpen(p.id) ? (
                <tr key={p.id} className="rdx-r rdx-r--on" data-id={p.id}>
                  <td>
                    <CaptureAction testid={`person-${p.id}`} label={`Edit person: ${p.n}`}>
                      <button type="button" className="rdx-hit" data-op="p3" onClick={() => onEdit(p)}>
                        <span className="rdx-n">{p.n}</span>
                        <span className="rdx-co">{p.co || "—"}</span>
                      </button>
                    </CaptureAction>
                  </td>
                  <td className="rdx-e">{p.e}</td>
                  <td className="rdx-ph">{p.ph || "—"}</td>
                  <td className="rdx-tg">
                    {(p.tg || []).map((t) => (
                      <span key={t} className="tg">
                        {t}
                      </span>
                    ))}
                  </td>
                  <td>
                    <button
                      type="button"
                      className="rdx-rm"
                      data-op="p2"
                      onClick={() => onDrop(p.id)}
                    >
                      ×
                    </button>
                  </td>
                </tr>
              ) : (
                <tr key={p.id} className="rdx-r rdx-r--sl" data-id={p.id}>
                  <td colSpan={5}>
                    <SealHit id={p.id} onUnseal={unseal} className="rdx-sl" />
                  </td>
                </tr>
              )
            )}
          </tbody>
        </table>
      )}
    </motion-grid>
  );
}
