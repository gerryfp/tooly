import { L } from "../lex";

/** Renders human text only via data-t + CSS ::after (not as React text children) */
export function Lx({ k, className = "", as: Tag = "span", ...rest }) {
  return <Tag className={`lx ${className}`.trim()} data-lx={k} data-t={L(k)} {...rest} />;
}
