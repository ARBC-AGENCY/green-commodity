import en from "./en";
import fr from "./fr";
import type { Locale } from "../config";
import type { Dictionary } from "./types";

export const dictionaries: Record<Locale, Dictionary> = { en, fr };

export type { Dictionary };
