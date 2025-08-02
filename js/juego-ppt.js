// Obtener la eleccion de la Computadora
function getComputerChoice() {
    let numeroAleatorio = Math.floor(Math.random() * 3)

    switch (numeroAleatorio) {
        case 0:
            return 'piedra'
        case 1:
            return 'papel'
        case 2:
            return 'tijera'
    }
}


// Obtener la eleccion del jugador 
function getHumanChoice() {
    let eleccionJugador = prompt('Escriba su Eleccion \nPiedra🛢 \nPapel📝 \nTijera ✂')
    return eleccionJugador.toLowerCase()
}

// Funcion para jugar todo el juego
function playGame() {
    // Control de Punteos
    let humanScore = 0
    let computerScore = 0
    let empates = 0

    // Funcion para jugar una ronda
    function playRound(humanChoice, computerChoice) {
    
        if (humanChoice == 'piedra' && computerChoice == 'tijera' || humanChoice == 'papel' && computerChoice == 'piedra' || humanChoice == 'tijera' && computerChoice == 'papel') {
            return true
        } else if (humanChoice == computerChoice){
            return 1
        } else {
            return false
            
        }
    }

    
    for (let i = 1; i <= 5; i++) {
        const computerSelection = getComputerChoice()
        const humanSelection = getHumanChoice() 
        const resultado = playRound(humanSelection, computerSelection)

        if (resultado === true) {
            console.log(`Ronda ${i}: Jugador eligio ${humanSelection}, Computadora eligio ${computerSelection}`)
            humanScore += 1
        } else if (resultado === false) {
            console.log(`Ronda ${i}: Computadora eligio ${computerSelection}, Jugador eligio ${humanSelection}`)
            computerScore +=1
        } else {
            console.log(`Ronda ${i}: Fue un Empate`)
            empates += 1
        }
    }

    console.log(`Puntaje final: Jugador ${humanScore} - Computadora ${computerScore} - Empates ${empates}`)


    if (humanScore > computerScore) {
        console.log('🏆 Ganaste el Juego')
    } else if (computerScore > humanScore) {
        console.log('🤡 Perdiste el Juego')
    } else {
        console.log('🤝 Empate en el Juego')
    }

}

playGame()


