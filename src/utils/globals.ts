import { Canteen } from "@/api/api";

export const globals: {
  indexPageCanteen: Canteen | undefined,
} = { indexPageCanteen: undefined };

export const readAndClearGlobal = (key: keyof typeof globals) => {
  const value = globals[key];
  globals[key] = undefined;
  return value;
};

export const setGlobal = (key: keyof typeof globals, value: any) => {
  globals[key] = value;
};

