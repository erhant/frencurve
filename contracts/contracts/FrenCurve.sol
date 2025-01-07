//SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.20;

import {Math} from "@openzeppelin/contracts/utils/math/Math.sol";
import {Strings} from "@openzeppelin/contracts/utils/Strings.sol";

/// A frenship status.
public enum Frenship {
    None,
    Frens,
    NotFrens
}

/// @title FrenCurve
/// @notice A contract that implements the FrenCurve protocol.
/// @dev The FrenCurve protocol is a way to determine if two public keys are frens (friends).
contract FrenCurve {
    /// @notice A struct to represent a public key.
    struct PublicKey {
        uint256 x;
        uint256 y;
    }

    uint256 public constant FRENSHIP_THRESHOLD = type(uint256).max >> 1;

    mapping(address => PublicKey) public publicKeys;
    mapping(address => mapping(address => Frenship)) public frenships;

    /// @notice A function to calculate the distance between two points.
    /// @param x1 The x coordinate of the first point.
    /// @param y1 The y coordinate of the first point.
    /// @param x2 The x coordinate of the second point.
    /// @param y2 The y coordinate of the second point.
    /// @return The average 1-D distance between the two points.

    function dist(uint256 x1, uint256 y1, uint256 x2, uint256 y2) public pure returns (uint256) {
        uint256 xdiff = x1 > x2 ? x1 - x2 : x2 - x1;
        uint256 ydiff = y1 > y2 ? y1 - y2 : y2 - y1;

        uint256 ans = Math.average(xdiff, ydiff);
        return ans;
    }

    function fren(PublicKey memory p, PublicKey memory q, uint256 t) public pure returns (bool) {
        return dist(p.x, p.y, q.x, q.y) < t;
    }

    function makeFrens(address a, address b) external returns (bool) {
        PublicKey memory pkA = publicKeys[a];
        require(pkA.y != 0, "FrenCurve: Public key A is not registered");
        PublicKey memory pkB = publicKeys[b];
        require(pkA.y != 0, "FrenCurve: Public key B is not registered");

        bool isFren = fren(pkA, pkB, FRENSHIP_THRESHOLD);
        if (isFren) {
            frenships[a][b] = Frenship.Frens;
            frenships[b][a] = Frenship.Frens;
        } else {
            frenships[a][b] = Frenship.NotFrens;
            frenships[b][a] = Frenship.NotFrens;
        }

        return isFren;
    }

    function register(PublicKey calldata pk) external {
        // verify that msg.sender actually has this pk by deriving the address from the pk
        // and checking that it matches msg.sender
        address recoveredAddr = address(uint160(uint256(keccak256(abi.encodePacked(pk.x, pk.y)))));
        require(recoveredAddr == msg.sender, "FrenCurve: Invalid public key");

        publicKeys[msg.sender] = pk;
    }
}
