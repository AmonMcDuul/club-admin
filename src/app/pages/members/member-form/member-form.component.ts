import { Component, EventEmitter, Input, NgModule, Output } from '@angular/core';
import { Member } from '../../../models/member.model';
import { FormsModule, NgModel } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-member-form',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './member-form.component.html',
  styleUrl: './member-form.component.scss'
})
export class MemberFormComponent {
  @Input() member: Member = { id: 0, name: '', birthDate: '', email: '', groups: [] };
  @Output() save = new EventEmitter<Member>();
  @Output() cancel = new EventEmitter<void>();

  onSave(): void {
    this.save.emit(this.member);
  }

  onCancel(): void {
    this.cancel.emit();
  }
}