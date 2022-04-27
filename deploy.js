const HDWalletProvider = require('@truffle/hdwallet-provider');
const Web3 = require('web3');

const { abi, evm } = require('./compile');

const provider = new HDWalletProvider(
    'clock still cushion security wire water dance slab valid ship hammer chalk', // Your mnemonic
    'https://rinkeby.infura.io/v3/84aafbf69a0c444790c3fdd16c8455cf' // Your infura url
);

const web3 = new Web3(provider);

const deploy = async () => {
    const accounts = await web3.eth.getAccounts();
    
    console.log('Attempting to deploy from account', accounts[0]);

    const result = await new web3.eth.Contract(abi)
        .deploy({
            data: evm.bytecode.object,
            arguments: [
                'Hi there!'
            ]
        })
        .send({
            from: accounts[0],
            gas: '1000000',
        });

    console.log('Contract deployed to', result.options.address)
    provider.engine.stop();
};
deploy();
