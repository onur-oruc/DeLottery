const { FRONT_END_ADDRESSES_FILE, FRONT_END_ABI_FILE } = require("../helper-hardhat-config")
const fs = require("fs")
const { network } = require("hardhat")

module.exports = async function () {
    if (process.env.UPDATE_FRONT_END) {
        updateContractAddresses()
        updateAbi()
    }
}

async function updateAbi() {
    const raffle = await ethers.getContract("Raffle")
    fs.writeFileSync(FRONT_END_ABI_FILE, raffle.interface.format(ethers.utils.FormatTypes.json))
}

async function updateContractAddresses() {
    const raffle = await ethers.getContract("Raffle")
    const chainIdStr = network.config.chainId.toString()
    const currentAddresses = JSON.parse(fs.readFileSync(FRONT_END_ADDRESSES_FILE, "utf8"))
    if (chainIdStr in currentAddresses) {
        if (!currentAddresses[chainIdStr].includes(raffle.address)) {
            currentAddresses[chainIdStr].push(raffle.address)
        }
    } else {
        currentAddresses[chainIdStr] = [raffle.address]
    }
    fs.writeFileSync(FRONT_END_ADDRESSES_FILE, JSON.stringify(currentAddresses))
}

module.exports.tags = ["all", "frontend"]
