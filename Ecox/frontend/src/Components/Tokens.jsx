import { useSelector, useDispatch } from "react-redux";
import { backendUrl } from "../App";
import { dataActions } from "../store/data-slice";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

export default function Tokens() {
  const contracts = useSelector((state) => state.data.contracts);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    getContracts();
  }, []);

  const getContracts = async () => {
    try {
      const response = await fetch(`${backendUrl}/contract/getAll`);
      const data = await response.json();
      console.log("data:", data);
      if (data.success) {
        dispatch(dataActions.setContracts(data.contracts));
      }
    } catch (err) {
      console.log("error:", err);
    }
  };

  const handleRouting = (address) => {
    console.log("address:", address);
    navigate(`/token/${address}`);
  };

  const handleNavigate = (contractAddress) => {
    navigate(`/auditor-login?contractAddress=${contractAddress}`);
  };

  return (
    <>
      <div className="text-3xl text-center font-bold py-6 bg-gray-800 text-white">
        Tokens MarketPlace
      </div>
      {contracts.length !== 0 ? (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200 shadow-md rounded-lg my-4">
            <thead className="bg-gray-800 text-white uppercase text-sm leading-normal">
              <tr>
                <th className="py-3 px-6 text-left">Project / Institution</th>
                <th className="py-3 px-6 text-left">Symbol</th>
                <th className="py-3 px-6 text-left">Initial Supply</th>
                <th className="py-3 px-6 text-left">Sale Price (ETH)</th>
                <th className="py-3 px-6 text-left">Available Tokens</th>
                <th className="py-3 px-6 text-center">Action</th>
                <th className="py-3 px-6 text-center">Verification</th>
                <th className="py-3 px-6 text-center">Status</th>
              </tr>
            </thead>
            <tbody className="text-gray-700 text-sm font-light">
              {contracts.map((contract, index) => (
                <tr
                  className="border-b border-gray-200 hover:bg-gray-100"
                  key={index}
                >
                  <td className="py-3 px-6 text-left">{contract.name}</td>
                  <td className="py-3 px-6 text-left">{contract.symbol}</td>
                  <td className="py-3 px-6 text-left">
                    {contract.initialSupply}
                  </td>
                  <td className="py-3 px-6 text-left">
                    {(parseFloat(contract.salePrice) * 84).toFixed(4)}$
                  </td>
                  <td className="py-3 px-6 text-left">
                    {contract.availableTokens}
                  </td>
                  <td className="py-3 px-6 text-center">
                    {contract.verified ? (
                      <button
                        onClick={() => handleRouting(contract.address)}
                        className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded"
                      >
                        Buy
                      </button>
                    ) : (
                      <span className="text-gray-500">Not Available</span>
                    )}
                  </td>
                  <td className="py-3 px-6 text-center">
                    <button
                      className={`${
                        contract.verified
                          ? "bg-blue-500 hover:bg-blue-600"
                          : "bg-yellow-500 hover:bg-yellow-600"
                      } text-white font-semibold py-2 px-4 rounded`}
                      onClick={() => handleNavigate(contract.address)}
                    >
                      {contract.verified ? "Verified" : "Verify"}
                    </button>
                  </td>
                  <td className="py-3 px-6 text-center">
                    {contract.verified
                      ? contract.auditorAccreditationNumber
                      : "Not verified"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="text-center py-10">Loading...</div>
      )}
    </>
  );
}
