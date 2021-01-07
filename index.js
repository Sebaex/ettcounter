let socket = new ReconnectingWebSocket("ws://127.0.0.1:24050/ws");
let main = document.getElementById("main");
let h350 = document.getElementById("geki");
let h300 = document.getElementById("300");
let h200 = document.getElementById("katu");
let h100 = document.getElementById("100");
let h50 = document.getElementById("50");
let h0 = document.getElementById("miss");



socket.onopen = () => {
    console.log("Successfully Connected");
};

socket.onclose = event => {
    console.log("Socket Closed Connection: ", event);
    socket.send("Client Closed!")
};

socket.onerror = error => {
    console.log("Socket Error: ", error);
};

let tempState;

socket.onmessage = event => {
    let data = JSON.parse(event.data);
    if(tempState !== data.menu.state){
        tempState = data.menu.state;
        if(tempState == 2 ){
            main.style.opacity = 1;
        }
        else{
            main.style.opacity = 0;
        } 
    }
    if(data.gameplay.hits["geki"] > 0){
        h350.innerHTML = data.gameplay.hits["geki"]
    }else{
        h350.innerHTML = 0
    }
    if(data.gameplay.hits[300] > 0){
        h300.innerHTML = data.gameplay.hits[300]
    }else{
        h300.innerHTML = 0
    }
    if(data.gameplay.hits["katu"] > 0){
        h200.innerHTML = data.gameplay.hits["katu"]
    }else{
        h200.innerHTML = 0
    }
    if(data.gameplay.hits[100] > 0){
        h100.innerHTML = data.gameplay.hits[100]
    }else{
        h100.innerHTML = 0
    }
    if(data.gameplay.hits[50] > 0){
        h50.innerHTML = data.gameplay.hits[50]
    }else{
        h50.innerHTML = 0
    }
    if(data.gameplay.hits[0] > 0){
        h0.innerHTML = data.gameplay.hits[0]
    }else{
        h0.innerHTML = 0
    }
}
