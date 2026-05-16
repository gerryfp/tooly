import { Lx } from "./Lx";

export function Field({ lx, children, className = "" }) {
  return (
    <label className={`fld ${className}`.trim()}>
      <Lx k={lx} className="fld-l" />
      {children}
    </label>
  );
}
