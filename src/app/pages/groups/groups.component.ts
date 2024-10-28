import { Component } from '@angular/core';
import { Group } from '../../models/group.model';
import { GroupService } from '../../services/groups.service';
import { GroupFormComponent } from './group-form/group-form.component';

@Component({
  selector: 'app-groups',
  standalone: true,
  imports: [GroupFormComponent],
  templateUrl: './groups.component.html',
  styleUrls: ['./groups.component.scss']
})
export class GroupsComponent {
  groups: Group[] = [];
  selectedGroup: Group | null = null;

  constructor(private groupService: GroupService) {}

  ngOnInit(): void {
    this.groupService.getGroups().subscribe(groups => this.groups = groups);
  }

  onEdit(group: Group): void {
    this.selectedGroup = { ...group };
  }

  onDelete(id: number): void {
    this.groupService.deleteGroup(id);
  }

  onAdd(): void {
    this.selectedGroup = { id: 0, name: '', members: [] };
  }

  onSave(group: Group): void {
    if (group.id) {
      this.groupService.updateGroup(group);
    } else {
      this.groupService.addGroup(group);
    }
    this.selectedGroup = null;
  }

  onCancel(): void {
    this.selectedGroup = null;
  }

  trackByGroupId(index: number, group: Group): number {
    return group.id;
  }
}
