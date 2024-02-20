import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SidenavService {
  isOpen: boolean = false;
  constructor() { }

  toggle() {
    this.isOpen = !this.isOpen;
  }
}
