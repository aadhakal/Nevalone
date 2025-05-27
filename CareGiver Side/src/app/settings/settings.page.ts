import { Component } from '@angular/core';
import { Plugins } from '@capacitor/core';
import { NavController } from '@ionic/angular';

const { Storage } = Plugins;

@Component({
  selector: 'app-settings',
  templateUrl: 'settings.page.html',
  styleUrls: ['settings.page.scss'],
})
export class SettingsPage {
  darkMode: boolean = false;
  notifications: boolean = true;
  sound: boolean = true;

  constructor(private navCtrl: NavController) {
    this.loadSettings();
  }

  async loadSettings() {
    const settings = await Storage['get']({ key: 'settings' });
    const parsedSettings = JSON.parse(settings.value || '{}');
    this.darkMode = parsedSettings.darkMode || false;
    this.notifications = parsedSettings.notifications || true;
    this.sound = parsedSettings.sound || true;
  }

  async toggleDarkMode() {
    this.darkMode = !this.darkMode;
    await this.saveSettings();
  }

  async toggleNotifications() {
    this.notifications = !this.notifications;
    await this.saveSettings();
  }

  async toggleSound() {
    this.sound = !this.sound;
    await this.saveSettings();
  }

  async saveSettings() {
    const settings = {
      darkMode: this.darkMode,
      notifications: this.notifications,
      sound: this.sound
    };
    await Storage['set']({ key: 'settings', value: JSON.stringify(settings) });
  }
  navigateBack() {
    this.navCtrl.back();
  }
}
