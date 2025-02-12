import { Injectable } from '@angular/core';
import { Preferences } from '@capacitor/preferences';

@Injectable({
  providedIn: 'root',
})
// gestiona la lista que esta en el formulario
export class ListStorageService {
  constructor() {}

  async setItem(key: string, value: any): Promise<void> {
    await Preferences.set({ key, value: JSON.stringify(value) });
  }

  async getItem<T>(key: string): Promise<T | null> {
    const { value } = await Preferences.get({ key });
    return value ? JSON.parse(value) : null;
  }

  async removeItem(key: string): Promise<void> {
    await Preferences.remove({ key });
  }

  async clear(): Promise<void> {
    await Preferences.clear();
  }
}

// import { Injectable } from '@angular/core';

// @Injectable({
//   providedIn: 'root',
// })
// export class ListStorageService {
//   constructor() {}

//   setItem(key: string, value: any): void {
//     localStorage.setItem(key, JSON.stringify(value));
//   }

//   getItem<T>(key: string): T | null {
//     const item = localStorage.getItem(key);
//     return item ? JSON.parse(item) : null;
//   }

//   removeItem(key: string): void {
//     localStorage.removeItem(key);
//   }

//   clear(): void {
//     localStorage.clear();
//   }
// }
