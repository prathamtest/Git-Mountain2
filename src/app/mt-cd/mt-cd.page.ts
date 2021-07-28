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
    movementConstant : .4
  }

  private skyLimits = {
    movementConstant : 0.9
  }

  constructor(public deviceMotion: DeviceMotion, private deviceOrientation: DeviceOrientation) {}

  start() {
    try {
      var option: DeviceMotionAccelerometerOptions = {
        frequency: 1
      };
      this.idxyp = this.deviceMotion.watchAcceleration(option).subscribe((acc: DeviceMotionAccelerationData) => {

        this.x = acc.x;
        this.y = acc.y;

        let mountain = {
          left : this.calculate(this.x, this.mountainLimits,false),
          top : this.calculate(this.y, this.mountainLimits,false)
        }

        let sky = {
          left : this.calculate(this.x, this.skyLimits, true,),
          top : this.calculate(this.y, this.skyLimits, true)
        }

        this.setPosition(this.card3, mountain);
        this.setPosition(this.card4, sky);

        }

      )
    } catch (err) {
      alert(err);
    }
  }

  stop() {
    this.idxyp.unsubscribe();
  }

  calculate(value, limits, invertDirection = false){
    return invertDirection ? -(value) * limits.movementConstant * 2 : value * limits.movementConstant * 6;
  }

  setPosition(card, value){
    // card.style.transform = "translate(" + value.left +"%, "+ value.top + "%)"
    // card.style.transform = "translate(" + value.left +"%)"
    card.style.transform = "rotateY(" + value.left +"deg) rotateX(" + value.top +"deg)" 
  }

  ngOnInit() {
    this.card4 = document.querySelector(".card_fourth");
    this.card3 = document.querySelector(".card_third");
    this.card2 = document.querySelector(".card_second");
    this.container = document.querySelector(".container");
    this.start();
  }



}
