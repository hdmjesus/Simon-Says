const celeste = document.getElementById('celeste')
const violeta = document.getElementById('violeta')
const amarillo = document.getElementById('amarillo')
const verde = document.getElementById('verde')
const btnEmpezar = document.getElementById('btnEmpezar')
const circulo = document.getElementById("gameboard")
btnEmpezar.addEventListener("click", empezarJuego)
const ULTIMO_NIVEL = 5

const score = document.getElementById("score")
const level = document.getElementById("level")



class Juego {
    constructor() {
        this.inicializar = this.inicializar.bind(this)
        this.inicializar()
        this.generarSecuencia()
        this.iluminarBordeRojo()

        setTimeout(this.siguienteNivel, 500)
        this.puntuacion()

    }

    inicializar() {
        this.siguienteNivel = this.siguienteNivel.bind(this)
        this.toogleBtnEmpezar() //Verifica si el boton de comenzar el juego esta o no esta, para colocarlo o quitartlo segun sea el caso.

        this.elergirColor = this.elergirColor.bind(this) //Esto hace que este metodo nunca pierda la referencia del objeto
        this.nivel = 1
        this.score = 0
        this.colores = {

            celeste,
            violeta,
            amarillo,
            verde
        }
    }



    toogleBtnEmpezar() {
        if (btnEmpezar.classList.contains("hide")) {

            btnEmpezar.classList.remove('hide')
        } else {
            btnEmpezar.classList.add('hide')
        }
    }


    generarSecuencia() {
        this.secuencia = new Array(ULTIMO_NIVEL).fill(0).map(n => Math.floor(Math.random() * 4))
            //.Floor redondea el numero hacia abajo
            // se crea una secuencia de numeros de manera aleatoria entre 0 y 4


    }

    siguienteNivel() {
        this.subnivel = 0
        this.iluminarSecuencia()
        this.agregarEventosClick()
        this.apagarBordeRojo()

    }

    transformarNumeroAColor(num) {
        // Se asocia cada color a uno de los numeros entre 0 y 4 

        switch (num) {
            case 0:

                return "celeste"
            case 1:

                return "violeta"
            case 2:

                return "amarillo"
            case 3:

                return "verde"


            default:

        }
    }


    transformarColorANumero(color) {

        switch (color) {
            case "celeste":

                return 0
            case "violeta":

                return 1
            case "amarillo":

                return 2
            case "verde":

                return 3


            default:

        }
    }

    iluminarSecuencia() {

        for (let i = 0; i < this.nivel; i++) {

            const color = this.transformarNumeroAColor(this.secuencia[i])


            setTimeout(() => this.ilumunarColor(color), 1000 * i);

            // 1000*i= El tiempo que se demora en aparecer cada color aumenta segun las iteraciones 
            // esto para que los colores aparezcan uno por uno y no solapados.
        }


    }

    iluminarBordeVerde() {

        circulo.classList.add('gameboard-border-green')
    }
    iluminarBordeRojo() {

        circulo.classList.add("gameboard-border-red")
    }

    apagarBordeVerde() {
        circulo.classList.remove("gameboard-border-green")
    }

    apagarBordeRojo() {
        circulo.classList.remove("gameboard-border-red")
    }


    ilumunarColor(color) {


        this.colores[color].classList.add("light")

        setTimeout(() => this.apagarColor(color), 350)



    }
    apagarColor(color) {
        this.colores[color].classList.remove("light")


    }

    agregarEventosClick() {

        this.iluminarBordeVerde()

        this.colores.celeste.addEventListener("click", this.elergirColor)
        this.colores.verde.addEventListener("click", this.elergirColor)
        this.colores.amarillo.addEventListener("click", this.elergirColor)
        this.colores.violeta.addEventListener("click", this.elergirColor)
    }

    eliminarEventosClick() {
        this.iluminarBordeRojo()
        this.colores.celeste.removeEventListener("click", this.elergirColor)
        this.colores.verde.removeEventListener("click", this.elergirColor)
        this.colores.amarillo.removeEventListener("click", this.elergirColor)
        this.colores.violeta.removeEventListener("click", this.elergirColor)
    }




    elergirColor(event) {
        const nombreColor = event.target.dataset.color
        const numeroColor = this.transformarColorANumero(nombreColor)

        this.ilumunarColor(nombreColor)

        if (numeroColor === this.secuencia[this.subnivel]) {
            console.log(this.secuencia[this.subnivel])
            this.subnivel++
                this.score += 10
            this.borrarScore()
            this.imprimirScore()

            if (this.subnivel === this.nivel) {

                this.nivel++

                    this.borrarNivel()
                this.imprimirNivel()
                this.eliminarEventosClick()


                if (this.nivel === (ULTIMO_NIVEL + 1)) {
                    this.ganoElJuego()
                    this.borrarNivel()
                } else {
                    setTimeout(this.siguienteNivel, 1500)
                }
            }
        } else {

            this.perdioElJuego()

        }

    }
    puntuacion() {
        this.imprimirNivel()
        this.imprimirScore()
    }

    imprimirNivel() {
        level.innerHTML += this.nivel
    }

    borrarNivel() {
        level.innerHTML = ``
    }
    imprimirScore() {
        score.innerHTML += this.score
    }
    borrarScore() {
        score.innerHTML = ""
    }



    ganoElJuego() {

        swal("Good job!", "You Win!", "success")
            .then(() => {
                this.inicializar()
                this.borrarNivel()
                this.borrarScore()

            })
    }

    perdioElJuego() {
        swal("You Lose", `Your Score is : ${this.score} Pts`, "error")
            .then(() => {
                this.eliminarEventosClick()
                this.borrarNivel()
                this.borrarScore()
                setTimeout(this.inicializar, 300)
            })
    }
}



function empezarJuego() {
    var juego = new Juego()

}

const caracterisicas = [
    "AGREGAR AL JUEGO:",
    " Mi logo en el medio",



]
console.log(caracterisicas)