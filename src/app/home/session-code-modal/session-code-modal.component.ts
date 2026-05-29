import { Component, Input, inject } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonButton } from '@ionic/angular/standalone';
import { ModalController } from '@ionic/angular/standalone';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-session-code-modal',
  template: `
    <ion-header>
      <ion-toolbar>
        <ion-title>Session Code</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content class="ion-padding">
      <div class="code-container">
        <p class="code-label">Your session code:</p>
        <div class="code-display">{{ code }}</div>
        <p class="code-instruction">Share this code with others to invite them to the session.</p>
      </div>

      <div class="button-group">
        <ion-button expand="block" color="primary" (click)="close()">Close</ion-button>
      </div>
    </ion-content>
  `,
  styles: [`
    .code-container {
      text-align: center;
      padding: 20px 0;
    }

    .code-label {
      font-weight: 600;
      margin-bottom: 12px;
      color: #333;
    }

    .code-display {
      background-color: #f0f0f0;
      padding: 16px;
      border-radius: 8px;
      font-size: 24px;
      font-weight: bold;
      letter-spacing: 2px;
      font-family: monospace;
      color: #2962FF;
      margin-bottom: 12px;
    }

    .code-instruction {
      font-size: 0.9rem;
      color: #666;
      margin: 0;
    }

    .button-group {
      margin-top: 20px;
    }
  `],
  standalone: true,
  imports: [IonHeader, IonToolbar, IonTitle, IonContent, IonButton, CommonModule],
})
export class SessionCodeModalComponent {
  private modalCtrl = inject(ModalController);
  @Input() code: string = '';

  close() {
    this.modalCtrl.dismiss();
  }
}
