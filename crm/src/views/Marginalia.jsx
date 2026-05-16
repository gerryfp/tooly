import { Lx } from "../components/Lx";

function fmtWhen(ts) {
  return new Date(ts).toLocaleString(undefined, {
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export function Marginalia({ notes, personName, onEdit, onDrop }) {
  const sorted = [...notes].sort((a, b) => b.ts - a.ts);

  return (
    <motion-stack className="mar">
      {sorted.length === 0 ? (
        <p className="mar-empty">
          <Lx k="e3" />
        </p>
      ) : (
        sorted.map((n) => (
          <article key={n.id} className="mar-i" data-id={n.id}>
            <header className="mar-h">
              <span className="mar-who">{personName(n.pid)}</span>
              <time className="mar-w">{fmtWhen(n.ts)}</time>
            </header>
            <p className="mar-b">{n.b}</p>
            <footer className="mar-ft">
              <button type="button" className="mar-ed" data-op="n3" onClick={() => onEdit(n)}>
                ✎
              </button>
              <button type="button" className="mar-rm" data-op="n2" onClick={() => onDrop(n.id)}>
                ×
              </button>
            </footer>
          </article>
        ))
      )}
    </motion-stack>
  );
}
