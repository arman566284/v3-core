// SPDX-License-Identifier: GPL-2.0-or-later
pragma solidity >=0.5.0;

import './pool/INexusV3PoolImmutables.sol';
import './pool/INexusV3PoolState.sol';
import './pool/INexusV3PoolDerivedState.sol';
import './pool/INexusV3PoolActions.sol';
import './pool/INexusV3PoolOwnerActions.sol';
import './pool/INexusV3PoolEvents.sol';

/// @title The interface for a Uniswap V3 Pool
/// @notice A Uniswap pool facilitates swapping and automated market making between any two assets that strictly conform
/// to the ERC20 specification
/// @dev The pool interface is broken up into many smaller pieces
interface INexusV3Pool is
    INexusV3PoolImmutables,
    INexusV3PoolState,
    INexusV3PoolDerivedState,
    INexusV3PoolActions,
    INexusV3PoolOwnerActions,
    INexusV3PoolEvents
{

}
