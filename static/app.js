$(document).ready(function (){
    var socket = io(); //..................................1

    let clicksDisplay = document.getElementById("clicks"); //based on id of p tag
    let epicPush = document.getElementById("epic"); //based on id of button
    let resetPush = document.getElementById("reset"); //based on id of div

    socket.on('greeting', function (data) { //.......................4
        console.log(data.msg); //.........................5
        socket.emit('thankyou', { msg: 'Thank you for connecting me! -Client' }); //6
    });

    epicPush.addEventListener("click", function() {
        console.log("EPIC");
        socket.emit("epic");
    });

    resetPush.addEventListener("click", function() {
        console.log("RESET");
        socket.emit("reset");
    });

    socket.on('update', function(output) {
        clicksDisplay.innerHTML = output.countClicks;
    });
});