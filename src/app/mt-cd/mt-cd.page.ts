import {
  Component,
  OnInit
} from '@angular/core';
// import { Gyroscope, GyroscopeOrientation, GyroscopeOptions } from '@ionic-native/gyroscope/ngx';
import {
  DeviceMotion,
  DeviceMotionAccelerationData,
  DeviceMotionAccelerometerOptions
} from '@ionic-native/device-motion/ngx';
import { DeviceOrientation, DeviceOrientationCompassHeading } from '@ionic-native/device-orientation/ngx';


@Component({
  selector: 'app-mt-cd',
  templateUrl: './mt-cd.page.html',
  styleUrls: ['./mt-cd.page.scss'],
})


export class MtCdPage implements OnInit {
  card4: any;
  card3: any;
  card2: any;
  container: any;
  idxyp: any;

  public x:number;
  public y:number;
  private moveLeftClass = 'moveLeft';
  private moveRightClass = 'moveRight';
  private moveUpClass = 'moveUp';
  private moveDownClass = 'moveDown';

  constructor(public deviceMotion: DeviceMotion, private deviceOrientation: DeviceOrientation) {}

  start() {
    try {
      var option: DeviceMotionAccelerometerOptions = {
        frequency: 800
      };
      this.idxyp = this.deviceMotion.watchAcceleration(option).subscribe((acc: DeviceMotionAccelerationData) => {

        this.x = acc.x;
        this.y = acc.y;

        // For Mountain movement
        if(this.x > 4){
          this.toggleClass(this.card3, this.moveRightClass);
        } else if(this.x < -4) {
          this.toggleClass(this.card3, this.moveLeftClass);
        }else if(this.y > 4){
          this.toggleClass(this.card3, this.moveDownClass);
        } else if(this.y < 4 ) {
          this.toggleClass(this.card3, this.moveUpClass);
        } else{
          this.clearClassList(this.card3);
        }

        //For Sky movement
        if(this.x > 4){
          this.toggleClass(this.card4, this.moveLeftClass);
        } else if(this.x < -4 ) {
          this.toggleClass(this.card4, this.moveRightClass);
        }else if(this.y > 4){
          this.toggleClass(this.card4, this.moveUpClass);
        } else if(this.y < 4 ) {
          this.toggleClass(this.card4, this.moveDownClass);
        }  else{
          this.clearClassList(this.card4);
        }

        }

      )
    } catch (err) {
      alert(err);
    }
  }
  stop() {
    this.idxyp.unsubscribe();
  }

  toggleClass(card, className){
    if(!card.classList.contains(className)){
      this.clearClassList(card);
      card.classList.add(className);
    }
  }

  clearClassList(card){
    card.classList.remove(this.moveLeftClass);
    card.classList.remove(this.moveRightClass);
    card.classList.remove(this.moveUpClass);
    card.classList.remove(this.moveDownClass);
  }

  ngOnInit() {
    this.card4 = document.querySelector(".card_fourth");
    this.card3 = document.querySelector(".card_third");
    this.card2 = document.querySelector(".card_second");
    this.container = document.querySelector(".container");
    this.start();
  }



}
