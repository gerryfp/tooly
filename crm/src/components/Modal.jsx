import { useEffect, useRef } from "react";
import { Mcpui, useMcpuiRefresh } from "@mcpui/react";
import { L } from "../lex";
import { K } from "./K";
import { Lx } from "./Lx";

export function Modal({ open, titleKey, onClose, onSubmit, children }) {
  useMcpuiRefresh([open, titleKey]);
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (open && !el.open) el.showModal();
    if (!open && el.open) el.close();
  }, [open]);

  const form = (
    <form
      className="ov-f"
      method="dialog"
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit?.(e);
      }}
    >
      <header className="ov-h">
        {titleKey ? <Lx k={titleKey} as="h2" className="ov-title" /> : null}
      </header>
      <div className="ov-b">{children}</div>
      <footer className="ov-ft">
        <K
          op="c1"
          lx="x1"
          className="k--ghost"
          type="button"
          onClick={onClose}
          mcpui={{ testid: "modal-cancel", label: "Cancel and close form" }}
        />
        <K op="s1" lx="x0" type="submit" mcpui={{ testid: "modal-save", label: "Save record" }} />
      </footer>
    </form>
  );

  return (
    <dialog className="ov" ref={ref} onClose={onClose}>
      {open ? (
        <Mcpui.Capture
          kind="page"
          testid="page-modal"
          id="page-modal"
          url="/modal"
          title={titleKey ? L(titleKey) : "Form"}
          label={titleKey ? `${L(titleKey)} dialog` : "Record form dialog"}
        >
          {form}
        </Mcpui.Capture>
      ) : (
        form
      )}
    </dialog>
  );
}
