import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Member } from '../models/members.model';

@Injectable({
  providedIn: 'root'
})
export class MemberService {
  private members: Member[] = [
    { id: 1, name: 'Piet Pietersen', birthDate: '1999-11-11', email: 'piet@email.com' }
  ];

  private membersSubject = new BehaviorSubject<Member[]>(this.members);
  members$ = this.membersSubject.asObservable();

  getMembers(): Observable<Member[]> {
    return this.members$;
  }

  addMember(member: Member): void {
    member.id = Date.now();
    this.members.push(member);
    this.membersSubject.next(this.members);
  }

  updateMember(updatedMember: Member): void {
    const index = this.members.findIndex(m => m.id === updatedMember.id);
    if (index > -1) {
      this.members[index] = updatedMember;
      this.membersSubject.next(this.members);
    }
  }

  deleteMember(id: number): void {
    this.members = this.members.filter(m => m.id !== id);
    this.membersSubject.next(this.members);
  }
}
