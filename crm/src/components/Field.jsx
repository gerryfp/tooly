import { Mcpui } from "@mcpui/react";
import { L } from "../lex";
import { Lx } from "./Lx";

export function Field({ lx, mcpui, children, className = "" }) {
  const control = mcpui ? (
    <Mcpui.Capture
      testid={mcpui.testid}
      kind={mcpui.kind ?? "input"}
      label={mcpui.label ?? L(lx)}
      asChild
    >
      {children}
    </Mcpui.Capture>
  ) : (
    children
  );

  return (
    <label className={`fld ${className}`.trim()}>
      <Lx k={lx} className="fld-l" />
      {control}
    </label>
  );
}
