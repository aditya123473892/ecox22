import { createSlice } from '@reduxjs/toolkit';

const dataSlice = createSlice({
    name: "data",
    initialState: {
        
        walletAddress: null,
        contracts: [],
        coords: {},
        orderDetails: null,
        thisContract: null,
        thisContractAddress: null,
        wallet: null,
        tokens: null,
        connectWalletRef: null,
        walletBalance: [],
        auditor: null,
        verifiedContracts: {},  // New state to track verified contracts
    },
    reducers: {
        setWalletAddress(state, action) {
            state.walletAddress = action.payload;
        },
        setCoords(state, action) {
            state.coords = action.payload;
        },
        setContracts(state, action) {
            state.contracts = action.payload;
        },
        setThisContract(state, action) {
            state.thisContract = action.payload;
        },
        setThisContractAddress(state, action) {
            state.thisContractAddress = action.payload;
        },
        setConnectWalletRef(state, action) {
            state.connectWalletRef = action.payload;
        },
        setWalletBalance(state, action) {
            state.walletBalance = action.payload;
        },
        setAuditor(state, action) {
            state.auditor = action.payload;
        },
        // verifyContract(state, action) {  // New reducer for contract verification
        //     const contractIndex = action.payload;
        //     state.verifiedContracts[contractIndex] = true;
        // },
        // verifyContract(state, action) {
        //     const { contractIndex, auditorAccreditationNumber } = action.payload;
        //     state.verifiedContracts[contractIndex] = {
        //         verified: true,
        //         auditorAccreditationNumber
        //     };
        // },
        // updateContractVerification(state, action) {
        //     const { address, verified, auditorAccreditationNumber } = action.payload;
        //     const contractIndex = state.contracts.findIndex(c => c.address === address);
        //     if (contractIndex !== -1) {
        //         state.contracts[contractIndex].verified = verified;
        //         state.contracts[contractIndex].auditorAccreditationNumber = auditorAccreditationNumber;
        //     }
        // }
        verifyContract(state, action) {
            const { contractAddress, auditorAccreditationNumber } = action.payload;
            const contractIndex = state.contracts.findIndex(c => c.address === contractAddress);
            if (contractIndex !== -1) {
                state.contracts[contractIndex].verified = true;
                state.contracts[contractIndex].auditorAccreditationNumber = auditorAccreditationNumber;
            }
        },
       
    }
});

export const dataActions = dataSlice.actions;
export default dataSlice.reducer;