import { Injectable } from '@angular/core';
import { Preferences } from '@capacitor/preferences';

@Injectable({
  providedIn: 'root'
})
//gestiona las listas de compras que se han realizado
export class PurchaseService {
  async saveList(list: any[]) {
    await Preferences.set({ key: 'shoppingLists', value: JSON.stringify(list) });
  }

  async getLists(): Promise<any[]> {
    const { value } = await Preferences.get({ key: 'shoppingLists' });
    return value ? JSON.parse(value) : [];
  }

  async savePurchase(purchase: any) {
    let purchases = await this.getPurchases();
    purchases.push(purchase);
    await Preferences.set({ key: 'purchases', value: JSON.stringify(purchases) });
  }

  async getPurchases(): Promise<any[]> {
    const { value } = await Preferences.get({ key: 'purchases' });
    return value ? JSON.parse(value) : [];
  }

  async setSelectedPurchase(purchase: any) {
    await Preferences.set({ key: 'selectedPurchase', value: JSON.stringify(purchase) });
  }

  async getSelectedPurchase(): Promise<any | null> {
    const { value } = await Preferences.get({ key: 'selectedPurchase' });
    return value ? JSON.parse(value) : null;
  }

  async clearSelectedPurchase(): Promise<void> {
    await Preferences.remove({ key: 'selectedPurchase' });
  }

}
