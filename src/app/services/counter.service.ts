import { Injectable, signal } from '@angular/core';
import { computed } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CounterService {
  private count = signal(0);
  private countSubject = new BehaviorSubject<number>(0);
  
  currentCount = computed(() => this.count());

  increment(): void {
    this.count.update(count => count + 1);
    this.countSubject.next(this.count());
  }

  decrement(): void {
    this.count.update(count => count - 1);
    this.countSubject.next(this.count());
  }

  reset(): void {
    this.count.set(0);
    this.countSubject.next(0);
  }

  getCountChanges() {
    return this.countSubject.asObservable();
  }
} 