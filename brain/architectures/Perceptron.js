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
        this.layers.hidden.forEach( hiddenNeuronLayer => {
            hiddenNeuronLayer.forEach( hiddenNeuron => hiddenNeuron.activate() )
        })
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
        if ( 'hidden' === layer ) {
            layer = this.layers.hidden[ this.layers.hidden.length ] = []
        } else {
            layer = this.layers[ layer ]
        }

        for ( let i = 0; i < numberOfNeurons; i++ ) {
            layer.push( new Neuron() )
        }
    }

    connectNeurons() {
        if ( this.layers.hidden.length > 0 ) {
            this.layers.hidden[ 0 ].forEach( hiddenNeuron => {
                this.layers.input.forEach( inputNeuron => hiddenNeuron.connect( inputNeuron ) )
            })

            for ( let i = 1, hiddenLayersLength = this.layers.hidden.length; i < hiddenLayersLength; i++ ) {
                this.layers.hidden[ i ].forEach( hiddenNeuron => {
                    this.layers.hidden[ i - 1 ].forEach( previousLayerHiddenNeuron => hiddenNeuron.connect( previousLayerHiddenNeuron ) )
                })
            }

            this.layers.output.forEach( outputNeuron => {
                this.layers.hidden[ this.layers.hidden.length - 1 ].forEach( hiddenNeuron => outputNeuron.connect( hiddenNeuron ) )
            })
        } else {
            this.layers.output.forEach( outputNeuron => {
                this.layers.input.forEach( inputNeuron => outputNeuron.connect( inputNeuron ) )
            })
        }
    }

    backpropagate( learningRate, output ) {
        /* calculate all derivatives and deltas */
        this.layers.output.forEach( ( outputNeuron, index ) => outputNeuron.calculateDerivativePartialOfTheLossAsOutputNeuron( output[ index ] ) )
        this.layers.hidden.forEach( hiddenNeuronLayer => {
            hiddenNeuronLayer.forEach( hiddenNeuron => hiddenNeuron.calculateDerivativePartialOfTheLoss() )
        })

        /* update weights, from input to output layer */
        this.layers.input.forEach( inputNeuron => inputNeuron.updateConnectionsWeights( learningRate ) )
        this.layers.hidden.forEach( hiddenNeuronLayer => {
            hiddenNeuronLayer.forEach( hiddenNeuron => hiddenNeuron.updateConnectionsWeights( learningRate ) )
        })
    }

    exportNetwork() {
        return JSON.stringifyOnce( this.layers, null, '  ' )
    }
}

module.exports = Perceptron

JSON.stringifyOnce = function(obj, replacer, indent){
    var printedObjects = [];
    var printedObjectKeys = [];

    function printOnceReplacer(key, value){
        if ( printedObjects.length > 2000){ // browsers will not print more than 20K, I don't see the point to allow 2K.. algorithm will not be fast anyway if we have too many objects
        return 'object too long';
        }
        var printedObjIndex = false;
        printedObjects.forEach(function(obj, index){
            if(obj===value){
                printedObjIndex = index;
            }
        });

        if ( key == ''){ //root element
             printedObjects.push(obj);
            printedObjectKeys.push("root");
             return value;
        }

        else if(printedObjIndex+"" != "false" && typeof(value)=="object"){
            if ( printedObjectKeys[printedObjIndex] == "root"){
                return "(pointer to root)";
            }else{
                return "(see " + ((!!value && !!value.constructor) ? value.constructor.name.toLowerCase()  : typeof(value)) + " with key " + printedObjectKeys[printedObjIndex] + ")";
            }
        }else{

            var qualifiedKey = key || "(empty key)";
            printedObjects.push(value);
            printedObjectKeys.push(qualifiedKey);
            if(replacer){
                return replacer(key, value);
            }else{
                return value;
            }
        }
    }
    return JSON.stringify(obj, printOnceReplacer, indent);
};
