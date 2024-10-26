import { Component } from '@angular/core';
import { NavbarComponent } from "../../components/navbar/navbar.component";
import { MembersComponent } from "../members/members.component";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [NavbarComponent, MembersComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

}
