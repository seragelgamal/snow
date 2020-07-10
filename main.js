let cnv = document.getElementById('cnv')
let ctx = cnv.getContext('2d');

cnv.width = 1000;
cnv.height = 1000;

ctx.fillStyle = 'black';
ctx.fillRect(0, 0, cnv.width, cnv.height);

ctx.fillStyle = 'white';
ctx.fillRect(0, cnv.height * 9/10, cnv.width, cnv.height/10)

let snowflakes = [];

let mouseX, mouseY, pMouseX, pMouseY;

document.addEventListener('click', clickHandler);

function clickHandler(e) {
    // console.log(e);
    if (e.path[0].id == 'cnv') {
        snowflakes.push({
            x: mouseX,
            y: mouseY,
            r: randomDec(4, 10),
            speed: randomDec(4, 7)
        })
    }
}

document.addEventListener('keydown', keyDownHandler);

function keyDownHandler(e) {
    if (e.key == ' ') {
        snowflakes.splice(randomInt(0, snowflakes.length), 1);
    } else if (e.key == '1') {
        for (let i = 0; i < 100; i++) {
            snowflakes.push({
                x: randomDec(0, 1000),
                y: randomDec(0, 1000),
                r: randomDec(4, 10),
                speed: randomDec(4, 7)
            })
        }
    } else if (e.key == 'r') {
        snowflakes.splice(0, snowflakes.length);
    }
}

document.addEventListener('mousemove', mouseMoveHandler);

function mouseMoveHandler(e) {
    pMouseX = mouseX;
    pMouseY = mouseY;

    let cnvRect = cnv.getBoundingClientRect();
    mouseX = e.x - cnvRect.x;
    mouseY = e.y - cnvRect.y;
}

requestAnimationFrame(draw);

function draw() {
    // clear canvas
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, cnv.width, cnv.height * 9/10);

    for (let i = 0; i < snowflakes.length; i++) {
        // animation logic
        snowflakes[i].y += snowflakes[i].speed;
        if (snowflakes[i].y > cnv.height * 9/10) {
            snowflakes[i].y = 0;
            snowflakes[i].x = randomDec(0, 1000);
        }

        // draw snowflake
        ctx.fillStyle = 'white';
        fillCircle(snowflakes[i].x, snowflakes[i].y, snowflakes[i].r);
    }
    requestAnimationFrame(draw);
}