const XOR = 0x2a7;

function enc(plain) {
  return plain
    .split("")
    .map((c) => String.fromCharCode(c.charCodeAt(0) ^ (XOR & 0xff)))
    .join("");
}

const PLAIN = {
  t0: "Pipeline",
  t1: "Rolodex",
  t2: "Chronicle",
  t3: "Marginalia",
  h0: "Pipeline",
  h1: "Rolodex",
  h2: "Chronicle",
  h3: "Marginalia",
  a0: "New deal",
  a1: "New person",
  a2: "New entry",
  a3: "New note",
  b0: "Import vault",
  b1: "Export vault",
  s0: "Lead",
  s1: "Qualified",
  s2: "Proposal",
  s3: "Won",
  s4: "Lost",
  f0: "Title",
  f1: "Value ($)",
  f2: "Stage",
  f3: "Owner",
  f4: "Name",
  f5: "Email",
  f6: "Phone",
  f7: "Company",
  f8: "Tags (comma)",
  f9: "Due date",
  f10: "Linked person",
  f11: "Body",
  f12: "Priority",
  x0: "Save",
  x1: "Cancel",
  x2: "Remove",
  x3: "Edit",
  x4: "Mark done",
  x5: "Filter lattice…",
  e0: "Empty lane.",
  e1: "No people yet.",
  e2: "Nothing scheduled.",
  e3: "Blank slate.",
  p0: "low",
  p1: "med",
  p2: "high",
};

const BLOB = Object.fromEntries(
  Object.entries(PLAIN).map(([k, v]) => [k, enc(v)])
);

export function L(key) {
  const raw = BLOB[key];
  if (!raw) return key;
  return raw
    .split("")
    .map((c) => String.fromCharCode(c.charCodeAt(0) ^ (XOR & 0xff)))
    .join("");
}

export const TABS = [
  { id: "t0", glyph: "⬡", hk: "h0", ak: "a0" },
  { id: "t1", glyph: "◎", hk: "h1", ak: "a1" },
  { id: "t2", glyph: "◷", hk: "h2", ak: "a2" },
  { id: "t3", glyph: "✎", hk: "h3", ak: "a3" },
];

export const STAGES = ["s0", "s1", "s2", "s3", "s4"];
export const PRIOS = ["p0", "p1", "p2"];
