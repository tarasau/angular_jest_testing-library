import { render, screen } from '@testing-library/angular';
import { baseButtonComponent } from './button.component';

describe('baseButtonComponent', () => {
  it('should render with primary color by default', async () => {
    await render(baseButtonComponent, {
      componentProperties: {
        color: 'primary'
      },
      template: `<base-button>Test Button</base-button>`
    });
    
    const button = screen.getByRole('button', { name: /test button/i });
    expect(button).toBeInTheDocument();
    expect(button).toHaveClass('mat-primary');
  });

  it('should render with accent color when specified', async () => {
    await render(baseButtonComponent, {
      componentProperties: {
        color: 'accent'
      },
      template: `<base-button color="accent">Accent Button</base-button>`
    });
    
    const button = screen.getByRole('button', { name: /accent button/i });
    expect(button).toHaveClass('mat-accent');
  });
}); 