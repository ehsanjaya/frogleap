var container = document.getElementById("container");
var player = document.getElementById("player");
var playerLeft = player.offsetLeft;
var playerTop = player.offsetTop;
var life = document.getElementById("life");
var playerLife = 3;
var score = document.getElementById("score");
var playerScore = 0;
var pause = false;

document.addEventListener("keydown",function(event){
    if(event.keyCode == 38)
    {
        player.style.transform = "scaleY(1)";
        player.classList.add("playerJump");
        playerTop-=98;
        setTimeout(function(){
            player.classList.remove("playerJump");
        },140);
    }
    else if(event.keyCode == 40)
    {
        player.style.transform = "scaleY(-1)";
        player.classList.add("playerJump");
        playerTop+=98;
        setTimeout(function(){
            player.classList.remove("playerJump");
        },140);
    }
    else if(event.keyCode == 37)
    {
        player.classList.add("playerJump");
        playerLeft-=98;
        setTimeout(function(){
            player.classList.remove("playerJump");
        },140);
    }
    else if(event.keyCode == 39)
    {
        player.classList.add("playerJump");
        playerLeft+=98;
        setTimeout(function(){
            player.classList.remove("playerJump");
        },140);
    }
    player.style.left = playerLeft + "px";
    player.style.top = playerTop + "px";
    var coins = document.getElementsByClassName("coin");
    for(var i = 0;i < coins.length;i++)
    {
        var coin = coins[i];
        if(touching(player, coin))
        {
            coin.remove();
            playerScore++;
            score.innerHTML = "score:" + playerScore;
        }
    }
});

document.addEventListener("keydown", function(event){
    if(event.keyCode == 32)
    {
        if(pause == false)
        {
            pause = true;
        }
        else
        {
            pause = false;
        }
    }
});

var createCoinInterval = setInterval(function(){
    var width = document.body.offsetWidth;
    var height = document.body.offsetHeight;
    var coins = document.getElementsByClassName("coin");
    if(coins.length < 4)
    {
        var coin = document.createElement("div");
        container.append(coin);
        coin.className = "coin";
        var left = Math.floor(Math.random()*width);
        var top = Math.floor(Math.random()*height);
        coin.style.left = left + "px";
        coin.style.top = top + "px";
    }
},1000);

var createVehicle1Interval = setInterval(function(){
    if(!pause)
    {
        var width = document.body.offsetWidth;
        createVehicle("motorcycle", width - 300, 170);
    }
},2700);

var moveLeftVehicle1Interval = setInterval(function(){
    if(!pause) 
    {
        var vehicles = document.getElementsByClassName("motorcycle");
        for(var i = 0;i < vehicles.length;i++)
        {
            var vehicle = vehicles[i];
            var vehicleLeft = vehicle.offsetLeft;
            vehicleLeft-=7;
            vehicle.style.left = vehicleLeft + "px";
            if(vehicleLeft <= 0)
            {
                vehicle.remove();
            }

            if(touching(player,vehicle))
            {
                die(player);
            }

            if(playerLife == 0)
            {
                stop();
            }
        }
    }
},27);

var createVehicle2Interval = setInterval(function(){
    if(!pause)
    {
        createVehicle("car1", 0, 440);
    }
},2700);

var moveRightVehicle2Interval = setInterval(function(){
    if(!pause)
    {
        var width = document.body.offsetWidth;
        var vehicles = document.getElementsByClassName("car1");
        for(var i = 0;i < vehicles.length;i++)
        {
            var vehicle = vehicles[i];
            var vehicleLeft = vehicle.offsetLeft;
            vehicleLeft+=7;
            vehicle.style.left = vehicleLeft + "px";
            vehicle.style.transform = "scaleX(-1)";
            if(vehicleLeft >= width - 300)
            {
                vehicle.remove();
            }

            if(touching(player,vehicle))
            {
                die(player);
            }
            
            if(playerLife == 0)
            {
                stop();
            }
        }
    }
},27);

var createVehicle3Interval = setInterval(function(){
    if(!pause)
    {
        var width = document.body.offsetWidth;
        createVehicle("car2", width - 300, 700);
    }
},2700);

var moveLeftVehicle3Interval = setInterval(function(){
    if(!pause)
    {
        var vehicles = document.getElementsByClassName("car2");
        for(var i = 0;i < vehicles.length;i++)
        {
            var vehicle = vehicles[i];
            var vehicleLeft = vehicle.offsetLeft;
            vehicleLeft-=7;
            vehicle.style.left = vehicleLeft + "px";
            if(vehicleLeft <= 0)
            {
                vehicle.remove();
            }

            if(touching(player,vehicle))
            {
                die(player);
            }

            if(playerLife == 0)
            {
                stop();
            }
        }
    }
},27);

function touching(element1,element2)
{
    var rect1 = element1.getBoundingClientRect();
    var rect2 = element2.getBoundingClientRect();

    var overlap = !(rect1.right < rect2.left || rect2.right < rect1.left || rect1.bottom < rect2.top || rect2.bottom < rect1.top);
    return overlap;
}

function die(player)
{
    pause = true;
    player.classList.add("player-die");
    playerLife--;
    life.innerHTML = "life:" + playerLife;
    setTimeout(function(){
        var width = document.body.offsetWidth;
        var height = document.body.offsetHeight;
        player.classList.remove("player-die");
        playerLeft = width / 2;
        playerTop = height - 70;
        player.style.left = playerLeft + "px";
        player.style.top = playerTop + "px";
        pause = false;
    },1000);
}

function createVehicle(className, left, bottom)
{
    var width = document.body.offsetWidth;
    var vehicle = document.createElement("div");
    container.append(vehicle);
    vehicle.className = className;
    vehicle.style.left = left + "px";
    vehicle.style.bottom = bottom + "px";
}
function stop()
{
    clearInterval(createCoinInterval);
    clearInterval(createVehicle1Interval);
    clearInterval(moveLeftVehicle1Interval);
    clearInterval(createVehicle2Interval);
    clearInterval(moveRightVehicle2Interval);
    clearInterval(createVehicle3Interval);
    clearInterval(moveLeftVehicle3Interval);
}