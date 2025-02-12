import { Component } from '@angular/core';
import {
  IonHeader, IonToolbar, IonTitle, IonContent, IonItem, IonLabel, IonInput, IonButton, IonButtons, IonIcon, IonModal, IonList, IonCheckbox, IonText
} from '@ionic/angular/standalone';
import { ListStorageService } from 'src/services/list-service.service';
import { ModalComponent } from "../components/modal/modal.component";
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PurchaseService} from 'src/services/purchase-service.service';
import { Preferences } from '@capacitor/preferences';

interface ShoppingItem {
  name: string;
  price: number;
  quantity: number;
  purchased: boolean;
  discount: number;
}

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.css'],
  imports: [CommonModule, FormsModule, ModalComponent, IonHeader, IonToolbar, IonTitle, IonContent, IonItem, IonLabel, IonInput, IonButton, IonButtons, IonList, IonCheckbox, IonText],
})
export class Tab2Page {
  items: ShoppingItem[] = [];
  total: number = 0;
  modalContent: string = 'Are you sure?';

  constructor(
    private ListStorageService: ListStorageService,
    private purchaseService: PurchaseService
  ) { }

  async ngOnInit() {
    // this.loadItems();
    const { value } = await Preferences.get({ key: 'comingFromDetails' });

    if (value === 'true') {
      await this.loadSelectedPurchase();
      await Preferences.remove({ key: 'comingFromDetails' }); // Eliminar flag
    } else {
      await this.loadItems();
    }
  }

  saveItems() {
    this.ListStorageService.setItem('shoppingList', this.items);
  }
  clearList() {
    this.items = [];
    console.log(this.items);
    this.ListStorageService.removeItem('shoppingList');
    this.calculateTotal();
    console.log('List cleared');
  }
  clearElement(index: number) {
    this.items.splice(index, 1);
    this.saveItems();
    this.calculateTotal();
  }
  async loadItems() {
    const storedItems = await this.ListStorageService.getItem<any[]>('shoppingList');
    if (storedItems) {
       this.items = storedItems;
      this.calculateTotal();
    }
  }

  addItem(name: string, price: number, quantity: number, discount: number) {
    const parsedDiscount = +discount || 0; // Asegúrate de que el descuento sea un número válido
    this.items.push({ name, price, quantity, purchased: false, discount: parsedDiscount });
    this.saveItems();
    this.calculateTotal();
  }

  togglePurchased(item: ShoppingItem) {
    item.purchased = !item.purchased;
    this.saveItems();
    this.calculateTotal();
  }

  calculateTotal() {
    this.total = this.items.reduce((sum, item) => {
      if (item.purchased) {
        const discountMultiplier = (100 - item.discount) / 100;
        return sum + item.price * item.quantity * discountMultiplier;
      }
      return sum;
    }, 0);
  }

  async registerPurchase() {
    const purchase = {
      date: new Date().toISOString(),
      total: this.total,
      items: [...this.items]
    };

    await this.purchaseService.savePurchase(purchase);
    this.items = []; // Vaciar la lista
    this.total = 0;  // Reiniciar total
  }

  async loadSelectedPurchase() {
    const selectedPurchase = await this.purchaseService.getSelectedPurchase();
    if (selectedPurchase) {
      this.items = selectedPurchase.items;
      this.total = selectedPurchase.total;
      await this.purchaseService.clearSelectedPurchase();
    }
  }

}
