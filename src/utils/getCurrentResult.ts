import { UserResult } from "src/models/user-result";

export const getCurrentResult = (results: UserResult[]): UserResult | null => {
  return results.find((result) => !!result.endDateTime) || null;
};
