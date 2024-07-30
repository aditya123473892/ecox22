const express = require('express');
const router = express.Router();
const Contract = require('../models/Contract');
const MetaData = require('../models/MetaData');
const MetaDataAudi = require('../models/MetaDataAudi'); // Import MetaDataAudi model
const { Web3 } = require('web3');

const OneTimeSaleToken = require('../contracts/OneTimeSaleToken.json');
require('dotenv').config();

const infuraLink = process.env.INFURA_ENDPOINT;

// Route to get MetaData by ID
router.get('/get/:metaDataId', async (req, res) => {
    const metaDataId = req.params.metaDataId;
    try {
        const metaData = await MetaData.findById(metaDataId);
        res.status(200).send({
            success: true,
            metaData
        });
    } catch (err) {
        res.status(500).send({
            success: false,
            message: err.message
        });
    }
});

// Route to get all contracts
router.get('/getAll', async (req, res) => {
    try {
        const contracts = await Contract.find();
        const web3 = new Web3(new Web3.providers.HttpProvider(infuraLink));

        let populatedContractData = [];

        for (let i = 0; i < contracts.length; i++) {
            const contract = contracts[i];
            const contractAddress = contract.address;
            const contractInstance = new web3.eth.Contract(OneTimeSaleToken.abi, contractAddress);
            const name = await contractInstance.methods.name().call();
            const symbol = await contractInstance.methods.symbol().call();
            const initialSupply = await contractInstance.methods.totalSupply().call();
            const salePrice = await contractInstance.methods.salePrice().call();
            const metaData = await contractInstance.methods.metaData().call();
            const payoutAddress = await contractInstance.methods.payoutAddress().call();
            const availableTokens = await contractInstance.methods.getUnsoldTokens().call();
            
            const ethSalePrice = web3.utils.fromWei(salePrice, 'ether');

            const contractData = {
                address: contractAddress,
                name,
                symbol,
                initialSupply: initialSupply.toString(),
                salePrice: ethSalePrice,
                metaData,
                payoutAddress,
                availableTokens: availableTokens.toString(),
                _id: contract._id,
                weiSalePrice: salePrice.toString()
            };
            populatedContractData.push(contractData);
        }

        res.status(200).send({
            success: true,
            contracts: populatedContractData
        });
    } catch (err) {
        res.status(500).send({
            success: false,
            message: err.message
        });
    }
});

// Route to get a single MetaDataAudi by ID
router.get('/metaDataAudi/get/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const metaDataAudi = await MetaDataAudi.findById(id);
        if (!metaDataAudi) {
            return res.status(404).send({
                success: false,
                message: 'MetaDataAudi not found'
            });
        }
        res.status(200).send({
            success: true,
            metaDataAudi
        });
    } catch (err) {
        res.status(500).send({
            success: false,
            message: err.message
        });
    }
});

// Route to get all MetaDataAudi records
router.get('/metaDataAudi/getAll', async (req, res) => {
    try {
        const metaDataAudiList = await MetaDataAudi.find();
        res.status(200).send({
            success: true,
            metaDataAudiList
        });
    } catch (err) {
        res.status(500).send({
            success: false,
            message: err.message
        });
    }
});

// Route to create a new MetaDataAudi
// ... (previous code remains unchanged)

// Route to create a new MetaDataAudi
router.post('/metaDataAudi/create', async (req, res) => {
    const { email, name, audiNo } = req.body;

    if (!email || !name || !audiNo) {
        return res.status(400).send({
            success: false,
            message: 'All fields are required'
        });
    }

    try {
        const newMetaDataAudi = new MetaDataAudi({
            email,
            name,
            audiNo
        });

        const savedMetaDataAudi = await newMetaDataAudi.save();

        res.status(201).send({
            success: true,
            metaDataAudi: savedMetaDataAudi
        });
    } catch (err) {
        res.status(500).send({
            success: false,
            message: err.message
        });
    }
});

// New route for uploading MetaDataAudi
router.post('/metaDataAudi/upload', async (req, res) => {
    const { email, name, audiNo } = req.body;

    if (!email || !name || !audiNo) {
        return res.status(400).send({
            success: false,
            message: 'All fields are required'
        });
    }

    try {
        const newMetaDataAudi = new MetaDataAudi({
            email,
            name,
            audiNo
        });

        const savedMetaDataAudi = await newMetaDataAudi.save();

        res.status(201).send({
            success: true,
            metaDataAudi: savedMetaDataAudi
        });
    } catch (err) {
        res.status(500).send({
            success: false,
            message: err.message
        });
    }
}





);



module.exports = router;



