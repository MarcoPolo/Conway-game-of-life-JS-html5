var size = 4;
var sizeX = 800;
var sizeY = 500;


sizeX /= size;
sizeY /= size;

var historyArray = [[]];

var canvas = document.getElementById('canvasElement');
var ctx = canvas.getContext('2d');


canvas.addEventListener('mousedown', draw, false);
canvas.addEventListener('mouseup', stopdraw, false);

toKill = [];
toCreate = [];

buildArray();

$(document).mousemove(function(e){
    mouseX = e.pageX - canvas.offsetLeft;
    mouseY = e.pageY - canvas.offsetTop;
});

function clear(){
    for (var i=0; i<sizeX; i++){
        for (var j=0; j<sizeY; j++){
            kill(i,j);
        }
    }
}

function resize(newX,newY){
    sizeX = newX/size;
    sizeY = newY/size;
}

function draw(){
    console.log('down woooo');
    x=Math.floor(mouseX/size);
    y=Math.floor(mouseY/size);
    if ( historyArray[x][y] ) {
        shouldcreate = false;
    }else{
        shouldcreate = true;
    }
    t = setInterval(function(){
        
        x=Math.floor(mouseX/size);
        y=Math.floor(mouseY/size);
        if ( shouldcreate) {
            create(x,y);
        }else{
            kill(x,y);
        }
    }, 10);
}


function stopdraw(e){
    console.log('up woooo');
    clearInterval(t);
}

function buildRandomData(length){
    for (var i=0;i<length;i++){
        create(Math.floor(Math.random()*sizeX),Math.floor(Math.random()*sizeY))
    }

}

function on_canvas_click(ev) {
        var x = ev.clientX - canvas.offsetLeft;
        var y = ev.clientY - canvas.offsetTop;
        x /= size
        y /= size
        x = Math.floor(x);
        y = Math.floor(y);
        console.log(x,y);
        if (historyArray[x][y]){
            kill(x,y)
        }else{
            create(x,y)
        }

        // ... x,y are the click coordinates relative to the
        // canvas itself
}




drawSquareAt = function(x,y){
    x *= size;
    y *= size;
    ctx.fillStyle = "rgba(0, 0, 0, 1)";  
    ctx.fillRect (x,y,size,size);
}

killSquareAt = function(x,y){
    x *= size;
    y *= size;
    ctx.fillStyle = "rgba(255, 255, 255, 1)";  
    ctx.fillRect (x,y,size,size);
}

function buildArray(){
    for (var i=0; i<sizeX; i++){
        historyArray[i]=[];
        for (var j=0; j<sizeY; j++){
            historyArray[i][j]=0;
        }
    }
}

kill = function (x,y){
    historyArray[x][y] = 0;
    killSquareAt(x,y);
}

create = function(x,y){
    historyArray[x][y] = 1;
    drawSquareAt(x,y);
}

startGame = function(x,y){
    for (var i=0; i<sizeX; i++){
        for (var j=0; j<sizeY; j++){
            checkNeighbors(i,j);
        }
    }

    for (var i = 0; i<toCreate.length; i++){
        create(toCreate[i][0],toCreate[i][1])
    }
    toCreate=[];


    for (var i = 0; i<toKill.length; i++){
        kill(toKill[i][0],toKill[i][1])
    }
    toKill=[];
}

checkNeighbors = function(x,y){
    var numbersAround = [[-1,-1],[0,-1],[1,-1],[-1,0],[1,0],[-1,1],[0,1],[1,1]];
    var count = 0;
    for (var i = 0; i < numbersAround.length; i++){
        xpart=x+numbersAround[i][0];
        ypart=y+numbersAround[i][1];
        if ( xpart < 0 || ypart < 0 || xpart >= sizeX || ypart >= sizeY ){
            continue;
        }
        count += historyArray[xpart][ypart];
    }

    if ( count < 2 && historyArray[x][y]){
        toKill.push([x,y]);
    }
    if ( count > 3 && historyArray[x][y] ) {
        toKill.push([x,y]);
    }
    if ( count == 3 ){
        toCreate.push([x,y]);
    }

    return count;
}

function playGame(){
    startGame();
    if (continueGame){
        setTimeout(function(){playGame()},gameInterval);
    }
}

function makeGun(startPos){
    var s = startPos;
    var d = startPos;
    create(s,d+2)
    create(s,d+3)
    create(s+1,d+2)
    create(s+1,d+3)
    create(s+8,d+3)
    create(s+8,d+4)
    create(s+9,d+2)
    create(s+9,d+4)
    create(s+10,d+2)
    create(s+10,d+3)
    create(s+16,d+4)
    create(s+16,d+5)
    create(s+16,d+6)
    create(s+17,d+4)
    create(s+18,d+5)
    create(s+22,d+1)
    create(s+22,d+2)
    create(s+23,d+0)
    create(s+23,d+2)
    create(s+24,d+0)
    create(s+24,d+1)
    create(s+24,d+12)
    create(s+24,d+13)
    create(s+25,d+12)
    create(s+25,d+14)
    create(s+26,d+12)
    create(s+34,d)
    create(s+34,d+1)
    create(s+35,d)
    create(s+35,d+1)
    create(s+35,d+7)
    create(s+35,d+8)
    create(s+35,d+9)
    create(s+36,d+7)
    create(s+37,d+8)

}

gameInterval = 100;
continueGame = true;

//make some gliders
create(30,30);
create(30,31);
create(30,32);
create(29,30);
create(28,31);

