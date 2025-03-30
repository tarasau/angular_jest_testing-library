import { Meta, StoryObj } from '@storybook/angular';
import { baseButtonComponent } from './button.component';

// Define the Meta for the component
const meta: Meta<baseButtonComponent> = {
  title: 'Components/Button',
  component: baseButtonComponent,
  tags: ['autodocs'],
  argTypes: {
    color: {
      control: 'select',
      options: ['primary', 'accent', 'warn'],
      description: 'The color of the button'
    }
  }
};

export default meta;
type Story = StoryObj<baseButtonComponent>;

// Define your Button stories
export const Primary: Story = {
  args: {
    color: 'primary'
  },
  render: (args) => ({
    props: args,
    template: `<base-button [color]="color">Primary Button</base-button>`
  })
};

export const Accent: Story = {
  args: {
    color: 'accent'
  },
  render: (args) => ({
    props: args,
    template: `<base-button [color]="color">Accent Button</base-button>`
  })
};

export const Warn: Story = {
  args: {
    color: 'warn'
  },
  render: (args) => ({
    props: args,
    template: `<base-button [color]="color">Warn Button</base-button>`
  })
}; 