// import { setupZoneTestEnv } from 'jest-preset-angular/setup-env/zone';
// import '@testing-library/jest-dom';

// setupZoneTestEnv();

// // Global mocks for jsdom
// const mock = () => {
//   let storage: { [key: string]: string } = {};
//   return {
//     getItem: (key: string) => (key in storage ? storage[key] : null),
//     setItem: (key: string, value: string) => (storage[key] = value || ''),
//     removeItem: (key: string) => delete storage[key],
//     clear: () => (storage = {})
//   };
// };

// Object.defineProperty(window, 'localStorage', { value: mock() });
// Object.defineProperty(window, 'sessionStorage', { value: mock() });
// Object.defineProperty(window, 'getComputedStyle', {
//   value: () => ['-webkit-appearance']
// });

// Object.defineProperty(document.body.style, 'transform', {
//   value: () => ({
//     enumerable: true,
//     configurable: true
//   })
// }); 

import { setupZoneTestEnv } from 'jest-preset-angular/setup-env/zone';
import '@testing-library/jest-dom';

setupZoneTestEnv();