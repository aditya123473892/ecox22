const Contract = require("./models/Contract");
const MetaData = require("./models/MetaData");
const MetaDataAudi = require("./models/MetaDataAudi");

async function saveContract({ contractId }) {
    try {
        const contract = new Contract({
            address: contractId
        });
        await contract.save();
        return contract;
    } catch (err) {
        console.error('Error saving contract:', err);
        return null;
    }
}

async function uploadContractMetaData({ name, symbol, initialSupply, salePrice, payoutAddress }) {
    try {
        const metaData = new MetaData({
            name,
            symbol,
            initialSupply,
            salePrice,
            payoutAddress
        });
        await metaData.save(); // Use save() method to persist the data
        return metaData;
    } catch (e) {
        console.error('Error uploading contract metadata:', e);
        return null;
    }
}

async function saveMetaDataAudi({ desc, audiNo }) {
    try {
        const metaDataAudi = new MetaDataAudi({
            desc,
            audiNo
        });
        await metaDataAudi.save(); // Use save() method to persist the data
        return metaDataAudi;
    } catch (err) {
        console.error('Error saving metadata audi:', err);
        return null;
    }
}

module.exports = { saveContract, uploadContractMetaData, saveMetaDataAudi };
