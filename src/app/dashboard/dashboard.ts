import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SidebarComponent } from '../shared/components/sidebar/sidebar';
import { NavbarComponent } from '../shared/components/navbar/navbar';


@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [RouterModule, SidebarComponent, NavbarComponent],
  templateUrl: './dashboard.html',
  styleUrls: ['./dashboard.scss'],
})
export class DashboardComponent {}
