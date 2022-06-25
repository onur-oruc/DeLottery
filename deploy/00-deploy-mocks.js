const { network } = require("hardhat")
const { developmentChains } = require("../helper-hardhat-config")

const BASE_FEE = ethers.utils.parseEther("0.25") // 0.25 is the premium. It costs 0.25 LINK
const GAS_PRICE_LINK = 1e9 // calculated value based on the gas price of the chain

module.exports = async function ({ getNamedAccounts, deployments }) {
    const { deploy, log } = deployments
    const { deployer } = await getNamedAccounts()
    const args = [BASE_FEE, GAS_PRICE_LINK]

    if (developmentChains.includes(network.name)) {
        log("Deploying mocks")
        await deploy("VRFCoordinatorV2Mock", {
            contract: "VRFCoordinatorV2Mock", // if you don't add this line you will not
            // be able to use "deployments.get("VRFCoordinatorV2Mock")" in the
            // "00-deploy-mocks.js" file. Your only option will be ethers.getContract("VRFCoordinatorV2Mock") (????)

            from: deployer,
            args: args, // constructor arguments
            log: true,
        })
        log("Mocks deployed!")
        log("---------------------------------------")
    }
}

module.exports.tags = ["all", "mocks"]
