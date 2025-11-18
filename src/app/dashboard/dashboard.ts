// import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Mapa } from '../mapa/mapa';

@Component({
  standalone: true,
  selector: 'app-dashboard',
  imports: [CommonModule, Mapa],
  templateUrl: './dashboard.html',
  styleUrls: ['./dashboard.scss']
})
export class Dashboard {}
