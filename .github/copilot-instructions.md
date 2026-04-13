---
name: reactive-forms-convention
description: "Enforce reactive forms syntax in Angular/Ionic templates. Use when: working with forms, Angular templates, Ionic components, form validation."
---

# Reactive Forms Convention

In this Ionic Angular project, always use Angular's reactive forms for form handling. Follow these guidelines:

## Form Creation
- Use Angular's signals-based reactive forms API (`@angular/forms/signals`)
- Create forms using the `form()` function with signal-based models
- Define validation using the `required()` and other validator functions

## Template Binding
- Bind the form to the `<form>` element using `[formGroup]="formSignal()"` (call the signal)
- Bind individual controls using `formControlName="controlName"`
- Do not use `[formRoot]` or `[formField]` as these are not valid Angular directives

## Example
```typescript
// Component
public messageForm = form(this.messageModel, (formState) => {
  required(formState.recipient);
  // ...
});
```

```html
<!-- Template -->
<form [formGroup]="messageForm()">
  <ion-input formControlName="subject" placeholder="Enter subject"></ion-input>
  <!-- ... -->
</form>
```

This ensures consistent, type-safe form handling throughout the application.