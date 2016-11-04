const Neuron = require( './../Neuron' )

const LAYER = {
    INPUT: 0,
    HIDDEN: 1,
    OUTPUT: 2
}

class Perceptron {
    constructor() {
        this.args = Array.prototype.slice.call( arguments )
        this.layers = {
            input: [],
            hidden: [],
            output: []
        }

        this.createLayers()
    }

    run() {
        let argsRun = Array.prototype.slice.call( arguments )
        let output = []

        this.layers.input.forEach( ( inputNeuron, index ) => inputNeuron.value = argsRun[ index ] )
        this.layers.hidden.forEach( hiddenNeuron => hiddenNeuron.activate() )
        this.layers.output.forEach( outputNeuron => output.push( outputNeuron.activate() ) )

        return output
    }

    createLayers() {
        this.args.forEach( ( numberOfNeurons, index, args ) => {
            let neuron = new Neuron()

            if ( 0 === index ) {
                /* Input layer */
                this.createLayer( numberOfNeurons, 'input' )
            } else if ( args.length - 1 === index ) {
                /* Output layer */
                this.createLayer( numberOfNeurons, 'output' )
            } else {
                /* Hidden layer */
                this.createLayer( numberOfNeurons, 'hidden' )
            }
        })

        this.connectNeurons()
    }

    createLayer( numberOfNeurons, layer ) {
        for ( let i = 0; i < numberOfNeurons; i++ ) {
            this.layers[ layer ].push( new Neuron() )
        }
    }

    connectNeurons() {
        this.layers.hidden.forEach( hiddenNeuron => {
            this.layers.input.forEach( inputNeuron => {
                hiddenNeuron.connect( inputNeuron )
            })
        })

        this.layers.output.forEach( outputNeuron => {
            this.layers.hidden.forEach( hiddenNeuron => {
                outputNeuron.connect( hiddenNeuron )
            })
        })
    }

    backpropagate( learningRate ) {
        
    }
}

module.exports = Perceptron
