import { uid } from "./seed";

export function emptyDeal(people) {
  return {
    id: uid(),
    t: "",
    v: 0,
    st: "s0",
    ow: people[0]?.id ?? "",
    ts: Date.now(),
  };
}

export function emptyPerson() {
  return { id: uid(), n: "", e: "", ph: "", co: "", tg: [] };
}

export function emptyTask(people) {
  return {
    id: uid(),
    t: "",
    d: Date.now() + 86400000,
    pr: "p1",
    pid: people[0]?.id ?? "",
    dn: false,
  };
}

export function emptyNote(people) {
  return { id: uid(), b: "", pid: people[0]?.id ?? "", ts: Date.now() };
}
