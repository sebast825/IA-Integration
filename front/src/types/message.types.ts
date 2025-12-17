import type { MessageRoles } from "./messageRoles.types";

export type Message = {
  id: string;
  role: MessageRoles;
  text: string;
  time?: string;
};