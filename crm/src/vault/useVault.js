import { useCallback, useEffect, useReducer, useRef } from "react";
import { EMPTY_VAULT, seedVault } from "./seed";

const SK = "\u29e8\u26a1";

function read() {
  try {
    const raw = localStorage.getItem(SK);
    if (!raw) {
      const seeded = seedVault();
      localStorage.setItem(SK, JSON.stringify(seeded));
      return seeded;
    }
    return { ...EMPTY_VAULT, ...JSON.parse(raw) };
  } catch {
    return seedVault();
  }
}

function persist(next) {
  localStorage.setItem(SK, JSON.stringify(next));
  return next;
}

function reducer(state, action) {
  switch (action.type) {
    case "HYDRATE":
      return action.payload;
    case "PATCH":
      return persist({ ...state, ...action.payload });
    case "UPSERT": {
      const { bucket, row } = action.payload;
      const list = state[bucket];
      const i = list.findIndex((x) => x.id === row.id);
      const next =
        i >= 0 ? [...list.slice(0, i), row, ...list.slice(i + 1)] : [...list, row];
      return persist({ ...state, [bucket]: next });
    }
    case "DROP": {
      const { bucket, id } = action.payload;
      return persist({
        ...state,
        [bucket]: state[bucket].filter((x) => x.id !== id),
      });
    }
    case "REPLACE":
      return persist(action.payload);
    default:
      return state;
  }
}

export function useVault() {
  const [state, dispatch] = useReducer(reducer, EMPTY_VAULT, read);
  const ready = useRef(false);

  useEffect(() => {
    ready.current = true;
  }, []);

  const patch = useCallback((payload) => dispatch({ type: "PATCH", payload }), []);
  const upsert = useCallback(
    (bucket, row) => dispatch({ type: "UPSERT", payload: { bucket, row } }),
    []
  );
  const drop = useCallback(
    (bucket, id) => dispatch({ type: "DROP", payload: { bucket, id } }),
    []
  );
  const replace = useCallback((payload) => dispatch({ type: "REPLACE", payload }), []);

  const personName = useCallback(
    (id) => state.people.find((p) => p.id === id)?.n ?? "—",
    [state.people]
  );

  return { state, patch, upsert, drop, replace, personName };
}
