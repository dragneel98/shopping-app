import { Component, Input } from '@angular/core';
import { StatusBar } from '@capacitor/status-bar';
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

  constructor() {
  }
  ngOnInit() {
    // this.hideStatusBar();
  }

  hideStatusBar = async () => {
    await StatusBar.hide();
  };

  confirmClear(isOpen: boolean) {
    if (this.onClick) {
      this.onClick();
    }
    this.setOpen(isOpen);
  }

  async setOpen(isOpen: boolean) {
    this.isModalOpen = isOpen;
    // await StatusBar.hide();
  }
}
