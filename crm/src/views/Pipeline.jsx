import { L, STAGES } from "../lex";
import { Lx } from "../components/Lx";
import { Seal } from "../components/Seal";
import { CaptureAction } from "../mcpui/CaptureAction";
import { useSealed } from "../hooks/useSealed";

function fmtMoney(v) {
  return new Intl.NumberFormat(undefined, {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(v || 0);
}

export function Pipeline({ deals, people, onEdit, onDrop, onMove }) {
  const { unseal, isOpen } = useSealed();

  const byStage = STAGES.reduce((acc, st) => {
    acc[st] = deals.filter((d) => d.st === st);
    return acc;
  }, {});

  return (
    <motion-board className="brd">
      {STAGES.map((st) => (
        <motion-lane key={st} className="ln" data-st={st}>
          <header className="ln-h">
            <Lx k={st} className="ln-t" />
            <span className="ln-n">{byStage[st].length}</span>
          </header>
          <ul className="ln-cards" role="presentation">
            {byStage[st].length === 0 ? (
              <li className="ln-empty">
                <Lx k="e0" />
              </li>
            ) : (
              byStage[st].map((d) => (
                <li key={d.id} className={`cd ${isOpen(d.id) ? "cd--on" : ""}`} data-id={d.id}>
                  <Seal open={isOpen(d.id)} id={d.id} onUnseal={unseal} className="cd-sl">
                    <>
                      <CaptureAction testid={`deal-${d.id}`} label={`Edit deal: ${d.t}`}>
                        <button
                          type="button"
                          className="cd-hit"
                          data-op="d3"
                          onClick={() => onEdit(d)}
                        >
                          <span className="cd-t">{d.t}</span>
                          <span className="cd-v">{fmtMoney(d.v)}</span>
                          <span className="cd-o">
                            {people.find((p) => p.id === d.ow)?.n ?? "—"}
                          </span>
                        </button>
                      </CaptureAction>
                      <motion-rail className="cd-rail">
                        {STAGES.filter((s) => s !== d.st).map((s) => (
                          <button
                            key={s}
                            type="button"
                            className="cd-mv"
                            data-op={`mv-${s}`}
                            title={L(s)}
                            onClick={() => onMove(d.id, s)}
                          >
                            ◦
                          </button>
                        ))}
                        <button
                          type="button"
                          className="cd-rm"
                          data-op="d2"
                          onClick={() => onDrop(d.id)}
                        >
                          ×
                        </button>
                      </motion-rail>
                    </>
                  </Seal>
                </li>
              ))
            )}
          </ul>
        </motion-lane>
      ))}
    </motion-board>
  );
}
