const { Network, Trainer } = require( './brain' )

const Darse     = new Network()
const trainer   = new Trainer( Darse )

Darse.forge( 2, 4, 1 )

console.log(`
    predictions after training:
    \t[0,0]: ${Darse.run([ 0, 0 ])[ 0 ]}
    \t[1,0]: ${Darse.run([ 1, 0 ])[ 0 ]}
    \t[0,1]: ${Darse.run([ 0, 1 ])[ 0 ]}
    \t[1,1]: ${Darse.run([ 1, 1 ])[ 0 ]}
`)

trainer.train([
    { input: [ 0, 0 ], output: [ 0 ], label: '0,0' },
    { input: [ 1, 0 ], output: [ 1 ], label: '1,0' },
    { input: [ 0, 1 ], output: [ 1 ], label: '0,1' },
    { input: [ 1, 1 ], output: [ 0 ], label: '1,1' }
])

const predictedXOR00 = Darse.run([ 0, 0 ])
const predictedXOR10 = Darse.run([ 1, 0 ])
const predictedXOR01 = Darse.run([ 0, 1 ])
const predictedXOR11 = Darse.run([ 1, 1 ])

console.log(`
    predictions after training:
    \t[0,0]: ${Darse.run([ 0, 0 ])[ 0 ]}
    \t[1,0]: ${Darse.run([ 1, 0 ])[ 0 ]}
    \t[0,1]: ${Darse.run([ 0, 1 ])[ 0 ]}
    \t[1,1]: ${Darse.run([ 1, 1 ])[ 0 ]}
`)
