import { Component, computed, input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'base-button',
  standalone: true,
  imports: [CommonModule, MatButtonModule],
  template: `
    <button 
      mat-raised-button 
      [color]="color()"
      [disabled]="disabled()"
      [ngClass]="buttonClasses()"
      class="base-button">
      <ng-content></ng-content>
    </button>
  `,
  styles: [`
    .base-button {
      min-width: 120px;
      font-weight: 500;
      letter-spacing: 0.5px;
      transition: all 0.3s ease;
      text-transform: uppercase;
    }

    .base-button:not(:disabled):hover {
      transform: translateY(-1px);
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    }

    .base-button:not(:disabled):active {
      transform: translateY(0);
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
    }

    /* Custom color styles */
    .base-button.primary {
      background-color: var(--primary-color, #1976d2);
      color: var(--primary-contrast, white);
    }

    .base-button.accent {
      background-color: var(--accent-color, #ff4081);
      color: var(--accent-contrast, white);
    }

    .base-button.warn {
      background-color: var(--warn-color, #f44336);
      color: var(--warn-contrast, white);
    }

    /* Disabled state */
    .base-button:disabled {
      opacity: 0.6;
      cursor: not-allowed;
      background-color: #cccccc !important;
      color: #666666 !important;
      box-shadow: none !important;
      transform: none !important;
    }

    /* Size variations */
    .base-button.small {
      padding: 4px 8px;
      font-size: 12px;
      min-width: 80px;
    }

    .base-button.large {
      padding: 12px 24px;
      font-size: 16px;
      min-width: 160px;
    }

    /* Animation for state changes */
    @keyframes ripple {
      0% {
        transform: scale(1);
        opacity: 0.4;
      }
      100% {
        transform: scale(2);
        opacity: 0;
      }
    }

    .base-button:not(:disabled)::after {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: currentColor;
      border-radius: inherit;
      opacity: 0;
      pointer-events: none;
    }

    .base-button:not(:disabled):active::after {
      animation: ripple 0.4s ease-out;
    }
  `]
})
export class baseButtonComponent {
  // Input signals
  readonly color = input<'primary' | 'accent' | 'warn'>('primary');
  readonly disabled = input<boolean>(false);
  readonly size = input<'small' | 'medium' | 'large'>('medium');

  // Computed signal for dynamic classes
  readonly buttonClasses = computed(() => ({
    'primary': this.color() === 'primary',
    'accent': this.color() === 'accent',
    'warn': this.color() === 'warn',
    'small': this.size() === 'small',
    'large': this.size() === 'large'
  }));
} 