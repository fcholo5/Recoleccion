import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SidebarComponent } from './shared/components/sidebar/sidebar'; // ✅ Importa el sidebar

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, SidebarComponent], // ✅ Añade SidebarComponent aquí
  template: `
    <div class="layout">
      <app-sidebar></app-sidebar> <!-- ✅ Ahora Angular lo reconoce -->
      <main class="content">
        <router-outlet></router-outlet>
      </main>
    </div>
  `,
  styles: [`
    .layout { display: flex; }
    .content { flex: 1; padding: 20px; }
  `]
})
export class AppComponent { }