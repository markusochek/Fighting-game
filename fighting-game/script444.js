// function drawGamer(data) {
//     let banner = true;
//     data['data'].forEach(l => 
//     {
//         switch(banner) {
//             case true:
//                 knight.onload = ctx.drawImage(knight, l.x, l.y, cp, cp);
//                 banner = false;
//                 break;
//             case false:
//                 sword.onload = ctx.drawImage(sword, l.x, l.y, cp, cp);
//                 banner = true;
//                 break;
//         }
//     });
// }

function START () {
    let canvas = document.getElementById("canvas");
    ctx = canvas.getContext('2d');

    canvas.width = 500;
    canvas.height = 500;

    let knight = new Image();
    let joker = new Image();
    let sword = new Image();
    let bg = new Image();

    knight.src = "img/knight.png";
    joker.src = "img/joker.png";
    sword.src = "img/sword02.png";

    let xPosKnight = 10;
    let yPosKnight = 150;

    let xSwordShift = 10;
    let ySwordShift = 110;

    let xRand = 0; 
    let yRand = 0;
    let rSword = 0;
    let rep = 2; // (repeat) rSword <-

    let spawnRate = 2000; // /1000 = ? sec
    let swordShiftRate = 1000;
    let drawSpeed = 3000;

    let step = 4; // step hero
    let delay = 50;

    let requestBackLeft = null;
    let requestBackUp = null;
    let requestBackRight = null;
    let requestBackDown = null;

    let timerLeft = null;
    let timerUp = null;
    let timerRight = null;
    let timerDown = null;

    let hb = 40; // hitbox (hb x hb)
    let cp = 50; // character texture (cp x cp)
    let ss = 40; // sword shift

    let NEnemys = 30; // number of enemies
    let flag = true;

    let enemy = [];

    function createGamer() {
        server.createGamer(server.sessionId, server.token, xPosKnight, yPosKnight);
        server.createSword(server.sessionId, server.token, xSwordShift, ySwordShift);
    }

    function checkCollision (xRand, yRand) { 

        for (let i = 0; i < enemy.length; i++)
        if(enemy[i].x+cp >= xRand && 
            enemy[i].x < xRand+cp && 
            enemy[i].y+cp >= yRand && 
            enemy[i].y < yRand+cp)
            return false;
        
        if(xPosKnight+cp >= xRand && 
            xPosKnight < xRand+cp && 
            yPosKnight+cp >= yRand && 
            yPosKnight < yRand+cp)
            return false;  
            
        if(xRand < 0 ||
            xRand+cp > canvas.width ||
            yRand < 0 ||
            yRand+cp > canvas.height)
            return false;
                
        return true;
    }

    function pushEnemy() {
        for (let i = 0; i < 3; i++){
            xRand = Math.floor(Math.random()* canvas.width);
            yRand = Math.floor(Math.random()* canvas.height);

            if(checkCollision(xRand, yRand)) {
                enemy.push({
                    x : xRand,
                    y : yRand,
                    die : false
                    });
                return;
            }
        }
    }

    function revivalEnemy() {
        for (let i = 0; i < enemy.length; i++) {
            if (enemy[i].die == true) {  
                for (let j = 0; j < 3; j++) {
                    xRand = Math.floor(Math.random()* canvas.width);
                    yRand = Math.floor(Math.random()* canvas.height);

                    if(checkCollision (xRand, yRand)) {
                        enemy[i].die = false;
                        enemy[i].x = xRand;
                        enemy[i].y = yRand;
                        return;
                    }
                }
            }
        }
    }

    function drawEnemy() {
        for(let i = 0; i < enemy.length; i++) {
            switch (rep) {
                case 1:
                case 3: {
                    if(xSwordShift + hb > enemy[i].x && 
                        xSwordShift < enemy[i].x + hb && 
                        ySwordShift + hb/2 - 5 > enemy[i].y && 
                        ySwordShift < enemy[i].y + hb/2 + 5) {
                        enemy[i].die = true;
                    }
                    else if (enemy[i].die == false) {
                        ctx.drawImage(joker, enemy[i].x, enemy[i].y, cp, cp);
                    }
                    break;
                }
                case 2:
                case 4: {
                    if(xSwordShift + hb/2 - 5 > enemy[i].x && 
                        xSwordShift < enemy[i].x + hb/2 + 5 && 
                        ySwordShift + hb > enemy[i].y && 
                        ySwordShift < enemy[i].y + hb) {
                        enemy[i].die = true;
                    }
                    else if (enemy[i].die == false) {
                        joker.onload = ctx.drawImage(joker, enemy[i].x, enemy[i].y, cp, cp);
                    }
                    break;
                }
            }
        }
    }

    function leftSwordShift () {
        switch (rep) {
            case 2: {
                server.moveSword(server.token, xSwordShift - ss, ySwordShift + ss);
                xSwordShift -= ss;
                ySwordShift += ss;
                break;
            }
            case 3: {
                server.moveSword(server.token, xSwordShift - 2*ss, ySwordShift);
                xSwordShift -= 2*ss;
                break;
            }
            case 4: {
                server.moveSword(server.token, xSwordShift - ss, ySwordShift - ss);
                xSwordShift -= ss;
                ySwordShift -= ss;
                break;
            }
        }
        rep = 1;
        sword.src = "img/sword01.png";
    }
    function upSwordShift () {
        switch (rep) {
            case 1: {
                server.moveSword(server.token, xSwordShift + ss, ySwordShift - ss);
                xSwordShift += ss;
                ySwordShift -= ss;
                break;
            }
            case 3: {
                server.moveSword(server.token, xSwordShift - ss, ySwordShift - ss);
                xSwordShift -= ss;
                ySwordShift -= ss;
                break;
            }
            case 4: {
                server.moveSword(server.token, xSwordShift, ySwordShift - 2*ss);
                ySwordShift -= 2*ss;
                break;
            }
        }
        rep = 2;
        sword.src = "img/sword02.png";
    }
    function rightSwordShift () {
        switch (rep) {
            case 1: {
                server.moveSword(server.token, xSwordShift + 2*ss, ySwordShift);
                xSwordShift += 2*ss;
                break;
            }
            case 2: {
                server.moveSword(server.token, xSwordShift + ss, ySwordShift + ss);
                xSwordShift += ss;
                ySwordShift += ss;
                break;
            }
            case 4: {
                server.moveSword(server.token, xSwordShift + ss, ySwordShift - ss);
                xSwordShift += ss;
                ySwordShift -= ss;
                break;
            }
        }
        rep = 3;  
        sword.src = "img/sword03.png";
    }
    function downSwordShift () {
        switch (rep) {
            case 1: {
                server.moveSword(server.token, xSwordShift + ss, ySwordShift + ss);
                xSwordShift += ss;
                ySwordShift += ss;
                break;
            }
            case 2: {
                server.moveSword(server.token, xSwordShift, ySwordShift + 2*ss);
                ySwordShift += 2*ss;
                break;
            }
            case 3: {
                server.moveSword(server.token, xSwordShift - ss, ySwordShift + ss);
                xSwordShift -= ss;
                ySwordShift += ss;
                break;
            }
        }
        rep = 4;
        sword.src = "img/sword04.png";
    }

    function randSword () {
        rSword = Math.floor(Math.random()* 4)+1;
        switch (rSword) {
            case 1:
                if (rep == rSword) {
                    rSword = Math.floor(Math.random()* 3)+1;
                    switch (rSword) {
                        case 1:
                            upSwordShift();
                            break;
                        case 2:
                            rightSwordShift(); 
                            break;
                        case 3:
                            downSwordShift();
                            break;
                    }
                } 
                else {
                    leftSwordShift();
                    break;
                }
            case 2:
                if (rep == rSword) {
                    rSword = Math.floor(Math.random()* 3)+1;
                    switch (rSword) {
                        case 1:
                            leftSwordShift();
                            break;
                        case 2:
                            rightSwordShift(); 
                            break;
                        case 3:
                            downSwordShift();
                            break;
                    }
                } 
                else {
                    upSwordShift();
                    break;
                }
            case 3:
                if (rep == rSword) {
                    rSword = Math.floor(Math.random()* 3)+1;
                    switch (rSword) {
                        case 1:
                            leftSwordShift();
                            break;
                        case 2:
                            upSwordShift(); 
                            break;
                        case 3:
                            downSwordShift();
                            break;
                    }
                }
                else {
                    rightSwordShift(); 
                    break;
                }
            case 4:
                if (rep == rSword) {
                    rSword = Math.floor(Math.random()* 3)+1;
                    switch (rSword) {
                        case 1:
                            leftSwordShift();
                            break;
                        case 2:
                            upSwordShift(); 
                            break;
                        case 3:
                            rightSwordShift();
                            break;
                    }
                } 
                else {
                    downSwordShift(); 
                    break;
                }
        }
    }

    function left() {
        if (xPosKnight - step >= 0) {
            function L () {
                requestBackLeft = requestAnimationFrame(left);
            }
            server.moveGamer(server.token, xPosKnight - step, yPosKnight);
            server.moveSword(server.token, xSwordShift - step, ySwordShift);
            xPosKnight -= step;
            xSwordShift -= step;
            timerLeft = setTimeout(L, delay);
        }
    }
    function up() {
        if (yPosKnight - step >= 0) {
            function U () {
                requestBackUp = requestAnimationFrame(up);
            }
            server.moveGamer(server.token, xPosKnight, yPosKnight - step);
            server.moveSword(server.token, xSwordShift, ySwordShift - step);
            yPosKnight -= step;
            ySwordShift -= step;
            timerUp = setTimeout(U, delay);
        }
    }
    function right() {
        if (xPosKnight + step + cp <= canvas.width) {
            function R () {
                requestBackRight = requestAnimationFrame(right);
            }
            server.moveGamer(server.token, xPosKnight + step, yPosKnight);
            server.moveSword(server.token, xSwordShift + step, ySwordShift);
            xPosKnight += step;
            xSwordShift += step;
            timerRight = setTimeout(R, delay);
        }
    }
    function down() {
        if (yPosKnight + step + cp <= canvas.height) {
            function D () {
                requestBackDown = requestAnimationFrame(down);
            }
            server.moveGamer(server.token, xPosKnight, yPosKnight + step);
            server.moveSword(server.token, xSwordShift, ySwordShift + step);
            yPosKnight += step;
            ySwordShift += step;
            timerDown = setTimeout(D, delay);
        }
    }

    window.addEventListener("keydown", (e) => {
        switch (e.code) {
            case "KeyA": {
                if (!requestBackLeft && !timerLeft) {
                    left();
                }
                break;
            }
            case "KeyW": {
                if (!requestBackUp && !timerUp) {
                    up();
                }
                break;
            }
            case "KeyD": {
                if (!requestBackRight && !timerRight) {
                    right();
                }
                break;
            }
            case "KeyS": {
                if (!requestBackDown && !timerDown) {
                    down();
                }
                break;
            }
        }
    });

    function F () {
        flag = true;
    }
    setInterval(F, swordShiftRate);

    setInterval(function() {window.addEventListener("mousedown", () =>  {
        if (flag)
            randSword();
            flag = false;
        }, {once: true});}, swordShiftRate);

    window.addEventListener("keyup", (e) => {
        switch (e.code) {
            case "KeyA": {
                clearTimeout(timerLeft);
                cancelAnimationFrame(requestBackLeft);
                requestBackLeft = null;
                timerLeft = null;

                break;
            }
            case "KeyW": {
                clearTimeout(timerUp);
                cancelAnimationFrame(requestBackUp);
                requestBackUp = null;
                timerUp = null;
                break;
            }
            case "KeyD": {
                clearTimeout(timerRight);
                cancelAnimationFrame(requestBackRight);
                requestBackRight = null;
                timerRight = null;
                break;
            }
            case "KeyS": {
                clearTimeout(timerDown);
                cancelAnimationFrame(requestBackDown);
                requestBackDown = null;
                timerDown = null;
                break;
            }
        }
    });

    function draw() {
        bg.onload = ctx.drawImage(bg, 0, 0);
        drawEnemy();
        //knight.onload = ctx.drawImage(knight, xPosKnight, yPosKnight, cp, cp);
        //sword.onload = ctx.drawImage(sword, xSwordShift, ySwordShift, cp, cp);
        requestAnimationFrame(draw);
    }

    function start() {
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
    createGamer();
    // setInterval(function () { randSword();
    // }, swordShiftRate);
    for (let i = 0; i < NEnemys; i++)
        pushEnemy();
    setInterval(function () {
        revivalEnemy();}, spawnRate);
    setInterval(function () {
        server.drawGamerSword(server.token, server.sessionId);}, drawSpeed);
    draw();
    }
    start();
}