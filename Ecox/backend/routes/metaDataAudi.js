const express = require('express');
const router = express.Router();
const MetaDataAuditor = require('../models/MetaDataAudi');

// Route to upload metadata
router.post('/upload', async (req, res) => {
    try {
        const { desc, AudiNo } = req.body;

        // Validation
        if (!desc || !AudiNo) {
            return res.status(400).json({ success: false, message: 'Missing required fields' });
        }

        // Create a new metadata auditor
        const newMetaDataAuditor = new MetaDataAuditor({
            desc: desc,
            audiNo: AudiNo
        });

        // Save to database
        const savedMetaDataAuditor = await newMetaDataAuditor.save();

        res.status(201).json({
            success: true,
            metaDataAudi: savedMetaDataAuditor
        });
    } catch (error) {
        console.error('Error uploading metadata:', error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
});

module.exports = router;
