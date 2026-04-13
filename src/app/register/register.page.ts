import { Component, signal } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { email, form, FormField, FormRoot, required } from '@angular/forms/signals';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonButton, IonInput, IonItem, IonSelect, IonSelectOption, IonCheckbox, IonLabel, NavController } from '@ionic/angular/standalone';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
  imports: [ReactiveFormsModule, IonHeader, IonToolbar, IonTitle, IonContent, IonButton, IonInput, IonItem, IonSelect, IonSelectOption, IonCheckbox, IonLabel,
    FormField, FormRoot
  ],
})
export class RegisterPage {
  public registrationModel = signal({
    firstName: '',
    lastName: '',
    email: '',
    country: '',
    streetAddress: '',
    city: '',
    stateProvince: '',
    zipCode: '',
    agreeToTerms: false,
  });

  public registrationForm = form(this.registrationModel, (formState) => {
    required(formState.firstName);
    required(formState.lastName);
    required(formState.country);
    required(formState.streetAddress);
    required(formState.city);
    required(formState.stateProvince);
    required(formState.zipCode);
    required(formState.agreeToTerms);
    email(formState.email);
  });

  constructor(private navController: NavController) {}

  submitRegistration() {
    if (this.registrationForm().valid()) {
      console.log('Registration submitted:', this.registrationForm().value());
      this.navController.navigateRoot('/folder/inbox');
    } else {
      console.log('Form is invalid', this.registrationForm().errors());
    }
  }

  cancel() {
    this.navController.back();
  }
}