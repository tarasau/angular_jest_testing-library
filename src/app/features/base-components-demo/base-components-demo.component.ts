import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-base-components-demo',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="storybook-container">
      <iframe
        [src]="storybookUrl"
        frameBorder="0"
        class="storybook-iframe"
      ></iframe>
    </div>
  `,
  styles: [`
    .storybook-container {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      overflow: hidden;
    }

    .storybook-iframe {
      width: 100%;
      height: 100%;
      border: none;
      margin: 0;
      padding: 0;
    }
  `]
})
export class baseComponentsDemoComponent {
  private sanitizer = inject(DomSanitizer);
  
  storybookUrl: SafeResourceUrl = this.sanitizer.bypassSecurityTrustResourceUrl(
    environment.production ? '/storybook/index.html' : 'http://localhost:6006'
  );
} 