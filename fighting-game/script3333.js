class Play {
    constructor() {

    this.createGamer = this.createGamer.bind(this);
    this.checkCollision = this.checkCollision.bind(this);
    this.pushEnemy = this.pushEnemy.bind(this);
    this.revivalEnemy = this.revivalEnemy.bind(this);
    this.drawEnemy = this.drawEnemy.bind(this);
    this.leftSwordShift = this.leftSwordShift.bind(this);
    this.upSwordShift = this.upSwordShift.bind(this);
    this.rightSwordShift = this.rightSwordShift.bind(this);
    this.downSwordShift = this.downSwordShift.bind(this);
    this.randSword = this.randSword.bind(this);
    this.L = this.L.bind(this);
    this.U = this.U.bind(this);
    this.R = this.R.bind(this);
    this.D = this.D.bind(this);
    this.F = this.F.bind(this);
    this.left = this.left.bind(this);
    this.up = this.up.bind(this);
    this.right = this.right.bind(this);
    this.down = this.down.bind(this);
    this.addKeyDown = this.addKeyDown.bind(this);
    this.addKeyUp = this.addKeyUp.bind(this);
    this.addMouseDown = this.addMouseDown.bind(this);
    this.draw = this.draw.bind(this);
    this.drawGamer = this.drawGamer.bind(this);
    this.mapName = this.mapName.bind(this);
    this.serverDrawGamer = this.serverDrawGamer.bind(this);
    this.checkOnload = this.checkOnload.bind(this);
    this.start = this.start.bind(this);


    canvas.width = 500;
    canvas.height = 500;

    knight.src = "img/knight.png";
    joker.src = "img/joker.png";
    sword.src = "img/sword02.png";

    this.xPosKnight = 10;
    this.yPosKnight = 150;

    this.xSwordShift = 10;
    this.ySwordShift = 110;

    this.xRand = 0; 
    this.yRand = 0;
    this.rSword = 0;
    this.rep = 2; // (repeat) rSword <-

    this.spawnRate = 2000; // /1000 = ? sec
    this.swordShiftRate = 1000;
    this.drawSpeed = 100;

    this.step = 5; // step hero
    this.delay = 100;

    this.requestBackLeft = null;
    this.requestBackUp = null;
    this.requestBackRight = null;
    this.requestBackDown = null;

    this.timerLeft = null;
    this.timerUp = null;
    this.timerRight = null;
    this.timerDown = null;

    this.hb = 40; // hitbox (hb x hb)
    this.cp = 50; // character texture (cp x cp)
    this.ss = 40; // sword shift

    this.NEnemys = 30; // number of enemies
    this.flag = true;
    this.enemy = [];
    }

    createGamer() {
        server.createGamer(server.sessionId, server.token, this.xPosKnight, this.yPosKnight);
    }

    checkCollision (xRand, yRand) { 

        for (let i = 0; i < this.enemy.length; i++)
        if(this.enemy[i].x+this.cp >= xRand && 
            this.enemy[i].x < xRand+this.cp && 
            this.enemy[i].y+this.cp >= yRand && 
            this.enemy[i].y < yRand+this.cp)
            return false;
        
        if(this.xPosKnight+this.cp >= xRand && 
            this.xPosKnight < xRand+this.cp && 
            this.yPosKnight+this.cp >= yRand && 
            this.yPosKnight < yRand+this.cp)
            return false;  
            
        if(xRand < 0 ||
            xRand+this.cp >  canvas.width ||
            yRand < 0 ||
            yRand+this.cp >  canvas.height)
            return false;
                
        return true;
    }

    pushEnemy() {
        for (let i = 0; i < 3; i++){
            this.xRand = Math.floor(Math.random()*  canvas.width);
            this.yRand = Math.floor(Math.random()*  canvas.height);

            if(this.checkCollision(this.xRand, this.yRand)) {
                this.enemy.push({
                    x : this.xRand,
                    y : this.yRand,
                    die : false
                    });
                return;
            }
        }
    }

    revivalEnemy() {
        for (let i = 0; i < this.enemy.length; i++) {
            if (this.enemy[i].die == true) {  
                for (let j = 0; j < 3; j++) {
                    this.xRand = Math.floor(Math.random()*  canvas.width);
                    this.yRand = Math.floor(Math.random()*  canvas.height);

                    if(this.checkCollision (this.xRand, this.yRand)) {
                        this.enemy[i].die = false;
                        this.enemy[i].x = this.xRand;
                        this.enemy[i].y = this.yRand;
                        return;
                    }
                }
            }
        }
    }

    drawEnemy() {
        for(let i = 0; i < this.enemy.length; i++) {
            switch (this.rep) {
                case 1:
                case 3: {
                    if(this.xSwordShift + this.hb > this.enemy[i].x && 
                        this.xSwordShift < this.enemy[i].x + this.hb && 
                        this.ySwordShift + this.hb/2 - 5 > this.enemy[i].y && 
                        this.ySwordShift < this.enemy[i].y + this.hb/2 + 5) {
                            this.enemy[i].die = true;
                    }
                    else if (this.enemy[i].die == false) {
                        joker.onload = ctx.drawImage(joker, this.enemy[i].x, this.enemy[i].y, this.cp, this.cp);
                    }
                    break;
                }
                case 2:
                case 4: {
                    if(this.xSwordShift + this.hb/2 - 5 > this.enemy[i].x && 
                        this.xSwordShift < this.enemy[i].x + this.hb/2 + 5 && 
                        this.ySwordShift + this.hb > this.enemy[i].y && 
                        this.ySwordShift < this.enemy[i].y + this.hb) {
                            this.enemy[i].die = true;
                    }
                    else if (this.enemy[i].die == false) {
                        joker.onload = ctx.drawImage(joker, this.enemy[i].x, this.enemy[i].y, this.cp, this.cp);
                    }
                    break;
                }
            }
        }
    }

    leftSwordShift () {
        switch (this.rep) {
            case 2: {
                server.moveSword(server.token, this.xSwordShift - this.ss, this.ySwordShift + this.ss);
                this.xSwordShift -= this.ss;
                this.ySwordShift += this.ss;
                break;
            }
            case 3: {
                server.moveSword(server.token, this.xSwordShift - 2*this.ss, this.ySwordShift);
                this.xSwordShift -= 2*this.ss;
                break;
            }
            case 4: {
                server.moveSword(server.token, this.xSwordShift - this.ss, this.ySwordShift - this.ss);
                this.xSwordShift -= this.ss;
                this.ySwordShift -= this.ss;
                break;
            }
        }
        this.rep = 1;
        sword.src = "img/sword01.png";
    }
    upSwordShift () {
        switch (this.rep) {
            case 1: {
                server.moveSword(server.token, this.xSwordShift + this.ss, this.ySwordShift - this.ss);
                this.xSwordShift += this.ss;
                this.ySwordShift -= this.ss;
                break;
            }
            case 3: {
                server.moveSword(server.token, this.xSwordShift - this.ss, this.ySwordShift - this.ss);
                this.xSwordShift -= this.ss;
                this.ySwordShift -= this.ss;
                break;
            }
            case 4: {
                server.moveSword(server.token, this.xSwordShift, this.ySwordShift - 2*this.ss);
                this.ySwordShift -= 2*this.ss;
                break;
            }
        }
        this.rep = 2;
        sword.src = "img/sword02.png";
    }
    rightSwordShift () {
        switch (this.rep) {
            case 1: {
                server.moveSword(server.token, this.xSwordShift + 2*this.ss, this.ySwordShift);
                this.xSwordShift += 2*this.ss;
                break;
            }
            case 2: {
                server.moveSword(server.token, this.xSwordShift + this.ss, this.ySwordShift + this.ss);
                this.xSwordShift += this.ss;
                this.ySwordShift += this.ss;
                break;
            }
            case 4: {
                server.moveSword(server.token, this.xSwordShift + this.ss, this.ySwordShift - this.ss);
                this.xSwordShift += this.ss;
                this.ySwordShift -= this.ss;
                break;
            }
        }
        this.rep = 3;  
        sword.src = "img/sword03.png";
    }
    downSwordShift () {
        switch (this.rep) {
            case 1: {
                server.moveSword(server.token, this.xSwordShift + this.ss, this.ySwordShift + this.ss);
                this.xSwordShift += this.ss;
                this.ySwordShift += this.ss;
                break;
            }
            case 2: {
                server.moveSword(server.token, this.xSwordShift, this.ySwordShift + 2*this.ss);
                this.ySwordShift += 2*this.ss;
                break;
            }
            case 3: {
                server.moveSword(server.token, this.xSwordShift - this.ss, this.ySwordShift + this.ss);
                this.xSwordShift -= this.ss;
                this.ySwordShift += this.ss;
                break;
            }
        }
        this.rep = 4;
        sword.src = "img/sword04.png";
    }

    randSword () {
        this.rSword = Math.floor(Math.random()* 4)+1;
        switch (this.rSword) {
            case 1:
                if (this.rep == this.rSword) {
                    this.rSword = Math.floor(Math.random()* 3)+1;
                    switch (this.rSword) {
                        case 1:
                            this.upSwordShift();
                            break;
                        case 2:
                            this.rightSwordShift(); 
                            break;
                        case 3:
                            this.downSwordShift();
                            break;
                    }
                } 
                else {
                    this.leftSwordShift();
                    break;
                }
            case 2:
                if (this.rep == this.rSword) {
                    this.rSword = Math.floor(Math.random()* 3)+1;
                    switch (this.rSword) {
                        case 1:
                            this.leftSwordShift();
                            break;
                        case 2:
                            this.rightSwordShift(); 
                            break;
                        case 3:
                            this.downSwordShift();
                            break;
                    }
                } 
                else {
                    this.upSwordShift();
                    break;
                }
            case 3:
                if (this.rep == this.rSword) {
                    this.rSword = Math.floor(Math.random()* 3)+1;
                    switch (this.rSword) {
                        case 1:
                            this.leftSwordShift();
                            break;
                        case 2:
                            this.upSwordShift(); 
                            break;
                        case 3:
                            this.downSwordShift();
                            break;
                    }
                }
                else {
                    this.rightSwordShift(); 
                    break;
                }
            case 4:
                if (this.rep == this.rSword) {
                    this.rSword = Math.floor(Math.random()* 3)+1;
                    switch (this.rSword) {
                        case 1:
                            this.leftSwordShift();
                            break;
                        case 2:
                            this.upSwordShift(); 
                            break;
                        case 3:
                            this.rightSwordShift();
                            break;
                    }
                } 
                else {
                    this.downSwordShift(); 
                    break;
                }
        }
    }

    L () {
        //this.requestBackLeft = this.left;
    }
    U () {
        //this.requestBackUp this.up;
    }
    R () {
       // this.requestBackRight this.right;
    }
    D () {
        //this.requestBackDown = this.down;
    }

    left() {
        if (this.xPosKnight - this.step >= 0) {
            // server.moveGamer(server.token, this.xPosKnight - this.step, this.yPosKnight);
            // server.moveSword(server.token, this.xSwordShift - this.step, this.ySwordShift);
            server.moveGamerSword(server.token, this.xPosKnight - this.step, this.yPosKnight, this.xSwordShift - this.step, this.ySwordShift);
            this.xPosKnight -= this.step;
            this.xSwordShift -= this.step;
            this.timerLeft = setTimeout(this.L, this.delay);
        }
    }
    up() {
        if (this.yPosKnight - this.step >= 0) {
            // server.moveGamer(server.token, this.xPosKnight, this.yPosKnight - this.step);
            // server.moveSword(server.token, this.xSwordShift, this.ySwordShift - this.step);
            server.moveGamerSword(server.token, this.xPosKnight, this.yPosKnight - this.step, this.xSwordShift, this.ySwordShift - this.step);
            this.yPosKnight -= this.step;
            this.ySwordShift -= this.step;
            this.timerUp = setTimeout(this.U, this.delay);
        }
    }
    right() {
        if (this.xPosKnight + this.step + this.cp <=  canvas.width) {
            // server.moveGamer(server.token, this.xPosKnight + this.step, this.yPosKnight);
            // server.moveSword(server.token, this.xSwordShift + this.step, this.ySwordShift);
            server.moveGamerSword(server.token, this.xPosKnight + this.step, this.yPosKnight, this.xSwordShift + this.step, this.ySwordShift);
            this.xPosKnight += this.step;
            this.xSwordShift += this.step;
            this.timerRight = setTimeout(this.R, this.delay);
        }
    }
    down() {
        if (this.yPosKnight + this.step + this.cp <=  canvas.height) {
            // server.moveGamer(server.token, this.xPosKnight, this.yPosKnight + this.step);
            // server.moveSword(server.token, this.xSwordShift, this.ySwordShift + this.step);
            server.moveGamerSword(server.token,  this.xPosKnight, this.yPosKnight + this.step, this.xSwordShift, this.ySwordShift + this.step);
            this.yPosKnight += this.step;
            this.ySwordShift += this.step;
            this.timerDown = setTimeout(this.D, this.delay);
        }
    }

    addKeyDown() {
        document.body.addEventListener("keydown", (e) => {
            switch (e.code) {
                case "KeyA": {
                    if (!this.requestBackLeft && !this.timerLeft) {
                        this.left();
                    }
                    break;
                }
                case "KeyW": {
                    if (!this.requestBackUp && !this.timerUp) {
                        this.up();
                    }
                    break;
                }
                case "KeyD": {
                    if (!this.requestBackRight && !this.timerRight) {
                        this.right();
                    }
                    break;
                }
                case "KeyS": {
                    if (!this.requestBackDown && !this.timerDown) {
                        this.down();
                    }
                    break;
                }
            }
        });
    }

    addKeyUp() {
        document.body.addEventListener("keyup", (e) => {
            switch (e.code) {
                case "KeyA": {
                    clearTimeout(this.timerLeft);
                    cancelAnimationFrame(this.requestBackLeft);
                    this.requestBackLeft = null;
                    this.timerLeft = null;

                    break;
                }
                case "KeyW": {
                    clearTimeout(this.timerUp);
                    cancelAnimationFrame(this.requestBackUp);
                    this.requestBackUp = null;
                    this.timerUp = null;
                    break;
                }
                case "KeyD": {
                    clearTimeout(this.timerRight);
                    cancelAnimationFrame(this.requestBackRight);
                    this.requestBackRight = null;
                    this.timerRight = null;
                    break;
                }
                case "KeyS": {
                    clearTimeout(this.timerDown);
                    cancelAnimationFrame(this.requestBackDown);
                    this.requestBackDown = null;
                    this.timerDown = null;
                    break;
                }
            }
        });
    }

    F() {
        this.flag = true;
    }

    addMouseDown() {
        document.body.addEventListener("mousedown", () => {
            if (this.flag) {
                this.randSword();
                this.flag = false;
            }
        });
    }

    draw() {
        //bg.onload = ctx.drawImage(bg, 0, 0);
        //this.drawEnemy();
        //knight.onload = ctx.drawImage(knight, this.xPosKnight, this.yPosKnight, this.cp, this.cp);
        //sword.onload = ctx.drawImage(sword, this.xSwordShift, this.ySwordShift, this.cp, this.cp);
        //requestAnimationFrame(this.draw);
    }

    drawGamer(data) {
        bg.onload = ctx.drawImage(bg, 0, 0);
        this.drawEnemy();
        let banner = true;
        data['data'].forEach(d => {
            switch(banner) {
                case true:
                    knight.onload = ctx.drawImage(knight, d.x, d.y, this.cp, this.cp);
                    banner = false;
                    break;
                case false:
                    sword.onload = ctx.drawImage(sword, d.x, d.y, this.cp, this.cp);
                    banner = true;
                    break;
            }
        });
    }

    mapName() {
        switch (server.mapName) {
            case "OakBoards":
                bg.src = "img/bg1.jpg";
                break;
            case "PalmTree":
                bg.src = "img/bg2.png";
                break;
            case "LaminateFlooring":
                bg.src = "img/bg3.jpg";
                break;
        }
    }

    serverDrawGamer () {
        server.drawGamerSword(server.token, server.sessionId);
    }

    checkOnload() {
        this.draw();
    }

    start() {
        this.addKeyDown();
        this.addKeyUp();
        this.addMouseDown();

        setInterval(this.F, this.swordShiftRate);
        this.mapName();
        this.createGamer();
        //setInterval(this.randSword, swordShiftRate);
        for (let i = 0; i < this.NEnemys; i++)
            this.pushEnemy();
        setInterval(this.revivalEnemy, this.spawnRate);
        setInterval(this.serverDrawGamer, this.drawSpeed);
        this.checkOnload();
    }
}