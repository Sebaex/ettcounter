let socket = new ReconnectingWebSocket("ws://127.0.0.1:24050/ws");
let main = document.getElementById("main");
let judgelist = document.getElementById("judges").getElementsByTagName("div");
let numberlist = document.getElementById("numbers").getElementsByTagName("div");
//Judges
let marv = document.getElementById("marv")
let perf = document.getElementById("perf")
let great = document.getElementById("great")
let good = document.getElementById("good")
let bad = document.getElementById("bad")
let missed = document.getElementById("missed")
let ur = document.getElementById("ur")

//Counters
let h350 = document.getElementById("geki");
let h300 = document.getElementById("300");
let h200 = document.getElementById("katu");
let h100 = document.getElementById("100");
let h50 = document.getElementById("50");
let h0 = document.getElementById("miss");
let urValue = document.getElementById("urCount")

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


socket.onmessage = event => {
    let data = JSON.parse(event.data);
    if (data.menu.state == 2) {
        main.style.opacity = 1;
        //Reset counters visibility
        for (i = 0; i < judgelist.length; i++) {
            var judge = judgelist[i];
            judge.style.removeProperty("display")
        }
        for (i = 0; i < numberlist.length; i++) {
            var counter = numberlist[i];
            counter.style.removeProperty("display")
        }
        switch (data.gameplay.gameMode) {
            case 0: //Standard
                //Rename counters
                perf.innerHTML = "300";
                good.innerHTML = "100";
                bad.innerHTML = "50"
                missed.innerHTML = "Miss"
                ur.innerHTML = "UR"
                //Hide unused counters
                marv.style.display = "none"
                great.style.display = "none"
                h350.style.display = "none"
                h200.style.display = "none"
                //Correct hit counters
                if (data.gameplay.hits[300] > 0) {
                    h300.innerHTML = data.gameplay.hits[300] + data.gameplay.hits["geki"]
                } else {
                    h300.innerHTML = 0
                }
                if (data.gameplay.hits[100] > 0) {
                    h100.innerHTML = data.gameplay.hits[100] + data.gameplay.hits["katu"]
                } else {
                    h100.innerHTML = 0
                }
                if (data.gameplay.hits[50] > 0) {
                    h50.innerHTML = data.gameplay.hits[50]
                } else {
                    h50.innerHTML = 0
                }
                if (data.gameplay.hits[0] > 0) {
                    h0.innerHTML = data.gameplay.hits[0]
                } else {
                    h0.innerHTML = 0
                }
                if (data.gameplay.hits.unstableRate != '') {
                    urCount.innerHTML = data.gameplay.hits.unstableRate.toFixed(2)
                } else {
                    urCount.innerHTML=0
                }
                break;
            case 1: //Taiko
                //Rename counters
                perf.innerHTML = "良"
                good.innerHTML = "可"
                missed.innerHTML = "不可"
                ur.innerHTML = "UR"
                //Hide unused counters
                marv.style.display = "none"
                great.style.display = "none"
                bad.style.display = "none"
                h350.style.display = "none"
                h200.style.display = "none"
                h50.style.display = "none"
                //Correct hit counters
                if (data.gameplay.hits[300] > 0) {
                    h300.innerHTML = data.gameplay.hits[300]
                } else {
                    h300.innerHTML = 0
                }
                if (data.gameplay.hits[100] > 0) {
                    h100.innerHTML = data.gameplay.hits[100]
                } else {
                    h100.innerHTML = 0
                }
                if (data.gameplay.hits[0] > 0) {
                    h0.innerHTML = data.gameplay.hits[0]
                } else {
                    h0.innerHTML = 0
                }
                if (data.gameplay.hits.unstableRate != '') {
                    urCount.innerHTML = data.gameplay.hits.unstableRate.toFixed(2)
                } else {
                    urCount.innerHTML=0
                }
                break;
            case 2: //CTB
                //Rename counters
                perf.innerHTML = "300"
                good.innerHTML = "100"
                bad.innerHTML = "50"
                missed.innerHTML = "Miss"
                //Hide unused counters
                marv.style.display = "none"
                great.style.display = "none"
                ur.style.display = "none"
                h350.style.display = "none"
                h200.style.display = "none"
                urValue.style.display = "none"
                //Correct hit counters
                if (data.gameplay.hits[300] > 0) {
                    h300.innerHTML = data.gameplay.hits[300]
                } else {
                    h300.innerHTML = 0
                }
                if (data.gameplay.hits[100] > 0) {
                    h100.innerHTML = data.gameplay.hits[100]
                } else {
                    h100.innerHTML = 0
                }
                if (data.gameplay.hits[50] > 0) {
                    h50.innerHTML = data.gameplay.hits[50]
                } else {
                    h50.innerHTML = 0
                }
                if (data.gameplay.hits[0] > 0) {
                    h0.innerHTML = data.gameplay.hits[0]
                } else {
                    h0.innerHTML = 0
                }
                break;
            case 3: // Mania
                marv.innerHTML = "MA"
                perf.innerHTML = "PR"
                great.innerHTML = "GR"
                good.innerHTML = "GD"
                bad.innerHTML = "BD"
                missed.innerHTML = "MS"
                ur.innerHTML = "UR"
                if (data.gameplay.hits["geki"] > 0) {
                    h350.innerHTML = data.gameplay.hits["geki"]
                } else {
                    h350.innerHTML = 0
                }
                if (data.gameplay.hits[300] > 0) {
                    h300.innerHTML = data.gameplay.hits[300]
                } else {
                    h300.innerHTML = 0
                }
                if (data.gameplay.hits["katu"] > 0) {
                    h200.innerHTML = data.gameplay.hits["katu"]
                } else {
                    h200.innerHTML = 0
                }
                if (data.gameplay.hits[100] > 0) {
                    h100.innerHTML = data.gameplay.hits[100]
                } else {
                    h100.innerHTML = 0
                }
                if (data.gameplay.hits[50] > 0) {
                    h50.innerHTML = data.gameplay.hits[50]
                } else {
                    h50.innerHTML = 0
                }
                if (data.gameplay.hits[0] > 0) {
                    h0.innerHTML = data.gameplay.hits[0]
                } else {
                    h0.innerHTML = 0
                }
                if (data.gameplay.hits.unstableRate != '') {
                    urCount.innerHTML = data.gameplay.hits.unstableRate.toFixed(2)
                } else {
                    urCount.innerHTML=0
                }
                break;
        }
    }
    else {
        main.style.opacity = 0;
    }
}