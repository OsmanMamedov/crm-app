require('ignore-styles')

require('@babel/register')({
    ignore: [/(node_module)/],
    presents: ['@babel/preset-env', '@babel/preset-react']
})

require('./server')