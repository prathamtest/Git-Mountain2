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

  xxp: any;

  yyp: any;
  idxyp: any;
  constructor(public deviceMotion: DeviceMotion) {
    this.xxp = "_";

    this.yyp = "_";

  }

  start() {
    try {
      var option: DeviceMotionAccelerometerOptions = {
        frequency: 200
      };
      this.idxyp = this.deviceMotion.watchAcceleration(option).subscribe((acc: DeviceMotionAccelerationData) => {
          this.xxp = "" + acc.x;
          this.yyp = "" + acc.y;

        // console.log('this.xxp', this.xxp);
        // console.log('this.yyp', this.yyp);

        // this.card3.style.transition = `left 3s`;
        // this.card3.style.left = `0`;
        // this.card3.style.transitionTimingFunction = `cubic-bezier(0.1, 0.7, 1.0, 0.1)`;
        // this.card4.style.transition = `left 5s`;
        // this.card4.style.left = `${this.xxp * 4}px`;   //`-32px`
        // this.card4.style.transitionTimingFunction = `cubic-bezier(0.1, 0.7, 1.0, 0.1)`;
        // this.card3.style.top = `${this.yyp *  4}px`;    //`-32px`
         
          if (this.xxp > 0) {
            this.card3.style.transition = `left 3s`;
            this.card3.style.left = `0`;
            this.card3.style.transitionTimingFunction = `cubic-bezier(0.1, 0.7, 1.0, 0.1)`;
            this.card4.style.transition = `left 5s`;
            this.card4.style.left = `${this.xxp *  -2}px`;   //`-32px`
            this.card4.style.transitionTimingFunction = `cubic-bezier(0.1, 0.7, 1.0, 0.1)`;
    
          } else if (this.xxp < 0) {
            this.card3.style.transition = `left 3s`;
            this.card3.style.left = `${this.xxp *  4}px`;   // `-64px`;
            this.card3.style.transitionTimingFunction = `cubic-bezier(0.1, 0.7, 1.0, 0.1)`;
            this.card4.style.transition = `left 5s`;
            this.card4.style.left = `0px`;
            this.card4.style.transitionTimingFunction = `cubic-bezier(0.1, 0.7, 1.0, 0.1)`;
     
          } else if (this.yyp > 0) {
            this.card3.style.transition = `top 3s`;
            this.card3.style.top = `0px`;
            this.card3.style.transitionTimingFunction = `cubic-bezier(0.1, 0.7, 1.0, 0.1)`;
            this.card4.style.transition = `top 5s`;
            this.card4.style.top = `${this.yyp *  -2}px`;     //`-32px`
            this.card4.style.transitionTimingFunction = `cubic-bezier(0.1, 0.7, 1.0, 0.1)`;
    
          } else if (this.yyp < 0) {
            this.card3.style.transition = `top 3s`;
            this.card3.style.top = `${this.yyp * -4}px`;    //`-32px`
            this.card3.style.transitionTimingFunction = `cubic-bezier(0.1, 0.7, 1.0, 0.1)`;
            this.card4.style.transition = `top 5s`;
            this.card4.style.top = `0px`;
            this.card4.style.transitionTimingFunction = `cubic-bezier(0.1, 0.7, 1.0, 0.1)`;
    
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


  ngOnInit() {
    this.start();
    //   let options: GyroscopeOptions = {
    //     frequency: 1
    //  }

    //      this.gyroscope.getCurrent(options)
    //    .then((orientation: GyroscopeOrientation) => {
    //       console.log( "options orientation.x ", orientation.x,  "options orientation.y ",orientation.y);
    //     })
    //    .catch()


    //  this.gyroscope.watch()
    //     .subscribe((orientation: GyroscopeOrientation) => {
    //        console.log("watch orientation.x ", orientation.x , "watch orientation.y ", orientation.y  );
    //     });

    // Get the device current acceleration




    this.card4 = document.querySelector(".card_fourth");
    this.card3 = document.querySelector(".card_third");
    this.card2 = document.querySelector(".card_second");
    this.container = document.querySelector(".container");

    //Moving Animation Event
    // this.container.addEventListener("mousemove", (e) => {
    //   let rect = e.target.getBoundingClientRect();
    //   let wxAxis = e.clientX - rect.left;
    //   let wyAxis = e.clientY - rect.top;


    //   console.log('wyAxis', wyAxis);
    //   console.log('wxAxis', wxAxis);
    //   console.log('pageX', e.pageX);
    //   console.log('pageY', e.pageY);

    //   console.log('wyAxis', e);




    //   if (this.xxp < 8) {
    //     this.card3.style.transition = `left 3s`;
    //     this.card3.style.left = `0`;
    //     this.card3.style.transitionTimingFunction = `cubic-bezier(0.1, 0.7, 1.0, 0.1)`;
    //     this.card4.style.transition = `left 5s`;
    //     this.card4.style.left = `${this.xxp * - 4}px`;   //`-32px`
    //     this.card4.style.transitionTimingFunction = `cubic-bezier(0.1, 0.7, 1.0, 0.1)`;

    //   } else if (this.xxp > -8) {
    //     this.card3.style.transition = `left 3s`;
    //     this.card3.style.left = `${this.xxp * - 8}px`;   // `-64px`;
    //     this.card3.style.transitionTimingFunction = `cubic-bezier(0.1, 0.7, 1.0, 0.1)`;
    //     this.card4.style.transition = `left 5s`;
    //     this.card4.style.left = `0px`;
    //     this.card4.style.transitionTimingFunction = `cubic-bezier(0.1, 0.7, 1.0, 0.1)`;

    //   } else if (this.yyp < 8) {
    //     this.card3.style.transition = `top 3s`;
    //     this.card3.style.top = `0px`;
    //     this.card3.style.transitionTimingFunction = `cubic-bezier(0.1, 0.7, 1.0, 0.1)`;
    //     this.card4.style.transition = `top 5s`;
    //     this.card4.style.top = `${this.yyp * - 4}px`;     //`-32px`
    //     this.card4.style.transitionTimingFunction = `cubic-bezier(0.1, 0.7, 1.0, 0.1)`;

    //   } else if (this.yyp > -8) {
    //     this.card3.style.transition = `top 3s`;
    //     this.card3.style.top = `${this.yyp * - 4}px`;    //`-32px`
    //     this.card3.style.transitionTimingFunction = `cubic-bezier(0.1, 0.7, 1.0, 0.1)`;
    //     this.card4.style.transition = `top 5s`;
    //     this.card4.style.top = `0px`;
    //     this.card4.style.transitionTimingFunction = `cubic-bezier(0.1, 0.7, 1.0, 0.1)`;

    //   }
    // });

    // //Animate In
    // container.addEventListener("mouseenter", (e) => {});


    //Animate Out
    // this.container.addEventListener("mouseleave", (e) => {
    //   // card4.style.transform = `translateX(0px)`;
    //   // card3.style.transform = `translateX(0px)`;
    //   this.card3.style.left = `-32px`;
    //   this.card3.style.transition = `left 1s`;
    //   this.card3.style.transitionTimingFunction = `cubic-bezier(0.1, 0.7, 1.0, 0.1)`;
    //   this.card4.style.left = `-16px`;
    //   this.card4.style.transition = `left 1s`;
    //   this.card4.style.transitionTimingFunction = `cubic-bezier(0.1, 0.7, 1.0, 0.1)`;

    //   this.card3.style.top = `-16px`;
    //   this.card3.style.transition = `top 1s`;
    //   this.card4.style.top = `-16px`;
    //   this.card4.style.transition = `top 1s`;

    //   // card4.style.transition = "cubic-bezier(0.1, 0.7, 1, 0.1) 3s";
    // });




  }


  
}
