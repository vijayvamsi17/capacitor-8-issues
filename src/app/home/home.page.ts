import { Component, inject, OnInit, signal } from '@angular/core';
import { IonHeader, IonToolbar, IonButtons, IonMenuButton, IonTitle, IonContent, IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonButton, IonIcon, Platform, ModalController } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { addOutline } from 'ionicons/icons';
import { Cobrowse } from '@capacitor-community/cobrowse';
import { CobrowseConsentComponent } from '../cobrowse-consent/cobrowse-consent.component';
import { SessionCodeModalComponent } from './session-code-modal/session-code-modal.component';
import { CobrowseSession } from './cobrowse-session.type';

@Component({
    selector: 'app-home',
    templateUrl: './home.page.html',
    styleUrls: ['./home.page.scss'],
    imports: [IonHeader, IonToolbar, IonButtons, IonMenuButton, IonTitle, IonContent, IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonButton, IonIcon],
    standalone: true,
})
export class HomePage implements OnInit {
    private platform = inject(Platform);
    private modalCtrl = inject(ModalController);

    // Session management signals
    public sessionActive = signal(false);
    public session = signal<CobrowseSession | null>(null);

    constructor() {
        addIcons({ addOutline });
    }

    ngOnInit(): void {
        // Initialization if needed
    }

    /**
     * Setup event listeners for Cobrowse
     */
    private async setupCobrowseListeners(): Promise<void> {
        await Cobrowse.addListener('sessionLoaded', (session: CobrowseSession) => {
            this.session.set(session);
            const message = `Session loaded: ${JSON.stringify(session)}`;
            console.log(message);
            this.addLog(message);
        });
        await Cobrowse.addListener('sessionUpdated', (session: CobrowseSession) => {
            this.session.set(session);
            const message = `Session updated: ${JSON.stringify(session)}`;
            console.log(message);
            this.addLog(message);
        });
        await Cobrowse.addListener('sessionEnded', (session: CobrowseSession) => {
            this.session.set(session);
            const message = `Session ended: ${JSON.stringify(session)}`;
            console.log(message);
            this.addLog(message);
        });

        await Cobrowse.addListener('sessionConsent', async (session: CobrowseSession) => {
            this.session.set(session);
            const message = `Session consent received: ${JSON.stringify(session)}`;
            const modalConsent = await this.modalCtrl.create({
                component: CobrowseConsentComponent,
                componentProps: { session },
                cssClass: 'small-modal',
            });

            await modalConsent.present();
            const result: any = await modalConsent.onDidDismiss();
            console.log('Consent modal dismissed with result:', result);
            if (result?.data?.consent) {
                await this.submitConsent(session['sessionId']);
                this.addLog(`Consent given for session ${session['sessionId']}`);
            } else {
                this.addLog(`Consent denied for session ${session['sessionId']}`);
            }
            console.log(message);
            this.addLog(message);
        });
    }

    /**
     * Start Cobrowse session
     */
    public async startSession(): Promise<void> {
        await this.platform.ready();
        Cobrowse.start({ license: 'yTe2G0lDHujAtQ' })
            .then((result: any) => {
                this.setupCobrowseListeners();
                const message = `Cobrowse session started: ${JSON.stringify(result)}`;
                console.log(message);
                this.addLog(message);
                this.sessionActive.set(true);
            })
            .catch((error: any) => {
                const message = `Cobrowse startup failed: ${error}`;
                console.error(message);
                this.addLog(message);
            });
    }

    /**
     * Generate a session code
     */
    public async generateSessionCode(): Promise<void> {
        Cobrowse.createSessionCode()
            .then(async (result: { code: string }) => {
                const message = `Session code generated: ${result.code}`;
                console.log(message);
                this.addLog(message);

                // Show modal with the generated code
                const modal = await this.modalCtrl.create({
                    component: SessionCodeModalComponent,
                    componentProps: { code: result.code },
                    cssClass: 'small-modal',
                });

                await modal.present();
            })
            .catch((error: any) => {
                const message = `Failed to generate session code: ${error}`;
                console.error(message);
                this.addLog(message);
            });
    }

    /**
     * End the Cobrowse session
     */
    public endSdk(): void {
        Cobrowse.stop()
            .then(() => {
                const message = `SDK ended successfully`;
                console.log(message);
                this.addLog(message);
                this.sessionActive.set(false);
            })
            .catch((error: any) => {
                const message = `Failed to end SDK: ${error}`;
                console.error(message);
                this.addLog(message);
            });
    }

    /**
     * End the active session via future plugin API.
     */
    public endSession(): void {
        Cobrowse.endSession()
            .then(() => {
                const message = `Session ended successfully`;
                console.log(message);
                this.addLog(message);
            })
            .catch((error: any) => {
                const message = `Failed to end session: ${error}`;
                console.error(message);
                this.addLog(message);
            });
    }

    public async submitConsent(sessionId: string | undefined): Promise<void> {
        if (!sessionId) {
            const message = `No session ID provided for consent submission`;
            console.error(message);
            this.addLog(message);
            return;
        }
        await Cobrowse.submitConsent({ sessionId })
            .then(() => {
                const message = `Consent submitted for session ${sessionId}`;
                console.log(message);
                this.addLog(message);
            })
            .catch((error: any) => {
                const message = `Failed to submit consent for session ${sessionId}: ${error}`;
                console.error(message);
                this.addLog(message);
            });
    }

    /**
     * Add a log message
     */
    private addLog(message: string): void {
        const timestamp = new Date().toLocaleTimeString();
        const logMessage = `[${timestamp}] ${message}`;
        console.log(logMessage);
    }
}
