import { Field } from "../components/Field";
import { L, PRIOS } from "../lex";
export function TaskForm({ draft, setDraft, people }) {
  return (
    <>
      <Field lx="f0">
        <input
          className="inp"
          value={draft.t}
          onChange={(e) => setDraft({ ...draft, t: e.target.value })}
          required
        />
      </Field>
      <Field lx="f9">
        <input
          className="inp"
          type="date"
          value={draft.d ? new Date(draft.d).toISOString().slice(0, 10) : ""}
          onChange={(e) =>
            setDraft({
              ...draft,
              d: e.target.value ? new Date(e.target.value).getTime() : null,
            })
          }
        />
      </Field>
      <Field lx="f12">
        <select
          className="inp"
          value={draft.pr}
          onChange={(e) => setDraft({ ...draft, pr: e.target.value })}
        >
          {PRIOS.map((p) => (
            <option key={p} value={p}>
              {L(p)}
            </option>
          ))}
        </select>
      </Field>
      <Field lx="f10">
        <select
          className="inp"
          value={draft.pid}
          onChange={(e) => setDraft({ ...draft, pid: e.target.value })}
        >
          {people.map((p) => (
            <option key={p.id} value={p.id}>
              {p.n}
            </option>
          ))}
        </select>
      </Field>
    </>
  );
}
