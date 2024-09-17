//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.17;

interface IERC721 {
    function transferFrom(address _from, address _to, uint256 _id) external;
}

contract Escrow {
    address public nftAddress;
    address payable public seller;
    address public inspector;
    address public lender;
    // address payable public marketplaceAccount; // Marketplace address
    // uint256 public marketplaceFee; // Marketplace fee percentage (in basis points, e.g., 250 = 2.5%)

    modifier onlySeller() {
        require(msg.sender == seller, "Only seller can call this method");
        _;
    }

    modifier onlyBuyer(uint256 _nftID) {
        require(msg.sender == buyer[_nftID], "Only buyer can call this method");
        _;
    }

    modifier onlyInspector() {
        require(msg.sender == inspector, "Only inspector can call this method");
        _;
    }

    mapping(uint256 => bool) public isListed;
    mapping(uint256 => uint256) public purchasePrice;
    mapping(uint256 => uint256) public escrowAmount;
    mapping(uint256 => address) public buyer;
    mapping(uint256 => bool) public inspectionPassed;
    mapping(uint256 => mapping(address => bool)) public approval;
    // mapping(uint256 => uint256) public nftSaleFunds;

    constructor(
        address _nftAddress,
        address payable _seller,
        address _inspector,
        address _lender
        // address payable _marketplaceAccount,
        // uint256 _marketplaceFee
    ) {
        nftAddress = _nftAddress;
        seller = _seller;
        inspector = _inspector;
        lender = _lender;
        // marketplaceAccount = _marketplaceAccount;
        // marketplaceFee = _marketplaceFee;
    }

    function list(
        uint256 _nftID,
        address _buyer,
        uint256 _purchasePrice,
        uint256 _escrowAmount
    ) public payable onlySeller {
        IERC721(nftAddress).transferFrom(msg.sender, address(this), _nftID);

        isListed[_nftID] = true;
        purchasePrice[_nftID] = _purchasePrice;
        escrowAmount[_nftID] = _escrowAmount;
        buyer[_nftID] = _buyer;
    }

    function depositEarnest(uint256 _nftID) public payable onlyBuyer(_nftID) {
        require(msg.value >= escrowAmount[_nftID], "Insufficient deposit");
        // nftSaleFunds[_nftID] += msg.value; // Track funds for this NFT
    }

    function updateInspectionStatus(
        uint256 _nftID,
        bool _passed
    ) public onlyInspector {
        inspectionPassed[_nftID] = _passed;
    }

    function approveSale(uint256 _nftID) public {
        approval[_nftID][msg.sender] = true;
    }

    // Finalize Sale
    // -> Require inspection status (add more items here, like appraisal)
    // -> Require sale to be authorized
    // -> Require funds to be correct amount
    // -> Transfer NFT to buyer
    // -> Transfer Funds to Seller

    // function finalizeSale(uint256 _nftID) public {
    //     require(inspectionPassed[_nftID], "Inspection not passed");
    //     require(approval[_nftID][buyer[_nftID]], "Buyer not approved");
    //     require(approval[_nftID][seller], "Seller not approved");
    //     require(approval[_nftID][lender], "Lender not approved");

    //     uint256 saleFunds = nftSaleFunds[_nftID];
    //     uint256 nftPrice = purchasePrice[_nftID];
    //     require(saleFunds >= nftPrice, "Insufficient funds for purchase");

    //     isListed[_nftID] = false;

    //     // Calculate the fee and amount to transfer
    //     uint256 fee = (nftPrice * marketplaceFee) / 10000; // Fixed percentage calculation
    //     uint256 amountToSeller = nftPrice - fee;
    //     // uint256 amountToSeller = nftPrice ;

    //     // // Transfer marketplace fee
    //     (bool feeSuccess, ) = payable(marketplaceAccount).call{value: fee}("");
    //     require(feeSuccess, "Marketplace fee transfer failed");

    //     // Transfer remaining amount to seller
    //     (bool sellerSuccess, ) = payable(seller).call{value: amountToSeller}("");
    //     require(sellerSuccess, "Seller payment failed");

    //     // Transfer NFT to buyer
    //     IERC721(nftAddress).transferFrom(address(this), buyer[_nftID], _nftID);

    //     // Remove funds for this NFT
    //     nftSaleFunds[_nftID] = 0;
    // }

    function finalizeSale(uint256 _nftID) public {
        require(inspectionPassed[_nftID], "Inspection not passed");
        require(approval[_nftID][buyer[_nftID]], "Buyer not approved");
        require(approval[_nftID][seller], "Seller not approved");
        require(approval[_nftID][lender], "Lender not approved");
        require(address(this).balance >= purchasePrice[_nftID]);

        isListed[_nftID] = false;

        (bool success, ) = payable(seller).call{value: address(this).balance}("");
        require(success,"Seller payment failed");

        IERC721(nftAddress).transferFrom(address(this), buyer[_nftID], _nftID);
    }

    // Cancel Sale (handle earnest deposit)
    // -> if inspection status is not approved, then refund, otherwise send to seller
    function cancelSale(uint256 _nftID) public {
        if (inspectionPassed[_nftID] == false) {
            payable(buyer[_nftID]).transfer(address(this).balance);
        } else {
            payable(seller).transfer(address(this).balance);
        }
    }

    receive() external payable {}

    function getBalance() public view returns (uint256) {
        return address(this).balance;
    }
}
