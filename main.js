const score = document.getElementById('score');
const message = document.getElementById('message');
const tableInfo = document.getElementById('table-info');
const newgameBtn = document.getElementById('newgameBtn');
const bird = document.getElementById('bird');
const obstacle = document.getElementById('obstacle');
const obstacleTop = document.getElementById('obstacle-top');
const obstacleBottom = document.getElementById('obstacle-bottom');

let margin = 5;
let point = 0;

// cada que se repita la animación de los tubos
obstacle.addEventListener('animationiteration', ()=>{
    // se cambia la altura de los tubos
    let obstacleTopheight = Math.floor(Math.random() * 80) + 10;
    obstacleTop.style.height = `${obstacleTopheight}vh`;

    // se suma un punto
    point++; 
    score.innerHTML = point; 
});

// el personaje cae sino presionamos ninguna tecla
const gravity = setInterval(()=>{
    bird.style.animation = 'bird 1s linear forwards';
    bird.style.marginBottom = `${margin--}vw`;
    detectCollision();
}, 30);

const jump = ()=> {
    margin = margin+10;
    bird.style.animation = 'none';
    bird.style.marginBottom = `${margin}vw`;
    detectCollision();

    // el mensaje de presionar cualquier tecla desaparece
    message.style.display = 'none';
}
// al presionar cualquier tecla se ejecuta un salto
window.addEventListener('keyup', jump, false);

const detectCollision = ()=> {
    if  (
            // si el ave está colisionando con el tubo superior
            ((bird.offsetWidth + bird.offsetLeft) >= (obstacle.offsetLeft)) && (bird.offsetTop <= (obstacleTop.offsetHeight)) ||
            // o el tubo inferior
            ((bird.offsetWidth + bird.offsetLeft) >= (obstacle.offsetLeft)) && ((bird.offsetTop + bird.offsetHeight) >= obstacleBottom.offsetTop) ||
            // o el borde inferior de la pantalla
            (bird.offsetTop + bird.offsetHeight) >= window.innerHeight || 
            // o el borde superior de la pantalla
            bird.offsetTop <= 0
        ) 
        {
            bird.style.animationPlayState = 'paused';
            obstacle.style.animationPlayState = 'paused';
            window.removeEventListener('keyup', jump, false);
            clearInterval(gravity);

            tableInfo.style.display = 'flex';

            newgameBtn.addEventListener('click', ()=> {
                location.reload()
            });
        }
}