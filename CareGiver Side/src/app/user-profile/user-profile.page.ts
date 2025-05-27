import { Component } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { NavController } from '@ionic/angular';
import{getUserProfile, updateUserProfile, getCurrentUser,deleteUserProfile} from'../../API';
import { Camera, CameraResultType, CameraSource, Photo } from '@capacitor/camera';
// import { PhotoService } from '../services/photo.service';


@Component({
  selector: 'app-user-profile',
  templateUrl: 'user-profile.page.html',
  styleUrls: ['user-profile.page.scss'],
})
export class UserProfilePage {
  username: string = "";
  email: string = '';
  profilePicture: string = 'assets/images/default-Profile.png';
  userID: string = '';

  constructor(public alertController: AlertController, private navCtrl: NavController) {}

  async ngOnInit() {
    try {
      const user = getCurrentUser();
      if (!user) {
        throw new Error('User not found');
      }
      const userData = await getUserProfile(user.uid);
      // console.log(userData);
      const {email, name} = userData;
      this.username = name;
      this.email = email;
      this.userID = user.uid;
    } catch (error) {
      console.error('Error fetching user profile:', error);
      // handle any errors, perhaps show a user-friendly message
    }
  }

  async getUserProfile() {
    console.log(getUserProfile('uid'));
  }



  async editProfile() {
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
            updateUserProfile('uid', {name: data.username})
            this.username = data.username;
            ;
          }
        }
      ]
    });

    await alert.present();
  }

  public async addNewToGallery() {
    // Take a photo
    const capturedPhoto = await Camera.getPhoto({
      resultType: CameraResultType.Uri,
      source: CameraSource.Camera,
      quality: 100
    });
  }

  // addPhotoToGallery() {
  //   this.photoService.addNewToGallery();
  // }

  logout() {
    // Implement logout functionality here
  }

  async confirmDeactivation() {
    const alert = await this.alertController.create({
      header: 'Confirm Deactivation',
      message: 'Are you sure you want to deactivate?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel'
        },
        {
          text: 'Deactivate',
          handler: () => {
            this.deactivateAccount();
          }
        }
      ]
    });

    await alert.present();
  }

  navigateBack() {
    this.navCtrl.back();
  }
  deactivateAccount() {
    if (getCurrentUser()) {
      deleteUserProfile(this.userID);
      this.navCtrl.navigateRoot('/login');
    }
    
  }

  



}

