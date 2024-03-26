import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { SuccessOrderModalComponent } from '../components/success-order-modal/success-order-modal.component';

@Injectable({
  providedIn: 'root'
})
export class ModalService {

  constructor(private dialog: MatDialog) { }

  openModal(message: string): void {
    this.dialog.open(SuccessOrderModalComponent, {
      disableClose: true,
      width: 'auto',
      height: 'auto',
      panelClass: 'custom-success-modal',
      backdropClass: 'backdropBackground',
      data: message,
    });
    document.body.style.overflow = 'hidden';
  }
}
