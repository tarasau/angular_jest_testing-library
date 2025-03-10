import { Component, OnDestroy } from '@angular/core';
import { CounterService } from '../../services/counter.service';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';

interface PersonForm {
  firstName: string;
  lastName: string;
  age?: number;
}

@Component({
  selector: 'app-counter',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  template: `
    <div class="counter-container">
      <h2>Counter: {{ counterService.currentCount() }}</h2>
      <div class="button-group">
        <button (click)="counterService.increment()" data-testid="increment-button">Increment</button>
        <button (click)="counterService.decrement()" data-testid="decrement-button">Decrement</button>
        <button (click)="counterService.reset()" data-testid="reset-button">Reset</button>
      </div>

      <form [formGroup]="formGroup" class="forms-container" role="form">
        <div formArrayName="persons">
          <div *ngFor="let personForm of personForms.controls; let i = index" [formGroupName]="i" class="person-form">
            <h3>Person {{i + 1}}</h3>
            <div class="form-field">
              <label for="firstName{{i}}">First Name *</label>
              <input 
                id="firstName{{i}}"
                type="text" 
                formControlName="firstName"
                attr.data-testid="firstName-input-{{i}}"
                [attr.aria-invalid]="personForm.get('firstName')?.invalid && personForm.get('firstName')?.touched"
                [attr.aria-describedby]="'firstName-error-' + i"
                role="textbox"
              >
              <div *ngIf="personForm.get('firstName')?.errors?.['required'] && personForm.get('firstName')?.touched" 
                   class="error-message" 
                   attr.data-testid="firstName-error-{{i}}"
                   [id]="'firstName-error-' + i"
                   role="alert">
                First name is required
              </div>
            </div>

            <div class="form-field">
              <label for="lastName{{i}}">Last Name *</label>
              <input 
                id="lastName{{i}}"
                type="text" 
                formControlName="lastName"
                attr.data-testid="lastName-input-{{i}}"
                [attr.aria-invalid]="personForm.get('lastName')?.invalid && personForm.get('lastName')?.touched"
                [attr.aria-describedby]="'lastName-error-' + i"
                role="textbox"
              >
              <div *ngIf="personForm.get('lastName')?.errors?.['required'] && personForm.get('lastName')?.touched"
                   class="error-message"
                   attr.data-testid="lastName-error-{{i}}"
                   [id]="'lastName-error-' + i"
                   role="alert">
                Last name is required
              </div>
            </div>

            <div class="form-field">
              <label for="age{{i}}">Age</label>
              <input 
                id="age{{i}}"
                type="number" 
                formControlName="age"
                attr.data-testid="age-input-{{i}}"
                role="spinbutton"
              >
            </div>
            <button 
              type="button"
              (click)="onSubmitForm(i)"
              [disabled]="!personForm.valid"
              attr.data-testid="submit-button-{{i}}"
              class="submit-button"
              [attr.aria-label]="'Submit Person ' + (i + 1)">
              Submit Person {{i + 1}}
            </button>
          </div>
        </div>
      </form>
    </div>
  `,
  styles: [`
    .counter-container {
      text-align: center;
      padding: 20px;
    }
    .button-group {
      display: flex;
      gap: 10px;
      justify-content: center;
      margin-top: 10px;
      margin-bottom: 20px;
    }
    button {
      padding: 8px 16px;
      border-radius: 4px;
      border: 1px solid #ccc;
      cursor: pointer;
    }
    button:hover {
      background-color: #f0f0f0;
    }
    button:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }
    .forms-container {
      max-width: 600px;
      margin: 0 auto;
    }
    .person-form {
      border: 1px solid #ccc;
      padding: 20px;
      margin: 10px 0;
      border-radius: 4px;
      background-color: #f9f9f9;
    }
    .form-field {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      margin-bottom: 15px;
    }
    label {
      margin-bottom: 5px;
      font-weight: bold;
    }
    input {
      width: 100%;
      padding: 8px;
      border: 1px solid #ccc;
      border-radius: 4px;
      margin-bottom: 5px;
    }
    .error-message {
      color: red;
      font-size: 0.8em;
    }
    .submit-button {
      margin-top: 10px;
      background-color: #4CAF50;
      color: white;
      border: none;
      width: 100%;
    }
    .submit-button:hover:not(:disabled) {
      background-color: #45a049;
    }
  `]
})
export class CounterComponent implements OnDestroy {
  formGroup: FormGroup;
  private subscription: Subscription;

  constructor(
    public counterService: CounterService,
    private fb: FormBuilder
  ) {
    this.formGroup = this.fb.group({
      persons: this.fb.array([])
    });

    // Subscribe to counter changes to update forms
    this.subscription = this.counterService.getCountChanges().subscribe((count: number) => {
      this.updateForms(count);
    });
  }

  get personForms() {
    return this.formGroup.get('persons') as FormArray;
  }

  private createPersonForm(): FormGroup {
    return this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      age: [null]
    });
  }

  private updateForms(count: number) {
    const currentLength = this.personForms.length;
    
    if (count > currentLength) {
      // Add forms
      for (let i = currentLength; i < count; i++) {
        this.personForms.push(this.createPersonForm());
      }
    } else if (count < currentLength) {
      // Remove forms
      for (let i = currentLength; i > count; i--) {
        this.personForms.removeAt(i - 1);
      }
    }
  }

  onSubmitForm(index: number) {
    const personForm = this.personForms.at(index);
    if (personForm.valid) {
      const formValue = personForm.value;
      console.log(`Person ${index + 1} data:`, formValue);
      personForm.reset();
    }
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
} 