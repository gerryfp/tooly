import { Lx } from "./Lx";

export function K({ op, lx, glyph, className = "", onClick, type = "button", ...rest }) {
  return (
    <button
      type={type}
      className={`k ${className}`.trim()}
      data-op={op}
      onClick={onClick}
      title={glyph ? undefined : undefined}
      {...rest}
    >
      {glyph ? <span aria-hidden="true">{glyph}</span> : lx ? <Lx k={lx} /> : null}
    </button>
  );
}
