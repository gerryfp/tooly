import { Field } from "../components/Field";
export function NoteForm({ draft, setDraft, people }) {
  return (
    <>
      <Field lx="f10" mcpui={{ testid: "note-person", label: "Linked person", kind: "selector" }}>
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
      <Field lx="f11" mcpui={{ testid: "note-body", label: "Note body" }}>
        <textarea
          className="inp inp--area"
          rows={5}
          value={draft.b}
          onChange={(e) => setDraft({ ...draft, b: e.target.value })}
          required
        />
      </Field>
    </>
  );
}
