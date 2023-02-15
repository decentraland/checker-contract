/**
 *Submitted for verification at polygonscan.com on 2023-01-03
 */

/**
 *Submitted for verification at Etherscan.io on 2022-11-28
 */

// SPDX-License-Identifier: MIT

pragma solidity ^0.8.16;

interface ICollection {
    function items(
        uint256 _itemId
    )
        external
        view
        returns (
            string memory,
            uint256,
            uint256,
            uint256,
            address,
            string memory,
            string memory
        );

    function creator() external view returns (address);

    function globalManagers(address _user) external view returns (bool);

    function itemManagers(
        uint256 _itemId,
        address _user
    ) external view returns (bool);

    function isApproved() external view returns (bool);

    function isCompleted() external view returns (bool);
}

interface ICollectionFactory {
    function isCollectionFromFactory(
        address _collection
    ) external view returns (bool);
}

interface ITPRegistry {
    function thirdParties(
        string memory _tpID
    )
        external
        view
        returns (
            bool,
            bytes32,
            uint256,
            uint256,
            uint256,
            string memory,
            string memory
        );
}

interface INFT {
    function isApprovedForAll(
        address _user,
        address _operator
    ) external view returns (bool);

    function getApproved(uint256 _nft) external view returns (address);

    function updateOperator(uint256 _nft) external view returns (address);

    function updateManager(
        address _user,
        address _operator
    ) external view returns (bool);

    function ownerOf(uint256 _nft) external view returns (address);

    function encodeTokenId(int x, int y) external view returns (uint256);

    function getLandEstateId(uint256 nft) external view returns (uint256);
}

interface ICommittee {
    function members(address _user) external view returns (bool);
}

interface IDCLRegistrar {
    /**
     * @dev Get the owner of a subdomain
     * @param _subdomain - string of the subdomain
     * @return owner of the subdomain
     */
    function getOwnerOf(
        string memory _subdomain
    ) external view returns (address);
}

// OpenZeppelin Contracts (last updated v4.8.0) (utils/Address.sol)

/**
 * @dev Collection of functions related to the address type
 */
library Address {
    /**
     * @dev Returns true if `account` is a contract.
     *
     * [IMPORTANT]
     * ====
     * It is unsafe to assume that an address for which this function returns
     * false is an externally-owned account (EOA) and not a contract.
     *
     * Among others, `isContract` will return false for the following
     * types of addresses:
     *
     *  - an externally-owned account
     *  - a contract in construction
     *  - an address where a contract will be created
     *  - an address where a contract lived, but was destroyed
     *
     * Furthermore, `isContract` will also return true if the target contract within
     * the same transaction is already scheduled for destruction by `SELFDESTRUCT`,
     * which only has an effect at the end of a transaction.
     * ====
     *
     * [IMPORTANT]
     * ====
     * You shouldn't rely on `isContract` to protect against flash loan attacks!
     *
     * Preventing calls from contracts is highly discouraged. It breaks composability, breaks support for smart wallets
     * like Gnosis Safe, and does not provide security since it can be circumvented by calling from a contract
     * constructor.
     * ====
     */
    function isContract(address account) internal view returns (bool) {
        // This method relies on extcodesize/address.code.length, which returns 0
        // for contracts in construction, since the code is only stored at the end
        // of the constructor execution.

        return account.code.length > 0;
    }

    /**
     * @dev Replacement for Solidity's `transfer`: sends `amount` wei to
     * `recipient`, forwarding all available gas and reverting on errors.
     *
     * https://eips.ethereum.org/EIPS/eip-1884[EIP1884] increases the gas cost
     * of certain opcodes, possibly making contracts go over the 2300 gas limit
     * imposed by `transfer`, making them unable to receive funds via
     * `transfer`. {sendValue} removes this limitation.
     *
     * https://consensys.net/diligence/blog/2019/09/stop-using-soliditys-transfer-now/[Learn more].
     *
     * IMPORTANT: because control is transferred to `recipient`, care must be
     * taken to not create reentrancy vulnerabilities. Consider using
     * {ReentrancyGuard} or the
     * https://solidity.readthedocs.io/en/v0.5.11/security-considerations.html#use-the-checks-effects-interactions-pattern[checks-effects-interactions pattern].
     */
    function sendValue(address payable recipient, uint256 amount) internal {
        require(
            address(this).balance >= amount,
            "Address: insufficient balance"
        );

        (bool success, ) = recipient.call{value: amount}("");
        require(
            success,
            "Address: unable to send value, recipient may have reverted"
        );
    }

    /**
     * @dev Performs a Solidity function call using a low level `call`. A
     * plain `call` is an unsafe replacement for a function call: use this
     * function instead.
     *
     * If `target` reverts with a revert reason, it is bubbled up by this
     * function (like regular Solidity function calls).
     *
     * Returns the raw returned data. To convert to the expected return value,
     * use https://solidity.readthedocs.io/en/latest/units-and-global-variables.html?highlight=abi.decode#abi-encoding-and-decoding-functions[`abi.decode`].
     *
     * Requirements:
     *
     * - `target` must be a contract.
     * - calling `target` with `data` must not revert.
     *
     * _Available since v3.1._
     */
    function functionCall(
        address target,
        bytes memory data
    ) internal returns (bytes memory) {
        return
            functionCallWithValue(
                target,
                data,
                0,
                "Address: low-level call failed"
            );
    }

    /**
     * @dev Same as {xref-Address-functionCall-address-bytes-}[`functionCall`], but with
     * `errorMessage` as a fallback revert reason when `target` reverts.
     *
     * _Available since v3.1._
     */
    function functionCall(
        address target,
        bytes memory data,
        string memory errorMessage
    ) internal returns (bytes memory) {
        return functionCallWithValue(target, data, 0, errorMessage);
    }

    /**
     * @dev Same as {xref-Address-functionCall-address-bytes-}[`functionCall`],
     * but also transferring `value` wei to `target`.
     *
     * Requirements:
     *
     * - the calling contract must have an ETH balance of at least `value`.
     * - the called Solidity function must be `payable`.
     *
     * _Available since v3.1._
     */
    function functionCallWithValue(
        address target,
        bytes memory data,
        uint256 value
    ) internal returns (bytes memory) {
        return
            functionCallWithValue(
                target,
                data,
                value,
                "Address: low-level call with value failed"
            );
    }

    /**
     * @dev Same as {xref-Address-functionCallWithValue-address-bytes-uint256-}[`functionCallWithValue`], but
     * with `errorMessage` as a fallback revert reason when `target` reverts.
     *
     * _Available since v3.1._
     */
    function functionCallWithValue(
        address target,
        bytes memory data,
        uint256 value,
        string memory errorMessage
    ) internal returns (bytes memory) {
        require(
            address(this).balance >= value,
            "Address: insufficient balance for call"
        );
        (bool success, bytes memory returndata) = target.call{value: value}(
            data
        );
        return
            verifyCallResultFromTarget(
                target,
                success,
                returndata,
                errorMessage
            );
    }

    /**
     * @dev Same as {xref-Address-functionCall-address-bytes-}[`functionCall`],
     * but performing a static call.
     *
     * _Available since v3.3._
     */
    function functionStaticCall(
        address target,
        bytes memory data
    ) internal view returns (bytes memory) {
        return
            functionStaticCall(
                target,
                data,
                "Address: low-level static call failed"
            );
    }

    /**
     * @dev Same as {xref-Address-functionCall-address-bytes-string-}[`functionCall`],
     * but performing a static call.
     *
     * _Available since v3.3._
     */
    function functionStaticCall(
        address target,
        bytes memory data,
        string memory errorMessage
    ) internal view returns (bytes memory) {
        (bool success, bytes memory returndata) = target.staticcall(data);
        return
            verifyCallResultFromTarget(
                target,
                success,
                returndata,
                errorMessage
            );
    }

    /**
     * @dev Same as {xref-Address-functionCall-address-bytes-}[`functionCall`],
     * but performing a delegate call.
     *
     * _Available since v3.4._
     */
    function functionDelegateCall(
        address target,
        bytes memory data
    ) internal returns (bytes memory) {
        return
            functionDelegateCall(
                target,
                data,
                "Address: low-level delegate call failed"
            );
    }

    /**
     * @dev Same as {xref-Address-functionCall-address-bytes-string-}[`functionCall`],
     * but performing a delegate call.
     *
     * _Available since v3.4._
     */
    function functionDelegateCall(
        address target,
        bytes memory data,
        string memory errorMessage
    ) internal returns (bytes memory) {
        (bool success, bytes memory returndata) = target.delegatecall(data);
        return
            verifyCallResultFromTarget(
                target,
                success,
                returndata,
                errorMessage
            );
    }

    /**
     * @dev Tool to verify that a low level call to smart-contract was successful, and revert (either by bubbling
     * the revert reason or using the provided one) in case of unsuccessful call or if target was not a contract.
     *
     * _Available since v4.8._
     */
    function verifyCallResultFromTarget(
        address target,
        bool success,
        bytes memory returndata,
        string memory errorMessage
    ) internal view returns (bytes memory) {
        if (success) {
            if (returndata.length == 0) {
                // only check isContract if the call was successful and the return data is empty
                // otherwise we already know that it was a contract
                require(isContract(target), "Address: call to non-contract");
            }
            return returndata;
        } else {
            _revert(returndata, errorMessage);
        }
    }

    /**
     * @dev Tool to verify that a low level call was successful, and revert if it wasn't, either by bubbling the
     * revert reason or using the provided one.
     *
     * _Available since v4.3._
     */
    function verifyCallResult(
        bool success,
        bytes memory returndata,
        string memory errorMessage
    ) internal pure returns (bytes memory) {
        if (success) {
            return returndata;
        } else {
            _revert(returndata, errorMessage);
        }
    }

    function _revert(
        bytes memory returndata,
        string memory errorMessage
    ) private pure {
        // Look for revert reason and bubble it up if present
        if (returndata.length > 0) {
            // The easiest way to bubble the revert reason is using memory via assembly
            /// @solidity memory-safe-assembly
            assembly {
                let returndata_size := mload(returndata)
                revert(add(32, returndata), returndata_size)
            }
        } else {
            revert(errorMessage);
        }
    }
}

contract Checker {
    /// @notice Check that an address has access to a certain wearable or emote.
    /// @param _sender The address for which access will be checked.
    /// @param _factories An array of collection factories used to validate that _collection was created by one of them.
    /// @param _collection The address of the collection containing the item.
    /// @param _itemId The id if the item.
    /// @param _contentHash The content hash of the item.
    /// @param _committees Array of committee contracts.
    function validateWearables(
        address _sender,
        ICollectionFactory[] calldata _factories,
        ICollection _collection,
        uint256 _itemId,
        string memory _contentHash,
        ICommittee[] calldata _committees
    ) external view returns (bool) {
        // Check that the collection was created by one of the provided factories.
        // Skip this check if no factories are provided. Skipping is required for L1 collections as they were not created with a factory.
        if (_factories.length > 0) {
            bool isCollectionFromFactory;

            for (uint256 i; i < _factories.length; i++) {
                ICollectionFactory factory = _factories[i];

                isCollectionFromFactory = factory.isCollectionFromFactory(
                    address(_collection)
                );

                if (isCollectionFromFactory) {
                    break;
                }
            }

            if (!isCollectionFromFactory) {
                return false;
            }
        }

        (, , , , , , string memory contentHash) = _collection.items(_itemId);

        if (bytes(contentHash).length != 0) {
            // Only a _sender that belongs to the committee can have access to an item that has a defined content hash.
            bool isCommitteeMember;

            for (uint256 i; i < _committees.length; i++) {
                ICommittee committee = _committees[i];

                isCommitteeMember = committee.members(_sender);

                if (isCommitteeMember) {
                    break;
                }
            }

            bool isHashOk = keccak256(bytes(contentHash)) ==
                keccak256(bytes(_contentHash));

            return isCommitteeMember && isHashOk;
        }

        bool isCollectionValid = !_collection.isApproved() &&
            _collection.isCompleted();

        bool hasAccess = _sender == _collection.creator() ||
            _collection.globalManagers(_sender) ||
            _collection.itemManagers(_itemId, _sender);

        return isCollectionValid && hasAccess;
    }

    /// @notice Check that merkle root matches the merkle root of a third party.
    /// @param _tpRegistry Address of the third party registry contract.
    /// @param _tpId The id of the third party.
    /// @param _root The merkle root to validate.
    function validateThirdParty(
        ITPRegistry _tpRegistry,
        string memory _tpId,
        bytes32 _root
    ) external view returns (bool) {
        (bool isApproved, bytes32 root, , , , , ) = _tpRegistry.thirdParties(
            _tpId
        );

        return isApproved && root == _root;
    }

    function checkName(
        address _sender,
        IDCLRegistrar _registrar,
        string calldata _name
    ) external view returns (bool) {
        return _sender == _registrar.getOwnerOf(_name);
    }

    function checkLAND(
        address _sender,
        INFT _land,
        INFT _estate,
        int256 _x,
        int256 _y
    ) external view returns (bool) {
        uint256 landId = _land.encodeTokenId(_x, _y);
        address landOwner = _land.ownerOf(landId);

        if (landOwner == _sender) {
            return true;
        }

        if (_land.getApproved(landId) == _sender) {
            return true;
        }

        if (_land.updateOperator(landId) == _sender) {
            return true;
        }

        if (_land.isApprovedForAll(landOwner, _sender)) {
            return true;
        }

        if (_land.updateManager(landOwner, _sender)) {
            return true;
        }

        if (landOwner == address(_estate)) {
            uint256 estateId = _estate.getLandEstateId(landId);
            address estateOwner = _estate.ownerOf(estateId);

            if (estateOwner == _sender) {
                return true;
            }

            if (_estate.getApproved(estateId) == _sender) {
                return true;
            }

            if (_estate.updateOperator(estateId) == _sender) {
                return true;
            }

            if (_estate.isApprovedForAll(estateOwner, _sender)) {
                return true;
            }

            if (_estate.updateManager(estateOwner, _sender)) {
                return true;
            }
        }

        return false;
    }

    function multicall(
        bytes[] calldata data
    ) external view returns (bool[] memory results) {
        results = new bool[](data.length);
        for (uint256 i = 0; i < data.length; i++) {
            bytes memory result = Address.functionStaticCall(
                address(this),
                data[i]
            );
            bool decodedResult = abi.decode(result, (bool));
            results[i] = decodedResult;
        }
        return results;
    }
}
