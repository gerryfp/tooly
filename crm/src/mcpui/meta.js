/** Human-readable MCPUI labels (agents read these; the DOM stays lex-obfuscated). */
export const TAB_META = {
  t0: { title: "Pipeline", url: "/pipeline", label: "Pipeline kanban board" },
  t1: { title: "Rolodex", url: "/rolodex", label: "People directory" },
  t2: { title: "Chronicle", url: "/chronicle", label: "Tasks schedule" },
  t3: { title: "Marginalia", url: "/marginalia", label: "Notes list" },
};

export const NAV_TABS = [
  { id: "t0", testid: "nav-pipeline", label: "Open Pipeline tab" },
  { id: "t1", testid: "nav-rolodex", label: "Open Rolodex tab" },
  { id: "t2", testid: "nav-chronicle", label: "Open Chronicle tab" },
  { id: "t3", testid: "nav-marginalia", label: "Open Marginalia tab" },
];
