///<reference types = "cypress"/>
import { mount } from 'cypress/react';
export {};

// Augment the Cypress namespace to include type definitions for
// your custom command.
// Alternatively, can be defined in cypress/support/component.d.ts
// with a <reference path="./component" /> at the top of your spec.
declare global {
  namespace Cypress {
    interface Chainable<Subject> {
      mount: typeof mount;
    }
  }
}
