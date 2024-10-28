import { Injectable } from '@angular/core';
import { Member } from '../models/member.model';
import { Group } from '../models/group.model';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MembershipMediatorService {
  private groupsSubject = new BehaviorSubject<Group[]>([]);
  groups$ = this.groupsSubject.asObservable();

  private membersSubject = new BehaviorSubject<Member[]>([]);
  members$ = this.membersSubject.asObservable();

  setGroups(groups: Group[]) {
    this.groupsSubject.next(groups);
  }

  setMembers(members: Member[]) {
    this.membersSubject.next(members);
  }
}
