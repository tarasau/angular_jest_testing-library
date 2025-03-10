import { render, screen, fireEvent } from '@testing-library/angular';
import userEvent from '@testing-library/user-event';
import { CounterComponent } from './counter.component';
import { CounterService } from '../../services/counter.service';
import { ReactiveFormsModule } from '@angular/forms';


describe('CounterComponent', () => {
  it('should create', async () => {
    const { fixture } = await render(CounterComponent, {
      imports: [ReactiveFormsModule]
    });
    const service = fixture.componentInstance.counterService;
    service.reset();
    expect(screen.getByText('Counter: 0')).toBeInTheDocument();
  });

  it('should increment the counter and add a form', async () => {
    const { fixture } = await render(CounterComponent, {
      imports: [ReactiveFormsModule]
    });
    const service = fixture.componentInstance.counterService;
    service.reset();
    const incrementButton = screen.getByTestId('increment-button');
    
    await fireEvent.click(incrementButton);
    expect(screen.getByText('Counter: 1')).toBeInTheDocument();
    expect(screen.getByTestId('firstName-input-0')).toBeInTheDocument();
    expect(screen.getByTestId('lastName-input-0')).toBeInTheDocument();
    expect(screen.getByTestId('age-input-0')).toBeInTheDocument();
    expect(screen.getByTestId('submit-button-0')).toBeInTheDocument();
    
    await fireEvent.click(incrementButton);
    expect(screen.getByText('Counter: 2')).toBeInTheDocument();
    expect(screen.getByTestId('firstName-input-1')).toBeInTheDocument();
    expect(screen.getByTestId('lastName-input-1')).toBeInTheDocument();
    expect(screen.getByTestId('age-input-1')).toBeInTheDocument();
    expect(screen.getByTestId('submit-button-1')).toBeInTheDocument();
  });

  it('should decrement the counter and remove a form', async () => {
    // First add two forms
    const { fixture } = await render(CounterComponent, {
      imports: [ReactiveFormsModule]
    });
    const service = fixture.componentInstance.counterService;
    service.reset();
    const incrementButton = screen.getByTestId('increment-button');
    await fireEvent.click(incrementButton);
    await fireEvent.click(incrementButton);
    expect(screen.getByTestId('firstName-input-1')).toBeInTheDocument();
    expect(screen.getByTestId('submit-button-1')).toBeInTheDocument();
    
    // Then remove one
    const decrementButton = screen.getByTestId('decrement-button');
    await fireEvent.click(decrementButton);
    expect(screen.getByText('Counter: 1')).toBeInTheDocument();
    expect(screen.getByTestId('firstName-input-0')).toBeInTheDocument();
    expect(screen.getByTestId('submit-button-0')).toBeInTheDocument();
    expect(() => screen.getByTestId('firstName-input-1')).toThrow();
    expect(() => screen.getByTestId('submit-button-1')).toThrow();
  });

  it('should reset the counter and remove all forms', async () => {
    const { fixture } = await render(CounterComponent, {
      imports: [ReactiveFormsModule]
    });
    const service = fixture.componentInstance.counterService;
    service.reset();
    const incrementButton = screen.getByTestId('increment-button');
    const resetButton = screen.getByTestId('reset-button');
    
    // Add two forms
    await fireEvent.click(incrementButton);
    await fireEvent.click(incrementButton);
    expect(screen.getByTestId('firstName-input-1')).toBeInTheDocument();
    expect(screen.getByTestId('submit-button-1')).toBeInTheDocument();
    
    // Reset
    await fireEvent.click(resetButton);
    expect(screen.getByText('Counter: 0')).toBeInTheDocument();
    expect(() => screen.getByTestId('firstName-input-0')).toThrow();
    expect(() => screen.getByTestId('submit-button-0')).toThrow();
    expect(() => screen.getByTestId('firstName-input-1')).toThrow();
    expect(() => screen.getByTestId('submit-button-1')).toThrow();
  });

  it('should validate required fields for each form', async () => {
    const user = userEvent.setup();
    const { fixture } = await render(CounterComponent, {
      imports: [ReactiveFormsModule]
    });
    const service = fixture.componentInstance.counterService;
    service.reset();
    
    // Add a form
    await fireEvent.click(screen.getByTestId('increment-button'));

    // Get form elements
    const firstNameInput = screen.getByTestId('firstName-input-0');
    const lastNameInput = screen.getByTestId('lastName-input-0');
    const submitButton = screen.getByTestId('submit-button-0');

    // Initially submit should be disabled and inputs should be invalid
    expect(submitButton).toBeDisabled();
    expect(firstNameInput).toHaveAttribute('aria-invalid', 'false');
    expect(lastNameInput).toHaveAttribute('aria-invalid', 'false');

    // Touch inputs without values to show validation state
    await user.click(firstNameInput);
    await fireEvent.blur(firstNameInput);
    await user.click(lastNameInput);
    await fireEvent.blur(lastNameInput);
    expect(firstNameInput).toHaveAttribute('aria-invalid', 'true');
    expect(lastNameInput).toHaveAttribute('aria-invalid', 'true');

    // Fill in first name only
    await user.type(firstNameInput, 'John');
    await fireEvent.blur(firstNameInput);
    expect(firstNameInput).toHaveAttribute('aria-invalid', 'false');
    expect(lastNameInput).toHaveAttribute('aria-invalid', 'true');
    expect(submitButton).toBeDisabled();

    // Fill in last name
    await user.type(lastNameInput, 'Doe');
    await fireEvent.blur(lastNameInput);
    expect(firstNameInput).toHaveAttribute('aria-invalid', 'false');
    expect(lastNameInput).toHaveAttribute('aria-invalid', 'false');
    expect(submitButton).not.toBeDisabled();

    // Verify form values
    const form = fixture.componentInstance.formGroup;
    expect(form.get('persons.0')?.value).toEqual({
      firstName: 'John',
      lastName: 'Doe',
      age: null
    });
  });

  it('should show validation errors on touch', async () => {
    const user = userEvent.setup();
    const { fixture } = await render(CounterComponent, {
      imports: [ReactiveFormsModule]
    });
    const service = fixture.componentInstance.counterService;
    service.reset();
    
    // Add a form
    await fireEvent.click(screen.getByTestId('increment-button'));

    // Get form elements
    const firstNameInput = screen.getByTestId('firstName-input-0');
    const lastNameInput = screen.getByTestId('lastName-input-0');

    // Touch inputs without entering values
    await user.click(firstNameInput);
    await fireEvent.blur(firstNameInput);
    await user.click(lastNameInput);
    await fireEvent.blur(lastNameInput);

    // Verify error messages
    expect(screen.getByTestId('firstName-error-0')).toHaveTextContent('First name is required');
    expect(screen.getByTestId('lastName-error-0')).toHaveTextContent('Last name is required');
  });

  it('should submit individual forms', async () => {
    const user = userEvent.setup();
    const { fixture } = await render(CounterComponent, {
      imports: [ReactiveFormsModule]
    });
    const service = fixture.componentInstance.counterService;
    service.reset();
    
    // Add two forms
    await fireEvent.click(screen.getByTestId('increment-button'));
    await fireEvent.click(screen.getByTestId('increment-button'));

    // Fill and submit first form
    const firstNameInput0 = screen.getByTestId('firstName-input-0');
    const lastNameInput0 = screen.getByTestId('lastName-input-0');
    const submitButton0 = screen.getByTestId('submit-button-0');

    await user.type(firstNameInput0, 'John');
    await user.type(lastNameInput0, 'Doe');
    await fireEvent.blur(lastNameInput0);

    const consoleSpy = jest.spyOn(console, 'log');
    await user.click(submitButton0);
    expect(consoleSpy).toHaveBeenCalledWith('Person 1 data:', { firstName: 'John', lastName: 'Doe', age: null });

    // Fill and submit second form independently
    const firstNameInput1 = screen.getByTestId('firstName-input-1');
    const lastNameInput1 = screen.getByTestId('lastName-input-1');
    const submitButton1 = screen.getByTestId('submit-button-1');

    await user.type(firstNameInput1, 'Jane');
    await user.type(lastNameInput1, 'Smith');
    await fireEvent.blur(lastNameInput1);

    await user.click(submitButton1);
    expect(consoleSpy).toHaveBeenCalledWith('Person 2 data:', { firstName: 'Jane', lastName: 'Smith', age: null });

    consoleSpy.mockRestore();
  });
}); 