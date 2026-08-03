// SPDX-License-Identifier: GPL-2.0-or-later
pragma solidity >=0.5.0;

import './pool/INevorV3PoolImmutables.sol';
import './pool/INevorV3PoolState.sol';
import './pool/INevorV3PoolDerivedState.sol';
import './pool/INevorV3PoolActions.sol';
import './pool/INevorV3PoolOwnerActions.sol';
import './pool/INevorV3PoolEvents.sol';

/// @title The interface for a Uniswap V3 Pool
/// @notice A Uniswap pool facilitates swapping and automated market making between any two assets that strictly conform
/// to the ERC20 specification
/// @dev The pool interface is broken up into many smaller pieces
interface INevorV3Pool is
    INevorV3PoolImmutables,
    INevorV3PoolState,
    INevorV3PoolDerivedState,
    INevorV3PoolActions,
    INevorV3PoolOwnerActions,
    INevorV3PoolEvents
{

}
