import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ColoService {
  private colorSubject: BehaviorSubject<string | null> = new BehaviorSubject<
    string | null
  >(null);
  color$: Observable<string | null> = this.colorSubject.asObservable();

  constructor() {
    this.colorSubject.next(localStorage.getItem('color'))
  }

  setColor(color: string): void {
    this.colorSubject.next(color);
    localStorage.setItem('color', color);
  }

  getColor(): string {
     return  this.colorSubject.value || '#18A1D0'; // Ritorna un colore predefinito se il valore è null o undefined
  }

  removeColor() {
    localStorage.removeItem('color');
    this.colorSubject.next(null)
  }
}