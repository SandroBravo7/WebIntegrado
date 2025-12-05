import { Component } from '@angular/core';
import { FooterComponent } from 'src/app/shared/footer/footer.component';
import { HeaderComponent } from 'src/app/shared/header/header.component';
import { NavComponent } from 'src/app/shared/nav/nav.component';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-secondary',
  standalone: true,
  imports: [NavComponent,HeaderComponent,FooterComponent, RouterLink],
  templateUrl: './secondary.component.html',
  styleUrl: './secondary.component.css'
})
export class SecondaryComponent {

}
