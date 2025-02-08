import { Injectable } from '@angular/core';
import { Preferences } from '@capacitor/preferences';

@Injectable({
  providedIn: 'root'
})

export class PurchaseServiceService {
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
}
