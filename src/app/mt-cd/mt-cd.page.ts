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

  private mountainLimits = {
    movementConstant : 4
    // movementConstant : 0.7
  }

  private skyLimits = {
    movementConstant : 2.3
    // movementConstant : 2.3
  }

  constructor(public deviceMotion: DeviceMotion, private deviceOrientation: DeviceOrientation) {}

  start() {
    try {
      var option: DeviceMotionAccelerometerOptions = {
        frequency: 1
      };
      this.idxyp = this.deviceMotion.watchAcceleration(option).subscribe((acc: DeviceMotionAccelerationData) => {

        this.x = Math.trunc(acc.x);
        this.y = Math.trunc(acc.y);

        let mountain = {
          left : this.calculate(this.x,false),
          top : this.calculate(this.y,false)
        }

        let sky = {
          left : this.calculate(this.x, true,),
          top : this.calculate(this.y, true)
        }

        this.setPosition(this.card3, mountain, this.mountainLimits, true);
        this.setPosition(this.card4, sky, this.skyLimits, false);

        }

      )
    } catch (err) {
      alert(err);
    }
  }

  stop() {
    this.idxyp.unsubscribe();
  }

  calculate(value, invertDirection = false){
    return invertDirection ? -(value) : value ;
  }

  setPosition(card, value, limits, rotate){
    if(value.left < 3 && value.left > -3){
      if(rotate) {
        card.style.transform = "translateX(" + (value.left * limits.movementConstant) +"%)"
        // card.style.transform = "translateX(" + (value.left * limits.movementConstant) +"%) rotateY("+ value.left * (-7) +"deg)"
      } else {
        card.style.transform = "translateX(" + (value.left * limits.movementConstant) +"%)"
      }
    }
  }

  ngOnInit() {
    this.card4 = document.querySelector(".card_fourth");
    this.card3 = document.querySelector(".card_third");
    this.card2 = document.querySelector(".card_second");
    this.container = document.querySelector(".container");
    this.start();
  }



}
