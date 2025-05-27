import { Component, OnInit } from '@angular/core';
import { getLetters as fetchLetters } from 'src/API';
import { NavController } from '@ionic/angular';


interface Letter {
  date: string;
  body: string;
  to: string;
  from: string;
  expanded?: boolean;
}

@Component({
  selector: 'app-saved-letters',
  templateUrl: './letters.page.html', 
  styleUrls: ['./letters.page.scss']
})
export class LettersPage implements OnInit {
  public savedLetters: Letter[] = [];
  constructor(public navCtrl: NavController) {}

  async ngOnInit() {
    await this.loadLetters();
  }

  async loadLetters() {
    try {
        const rawData = await fetchLetters("l1"); // Assuming "l1" is the right argument. Adjust as necessary.
        console.log(rawData);

        // Convert raw data to the desired structure
        const letters = [];

        for (const obj of rawData) {
          for (const key in obj) {
            const arr = obj[key];
            if (Array.isArray(arr) && arr.length >= 4) {
              const letter: Letter = {
                date: new Date(arr[0]).toISOString(),
                body: arr[1],
                to: arr[2],
                from: arr[3],
                expanded: false // Initially, none of the letters are expanded
              };
              letters.push(letter);
            }
          }
        }

        this.savedLetters = letters;

    } catch (error) {
        console.error("Error fetching letters:", error);
    }
}

toggleExpand(index: number) {
  this.savedLetters.forEach((letter, i) => {
    if (i === index) {
      letter.expanded = !letter.expanded;
    } else {
      letter.expanded = false;
    }
  });

}


navigateBack() {
  this.navCtrl.back();
}


}



