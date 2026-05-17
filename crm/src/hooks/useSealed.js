import { useCallback, useState } from "react";

export function useSealed() {
  const [open, setOpen] = useState(() => new Set());

  const unseal = useCallback((id) => {
    setOpen((prev) => {
      if (prev.has(id)) return prev;
      const next = new Set(prev);
      next.add(id);
      return next;
    });
  }, []);

  const isOpen = useCallback((id) => open.has(id), [open]);

  return { open, unseal, isOpen };
}
