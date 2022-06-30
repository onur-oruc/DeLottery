const networkConfig = {
    default: {
        name: "hardhat",
        keepersUpdateInterval: "30",
    },
    31337: {
        name: "localhost",
        subscriptionId: "6673",
        gasLane: "0xd89b2bf150e3b9e13446986e571fb9cab24b13cea0a43ea20a6049a85cc807cc", // 30 gwei
        keepersUpdateInterval: "30",
        entranceFee: "647000000000000000000", // 0.05 ETH
        callbackGasLimit: "500000", // 500,000 gas
    },
    4: {
        name: "rinkeby",
        subscriptionId: "6673",
        gasLane: "0xd89b2bf150e3b9e13446986e571fb9cab24b13cea0a43ea20a6049a85cc807cc", // 30 gwei
        keepersUpdateInterval: "30",
        entranceFee: "50000000000000000", // 0.05 ETH
        callbackGasLimit: "500000", // 500,000 gas
        vrfCoordinatorV2: "0x6168499c0cFfCaCD319c818142124B7A15E857ab",
    },
    1: {
        name: "mainnet",
        keepersUpdateInterval: "30",
    },
}

const developmentChains = ["hardhat", "localhost"]
const FRONT_END_ADDRESSES_FILE =
    "../nextjs-decentralized-lottery/delottery/constants/contractAddresses.json"
const FRONT_END_ABI_FILE = "../nextjs-decentralized-lottery/delottery/constants/abi.json"

module.exports = {
    networkConfig,
    developmentChains,
    FRONT_END_ADDRESSES_FILE,
    FRONT_END_ABI_FILE,
}
