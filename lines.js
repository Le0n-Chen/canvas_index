var lines=[];
window.onload=function(){
    WINDOW_WIDTH=200;
    WINDOW_HEIGHT=40;
    MARGIN_LEFT=1;
    RADIUS=1;
    MARGIN_TOP=18;

    var canvas=document.getElementById('lines');
    var context=canvas.getContext("2d");

    canvas.width=WINDOW_WIDTH;
    canvas.height=WINDOW_HEIGHT;

    setInterval(
        function(){

            render(context);
            update();
        },
        50
    );

}
function render(cxt) {
    cxt.clearRect(0,0,WINDOW_WIDTH,WINDOW_HEIGHT);
    for(var i=0;i<lines.length;i++){    //lines[i].x
        cxt.fillStyle="#A09C9C";

        cxt.beginPath();
        cxt.rect(lines[i].x,MARGIN_TOP,1,6);
        cxt.closePath();

        cxt.fill();
    }

}
function update() {
    addLines(MARGIN_LEFT,MARGIN_TOP);
    console.log(lines.length);
    updateLines();
}


function addLines(x,y){
    var aLine={
        x:x,
        y:y,
        g:1.5+Math.random(),
        vx:4,
        vy:-5
    }

    lines.push(aLine);

}

function updateLines(){
    for(var i=0;i<lines.length;i++){
        lines[i].x+=lines[i].vx;
        lines[i].y+=lines[i].vy;
        lines[i].vy+=lines[i].g;
    }
     var cnt=0;
    for(var i=0;i<lines.length;i++){
        if(lines[i].x+RADIUS>0&&lines[i].x-RADIUS<WINDOW_WIDTH){ //如果还在画布里,将该元素放至数组前面
            lines[cnt++]=lines[i];
        }
    }
    while (lines.length>Math.min(300,cnt)) {//删除超出画布部分,控制数组长度(性能优化)
        lines.pop();
    }
}