import { Component, Input } from '@angular/core';
import {
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonModal,
  IonTitle,
  IonToolbar,
} from '@ionic/angular/standalone';

@Component({
  selector: 'app-modal',
  templateUrl: 'modal.component.html',
  styleUrls: ['modal.component.css'],
  imports: [IonButton, IonButtons, IonContent, IonHeader, IonModal, IonTitle, IonToolbar],
})

export class ModalComponent {
  isModalOpen = false;
  @Input() onClick?: () => void;
  @Input() ModalContent = 'Are you sure?';
  @Input() buttonText = 'Confirm';
  @Input() modalButton = 'limpiar lista';

  constructor(
  ) {}

  confirmClear(isOpen: boolean) {
    if (this.onClick) {
      this.onClick();
    }
    this.setOpen(isOpen);
  }

  setOpen(isOpen: boolean) {
    this.isModalOpen = isOpen;
  }
}
