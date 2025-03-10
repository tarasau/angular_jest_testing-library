import { render, screen, fireEvent } from '@testing-library/angular';
import { Component } from '@angular/core';
import { CounterService } from './counter.service';

// Test component to interact with the service
@Component({
  template: `
    <div>
      <p data-testid="count">Count: {{ counterService.currentCount() }}</p>
      <button data-testid="increment" (click)="counterService.increment()">+</button>
      <button data-testid="decrement" (click)="counterService.decrement()">-</button>
      <button data-testid="reset" (click)="counterService.reset()">Reset</button>
    </div>
  `
})
class TestComponent {
  constructor(public counterService: CounterService) {}
}

describe('CounterService', () => {
  it('should be created', async () => {
    const { fixture } = await render(TestComponent);
    expect(fixture.componentInstance.counterService).toBeTruthy();
  });

  it('should start with count 0', async () => {
    const { fixture } = await render(TestComponent);
    const service = fixture.componentInstance.counterService;
    service.reset();
    expect(screen.getByTestId('count')).toHaveTextContent('Count: 0');
  });

  it('should increment the counter', async () => {
    const { fixture } = await render(TestComponent);
    const service = fixture.componentInstance.counterService;
    service.reset();
    const incrementButton = screen.getByTestId('increment');

    await fireEvent.click(incrementButton);
    expect(screen.getByTestId('count')).toHaveTextContent('Count: 1');

    await fireEvent.click(incrementButton);
    expect(screen.getByTestId('count')).toHaveTextContent('Count: 2');
  });

  it('should decrement the counter', async () => {
    const { fixture } = await render(TestComponent);
    const service = fixture.componentInstance.counterService;
    service.reset();
    const decrementButton = screen.getByTestId('decrement');

    await fireEvent.click(decrementButton);
    expect(screen.getByTestId('count')).toHaveTextContent('Count: -1');

    await fireEvent.click(decrementButton);
    expect(screen.getByTestId('count')).toHaveTextContent('Count: -2');
  });

  it('should reset the counter', async () => {
    const { fixture } = await render(TestComponent);
    const service = fixture.componentInstance.counterService;
    service.reset();
    const incrementButton = screen.getByTestId('increment');
    const resetButton = screen.getByTestId('reset');

    await fireEvent.click(incrementButton);
    await fireEvent.click(incrementButton);
    expect(screen.getByTestId('count')).toHaveTextContent('Count: 2');

    await fireEvent.click(resetButton);
    expect(screen.getByTestId('count')).toHaveTextContent('Count: 0');
  });

  it('should maintain state in the service', async () => {
    const { fixture } = await render(TestComponent);
    const service = fixture.componentInstance.counterService;
    service.reset();
    
    // First, increment the counter directly in the service
    service.increment();
    service.increment();
    
    // Force change detection
    fixture.detectChanges();
    
    expect(screen.getByTestId('count')).toHaveTextContent('Count: 2');
  });
}); 