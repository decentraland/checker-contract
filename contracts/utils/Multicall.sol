// SPDX-License-Identifier: MIT

pragma solidity 0.8.16;

abstract contract Multicall {
    function multicall(
        bytes[] calldata data
    ) external view returns (bool[] memory results) {
        results = new bool[](data.length);

        for (uint256 i = 0; i < data.length; i++) {
            (bool success, bytes memory result) = address(this).staticcall(
                data[i]
            );

            require(success, "Checker#multicall: STATICCALL_FAILED");

            bool decodedResult = abi.decode(result, (bool));

            results[i] = decodedResult;
        }

        return results;
    }
}
