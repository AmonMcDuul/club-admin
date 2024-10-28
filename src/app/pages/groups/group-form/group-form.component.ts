import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Group } from '../../../models/group.model';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-group-form',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './group-form.component.html',
  styleUrls: ['./group-form.component.scss']
})
export class GroupFormComponent {
  @Input() group: Group = { id: 0, name: '', members: [] };
  @Output() save = new EventEmitter<Group>();
  @Output() cancel = new EventEmitter<void>();

  onSave(): void {
    this.save.emit(this.group);
  }

  onCancel(): void {
    this.cancel.emit();
  }
}
