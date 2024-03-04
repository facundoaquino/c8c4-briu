import { Component } from '@angular/core';
import { MaterialModule } from '../material/material.module';
import { ProductsComponent } from '../products/products.component';

@Component({
  selector: 'app-landing',
  standalone: true,
  imports: [MaterialModule, ProductsComponent],
  templateUrl: './landing.component.html',
  styleUrl: './landing.component.scss'
})
export class LandingComponent {

}
