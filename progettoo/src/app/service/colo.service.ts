import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ColoService {

  private colorSubject: BehaviorSubject<string | null> = new BehaviorSubject<string | null>(null);
  color$: Observable<string | null> = this.colorSubject.asObservable();

  constructor() { }

  setColor(color: string): void {
    this.colorSubject.next(color);
  }

  getColor(): string {
    return this.colorSubject.value || '#ff0000'; // Ritorna un colore predefinito se il valore è null o undefined
  }
}
