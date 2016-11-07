class Network {
    constructor( type = 'Perceptron' ) {
        this.architecture = require( `./architectures/${type}` )
    }

    forge() {
        let args = Array.prototype.slice.call( arguments )
        args.unshift( undefined )

        this.architecture = new ( this.architecture.bind.apply( this.architecture, args ) )()
    }

    run() {
        let args = Array.prototype.slice.call( arguments[ 0 ] )
        
        return this.architecture.run.apply( this.architecture, args )
    }

    backpropagate() {
        let args = Array.prototype.slice.call( arguments )
        this.architecture.backpropagate.apply( this.architecture, args )
    }

    exportNetwork() {
        let args = Array.prototype.slice.call( arguments )

        return this.architecture.exportNetwork.apply( this.architecture, args )
    }
}

module.exports = Network
