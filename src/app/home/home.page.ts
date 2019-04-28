import { Component , OnInit , Input , ViewChild} from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'], 
})

export class HomePage  implements OnInit  {
 

  // internal use varialbes 
  history : any;
  formulas : any ;

  // Variables for calulations
  calcValues : any;
  currentVal : any ;

  // variables for view on html page
  calcView : any; // to view the values
  calcViewHistory : any ;
  resultView : any; // to view the total result 
  constructor() { 
    this.currentVal = [];
    this.calcValues = [];
    this.calcViewHistory = [];
    this.calcView = '';
    if(this.calcViewHistory > 0){
      this.resultView = this.renderValues();
    }else{
      this.resultView = '';
    }
  }

  
  ngOnInit() {
  
  }

  stackCurrentView (){
    var x = this.renderValues();
    this.calcViewHistory = [];
    this.calcViewHistory.push(x);
    this.resultView = x;
    this.calcView = x;
  }

  stepBack(){
    this.calcViewHistory.pop();
    console.log('calcViewHistory',this.calcViewHistory);
    this.resultView = this.renderValues();
    this.renderPrintView();
  }

  addValue(x){
    //console.log('loading values' , x);
      let ps = false;
      this.currentVal.push(x);
      this.calcView += x;
      if(this.calcViewHistory.length > 0){
        let t = this.calcViewHistory[this.calcViewHistory.length - 1];
        if(t.includes('.')){
          if(x != '.'){
            ps = true;
          }
        }else{
          ps = true;
        }
        if(ps){
          if(t == '+' || t == '-' || t == 'x' || t == '/'){
            this.calcViewHistory.push(x);
          }else{
            this.calcViewHistory[this.calcViewHistory.length - 1] = t.toString() + x.toString();
          }
        }
      }else{
        this.calcViewHistory.push(x);
      }
      console.log('calcViewHistory after add' , this.calcViewHistory);
      this.renderPrintView();
  

    this.resultView = this.renderValues();
  }

  geoFunc (x){
    let s = 0.0;
    switch (x){
      case 'sin':
        s = this.sinDegrees(this.resultView);
      break;
      case 'cos':
        s = this.cosDegrees(this.resultView);
      break;
      case 'tan':
        s = this.tanDegrees(this.resultView);
      break;
      case 'c-tan':
      s = this.aTanDegrees(this.resultView);
      break;
    }
    s = parseFloat(s.toFixed(4));
    this.calcViewHistory[this.calcViewHistory.length - 1] = s.toString();
    this.resultView = s;
    console.log('calcViewHistory after geoFnuc' , this.calcViewHistory);
  }

  addOperator(x){
    if(this.calcViewHistory.length > 0){ // to avoid the opr before values
      let t = this.calcViewHistory[this.calcViewHistory.length - 1];
      if(!(t == '+' || t == '-' || t == 'x' || t == '/')){ // to avoid the duplicate or 2 opr in list
        let sumStr = '0';
        for(let i = 0 ; i < this.currentVal.length ; i++){
          sumStr += this.currentVal[i];
        }
        this.currentVal = [] ;
        this.calcValues.push({'f':x , 'v':parseFloat(sumStr)});
        this.resultView = this.renderValues();
        this.calcViewHistory.push(x);
        this.renderPrintView();
      }  
    }
  }

  renderPrintView (){
    this.calcView = '';
    for(let i = 0 ; i < this.calcViewHistory.length ; i++){
      this.calcView += this.calcViewHistory[i] + ' ';
    }
  }

  renderValues (){
    let sRes = 0.0 ;
    let f  = '';
    let iOpr = '';
    for(let i = 0 ; i < this.calcViewHistory.length ; i++){
     let val =  this.calcViewHistory[i];
      //console.log('val',val);
      if(val == '+' || val == '-'  || val == 'x'  || val == '/'){
        iOpr = val ;
      }else{
        val = parseFloat(val);
        console.log('else iOpr' , iOpr , val , sRes  + val);
        switch (iOpr){
          case '+': 
            sRes = sRes  + val ;
          break;
          case '-': 
            sRes -= val;
          break;
          case 'x': 
            sRes *= val;
          break;
          case '/': 
            sRes /= val;
          break;
          default :
            sRes = val;
          break;
        }
      }
    }
    //console.log('sRes',sRes);
    if(sRes.toString().includes('.')){
      return sRes.toFixed(2) ;
    }else{
      return sRes ;
    }
   
  }

  // reset screen
  ac(){
    this.calcValues = [];
    this.calcViewHistory = [];
    this.calcView = '';
    if(this.calcViewHistory > 0){
      this.resultView = this.renderValues();
    }else{
      this.resultView = '';
    }
  }

  toDegree(r){
    return r * (180/Math.PI);
  }
  
  sinDegrees(angleDegrees) {
    return Math.sin(angleDegrees*Math.PI/180);
  }

  cosDegrees(angleDegrees) {
    return Math.cos(angleDegrees*Math.PI/180);
  }

  tanDegrees(angleDegrees) {
    return Math.tan(angleDegrees*Math.PI/180);
  }

  aTanDegrees(angleDegrees) {
    return Math.atan(angleDegrees)  * 180 / Math.PI;
  }

  

}
  