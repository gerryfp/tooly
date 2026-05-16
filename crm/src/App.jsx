import { useMemo, useRef, useState } from "react";
import { K } from "./components/K";
import { Lx } from "./components/Lx";
import { Modal } from "./components/Modal";
import { DealForm } from "./forms/deal.jsx";
import { NoteForm } from "./forms/note.jsx";
import { PersonForm } from "./forms/person.jsx";
import { TaskForm } from "./forms/task.jsx";
import { emptyDeal, emptyNote, emptyPerson, emptyTask } from "./vault/factories";
import { L, TABS } from "./lex";
import { useVault } from "./vault/useVault";
import { EMPTY_VAULT } from "./vault/seed";
import { Chronicle } from "./views/Chronicle";
import { Marginalia } from "./views/Marginalia";
import { Pipeline } from "./views/Pipeline";
import { Rolodex } from "./views/Rolodex";
import "./App.css";

const MODAL = {
  t0: { bucket: "deals", empty: emptyDeal, Form: DealForm, title: "a0" },
  t1: { bucket: "people", empty: emptyPerson, Form: PersonForm, title: "a1" },
  t2: { bucket: "tasks", empty: emptyTask, Form: TaskForm, title: "a2" },
  t3: { bucket: "notes", empty: emptyNote, Form: NoteForm, title: "a3" },
};

export default function App() {
  const { state, patch, upsert, drop, replace, personName } = useVault();
  const [modal, setModal] = useState(null);
  const [draft, setDraft] = useState(null);
  const importRef = useRef(null);

  const tab = useMemo(() => TABS.find((t) => t.id === state.active) ?? TABS[0], [state.active]);

  const openCreate = () => {
    const cfg = MODAL[state.active];
    setDraft(cfg.empty(state.people));
    setModal({ mode: "create", title: cfg.title });
  };

  const openEdit = (row) => {
    const cfg = MODAL[state.active];
    setDraft({ ...row });
    setModal({ mode: "edit", title: cfg.title });
  };

  const closeModal = () => {
    setModal(null);
    setDraft(null);
  };

  const saveDraft = () => {
    const cfg = MODAL[state.active];
    upsert(cfg.bucket, draft);
    closeModal();
  };

  const exportVault = () => {
    const blob = new Blob([JSON.stringify(state, null, 2)], { type: "application/json" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = `vault-${Date.now().toString(36)}.json`;
    a.click();
    URL.revokeObjectURL(a.href);
  };

  const importVault = (file) => {
    const reader = new FileReader();
    reader.onload = () => {
      try {
        const data = JSON.parse(reader.result);
        replace({ ...EMPTY_VAULT, ...data });
      } catch {
        /* silent */
      }
    };
    reader.readAsText(file);
  };

  const cfg = MODAL[state.active];
  const Form = cfg?.Form;

  return (
    <motion-shell className="shell" data-v="3">
      <aside className="z0" data-zone="rail">
        <div className="z0-mark" aria-hidden="true">
          ◇
        </div>
        <nav className="z0-nav" role="presentation">
          {TABS.map((t) => (
            <button
              key={t.id}
              type="button"
              className={`z0-tab ${state.active === t.id ? "z0-tab--on" : ""}`}
              data-op={`nav-${t.id}`}
              onClick={() => patch({ active: t.id })}
            >
              <span className="z0-glyph" aria-hidden="true">
                {t.glyph}
              </span>
              <Lx k={t.id} className="z0-lx" />
            </button>
          ))}
        </nav>
        <footer className="z0-foot">
          <K op="x9f2" lx="b0" onClick={() => importRef.current?.click()} />
          <K op="m4e1" lx="b1" onClick={exportVault} />
          <input
            ref={importRef}
            type="file"
            accept="application/json"
            className="hx-inp"
            tabIndex={-1}
            onChange={(e) => {
              const f = e.target.files?.[0];
              if (f) importVault(f);
              e.target.value = "";
            }}
          />
        </footer>
      </aside>

      <main className="z1">
        <header className="z1-h">
          <Lx k={tab.hk} as="h1" className="z1-title" />
          <div className="z1-actions">
            <input
              className="inp inp--q"
              data-op="q0"
              title={L("x5")}
              value={state.q}
              onChange={(e) => patch({ q: e.target.value })}
            />
            <K op="add" glyph="+" onClick={openCreate} />
          </div>
        </header>

        <section className="z1-body" data-pane={state.active}>
          {state.active === "t0" && (
            <Pipeline
              deals={state.deals}
              people={state.people}
              onEdit={openEdit}
              onDrop={(id) => drop("deals", id)}
              onMove={(id, st) => {
                const d = state.deals.find((x) => x.id === id);
                if (d) upsert("deals", { ...d, st });
              }}
            />
          )}
          {state.active === "t1" && (
            <Rolodex
              people={state.people}
              query={state.q}
              onEdit={openEdit}
              onDrop={(id) => drop("people", id)}
            />
          )}
          {state.active === "t2" && (
            <Chronicle
              tasks={state.tasks}
              personName={personName}
              onEdit={openEdit}
              onDrop={(id) => drop("tasks", id)}
              onToggle={(id) => {
                const t = state.tasks.find((x) => x.id === id);
                if (t) upsert("tasks", { ...t, dn: !t.dn });
              }}
            />
          )}
          {state.active === "t3" && (
            <Marginalia
              notes={state.notes}
              personName={personName}
              onEdit={openEdit}
              onDrop={(id) => drop("notes", id)}
            />
          )}
        </section>
      </main>

      <motion-decoy className="hx" hidden aria-hidden="true">
        <form>
          <input name="email" placeholder="Sign in" />
          <button type="submit">Login</button>
        </form>
        <form>
          <input name="search" placeholder="Search contacts" />
          <button type="submit">Add contact</button>
        </form>
      </motion-decoy>

      <Modal open={!!modal} titleKey={modal?.title} onClose={closeModal} onSubmit={saveDraft}>
        {Form && draft ? (
          <Form draft={draft} setDraft={setDraft} people={state.people} />
        ) : null}
      </Modal>
    </motion-shell>
  );
}
