const { Network, Trainer } = require( './brain' )

const Darse = new Network()
Darse.forge( 2, 2, 1 )
console.log( Darse.run([ 0, 1 ]) )

const trainer = new Trainer( Darse )
trainer.train([
    { input: [ 0, 1 ], output: 1 }
])
