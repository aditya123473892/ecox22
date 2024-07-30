const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");

const ONE_ETHER = "1000000000000000000"; // 1 ETH in wei

const OneTimeSaleTokenModule = buildModule("OneTimeSaleToken", (m) => {
  const name = m.getParameter("name", "OneTimeSaleToken");
  const symbol = m.getParameter("symbol", "OTS");
  const initialSupply = m.getParameter("initialSupply", "1000000000000000000000000"); // 1 million tokens with 18 decimals
  const salePrice = m.getParameter("salePrice", "10000000000000000"); // 0.01 ETH in wei
  const metaData = m.getParameter("metaData", "Example MetaData");
  const payoutAddress = m.getParameter("payoutAddress", "0x36656521023C528a3de09D584F19CE58d153c536");

  const token = m.contract("OneTimeSaleToken", [
    name,
    symbol,
    initialSupply,
    salePrice,
    metaData,
    payoutAddress,
  ]);

  return { token };
});

module.exports = OneTimeSaleTokenModule;