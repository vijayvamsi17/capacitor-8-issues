import { Component, inject, OnInit, signal, computed } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { IonHeader, IonToolbar, IonButtons, IonMenuButton, IonTitle, IonContent, IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonButton, IonIcon, IonInput } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { addOutline } from 'ionicons/icons';

@Component({
  selector: 'app-folder',
  templateUrl: './folder.page.html',
  styleUrls: ['./folder.page.scss'],
  imports: [RouterLink, IonHeader, IonToolbar, IonButtons, IonMenuButton, IonTitle, IonContent, IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonButton, IonIcon, IonInput],
})
export class FolderPage implements OnInit {
  public folder = signal<string>('');
  private activatedRoute = inject(ActivatedRoute);

  // Computed signal to check if current folder is inbox
  public isInbox = computed(() => this.folder().toLowerCase() === 'inbox');

  constructor() {
    addIcons({ addOutline });
  }

  ngOnInit() {
    const folderId = this.activatedRoute.snapshot.paramMap.get('id') as string;
    this.folder.set(folderId);
  }
}
