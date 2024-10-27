import { Component } from '@angular/core';
import { NavbarComponent } from "../../components/navbar/navbar.component";
import { MembersComponent } from "../members/members.component";
import { GeneralComponent } from "../general/general.component";
import { GroupsComponent } from "../groups/groups.component";
import { PaymentComponent } from "../payment/payment.component";
import { EmailComponent } from "../email/email.component";
import { CalendarComponent } from '../calendar/calendar.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [NavbarComponent, MembersComponent, GeneralComponent, GroupsComponent, PaymentComponent, EmailComponent, CalendarComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  activeScreen: string = 'Algemeen';

  onScreenChange(screen: string) {
    this.activeScreen = screen;
  }
}