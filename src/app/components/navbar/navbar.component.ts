import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {
  @Output() screenChange = new EventEmitter<string>();

  changeScreen(screen: string) {
    this.screenChange.emit(screen);
  }
}