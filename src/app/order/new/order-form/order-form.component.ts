import { Component, OnInit } from '@angular/core';
import { MaterialModule } from '../../../material/material.module';

@Component({
  selector: 'app-order-form',
  standalone: true,
  imports: [MaterialModule],
  templateUrl: './order-form.component.html',
  styleUrl: './order-form.component.scss'
})
export class OrderFormComponent implements OnInit {

  constructor() {

  }

  ngOnInit(): void {

  }
}
