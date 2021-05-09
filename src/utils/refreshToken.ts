import { useState } from "react";

export const useRefreshToken = () => {
  const [state, setState] = useState(false);

  return [state, () => setState((s) => !s)] as const;
};
