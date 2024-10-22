function makeAWish() {
    startFireworks();
    setTimeout(blowOutCandles, 2000); // Delay candle blowout for 2 seconds
    setTimeout(showHeart, 4000); // Delay heart appearance for 4 seconds
}

function blowOutCandles() {
    document.querySelectorAll('.flame').forEach(flame => flame.style.display = 'none');
}

function showHeart() {
    const heart = document.getElementById('heart');
    heart.style.display = 'block';
    heart.style.top = '30%';
    heart.style.left = 'calc(50% - 40px)';
}

function startFireworks() {
    const canvas = document.getElementById('fireworks');
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles = [];
    function createParticle(x, y) {
        for (let i = 0; i < 100; i++) {
            particles.push({
                x: x,
                y: y,
                xSpeed: (Math.random() - 0.5) * 5,
                ySpeed: (Math.random() - 0.5) * 5,
                life: 100
            });
        }
    }

    function drawParticles() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        particles.forEach((particle, index) => {
            if (particle.life > 0) {
                ctx.beginPath();
                ctx.arc(particle.x, particle.y, 3, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(255, ${Math.random() * 255}, 0, ${particle.life / 100})`;
                ctx.fill();
                particle.x += particle.xSpeed;
                particle.y += particle.ySpeed;
                particle.life--;
            } else {
                particles.splice(index, 1);
            }
        });
        requestAnimationFrame(drawParticles);
    }

    canvas.addEventListener('click', (e) => {
        createParticle(e.clientX, e.clientY);
    });

    createParticle(canvas.width / 2, canvas.height / 2);
    drawParticles();
}

