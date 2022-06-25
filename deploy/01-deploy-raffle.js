const { network, ethers } = require("hardhat")
const { developmentChains, networkConfig } = require("../helper-hardhat-config")
const { verify } = require("../utils/verify")

const VRF_SUB_FUND_AMOUNT = "1000000000000000000000"

module.exports = async function ({ getNamedAccounts, deployments }) {
    const { deploy, log } = deployments
    const { deployer } = await getNamedAccounts()
    const chainId = network.config.chainId
    let vrfCoordinatorV2Address, subscriptionId

    if (developmentChains.includes(network.name)) {
        const vrfCoordinatorV2Mock = await ethers.getContract("VRFCoordinatorV2Mock")
        vrfCoordinatorV2Address = vrfCoordinatorV2Mock.address
        const trasactionResponse = await vrfCoordinatorV2Mock.createSubscription()
        const transactionReceipt = await trasactionResponse.wait(1)
        subscriptionId = transactionReceipt.events[0].args.subId

        await vrfCoordinatorV2Mock.fundSubscription(subscriptionId, VRF_SUB_FUND_AMOUNT)
    } else {
        vrfCoordinatorV2Address = networkConfig[chainId]["vrfCoordinatorV2"]
        subscriptionId = networkConfig[chainId]["subscriptionId"]
    }

    const entranceFee = networkConfig[chainId]["entranceFee"]
    console.log("\nenranceFee: ", entranceFee)
    const gasLane = networkConfig[chainId]["gasLane"]
    console.log("\ngasLane: ", gasLane)
    const callbackGasLimit = networkConfig[chainId]["callbackGasLimit"]
    console.log("\ncallbackGasLimit: ", callbackGasLimit)
    const interval = networkConfig[chainId]["keepersUpdateInterval"]
    console.log("\ninterval: ", interval)
    const args = [
        vrfCoordinatorV2Address,
        subscriptionId,
        gasLane,
        interval,
        entranceFee,
        callbackGasLimit,
    ]
    const raffle = await deploy("Raffle", {
        from: deployer,
        args: args, // constructor arguments
        log: true,
        waitConfirmations: network.config.blockConfirmations || 1,
    })
    if (!developmentChains.includes(network.name) && process.env.ETHERSCAN_API_KEY) {
        log("verifying...")
        await verify(raffle.address, args)
    }
    log("------------------------------------------------")
}

module.exports.tags = ["all", "raffle"]
