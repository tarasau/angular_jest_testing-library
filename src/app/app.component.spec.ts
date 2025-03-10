import { render, screen } from '@testing-library/angular';
import { AppComponent } from './app.component';
import { CounterComponent } from './components/counter/counter.component';
import { ReactiveFormsModule } from '@angular/forms';

describe('AppComponent', () => {
  it('should create', async () => {
    await render(AppComponent, {
      imports: [ReactiveFormsModule],
      declarations: []
    });
    expect(screen.getByText('Angular Counter App')).toBeInTheDocument();
  });

  it('should render counter component', async () => {
    await render(AppComponent, {
      imports: [ReactiveFormsModule],
      declarations: []
    });
    expect(screen.getByTestId('increment-button')).toBeInTheDocument();
    expect(screen.getByTestId('decrement-button')).toBeInTheDocument();
    expect(screen.getByTestId('reset-button')).toBeInTheDocument();
  });
});
