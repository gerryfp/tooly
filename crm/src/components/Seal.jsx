import { Lx } from "./Lx";

export function SealHit({ id, onUnseal, className = "" }) {
  return (
    <button
      type="button"
      className={`sl-hit ${className}`.trim()}
      data-op={`sl-${id}`}
      onClick={(e) => {
        e.stopPropagation();
        onUnseal(id);
      }}
    >
      <span className="sl-g" aria-hidden="true">
        ◇
      </span>
      <Lx k="r0" className="sl-lx" />
    </button>
  );
}

/** Children stay out of the DOM until open — no scrapeable record text before unseal */
export function Seal({ open, id, onUnseal, children, className = "" }) {
  if (!open) return <SealHit id={id} onUnseal={onUnseal} className={className} />;
  return children;
}
