const { Network, Trainer } = require( './brain' )

const net = new Network()
net.forge( 2, 4, 1 )

console.log(`
    predictions before training:
    \t[0,0]: ${net.run([ 0, 0 ])[ 0 ]}
    \t[1,0]: ${net.run([ 1, 0 ])[ 0 ]}
    \t[0,1]: ${net.run([ 0, 1 ])[ 0 ]}
    \t[1,1]: ${net.run([ 1, 1 ])[ 0 ]}
`)

const trainer = new Trainer( Darse )
trainer.train([
    { input: [ 0, 0 ], output: [ 0 ], label: '0,0' },
    { input: [ 1, 0 ], output: [ 1 ], label: '1,0' },
    { input: [ 0, 1 ], output: [ 1 ], label: '0,1' },
    { input: [ 1, 1 ], output: [ 0 ], label: '1,1' }
])

console.log(`
    predictions after training:
    \t[0,0]: ${net.run([ 0, 0 ])[ 0 ]}
    \t[1,0]: ${net.run([ 1, 0 ])[ 0 ]}
    \t[0,1]: ${net.run([ 0, 1 ])[ 0 ]}
    \t[1,1]: ${net.run([ 1, 1 ])[ 0 ]}
`)
