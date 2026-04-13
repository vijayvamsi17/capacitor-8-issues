import { Component, signal } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { form, FormField, FormRoot, required } from '@angular/forms/signals';
import { IonHeader, IonToolbar, IonButtons, IonTitle, IonContent, IonFooter, IonButton, IonIcon, IonTextarea, IonInput, IonItem, IonSelect, IonSelectOption, NavController } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { sendOutline, arrowBackOutline, attachOutline } from 'ionicons/icons';

@Component({
  selector: 'app-new-message',
  templateUrl: './new-message.page.html',
  styleUrls: ['./new-message.page.scss'],
  imports: [ReactiveFormsModule, IonHeader, IonToolbar, IonButtons, IonTitle, IonContent, IonFooter, IonButton, IonIcon, IonTextarea, IonInput, IonItem, IonSelect, IonSelectOption,
    FormField, FormRoot
  ],
})
export class NewMessagePage {
  public messageModel = signal({
    topic: 'general',
    recipient: '',
    subject: '',
    message: '',
  });

  public messageForm = form(this.messageModel, (formState) => {
    required(formState.recipient);
    required(formState.subject);
    required(formState.message);
  });

  constructor(private navController: NavController) {
    addIcons({ sendOutline, arrowBackOutline, attachOutline });
  }

  sendMessage() {
    if (this.messageForm().valid()) {
      console.log('Sending message:', this.messageForm().value());
      this.navController.navigateRoot('/folder/inbox');
    } else {
      console.log('Message form is invalid', this.messageForm().errors());
    }
  }

  cancel() {
    this.navController.back();
  }
}