//SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.20;

import {ERC20} from "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import {FrenCurve, Frenship} from "./FrenCurve.sol";

/// @title FrenERC20
/// @notice An ERC20 token that only allows transfers between frens.
/// @author erhant
contract FrenERC20 is ERC20 {
    FrenCurve public frenCurve;

    constructor(string memory name, string memory symbol, address _frenCurve) ERC20(name, symbol) {
        frenCurve = FrenCurve(_frenCurve);
    }

    function _beforeTokenTransfer(address from, address to, uint256 amount) internal override {
        require(frenships[from][to] == Frenship.Frens, "FrenERC20: Transfer not allowed between non-frens");
        super._beforeTokenTransfer(from, to, amount);
    }
}
