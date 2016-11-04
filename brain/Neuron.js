const uniqid = require( 'uniqid' )

class Neuron {
    constructor() {
        this.id = uniqid()
        this.connections = []
        this.bias = Math.random()
        this.value = null
    }

    activate() {
        this.value = 0

        this.connections.forEach( connection => {
            this.value += ( connection.weight * connection.neuron.value )
        })

        this.value -= this.bias

        return this.thresold( this.value )
    }

    connect( neuron ) {
        this.connections.push({
            weight: Math.random(),
            neuron
        })
    }

    thresold( sum ) {
        return this.sigmoid( sum )
    }

    sigmoid( x ) {
        return 1 / ( 1 + Math.exp( -x ) )
    }
}

module.exports = Neuron
