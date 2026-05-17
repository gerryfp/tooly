import { Mcpui } from "@mcpui/react";

export function CaptureAction({ testid, label, kind = "action", children }) {
  return (
    <Mcpui.Capture testid={testid} kind={kind} label={label} asChild>
      {children}
    </Mcpui.Capture>
  );
}
