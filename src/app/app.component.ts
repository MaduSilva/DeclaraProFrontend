import { Component } from '@angular/core';
import { RouterOutlet, NavigationEnd, Router,  } from '@angular/router';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, FooterComponent, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './styles/app.component.scss',
})
export class AppComponent {
  title = 'DeclaraProFrontend';

  hideHeaderFooter = false;

  constructor(private router: Router) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.hideHeaderFooter =
        this.router.url === '/login' || this.router.url === '/login-cliente';
      }
    });
  }
}
