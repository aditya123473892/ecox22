// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract OneTimeSaleToken is ERC20,Ownable {
    uint256 public salePrice;
    string public metaData;
    address public payoutAddress;
    mapping(address => uint256) public purchasedTokens;

    event TokensPurchased(address indexed buyer, uint256 amount);
    event TokensBurned(address indexed burner, uint256 amount, string metaData);
    event AuditorRegistered(address indexed owner, string indexed name, string email, string accreditationNumber);

    constructor(
        string memory name,
        string memory symbol,
        uint256 initialSupply,
        uint256 _salePrice,
        string memory _metaData,
        address _payoutAddress
    ) ERC20(name, symbol) Ownable(msg.sender) {
        _mint(msg.sender, initialSupply);
        salePrice = _salePrice;
        metaData = _metaData;
        payoutAddress = _payoutAddress;
    }

    function buyToken(uint256 amount) public payable {
        require(msg.value == amount * salePrice, "Incorrect payment amount");
        require(balanceOf(address(this)) >= amount, "Not enough tokens available");

        _transfer(address(this), msg.sender, amount);
        purchasedTokens[msg.sender] += amount;

        emit TokensPurchased(msg.sender, amount);
    }

    function burnToken(uint256 amount) public {
        _burn(msg.sender, amount);
        emit TokensBurned(msg.sender, amount, metaData);
    }

    function mint(uint256 amount) public onlyOwner {
        _mint(address(this), amount);
    }

    function getPurchasedTokens(address account) public view returns (uint256) {
        return purchasedTokens[account];
    }

    function getUnsoldTokens() public view returns (uint256) {
        return balanceOf(address(this));
    }

    function registerAuditor(string memory name, string memory email, string memory accreditationNumber) public {
        emit AuditorRegistered(msg.sender, name, email, accreditationNumber);
    }
}
