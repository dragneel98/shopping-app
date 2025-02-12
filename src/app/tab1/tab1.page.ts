import { Component, OnInit, AfterViewInit } from '@angular/core';
import { PurchaseService } from '../../services/purchase-service.service';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonList, IonItem, IonLabel, IonButton } from '@ionic/angular/standalone';
import { CurrencyPipe, DatePipe, NgFor } from '@angular/common';
import { ModalComponent } from '../components/modal/modal.component';
import { Router } from '@angular/router';
import { Preferences } from '@capacitor/preferences';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.css'],
  imports: [IonHeader, IonToolbar, IonTitle, IonContent, IonList, IonItem, IonLabel, IonButton, DatePipe, CurrencyPipe, NgFor, ModalComponent],
})
export class Tab1Page implements OnInit, AfterViewInit {
  purchases: any[] = [];
  purchaseItem: any[] = [];
  modalContent: string = 'Are you sure?';
  modalButton: string = 'Ver detalles';
  buttonText: string = 'eliminar';

  constructor(
    private storageService: PurchaseService,
    private router: Router
  ) {}

  async ngOnInit() {
    this.purchases = await this.storageService.getPurchases();
  }

  ngAfterViewInit(): void {
    console.log('Purchases:', this.purchases);
  }

  // viewDetails(purchase: any) {
  //   console.log('Detalles de la compra:', purchase);
  //   // Aquí puedes implementar lógica para mostrar un modal o navegar a otra página con los detalles.
  // }
  async viewDetails(purchase: any) {
    await this.storageService.setSelectedPurchase(purchase);
    await Preferences.set({ key: 'comingFromDetails', value: 'true' }); // Guardar flag
    this.router.navigate(['/tabs/tab2']);
  }

}

