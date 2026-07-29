import type { GenericCycleContent } from "../types";
import { M1W1 } from "./m1w1";
import { M1W2 } from "./m1w2";
import { M1W3 } from "./m1w3";
import { M1W4 } from "./m1w4";
import { M2W1 } from "./m2w1";
import { M2W2 } from "./m2w2";

/** The full 42-day repeating cycle, assembled from the 6 per-week-block files. */
export const GENERIC_CYCLE_CONTENT: GenericCycleContent = {
  M1W1,
  M1W2,
  M1W3,
  M1W4,
  M2W1,
  M2W2,
};
