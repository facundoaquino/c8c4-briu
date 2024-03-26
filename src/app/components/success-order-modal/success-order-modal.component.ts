import { Component, Inject, OnInit } from '@angular/core';
import { MaterialModule } from '../../material/material.module';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
  selector: 'app-success-order-modal',
  standalone: true,
  imports: [MaterialModule],
  templateUrl: './success-order-modal.component.html',
  styleUrl: './success-order-modal.component.scss'
})
export class SuccessOrderModalComponent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<SuccessOrderModalComponent>,
    private readonly router: Router,
    @Inject(MAT_DIALOG_DATA) public data: string) { }

  closeModal(): void {
    this.dialogRef.close();
  }

  ngOnInit(): void {
    this.dialogRef.afterClosed().subscribe(() => {
       window.open(`https://api.whatsapp.com/send/?phone=%2B5491165155683&text=${this.data}&type=phone_number&app_absent=0`);
      this.router.navigateByUrl('/');
      document.body.style.overflow = 'scroll';
      document.body.style.overflowX = 'hidden';
    });
  }
}
