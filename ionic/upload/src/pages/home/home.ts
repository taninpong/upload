import { Component } from '@angular/core';
import { NavController, LoadingController, AlertController } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  formData: FormData;

  constructor(public navCtrl: NavController, private http: HttpClient, public loadingCtrl: LoadingController,public alertController: AlertController) {

  }
  onSubmit() {
    //http://localhost:5000/api/ElectionV3/UploadFile
    // https://electionvars.azurewebsites.net/api/ElectionV3/UploadFile
    // GlobalVaraible.host + "UploadFile"
    console.log("1");
    const loader = this.loadingCtrl.create({
      content: 'กรุณารอสักครู่ กำลังอัปโหลดข้อมูล...',
      duration: 5000,
      dismissOnPageChange: true
    })
    loader.present();
      this.http.post("https://localhost:44377/api/Upload/UploadFile", this.formData).subscribe(data => {
        console.log("2");
        const confirm = this.alertController.create({
          title: 'อัปโหลดสำเร็จ',
          buttons: [
            {
              text: 'OK',
              handler: () => {
                loader.dismiss();
                console.log("done");
              }
            }
          ]
        });
        confirm.present();
      });


  }

  setFile(event) {
    let files = event.srcElement.files
    if (files) {
      this.formData = new FormData()
      for (let i = 0; i < files.length; i++) {
        this.formData.append(i.toString(), files[i], files[i].name);
      }
    }
  }
}
