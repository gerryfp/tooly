import { Field } from "../components/Field";
export function PersonForm({ draft, setDraft }) {
  return (
    <>
      <Field lx="f4" mcpui={{ testid: "person-name", label: "Person name" }}>
        <input
          className="inp"
          value={draft.n}
          onChange={(e) => setDraft({ ...draft, n: e.target.value })}
          required
        />
      </Field>
      <Field lx="f5" mcpui={{ testid: "person-email", label: "Email address" }}>
        <input
          className="inp"
          type="email"
          value={draft.e}
          onChange={(e) => setDraft({ ...draft, e: e.target.value })}
        />
      </Field>
      <Field lx="f6" mcpui={{ testid: "person-phone", label: "Phone number" }}>
        <input
          className="inp"
          value={draft.ph}
          onChange={(e) => setDraft({ ...draft, ph: e.target.value })}
        />
      </Field>
      <Field lx="f7" mcpui={{ testid: "person-company", label: "Company" }}>
        <input
          className="inp"
          value={draft.co}
          onChange={(e) => setDraft({ ...draft, co: e.target.value })}
        />
      </Field>
      <Field lx="f8" mcpui={{ testid: "person-tags", label: "Tags (comma-separated)" }}>
        <input
          className="inp"
          value={(draft.tg || []).join(", ")}
          onChange={(e) =>
            setDraft({
              ...draft,
              tg: e.target.value
                .split(",")
                .map((s) => s.trim())
                .filter(Boolean),
            })
          }
        />
      </Field>
    </>
  );
}
