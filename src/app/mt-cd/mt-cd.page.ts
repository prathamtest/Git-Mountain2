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

  private movement = {
    horizontal : 'horizontal',
    vertical : 'vertical'
  }

  private mountainLimits = {
    extremeLeft : -64,
    extremeRight : 0,
    horizontalMiddle : -32,
    extremeTop : -32,
    extremeBottom : 0,
    verticalMiddle : -16,
    steps: 8
  }

  private skyLimits = {
    extremeLeft : -32,
    extremeRight : 0,
    horizontalMiddle : -16,
    extremeTop : -32,
    extremeBottom : 0,
    verticalMiddle : -16,
    steps: 8
  }

  public test : any;

  constructor(public deviceMotion: DeviceMotion, private deviceOrientation: DeviceOrientation) {}

  start() {
    try {
      var option: DeviceMotionAccelerometerOptions = {
        frequency: 800
      };
      this.idxyp = this.deviceMotion.watchAcceleration(option).subscribe((acc: DeviceMotionAccelerationData) => {

        this.x = Math.trunc(acc.x);
        this.y = Math.trunc(acc.y);

        let mountain = {
          left : this.calculate(this.movement.horizontal, this.x, this.mountainLimits),
          top : this.calculate(this.movement.vertical, this.y, this.mountainLimits)
        }

        let sky = {
          left : this.calculate(this.movement.horizontal, this.x, this.skyLimits, true),
          top : this.calculate(this.movement.vertical, this.y, this.skyLimits, true)
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

  calculate(movement, value, limits, invertDirection = false){
    let valueSign = Math.sign(value);
    let positionGap = movement == this.movement.horizontal ? 4 : 2;
    let returnValue : number;
    if(!value){
      returnValue = (movement == this.movement.horizontal) ? limits.horizontalMiddle : limits.verticalMiddle;
    } else {
      let startValue = movement == this.movement.horizontal ? limits.horizontalMiddle : limits.verticalMiddle;
      let endValue : number;
      if(invertDirection){
        endValue = movement == this.movement.horizontal ? (valueSign == -1 ? limits.extremeRight : limits.extremeLeft)
        :  (valueSign == -1 ? limits.extremeBottom : limits.extremeTop);
      } else {
        endValue = movement == this.movement.horizontal ? (valueSign == -1 ? limits.extremeLeft : limits.extremeRight)
        :  (valueSign == -1 ? limits.extremeTop : limits.extremeBottom);
      }

      let postionValues = this.getAxisPoints(startValue, endValue);
      returnValue = postionValues[ Math.abs(value) * positionGap ] ;
      returnValue = returnValue ? returnValue : postionValues[postionValues.length - 1];
    }
    return returnValue;
  }

  getAxisPoints(startValue, endValue){
    var list = [];
    let endValueSign = Math.sign(endValue);
    if(endValueSign == -1){
      for (var i = startValue; i >= endValue ; i--) {
          list.push(i);
      }
    } else {
      for (var i = startValue; i <= endValue ; i++) {
          list.push(i);
      }
    }
    return list;
  }

  setPosition(card, value){
    card.style.left =  value.left + 'px';
    card.style.top =  value.top + 'px';
  }

  ngOnInit() {
    this.card4 = document.querySelector(".card_fourth");
    this.card3 = document.querySelector(".card_third");
    this.card2 = document.querySelector(".card_second");
    this.container = document.querySelector(".container");
    this.start();
  }



}
