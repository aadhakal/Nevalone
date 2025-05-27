import { Component, ViewChild } from '@angular/core';
import { IonDatetime } from '@ionic/angular';
import { AlertController } from '@ionic/angular';
import { NavController } from '@ionic/angular';
import{doc, getDoc, setDoc} from 'firebase/firestore';
import { db } from 'src/API'; // Import the db object from the API file

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  username: string = "";
  email: string = ''; // If not used, consider removing
  letterBody: string = '';
  recipient: string = '';
  contactDetails: string = '';

  @ViewChild('datePicker', { static: false }) datePicker!: IonDatetime;
  selectedDate: string = '';

  constructor(public alertController: AlertController, private navCtrl: NavController) {}

  openDatePicker() {
    (this.datePicker as any).open();
  }

  updateSelectedDate(event: any) {
    this.selectedDate = event.detail.value;
  }

  async editSend() {
    const alert = await this.alertController.create({
      header: 'Edit Username',
      inputs: [
        {
          name: 'username',
          type: 'text',
          value: this.username
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel'
        },
        {
          text: 'Save',
          handler: (data) => {
            this.username = data.username;
          }
        }
      ]
    });
    await alert.present();
  }

  async saveLetter() {
    if (!this.letterBody || !this.recipient || !this.selectedDate) {
        alert('Please fill all details before saving the letter.');
        return;
    }

    try {
        const currentLetter = {
            date: this.selectedDate,
            body: this.letterBody,
            to: this.recipient,
            from: this.username || 'Anonymous'
        };

        // Fetch the latest array
        const currentArrayName = await this.getCurrentArrayName(); 
        const currentArray = (await this.getLettersArray(currentArrayName)) || [];
        
        currentArray.push(currentLetter);
        
        // Save the updated array back to the database
        await this.saveLettersArray(currentArrayName, currentArray);

        alert('Letter saved successfully.');
        
        // Clear the fields after saving
        this.letterBody = '';
        this.recipient = '';
        this.contactDetails = '';
        this.selectedDate = '';

    } catch (error) {
        console.error('Error saving letter:', error);
        alert('There was an error saving your letter. Please try again.');
    }
}

async getCurrentArrayName(): Promise<string> {
  const lettersDocRef = doc(db, 'letters', 'l1');
  const lettersDocSnap = await getDoc(lettersDocRef);

  if (!lettersDocSnap.exists()) {
      // If the document doesn't exist, start with l1.1
      return 'l1.1';
  }

  const data = lettersDocSnap.data();
  const lastArrayName = Object.keys(data).sort().pop(); // Get the name of the last array

  if (!lastArrayName || (data[lastArrayName] && data[lastArrayName].length >= 4)) {
      // If the last array doesn't exist or is full, create a new name
      const nextArrayNumber = lastArrayName ? parseInt(lastArrayName.split('.')[1]) + 1 : 1;
      return `l1.${nextArrayNumber}`;
  }

  return lastArrayName;
}

async getLettersArray(arrayName: string): Promise<any[]> {
  const lettersDocRef = doc(db, 'letters', 'l1');
  const lettersDocSnap = await getDoc(lettersDocRef);

  if (!lettersDocSnap.exists()) {
      return [];
  }

  const data = lettersDocSnap.data();
  return data[arrayName] || [];
}

async saveLettersArray(arrayName: string, lettersArray: any[]) {
  const lettersDocRef = doc(db, 'letters', 'l1');

  // Set the array to the document. If the document doesn't exist, it will be created.
  await setDoc(lettersDocRef, { [arrayName]: lettersArray }, { merge: true });
}


  
}
