import { Group } from "./group.model";

export interface Member {
    id: number;
    name: string;
    birthDate: string;
    email: string;
    groups: Group[];
  }
  