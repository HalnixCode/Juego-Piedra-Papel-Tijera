let inicio = document.querySelector('#btnPartida')
let botones = document.querySelector('#botones')
let nombreUi = document.querySelector('#nombre')
let btnPiedra = document.querySelector('#btn-piedra')
let btnPapel = document.querySelector('#btn-papel')
let btnTijera = document.querySelector('#btn-tijera')
let puntajeJugador = document.querySelector('#puntajeJugador')
let puntajeBot = document.querySelector('#putajeBot')
let mostrarMensaje = document.querySelector('#mostrarMensaje')

let punteoJugador = 0
let punteoBot = 0
let empates = 0
let rondaActual = 0

let temporizadorIconos;
let temporizadorComputador;
let temporizadorJugador;
let temporizadorMensaje;

function iniciarJuego() {
    let nombreJugador = prompt('Hola! Ingresa tu Nombre')

    if (nombreJugador !== null) {
        nombreUi.textContent = nombreJugador
    } else {
        nombreUi.textContent = 'Jugador 1'
    }

    btnPiedra.disabled = false
    btnPapel.disabled = false
    btnTijera.disabled = false
    inicio.disabled = true

    // Reiniciar el Juego
    punteoJugador = 0
    punteoBot = 0
    empates = 0
    rondaActual = 0

    botones.addEventListener('click', unJuegoCompleto)
}



function eleccionJugador(event) {
    let iconoJugada = document.querySelector('#iconoJugador')
    let botonClickeado = event.target.closest('button')
    let eleccionDelJuagdor = ''
    
    clearTimeout(temporizadorIconos)
    iconoJugada.className = ''

    if (botonClickeado){
        if(botonClickeado.id === 'btn-piedra'){
            iconoJugada.classList.add('hgi', 'hgi-stroke', 'hgi-punch')
            eleccionDelJuagdor = 'piedra'
        } else if (botonClickeado.id === 'btn-papel'){
            iconoJugada.classList.add('hgi', 'hgi-stroke', 'hgi-hold-01')
            eleccionDelJuagdor = 'papel'
        } else if (botonClickeado.id === 'btn-tijera') {
            iconoJugada.classList.add('hgi', 'hgi-stroke', 'hgi-victory-finger-03')
            eleccionDelJuagdor = 'tijera'
        }
    }

    setTimeout(() => {
        iconoJugada.className = ''
    }, 2000)

    return eleccionDelJuagdor
    
}


function eleccionComputadora() {
    let iconoComputador = document.querySelector('#iconoComputador')
    let eleccionAleatoria = Math.floor(Math.random() * 3)
    let eleccionDeLaCompu = ''
    
    clearTimeout(temporizadorComputador)
    iconoComputador.className = ''

    if (eleccionAleatoria === 1){
        iconoComputador.classList.add('hgi', 'hgi-stroke', 'hgi-punch')
        eleccionDeLaCompu = 'piedra'
    } else if (eleccionAleatoria === 2) {
        iconoComputador.classList.add('hgi', 'hgi-stroke', 'hgi-hold-01')
        eleccionDeLaCompu = 'papel'
    } else {
        iconoComputador.classList.add('hgi', 'hgi-stroke', 'hgi-victory-finger-03')
        eleccionDeLaCompu = 'tijera'
    }

    setTimeout(() => {
            iconoComputador.className = ''
        }, 2000)

    return eleccionDeLaCompu
    
}



function jugarRonda(jugador, compu) {
    let roundJugador = document.querySelector('#roundJugador')
    let roundCompu = document.querySelector('#roundCompu')
    let roundEmpate = document.querySelector('#roundEmpate')

    clearTimeout(temporizadorJugador)

    roundJugador.textContent = ''
    roundEmpate.textContent = ''
    roundCompu.textContent = ''

    let resultado = ''

    if (jugador == 'piedra' && compu == 'tijera' || 
        jugador == 'papel' && compu == 'piedra' || 
        jugador == 'tijera' && compu == 'papel') 
    {
        roundJugador.textContent = 'Ganaste este Round'
        resultado = 'jugador'
    } else if (jugador === compu){
        roundEmpate.textContent = 'Empate'
        resultado = 'empate'
    } else {
        roundCompu.textContent = 'Gano este Round'
        resultado = 'bot'
    }

    setTimeout(() => {
            roundCompu.textContent = ''
            roundEmpate.textContent = ''
            roundJugador.textContent = ''
        }, 2000)
    
    return resultado
}


function actualizarRonda(resultado) {

    if (resultado === 'jugador') {
        punteoJugador++
        puntajeJugador.textContent = punteoJugador
    } else if (resultado === 'bot') {
        punteoBot++
        puntajeBot.textContent = punteoBot
    } else if (resultado === 'empate') {
        empates++
    }
    rondaActual++

    puntajeJugador.classList.remove('colorVerde', 'colorRojo', 'colorAmarillo');
    puntajeBot.classList.remove('colorVerde', 'colorRojo', 'colorAmarillo');

    if (punteoJugador > punteoBot) {
        puntajeJugador.classList.add('colorVerde');
        puntajeBot.classList.add('colorRojo');
    } else if (punteoBot > punteoJugador) {
        puntajeBot.classList.add('colorVerde');
        puntajeJugador.classList.add('colorRojo');
    } else {
        puntajeJugador.classList.add('colorAmarillo');
        puntajeBot.classList.add('colorAmarillo');
    }
}



function unJuegoCompleto(event) {
    if (rondaActual < 5) {
        let jugador = eleccionJugador(event)
        let compu = eleccionComputadora()
        let resultado = jugarRonda(jugador, compu)
        
        actualizarRonda(resultado)

        if (rondaActual === 5) {
            const tiempoRetraso = 1500
            temporizadorMensaje = setTimeout(() => {
                mostrarGanadorFinal()
            }, tiempoRetraso + 500)

            botones.removeEventListener('click', unJuegoCompleto)
        }
    }
}

function mostrarGanadorFinal() {
    if (punteoJugador > punteoBot) {
        mostrarMensaje.classList.add('colorVerde')
        mostrarMensaje.textContent = 'Felicidades Ganaste la Partida'
    } else if (punteoBot > punteoJugador) {
        mostrarMensaje.classList.add('colorRojo')
        mostrarMensaje.textContent = 'Que Mal te Gano Bot'
    } else {
        mostrarMensaje.classList.add('colorAmarillo')
        mostrarMensaje.textContent = 'Esta Partida termino en Empate'
    }

    setTimeout(() => {
        mostrarMensaje.classList.remove('colorVerde', 'colorRojo', 'colorAmarillo')
        mostrarMensaje.textContent = ''
        nombreUi.textContent = 'Jugador'
        puntajeJugador.textContent = 0
        puntajeBot.textContent = 0 
        puntajeJugador.classList.remove('colorVerde', 'colorRojo');
        puntajeBot.classList.remove('colorVerde', 'colorRojo'); 
    }, 4000)

    btnPiedra.disabled = true
    btnPapel.disabled = true
    btnTijera.disabled = true
    inicio.disabled = false
}


inicio.addEventListener('click', iniciarJuego)