import { Mcpui } from "@mcpui/react";
import { Lx } from "./Lx";

export function K({ op, lx, glyph, mcpui, className = "", onClick, type = "button", ...rest }) {
  const btn = (
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

  if (!mcpui) return btn;

  return (
    <Mcpui.Capture testid={mcpui.testid} kind={mcpui.kind ?? "action"} label={mcpui.label} asChild>
      {btn}
    </Mcpui.Capture>
  );
}
