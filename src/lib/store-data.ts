import type { StorePayload } from "../types";
import { monlevadeVeiculosPayload } from "../mocks";

export const getStoreByDomain = async (
  _hostname?: string | null
): Promise<StorePayload> => {
  return monlevadeVeiculosPayload;
};
