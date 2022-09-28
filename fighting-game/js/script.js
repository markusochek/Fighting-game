class Play {
    constructor() {

    this.createGamer = this.createGamer.bind(this);
    //this.checkCollision = this.checkCollision.bind(this);
    // this.pushEnemy = this.pushEnemy.bind(this);
    // this.revivalEnemy = this.revivalEnemy.bind(this);
    // this.drawEnemy = this.drawEnemy.bind(this);
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
    this.LURD = this.LURD.bind(this);
    this.left = this.left.bind(this);
    this.up = this.up.bind(this);
    this.right = this.right.bind(this);
    this.down = this.down.bind(this);
    this.addKeyDown = this.addKeyDown.bind(this);
    this.addKeyUp = this.addKeyUp.bind(this);
    this.addMouseDown = this.addMouseDown.bind(this);
    //this.draw = this.draw.bind(this);
    this.requestAnimationFrame = this.requestAnimationFrame.bind(this);
    this.checkAttack = this.checkAttack.bind(this);
    this.mapName = this.mapName.bind(this);
    this.serverDrawGamer = this.serverDrawGamer.bind(this);
    this.start = this.start.bind(this);
    this.rollback = this.rollback.bind(this);
    
    knight.src = "img/knight.png";
    // joker.src = "img/joker.png";
    sword.src = "img/sword02.png";

    this.xPosKnight = 150;
    this.yPosKnight = 150;

    this.xSwordShift = 150;
    this.ySwordShift = 110;

    // this.xRand = 0; 
    // this.yRand = 0;
    this.rSword = 0;
    this.rep = 2; // (repeat) rSword <-

    //this.spawnRate = 2000; // /1000 = ? sec
    this.swordShiftRate = 1000;
    this.drawSpeed = 150;

    this.step = 10; // step hero
    this.delay = 150;

    this.requestBackLeft = null;
    this.requestBackUp = null;
    this.requestBackRight = null;
    this.requestBackDown = null;

    this.timerLeft = null;
    this.timerUp = null;
    this.timerRight = null;
    this.timerDown = null;

    this.tLURD = null;
    this.tF = null;
    this.tServerDrawGamer = null;

    this.hb = 40; // hitbox (hb x hb)
    this.cp = 50; // character texture (cp x cp)

    this.ss = 40; // sword shift

    //this.NEnemys = 30; // number of enemies

    this.flag = true;
    this.flagL = true;
    this.flagU = true;
    this.flagR = true;
    this.flagD = true;

    //this.enemy = [];

    this.mouseDown = () => {
        if (this.flag) {
            this.randSword();
            this.flag = false;
        }
    };
    this.keyUp = (e) => {
        switch (e.code) {
            case "KeyA": {
                clearTimeout(this.timerLeft);
                this.requestBackLeft = null;
                this.timerLeft = null;

                break;
            }
            case "KeyW": {
                clearTimeout(this.timerUp);
                this.requestBackUp = null;
                this.timerUp = null;
                break;
            }
            case "KeyD": {
                clearTimeout(this.timerRight);
                this.requestBackRight = null;
                this.timerRight = null;
                break;
            }
            case "KeyS": {
                clearTimeout(this.timerDown);
                this.requestBackDown = null;
                this.timerDown = null;
                break;
            }
        }
    };
    this.keyDown = (e) => {
        switch (e.code) {
            case "KeyA": {
                if (this.flagL && !this.timerLeft) {
                    this.flagL = false;
                    this.left();
                }
                break;
            }
            case "KeyW": {
                if (this.flagU && !this.timerUp) {
                    this.flagU = false;
                    this.up();
                }
                break;
            }
            case "KeyD": {
                if (this.flagR && !this.timerRight) {
                    this.flagR = false;
                    this.right();
                }
                break;
            }
            case "KeyS": {
                if (this.flagD && !this.timerDown) {
                    this.flagD = false;
                    this.down();
                }
                break;
            }
        }
    };

    }

    createGamer() {
        server.createGamer(server.sessionId, server.token, this.xPosKnight, this.yPosKnight);
    }

    // checkCollision (xRand, yRand) { 

    //     for (let i = 0; i < this.enemy.length; i++)
    //     if(this.enemy[i].x+this.cp >= xRand && 
    //         this.enemy[i].x < xRand+this.cp && 
    //         this.enemy[i].y+this.cp >= yRand && 
    //         this.enemy[i].y < yRand+this.cp)
    //         return false;
        
    //     if(this.xPosKnight+this.cp >= xRand && 
    //         this.xPosKnight < xRand+this.cp && 
    //         this.yPosKnight+this.cp >= yRand && 
    //         this.yPosKnight < yRand+this.cp)
    //         return false;  
            
    //     if(xRand < 0 ||
    //         xRand+this.cp >  canvas.width ||
    //         yRand < 0 ||
    //         yRand+this.cp >  canvas.height)
    //         return false;
                
    //     return true;
    // }

    // pushEnemy() {
    //     for (let i = 0; i < 3; i++){
    //         this.xRand = Math.floor(Math.random()*  canvas.width);
    //         this.yRand = Math.floor(Math.random()*  canvas.height);

    //         if(this.checkCollision(this.xRand, this.yRand)) {
    //             this.enemy.push({
    //                 x : this.xRand,
    //                 y : this.yRand,
    //                 die : false
    //                 });
    //             return;
    //         }
    //     }
    // }

    // revivalEnemy() {
    //     for (let i = 0; i < this.enemy.length; i++) {
    //         if (this.enemy[i].die == true) {  
    //             for (let j = 0; j < 3; j++) {
    //                 this.xRand = Math.floor(Math.random()*  canvas.width);
    //                 this.yRand = Math.floor(Math.random()*  canvas.height);

    //                 if(this.checkCollision (this.xRand, this.yRand)) {
    //                     this.enemy[i].die = false;
    //                     this.enemy[i].x = this.xRand;
    //                     this.enemy[i].y = this.yRand;
    //                     return;
    //                 }
    //             }
    //         }
    //     }
    // }

    // drawEnemy() {
    //     for(let i = 0; i < this.enemy.length; i++) {
    //         switch (this.rep) {
    //             case 1:
    //             case 3: {
    //                 if(this.xSwordShift + this.hb > this.enemy[i].x && 
    //                     this.xSwordShift < this.enemy[i].x + this.hb && 
    //                     this.ySwordShift + this.hb/2 - 5 > this.enemy[i].y && 
    //                     this.ySwordShift < this.enemy[i].y + this.hb/2 + 5) {
    //                         this.enemy[i].die = true;
    //                 }
    //                 else if (this.enemy[i].die == false) {
    //                     joker.onload = ctx.drawImage(joker, this.enemy[i].x, this.enemy[i].y, this.cp, this.cp);
    //                 }
    //                 break;
    //             }
    //             case 2:
    //             case 4: {
    //                 if(this.xSwordShift + this.hb/2 - 5 > this.enemy[i].x && 
    //                     this.xSwordShift < this.enemy[i].x + this.hb/2 + 5 && 
    //                     this.ySwordShift + this.hb > this.enemy[i].y && 
    //                     this.ySwordShift < this.enemy[i].y + this.hb) {
    //                         this.enemy[i].die = true;
    //                 }
    //                 else if (this.enemy[i].die == false) {
    //                     joker.onload = ctx.drawImage(joker, this.enemy[i].x, this.enemy[i].y, this.cp, this.cp);
    //                 }
    //                 break;
    //             }
    //         }
    //     }
    // }

    leftSwordShift () {
        switch (this.rep) {
            case 2: {
                server.moveSword(server.token, this.xSwordShift - this.ss, this.ySwordShift + this.ss, 1);
                this.xSwordShift -= this.ss;
                this.ySwordShift += this.ss;
                break;
            }
            case 3: {
                server.moveSword(server.token, this.xSwordShift - 2*this.ss, this.ySwordShift, 1);
                this.xSwordShift -= 2*this.ss;
                break;
            }
            case 4: {
                server.moveSword(server.token, this.xSwordShift - this.ss, this.ySwordShift - this.ss, 1);
                this.xSwordShift -= this.ss;
                this.ySwordShift -= this.ss;
                break;
            }
        }
        this.rep = 1;
    }
    upSwordShift () {
        switch (this.rep) {
            case 1: {
                server.moveSword(server.token, this.xSwordShift + this.ss, this.ySwordShift - this.ss, 2);
                this.xSwordShift += this.ss;
                this.ySwordShift -= this.ss;
                break;
            }
            case 3: {
                server.moveSword(server.token, this.xSwordShift - this.ss, this.ySwordShift - this.ss, 2);
                this.xSwordShift -= this.ss;
                this.ySwordShift -= this.ss;
                break;
            }
            case 4: {
                server.moveSword(server.token, this.xSwordShift, this.ySwordShift - 2*this.ss, 2);
                this.ySwordShift -= 2*this.ss;
                break;
            }
        }
        this.rep = 2;
    }
    rightSwordShift () {
        switch (this.rep) {
            case 1: {
                server.moveSword(server.token, this.xSwordShift + 2*this.ss, this.ySwordShift, 3);
                this.xSwordShift += 2*this.ss;
                break;
            }
            case 2: {
                server.moveSword(server.token, this.xSwordShift + this.ss, this.ySwordShift + this.ss, 3);
                this.xSwordShift += this.ss;
                this.ySwordShift += this.ss;
                break;
            }
            case 4: {
                server.moveSword(server.token, this.xSwordShift + this.ss, this.ySwordShift - this.ss, 3);
                this.xSwordShift += this.ss;
                this.ySwordShift -= this.ss;
                break;
            }
        } 
        this.rep = 3;
    }
    downSwordShift () {
        switch (this.rep) {
            case 1: {
                server.moveSword(server.token, this.xSwordShift + this.ss, this.ySwordShift + this.ss, 4);
                this.xSwordShift += this.ss;
                this.ySwordShift += this.ss;
                break;
            }
            case 2: {
                server.moveSword(server.token, this.xSwordShift, this.ySwordShift + 2*this.ss, 4);
                this.ySwordShift += 2*this.ss;
                break;
            }
            case 3: {
                server.moveSword(server.token, this.xSwordShift - this.ss, this.ySwordShift + this.ss, 4);
                this.xSwordShift -= this.ss;
                this.ySwordShift += this.ss;
                break;
            }
        }
        this.rep = 4;
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
        this.flagL = true;
    }
    U () {
        this.flagU = true;
    }
    R () {
        this.flagR = true;
    }
    D () {
        this.flagD = true;
    }

    left() {
        if (this.xPosKnight - this.step >= 0) {
            // server.moveGamer(server.token, this.xPosKnight - this.step, this.yPosKnight);
            // server.moveSword(server.token, this.xSwordShift - this.step, this.ySwordShift);
            server.moveGamerSword(server.token, this.xPosKnight - this.step, this.yPosKnight, this.xSwordShift - this.step, this.ySwordShift, this.rep);
            this.xPosKnight -= this.step;
            this.xSwordShift -= this.step;
            this.timerLeft = setTimeout(this.left, this.delay);
        }
    }
    up() {
        if (this.yPosKnight - this.step >= 0) {
            // server.moveGamer(server.token, this.xPosKnight, this.yPosKnight - this.step);
            // server.moveSword(server.token, this.xSwordShift, this.ySwordShift - this.step);
            server.moveGamerSword(server.token, this.xPosKnight, this.yPosKnight - this.step, this.xSwordShift, this.ySwordShift - this.step, this.rep);
            this.yPosKnight -= this.step;
            this.ySwordShift -= this.step;
            this.timerUp = setTimeout(this.up, this.delay);
        }
    }
    right() {
        if (this.xPosKnight + this.step + this.cp <=  canvas.width) {
            // server.moveGamer(server.token, this.xPosKnight + this.step, this.yPosKnight);
            // server.moveSword(server.token, this.xSwordShift + this.step, this.ySwordShift);
            server.moveGamerSword(server.token, this.xPosKnight + this.step, this.yPosKnight, this.xSwordShift + this.step, this.ySwordShift, this.rep);
            this.xPosKnight += this.step;
            this.xSwordShift += this.step;
            this.timerRight = setTimeout(this.right, this.delay);
        }
    }
    down() {
        if (this.yPosKnight + this.step + this.cp <=  canvas.height) {
            // server.moveGamer(server.token, this.xPosKnight, this.yPosKnight + this.step);
            // server.moveSword(server.token, this.xSwordShift, this.ySwordShift + this.step);
            server.moveGamerSword(server.token,  this.xPosKnight, this.yPosKnight + this.step, this.xSwordShift, this.ySwordShift + this.step, this.rep);
            this.yPosKnight += this.step;
            this.ySwordShift += this.step;
            this.timerDown = setTimeout(this.down, this.delay);
        }
    }

    addKeyDown() {
        document.body.addEventListener("keydown", this.keyDown);
    }
    addKeyUp() {
        document.body.addEventListener("keyup", this.keyUp);
    }
    F() {
        this.flag = true;
        this.tF = setTimeout(this.F, this.swordShiftRate);
    }
    addMouseDown() {
        document.body.addEventListener("mousedown", this.mouseDown);
    }

    // draw() {
    //   bg.onload = ctx.drawImage(bg, 0, 0);
    //   this.drawEnemy();
    //   knight.onload = ctx.drawImage(knight, this.xPosKnight, this.yPosKnight, this.cp, this.cp);
    //   sword.onload = ctx.drawImage(sword, this.xSwordShift, this.ySwordShift, this.cp, this.cp);
    //  requestAnimationFrame(this.draw);
    // }

    rollback() {
        canvas.width = 0;
        canvas.height = 0;
        document.body.removeEventListener("keydown", this.keyDown);
        document.body.removeEventListener("keyup", this.keyUp);
        document.body.removeEventListener("mousedown", this.mouseDown);
        clearTimeout(this.tLURD);
        clearTimeout(this.tF);
        clearTimeout(this.tServerDrawGamer);

        this.xPosKnight = 150;
        this.yPosKnight = 150;

        sword.src = "img/sword02.png";
        this.xSwordShift = 150;
        this.ySwordShift = 110;
        this.rep = 2;
    }

    checkAttack(data) {
        let it = [];
        data['data'].forEach(it1 => {
            if(it1[0] == server.gamerId) {
                it = it1;
            }
        });
        if (it.length == 0) {
            this.rollback();
            shadow_gameOver.classList.add('open');
            shadow_backSessi.classList.remove('open');
            document.getElementById('scoreGamer').innerHTML = server.score;
            server.score = 0;
        } else {
            data['data'].forEach(it2 => {
                if(it[0] != it2[0]) {
                    switch (it[5]) {
                        case '1':
                        case '3':
                            if(this.xSwordShift + this.cp > it2[1] && 
                                this.xSwordShift - this.cp < it2[1] && 
                                this.ySwordShift + this.hb/2 - 8 > it2[2] && 
                                this.ySwordShift - this.hb/2 + 8 < it2[2]) {
                                server.kill(server.token, it2[0], it[0]);
                            }
                            break;
                        case '2':
                        case '4':
                            if(this.xSwordShift + this.hb/2 - 8 > it2[1] &&
                                this.xSwordShift - this.hb/2 + 8 < it2[1] && 
                                this.ySwordShift + this.cp > it2[2] &&
                                this.ySwordShift - this.cp < it2[2]) {
                                server.kill(server.token, it2[0], it[0]);
                            }
                            break;
                        }
                        // switch (this.rep) {
                        //     case 1:
                        //     case 3: {
                        //         if(this.xSwordShift + this.hb > this.enemy[i].x && 
                        //             this.xSwordShift < this.enemy[i].x + this.hb && 
                        //             this.ySwordShift + this.hb/2 - 5 > this.enemy[i].y && 
                        //             this.ySwordShift < this.enemy[i].y + this.hb/2 + 5) {
                        //                 this.enemy[i].die = true;
                        //         }
                        //         else if (this.enemy[i].die == false) {
                        //             joker.onload = ctx.drawImage(joker, this.enemy[i].x, this.enemy[i].y, this.cp, this.cp);
                        //         }
                        //         break;
                        //     }
                        //     case 2:
                        //     case 4: {
                        //         if(this.xSwordShift + this.hb/2 - 5 > this.enemy[i].x && 
                        //             this.xSwordShift < this.enemy[i].x + this.hb/2 + 5 && 
                        //             this.ySwordShift + this.hb > this.enemy[i].y && 
                        //             this.ySwordShift < this.enemy[i].y + this.hb) {
                        //                 this.enemy[i].die = true;
                        //         }
                        //         else if (this.enemy[i].die == false) {
                        //             joker.onload = ctx.drawImage(joker, this.enemy[i].x, this.enemy[i].y, this.cp, this.cp);
                        //         }
                        //         break;
                        //     }
                        // }
                        //     }
                    // switch (it[5]) {
                    //     case '1':
                    //         if(it[3] + this.hb > it2[1] && 
                    //             it[3] < it2[1] + this.hb && 
                    //             it[4] + this.hb/2 - 5 > it2[2] && 
                    //             it[4] < it2[2] + this.hb/2 + 5) {
                    //             server.die(server.token, it2[0], it[0]);
                    //         }
                    //         break;
                    //     case '3':
                    //         if(it[3] + this.hb > it2[1] && 
                    //             it[3] < it2[1] + this.hb && 
                    //             it[4] + this.hb/2 - 5 > it2[2] && 
                    //             it[4] < it2[2] + this.hb/2 + 5) {
                    //             server.die(server.token, it2[0], it[0]);
                    //         }
                    //         break;
                    //     case '2':
                    //         if(it[3] + this.hb/2 - 5 > it2[1] &&
                    //             it[3] < it2[1] + this.hb/2 + 5 && 
                    //             it[4] + this.hb > it2[2] && 
                    //             it[4] < it2[2] + this.hb) {
                    //             server.die(server.token, it2[0], it[0]);
                    //         }
                    //         break;
                    //     case '4':
                    //         if(it[3] + this.hb/2 - 5 > it2[1] &&
                    //             it[3] < it2[1] + this.hb/2 + 5 && 
                    //             it[4] + this.hb > it2[2] && 
                    //             it[4] < it2[2] + this.hb) {
                    //             server.die(server.token, it2[0], it[0]);
                    //         }
                    //         break;
                    // }
                }
            });
        }
    }

    requestAnimationFrame(data) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        this.checkAttack(data);
        bg.onload = ctx.drawImage(bg, 0, 0);
        //this.drawEnemy();
        data['data'].forEach(it => 
        {
            knight.onload = ctx.drawImage(knight, it[1], it[2], this.cp, this.cp);
            switch (it[5]) {
                case '1':
                    sword.src = "img/sword01.png";
                    break;
                case '2':
                    sword.src = "img/sword02.png";
                    break;
                case '3':
                    sword.src = "img/sword03.png";
                    break;
                case '4':
                    sword.src = "img/sword04.png";
                    break;
            }
            sword.onload = ctx.drawImage(sword, it[3], it[4], this.cp, this.cp);
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
        this.tServerDrawGamer = setTimeout(this.serverDrawGamer, this.drawSpeed);
    }

    LURD() {
        this.L();
        this.U();
        this.R();
        this.D();
        this.tLURD = setTimeout(this.LURD, this.delay);
    }

    start() {
        canvas.width = 500;
        canvas.height = 500;
        this.addKeyDown();
        this.addKeyUp();
        this.addMouseDown();

        this.tLURD = setTimeout(this.LURD, this.delay);
        this.tF = setTimeout(this.F, this.swordShiftRate)
        // this.tLURD = setInterval(this.LURD, this.delay);
        //this.tF = setInterval(this.F, this.swordShiftRate);
        //setInterval(this.revivalEnemy, this.spawnRate);
        this.mapName();
        this.createGamer();
        //setInterval(this.randSword, swordShiftRate);
        //for (let i = 0; i < this.NEnemys; i++)
        //this.pushEnemy();
        this.tServerDrawGamer = setTimeout(this.serverDrawGamer, this.drawSpeed);
        //this.tServerDrawGamer = setInterval(this.serverDrawGamer, this.drawSpeed);
    }
}