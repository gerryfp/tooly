export function uid() {
  return `${Date.now().toString(36)}${Math.random().toString(36).slice(2, 7)}`;
}

export const EMPTY_VAULT = {
  v: 1,
  active: "t0",
  q: "",
  deals: [],
  people: [],
  tasks: [],
  notes: [],
};

export function seedVault() {
  const p1 = {
    id: uid(),
    n: "Mira Okonkwo",
    e: "mira@helix.io",
    ph: "+1 415 555 0142",
    co: "Helix Labs",
    tg: ["vip", "saas"],
  };
  const p2 = {
    id: uid(),
    n: "Jonas Petrov",
    e: "jonas@northwind.dev",
    ph: "",
    co: "Northwind",
    tg: ["devtools"],
  };
  const p3 = {
    id: uid(),
    n: "Sana Mehta",
    e: "sana@arcwell.co",
    ph: "+44 20 7946 0958",
    co: "Arcwell",
    tg: [],
  };

  return {
    ...EMPTY_VAULT,
    people: [p1, p2, p3],
    deals: [
      {
        id: uid(),
        t: "Helix expansion",
        v: 48000,
        st: "s2",
        ow: p1.id,
        ts: Date.now() - 86400000 * 5,
      },
      {
        id: uid(),
        t: "Northwind pilot",
        v: 12000,
        st: "s1",
        ow: p2.id,
        ts: Date.now() - 86400000 * 2,
      },
      {
        id: uid(),
        t: "Arcwell intro",
        v: 8000,
        st: "s0",
        ow: p3.id,
        ts: Date.now() - 86400000,
      },
      {
        id: uid(),
        t: "Legacy cleanup",
        v: 0,
        st: "s4",
        ow: p2.id,
        ts: Date.now() - 86400000 * 30,
      },
    ],
    tasks: [
      {
        id: uid(),
        t: "Send revised SOW",
        d: Date.now() + 86400000 * 2,
        pr: "p2",
        pid: p1.id,
        dn: false,
      },
      {
        id: uid(),
        t: "Schedule technical review",
        d: Date.now() + 86400000 * 4,
        pr: "p1",
        pid: p2.id,
        dn: false,
      },
      {
        id: uid(),
        t: "LinkedIn connect",
        d: Date.now() - 86400000,
        pr: "p0",
        pid: p3.id,
        dn: true,
      },
    ],
    notes: [
      {
        id: uid(),
        b: "Mira prefers async updates on Thursdays.",
        pid: p1.id,
        ts: Date.now() - 3600000,
      },
      {
        id: uid(),
        b: "Northwind budget cycle closes end of quarter.",
        pid: p2.id,
        ts: Date.now() - 7200000,
      },
    ],
  };
}
