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
    heart.style.transform = 'translate(-50%, -50%) scale(1)'; // Scales the heart to make it visible
    heart.style.transition = 'transform 1s'; // Smooth transition
}

function startFireworks() {
    const canvas = document.getElementById('fireworks');
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles = [];
    function createParticle(x, y) {
        for (let i = 0; i < 50; i++) {
            particles.push({
                x: x,
                y: y,
                xSpeed: (Math.random() - 0.5) * 10,
                ySpeed: (Math.random() - 0.5) * 10,
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
                ctx.fillStyle = `rgba(255, ${Math.random() * 255}, ${Math.random() * 255}, ${particle.life / 100})`;
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

    setInterval(() => {
        createParticle(Math.random() * canvas.width, Math.random() * (canvas.height / 2));
    }, 500); // Fireworks every 500ms

    drawParticles();
}
