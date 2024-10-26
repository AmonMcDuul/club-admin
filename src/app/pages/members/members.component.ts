import { Component } from '@angular/core';
import { Member } from '../../models/members.model';
import { MemberService } from '../../services/members.service';
import { MemberFormComponent } from "./member-form/member-form.component";

@Component({
  selector: 'app-members',
  standalone: true,
  imports: [MemberFormComponent],
  templateUrl: './members.component.html',
  styleUrl: './members.component.scss'
})
export class MembersComponent {
  members: Member[] = [];
  selectedMember: Member | null = null;

  constructor(private memberService: MemberService) {}

  ngOnInit(): void {
    this.memberService.getMembers().subscribe(members => this.members = members);
  }

  onEdit(member: Member): void {
    this.selectedMember = { ...member };
  }

  onDelete(id: number): void {
    this.memberService.deleteMember(id);
  }

  onAdd(): void {
    this.selectedMember = { id: 0, name: '', birthDate: '', email: '' };
  }

  onSave(member: Member): void {
    if (member.id) {
      this.memberService.updateMember(member);
    } else {
      this.memberService.addMember(member);
    }
    this.selectedMember = null;
  }

  onCancel(): void {
    this.selectedMember = null;
  }
}