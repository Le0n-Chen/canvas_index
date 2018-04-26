var WINDOW_WIDTH=1024;
var WINDOW_HEIGHT=768
var RADIUS=8;
var MARGIN_TOP=60;
var MARGIN_LEFT=30;

const endTime = new Date(2018,3,28,18,47,52);// js中月份特殊，0-11表示1-12月
var curShowTimeSeconds=0;
window.onload=function(){
    var canvas=document.getElementById('canvas');
    var context=canvas.getContext("2d");

    canvas.width=WINDOW_WIDTH;
    canvas.height=WINDOW_HEIGHT;

    curShowTimeSeconds=getCurrentShowTImeSeconds(); //本次render使用的倒计时时间（时间差）
    setInterval(
        function(){
            render(context);
            update();
        },
        50
    );
}
function getCurrentShowTImeSeconds(){  //计算倒计时时间
    var curTime=new Date();
    var ret=endTime.getTime()-curTime.getTime();
    ret = Math.round(ret/1000);

    return ret>=0?ret:0;
}

function update(){
    var nextShowTimeSeconds=getCurrentShowTImeSeconds();//render后再次计算倒计时


    var nextHours=parseInt(nextShowTimeSeconds/3600);    //计算当前时间
    var nextMinutes=parseInt((nextShowTimeSeconds-nextHours*3600)/60);
    var nextSeconds=nextShowTimeSeconds%60;

    var curHours=parseInt(curShowTimeSeconds/3600);        //计算render时间（上一次）
    var curMinutes=parseInt((curShowTimeSeconds-curHours*3600)/60);
    var curSeconds=curShowTimeSeconds%60;

    if(nextSeconds!=curSeconds){
        curShowTimeSeconds=nextShowTimeSeconds;
    }
}
function render(cxt){                     //主要渲染静态页面函数
    cxt.clearRect(0,0,WINDOW_WIDTH,WINDOW_HEIGHT);//防止render重叠，对整个页面进行刷新
    var hours=parseInt(curShowTimeSeconds/3600);
    var minutes=parseInt((curShowTimeSeconds-hours*3600)/60);
    var seconds=curShowTimeSeconds%60;

    renderDigit( MARGIN_LEFT , MARGIN_TOP , parseInt(hours/10) , cxt )
    renderDigit( MARGIN_LEFT + 15*(RADIUS+1) , MARGIN_TOP , parseInt(hours%10) , cxt )
    renderDigit( MARGIN_LEFT + 30*(RADIUS + 1) , MARGIN_TOP , 10 , cxt )
    renderDigit( MARGIN_LEFT + 39*(RADIUS+1) , MARGIN_TOP , parseInt(minutes/10) , cxt);
    renderDigit( MARGIN_LEFT + 54*(RADIUS+1) , MARGIN_TOP , parseInt(minutes%10) , cxt);
    renderDigit( MARGIN_LEFT + 69*(RADIUS+1) , MARGIN_TOP , 10 , cxt);
    renderDigit( MARGIN_LEFT + 78*(RADIUS+1) , MARGIN_TOP , parseInt(seconds/10) , cxt);
    renderDigit( MARGIN_LEFT + 93*(RADIUS+1) , MARGIN_TOP , parseInt(seconds%10) , cxt);
}

function renderDigit(x,y,num,cxt){
    cxt.fillStyle='rgb(1,102,153)';

    for(var i=0;i<digit[num].length;i++){
        for(var j=0;j<digit[num][i].length;j++){
            if(digit[num][i][j]==1){
                cxt.beginPath();
                cxt.arc(x+j*2*(RADIUS+1)+(RADIUS+1),y+i*2*(RADIUS+1)+(RADIUS+1),RADIUS,0,2*Math.PI);
                cxt.closePath();
                cxt.fill();
            }
        }
    }
}
