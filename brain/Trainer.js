class Trainer {
    constructor( network ) {
        this.network = network
    }

    train( exercices, options = {} ) {
        let learningRate = options.learningRate || .1
        let maxIterations = options.maxIterations || 100000

        let iteration = 1

        do {
            exercices.forEach( exercice => {
                const predicted = this.network.run( exercice.input )
                iteration++

                if ( predicted.toString() !== exercice.output.toString() ) {
                    // console.log( `exercice ${exercice.label}; expected: ${exercice.output.toString()}; predicted: ${predicted.toString()}` )
                    this.network.backpropagate( learningRate, exercice.output )
                }
            })
        } while ( maxIterations >= iteration )
    }
}

module.exports = Trainer
