import { Component,OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';


@Component({
  selector: 'app-memory',
  templateUrl: './memories.page.html',
  styleUrls: ['./memories.page.scss'],
})
  export class MemoriesPage implements OnInit {
    contentList = [
      {
        imgSrc: 'assets/memories/img1.jpg',
        title: 'Those Days',
        description: 'This is the description for memory 1'
      },
      {
        imgSrc: 'assets/memories/img2.jpg',
        title: 'Those Days',
        description: 'This is the description for memory 2'
      },
      { 
        imgSrc: 'assets/memories/img3.jpg',
        title: 'Those Days',
        description: 'This is the description for memory 3'
      },
      
      {
        imgSrc: 'assets/memories/img4.jpg',
        title: 'Those Days',
        description: 'This is the description for memory 1'
      }
      
    ];
  
    constructor(public navCtrl:NavController) {}
  
    ngOnInit() {}

    navigateBack() {
      this.navCtrl.back();
    }
  }
  




