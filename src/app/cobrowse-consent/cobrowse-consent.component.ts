import { Component, Input, inject } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonButton } from '@ionic/angular/standalone';
import { ModalController } from '@ionic/angular/standalone';

@Component({
  selector: 'app-cobrowse-consent',
  template: `
  <ion-header>
    <ion-toolbar>
      <ion-title>Share your screen?</ion-title>
    </ion-toolbar>
  </ion-header>

  <ion-content class="ion-padding">
    <p>
      Give access to your screen for this session.
    </p>

    <div style="display:flex; gap:12px; margin-top:20px;">
      <ion-button expand="block" color="primary" (click)="accept()">Allow</ion-button>
      <ion-button expand="block" color="medium" (click)="decline()">Decline</ion-button>
    </div>
  </ion-content>
  `,
  styles: [`
    ion-content {
      --padding-top: 16px;
      --padding-bottom: 16px;
      --padding-start: 16px;
      --padding-end: 16px;
    }
  `],
  standalone: true,
  imports: [IonHeader, IonToolbar, IonTitle, IonContent, IonButton],
})
export class CobrowseConsentComponent {
  private modalCtrl = inject(ModalController);
  @Input() onResult?: (data: any) => void;

  // Signal result back to presenter
  accept() {
    this.modalCtrl.dismiss({ consent: true });
  }

  decline() {
    this.modalCtrl.dismiss({ consent: false });
  }
}
