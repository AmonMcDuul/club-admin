import { Member } from "./member.model";

export interface Group {
    id: number;
    name: string;
    members: Member[];
  }
  