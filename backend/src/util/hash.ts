import {createHash} from "crypto";

export const generateHash = (userName: string, userId: number): string => {
  const hash = createHash('sha256');
  hash.update(userName + userId.toString());
  return hash.digest('hex');
}
