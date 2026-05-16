import { Field } from "../components/Field";
import { L, STAGES } from "../lex";
export function DealForm({ draft, setDraft, people }) {
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
      <Field lx="f1">
        <input
          className="inp"
          type="number"
          min="0"
          value={draft.v}
          onChange={(e) => setDraft({ ...draft, v: Number(e.target.value) })}
        />
      </Field>
      <Field lx="f2">
        <select
          className="inp"
          value={draft.st}
          onChange={(e) => setDraft({ ...draft, st: e.target.value })}
        >
          {STAGES.map((s) => (
            <option key={s} value={s}>
              {L(s)}
            </option>
          ))}
        </select>
      </Field>
      <Field lx="f3">
        <select
          className="inp"
          value={draft.ow}
          onChange={(e) => setDraft({ ...draft, ow: e.target.value })}
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
