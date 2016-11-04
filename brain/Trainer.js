class Trainer {
    constructor( network ) {
        this.network = network
    }

    train( exercices, options = {} ) {
        let learningRate = options.learningRate || .3
        let maxIterations = options.maxIterations || 1

        exercices.forEach( exercice => {
            let iteration = 1

            do {
                const predicted = this.network.run( exercice.input )
                iteration++

                if ( predicted !== exercice.output ) {
                    this.network.backpropagate( learningRate )
                }
            } while ( maxIterations >= iteration )
        })
    }
}

module.exports = Trainer
