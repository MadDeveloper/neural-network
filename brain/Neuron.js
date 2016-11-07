const uniqid = require( 'uniqid' )

class Neuron {
    constructor() {
        this.id = uniqid()
        this.connections = {
            input: [],
            output: []
        }
        this.bias = Math.random() * .2 - .1 /* b */
        this.value = null /* a_j */
        this.valueBeforeActivation = null /* in_j */
        this.derivativePartialOfTheLoss = null /* -∂Loss/∂in_j */
    }

    activate() {
        this.connections.input.forEach( connection => {
            this.value += ( connection.weight * connection.neuron.value )
        })

        // this.value += this.bias
        this.valueBeforeActivation = this.value
        this.value = this.activation()

        return this.value
    }

    connect( neuron, weight = null ) {
        const weightConnection = weight || Math.random() * 0.2 - 0.1

        this.connections.input.push({
            weight: weightConnection,
            neuron
        })

        if ( null === weight ) {
            neuron.project( this, weightConnection )
        }
    }

    project( neuron, weight = null ) {
        const weightConnection = weight || Math.random() * 0.2 - 0.1

        this.connections.output.push({
            weight: weightConnection,
            neuron
        })

        if ( null === weight ) {
            neuron.connect( this, weightConnection )
        }
    }

    activation() {
        return this.sigmoid( this.value )
    }

    sigmoid( x ) {
        return 1 / ( 1 + Math.exp( -x ) )
    }

    sumWeightsAndDerivativesPartialsOfTheLoss() {
        let sum = 0

        /* Σw_i,j * Δj */
        this.connections.output.forEach( connection => {
            sum += ( connection.weight * connection.neuron.derivativePartialOfTheLoss )
        })

        return sum
    }

    calculateDerivativePartialOfTheLoss() {
        /* Δi = g(in_i) * (1 - g(in_i)) * Σw_i,j * Δj */
        this.derivativePartialOfTheLoss = this.value * ( 1 - this.value ) * this.sumWeightsAndDerivativesPartialsOfTheLoss()

        return this.derivativePartialOfTheLoss
    }

    calculateDerivativePartialOfTheLossAsOutputNeuron( expected ) {
        /* -∂Loss/∂in_j = y_j - a_j */
        this.derivativePartialOfTheLoss = expected - this.value

        return this.derivativePartialOfTheLoss
    }

    updateConnectionsWeights( learningRate ) {
        /* w_i,j = w_i,j + α * a_i * Δj */
        this.connections.output.forEach( connection => {
            connection.weight += ( learningRate * this.value * connection.neuron.derivativePartialOfTheLoss )
            connection.neuron.updateInputConnection( connection.weight, this )
        })
    }

    updateInputConnection( newWeight, neuron ) {
        this.connections.input.forEach( connection => {
            if ( connection.neuron.id === neuron.id ) {
                connection.weight = newWeight
            }
        })
    }
}

module.exports = Neuron
