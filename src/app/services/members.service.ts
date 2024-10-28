import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Member } from '../models/member.model';
import { Group } from '../models/group.model';
import { MembershipMediatorService } from './membership-mediator.service';

@Injectable({
  providedIn: 'root'
})
export class MemberService {
  private members: Member[] = [
    { id: 1, name: 'Piet Pietersen', birthDate: '1999-11-11', email: 'piet@email.com', groups: [] },
    { id: 2, name: 'Jan Jansen', birthDate: '1987-09-21', email: 'jan@email.com', groups: [] },
    { id: 3, name: 'Kees Keessen', birthDate: '2002-05-01', email: 'kees@email.com', groups: [] },
  ];

  private membersSubject = new BehaviorSubject<Member[]>(this.members);
  members$ = this.membersSubject.asObservable();

  constructor(private membershipMediatorService: MembershipMediatorService) {
    this.membershipMediatorService.groups$.subscribe((groups) => {
      this.syncMembersWithGroups(groups);
    });
  }

  getMembers(): Observable<Member[]> {
    return this.members$;
  }

  addMember(member: Member): void {
    member.id = Date.now();
    this.members.push(member);
    this.membersSubject.next(this.members);
    this.membershipMediatorService.setMembers(this.members);
  }

  updateMember(updatedMember: Member): void {
    const index = this.members.findIndex(m => m.id === updatedMember.id);
    if (index > -1) {
      this.members[index] = updatedMember;
      this.membersSubject.next(this.members);
      this.membershipMediatorService.setMembers(this.members);
    }
  }

  deleteMember(id: number): void {
    this.members = this.members.filter(m => m.id !== id);
    this.membersSubject.next(this.members);
    this.membershipMediatorService.setMembers(this.members);
  }

  addGroupToMember(memberId: number, group: Group): void {
    const member = this.members.find(m => m.id === memberId);
    if (member && !member.groups.find(g => g.id === group.id)) {
      member.groups.push(group);
      this.membersSubject.next(this.members);
      this.membershipMediatorService.setMembers(this.members);
    }
  }

  removeGroupFromMember(memberId: number, groupId: number): void {
    const member = this.members.find(m => m.id === memberId);
    if (member) {
      member.groups = member.groups.filter(g => g.id !== groupId);
      this.membersSubject.next(this.members);
      this.membershipMediatorService.setMembers(this.members);
    }
  }

  private syncMembersWithGroups(groups: Group[]): void {
    this.members.forEach(member => {
      member.groups = groups.filter(group => 
        group.members.some(m => m.id === member.id)
      );
    });
    this.membersSubject.next(this.members);
  }
}
