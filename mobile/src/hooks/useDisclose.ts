import { useState } from "react";

export const useDisclose = (stateDefault: boolean) => {
  const [state, setState] = useState(stateDefault);

  const toggle = () => setState((prev) => !prev);
  const open = () => setState(true);
  const close = () => setState(false);

  return {
    state,
    toggle,
    open,
    close,
  };
};
