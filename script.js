const canvas = document.getElementById('snowCanvas');
const ctx = canvas.getContext('2d');

let width, height;
let snowflakes = [];

function resize() {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
}

window.addEventListener('resize', resize);
resize();

class Snowflake {
    constructor() {
        this.reset();
    }

    reset() {
        this.x = Math.random() * width;
        this.y = Math.random() * -height; // Start above viewport
        this.vy = 1 + Math.random() * 2;   // Speed
        this.vx = 0.5 - Math.random();     // Drift
        this.r = 1 + Math.random() * 2;    // Radius
        this.alpha = 0.5 + Math.random() * 0.5;
    }

    update() {
        this.y += this.vy;
        this.x += this.vx;

        if (this.y > height) {
            this.reset();
        }
    }

    draw() {
        ctx.fillStyle = `rgba(255, 255, 255, ${this.alpha})`;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
        ctx.fill();
    }
}

function init() {
    snowflakes = [];
    // Create density based on width
    const count = Math.floor(width / 4);
    for (let i = 0; i < count; i++) {
        const flake = new Snowflake();
        // Scatter initially across the whole screen, not just top
        flake.y = Math.random() * height;
        snowflakes.push(flake);
    }
    loop();
}

function loop() {
    ctx.clearRect(0, 0, width, height);
    snowflakes.forEach(f => {
        f.update();
        f.draw();
    });
    requestAnimationFrame(loop);
}

init();
