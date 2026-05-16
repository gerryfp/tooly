import { useEffect, useRef } from "react";
import { K } from "./K";
import { Lx } from "./Lx";

export function Modal({ open, titleKey, onClose, onSubmit, children }) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (open && !el.open) el.showModal();
    if (!open && el.open) el.close();
  }, [open]);

  return (
    <dialog className="ov" ref={ref} onClose={onClose}>
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
          <K op="c1" lx="x1" className="k--ghost" type="button" onClick={onClose} />
          <K op="s1" lx="x0" type="submit" />
        </footer>
      </form>
    </dialog>
  );
}
