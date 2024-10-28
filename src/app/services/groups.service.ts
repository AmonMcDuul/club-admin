import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Group } from '../models/group.model';
import { Member } from '../models/member.model';
import { MembershipMediatorService } from './membership-mediator.service';

@Injectable({
  providedIn: 'root'
})
export class GroupService {
  private groups: Group[] = [
    { id: 1, name: 'Admin', members: [] },
    { id: 2, name: 'Lid', members: [] },
    { id: 3, name: 'SuperLid', members: [] },
  ];

  private groupsSubject = new BehaviorSubject<Group[]>(this.groups);
  groups$ = this.groupsSubject.asObservable();

  constructor(private membershipMediatorService: MembershipMediatorService) {
    this.membershipMediatorService.members$.subscribe((members) => {
      this.syncGroupsWithMembers(members);
    });
  }

  getGroups(): Observable<Group[]> {
    return this.groups$;
  }

  addGroup(group: Group): void {
    group.id = this.groups.length + 1;
    this.groups.push(group);
    this.groupsSubject.next(this.groups);
    this.membershipMediatorService.setGroups(this.groups);
  }

  updateGroup(updatedGroup: Group): void {
    const index = this.groups.findIndex(g => g.id === updatedGroup.id);
    if (index > -1) {
      this.groups[index] = updatedGroup;
      this.groupsSubject.next(this.groups);
      this.membershipMediatorService.setGroups(this.groups);
    }
  }

  deleteGroup(id: number): void {
    this.groups = this.groups.filter(g => g.id !== id);
    this.groupsSubject.next(this.groups);
    this.membershipMediatorService.setGroups(this.groups);
  }

  addMemberToGroup(groupId: number, member: Member): void {
    const group = this.groups.find(g => g.id === groupId);
    if (group && !group.members.find(m => m.id === member.id)) {
      group.members.push(member);
      this.groupsSubject.next(this.groups);
      this.membershipMediatorService.setGroups(this.groups);
    }
  }

  removeMemberFromGroup(groupId: number, memberId: number): void {
    const group = this.groups.find(g => g.id === groupId);
    if (group) {
      group.members = group.members.filter(m => m.id !== memberId);
      this.groupsSubject.next(this.groups);
      this.membershipMediatorService.setGroups(this.groups);
    }
  }

  private syncGroupsWithMembers(members: Member[]): void {
    this.groups.forEach(group => {
      group.members = members.filter(member => 
        member.groups.some(g => g.id === group.id)
      );
    });
    this.groupsSubject.next(this.groups);
  }
}
