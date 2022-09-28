let canvas = document.getElementById("canvas");
let ctx = canvas.getContext('2d');

let knight = new Image();
let joker = new Image();
let sword = new Image();
let bg = new Image();

const button_auth = document.getElementById("button_auth");
const button_reg = document.getElementById("button_reg");

const shadow_reg = document.querySelector("#shadow_reg");
const shadow_auth = document.querySelector("#shadow_auth");
const shadow_sessi = document.querySelector("#shadow_sessi");
const shadow_gameOver = document.querySelector("#shadow_gameOver");
const shadow_backSessi = document.querySelector("#shadow_backSessi");
const shadow_gameOut  = document.querySelector("#shadow_gameOut");

button_auth.addEventListener('click', () => {
    shadow_auth.classList.add('open');

    button_reg.classList.add('shadow');
    button_auth.classList.add('shadow');
});

button_reg.addEventListener('click', () => {
    shadow_reg.classList.add('open');

    button_reg.classList.add('shadow');
    button_auth.classList.add('shadow');
});

const authBtn = document.getElementById("authBtn");
const regBtn = document.getElementById("regBtn");

const sessiBtn1 = document.getElementById("sessiBtn1");
const sessiBtn2 = document.getElementById("sessiBtn2");
const sessiBtn3 = document.getElementById("sessiBtn3");

const gameOverBtn = document.getElementById("gameOverBtn");
const backSessiBtn = document.getElementById("backSessiBtn");
const backSessiOutBtn = document.getElementById("backSessiOutBtn");

function authLogPass() {
    const authLogInput = document.getElementById("authLog");
    const authPassInput = document.getElementById("authPass");

    server.login(authLogInput.value, authPassInput.value);
}

function regLogNamePass() {
    const regLogInput = document.getElementById("regLog");
    const regNameInput = document.getElementById("regName");
    const regPassInput = document.getElementById("regPass");

    server.registration(regLogInput.value,  regNameInput.value, regPassInput.value);
}

function sessiConnect1() {
    shadow_sessi.classList.remove('open');
    shadow_backSessi.classList.add('open');
    server.sessionId = 1;
    server.sessionOn(server.token, server.sessionId);
}
function sessiConnect2() {
    shadow_sessi.classList.remove('open');
    shadow_backSessi.classList.add('open');
    server.sessionId = 2;
    server.sessionOn(server.token, server.sessionId);
}
function sessiConnect3() {
    shadow_sessi.classList.remove('open');
    shadow_backSessi.classList.add('open');
    server.sessionId = 3;
    server.sessionOn(server.token, server.sessionId);
}

function gameOverScore() {
    shadow_gameOver.classList.remove('open');
    shadow_sessi.classList.add('open');
}

function backMenu() {
    play.rollback();
    server.die(server.token, server.gamerId);
    shadow_backSessi.classList.remove('open');
    shadow_gameOut.classList.add('open');
    document.getElementById('scoreGamerOut').innerHTML = server.score;
    server.score = 0;
}

function backMenuOut() {
    shadow_gameOut.classList.remove('open');
    shadow_sessi.classList.add('open');
}

class Server {
    constructor () {
        this.token = "";
        this.mapId = 0;
        this.mapName = "";
        this.sessionId = 0;
        this.gamerId = 0;
        this.score = 0;
    }

    async login (login, pass) {
        const data = await this.request(`/api/?method=login&login=${login}&pass=${pass}`);
        switch (data.status) {
            case 'OK': {
                this.token = data['data'];
                shadow_auth.classList.remove('open');
                shadow_sessi.classList.add('open');
                break;
            }
            case 'ERROR': {
                console.error('ERROR LOGIN');
                break;
            }
        }
    }

    async registration (login, name, pass) {
        const data = await this.request(`/api/?method=registration&login=${login}&name=${name}&pass=${pass}`);
        switch (data.status) {
            case 'OK': {
                this.token = data['data'];
                shadow_auth.classList.add('open');
                shadow_reg.classList.remove('open');
                break;
            }
            case 'ERROR': {
                console.error('ERROR REGISTRATION');
                break;
            }
        }
    }

    async sessionOn (token, sessionId) {
        const data = await this.request(`/api/?method=sessionOn&token=${token}&sessionId=${sessionId}`);
        switch (data.status) {
            case 'OK': {
                this.mapId = data['data'];
                server.getMap(server.token, server.mapId);
                break;
            }
            case 'ERROR': {
                console.error('ERROR SESSIOnON');
                break;
            }
        }
    }

    async getMap (token, mapId) {
        const data = await this.request(`/api/?method=getMap&token=${token}&mapId=${mapId}`);
        switch (data.status) {
            case 'OK': {
                this.mapName = data['data'];
                play.start();
                break;
            }
            case 'ERROR': {
                console.error('ERROR GEtMAP');
                break;
            }
        }
    }

    async createGamer (sessionId, token, x, y) {
        const data = await this.request(`/api/?method=createGamer&sessionId=${sessionId}&token=${token}&x=${x}&y=${y}`);

        switch (data.status) {
            case 'OK': {
                this.gamerId = data['data'];
                server.createSword(server.sessionId, server.token, play.xSwordShift, play.ySwordShift, play.rep);
                break;
            }
            case 'ERROR': {
                console.error('ERROR CREATeGAMER');
                break;
            }
        }
    }

    async createSword (sessionId, token, x, y, dir) {
        const data = await this.request(`/api/?method=createSword&sessionId=${sessionId}&token=${token}&x=${x}&y=${y}&dir=${dir}`);

        switch (data.status) {
            case 'OK': {

                break;
            }
            case 'ERROR': {
                console.error('ERROR CREATeSWORD');
                break;
            }
        }
    }

    async moveGamerSword (token, xG, yG, xS, yS, dirS) {
        const data = await this.request(`/api/?method=moveGamerSword&token=${token}&xG=${xG}&yG=${yG}&xS=${xS}&yS=${yS}&dirS=${dirS}`);
        switch (data.status) {
            case 'OK': {
                
                break;
            }
            case 'ERROR': {
                console.error('ERROR MOVeGAMErSWORD');
                break;
            }
        }
    }

    async moveGamer (token, x, y) {
        const data = await this.request(`/api/?method=moveGamer&token=${token}&x=${x}&y=${y}`);
        switch (data.status) {
            case 'OK': {
                
                break;
            }
            case 'ERROR': {
                console.error('ERROR MOVeGAMER');
                break;
            }
        }
    }

    async moveSword (token, x, y, dir) {
        const data = await this.request(`/api/?method=moveSword&token=${token}&x=${x}&y=${y}&dir=${dir}`);

        switch (data.status) {
            case 'OK': {
                break;
            }
            case 'ERROR': {
                console.error('ERROR MOVeSWORD');
                break;
            }
        }
    }

    async drawGamerSword (token, sessionId) {
        const data = await this.request(`/api/?method=drawGamerSword&token=${token}&sessionId=${sessionId}`);

        switch (data.status) {
            case 'OK': {
                play.requestAnimationFrame(data);
                break;
            }
            case 'ERROR': {
                console.error('ERROR DRAwGAMErSWORD');
                break;
            }
        }
    }

    async kill (token, idGamer, idKiller) {
        const data = await this.request(`/api/?method=kill&token=${token}&idGamer=${idGamer}&idKiller=${idKiller}`);
        switch (data.status) {
            case 'OK': {
                this.score = data['data'];
                break;
            }
            case 'ERROR': {
                console.error('ERROR KILL');
                break;
            }
        }
    }

    async die (token, idGamer) {
        const data = await this.request(`/api/?method=die&token=${token}&idGamer=${idGamer}`);
        switch (data.status) {
            case 'OK': {
                break;
            }
            case 'ERROR': {
                console.error('ERROR DIE');
                break;
            }
        }
    }

    async getScore(token) {
        const data = await this.request(`/api/?method=getScore&token=${token}`);
        switch (data.status) {
            case 'OK': {
                
                break;
            }
            case 'ERROR': {
                console.error('ERROR getScore');
                break;
            }
        }
    }
    
    async request(url) {
        const response = await fetch(url);
        return await response.json();
    }
}

let play = new Play();
let server = new Server();
authBtn.onclick = authLogPass;
regBtn.onclick = regLogNamePass;
sessiBtn1.onclick = sessiConnect1;
sessiBtn2.onclick = sessiConnect2;
sessiBtn3.onclick = sessiConnect3;
gameOverBtn.onclick = gameOverScore;
backSessiBtn.onclick = backMenu;
backSessiOutBtn.onclick = backMenuOut;