// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/AccessControl.sol";

contract CoalNFT is ERC721URIStorage, AccessControl {
    uint256 public _songId = 0;

    struct Copyright {
        uint256 songId;
        uint256 shares;
    }

    struct Song {
        uint256 id;
        uint256 date;
        address author;
        Copyright[] copyrights;
    }

    event SongAdded(
        uint256 id,
        uint256 date,
        address author,
        string metadata,
        Copyright[] copyrights
    );

    mapping(uint256 => Song) private _songs;

    constructor() ERC721("CoalNFT", "COALS") {}

    function addSong(
        address author,
        string memory tokenURI,
        Copyright[] memory copyrights
    ) external {
        uint256 songId = _songId++;
        _mint(author, songId);
        _setTokenURI(songId, tokenURI);

        Song storage newSong = _songs[songId];

        newSong.id = songId;
        newSong.date = block.timestamp;
        newSong.author = author;

        uint256 lg = copyrights.length;
        for (uint256 i = 0; i < lg; i++) {
            newSong.copyrights.push(copyrights[i]);
        }

        emit SongAdded(
            songId,
            newSong.date,
            author,
            tokenURI,
            newSong.copyrights
        );
    }

    function getCurrentSongId() public view returns (uint256 id) {
        return _songId;
    }

    function getSong(uint256 songId) public view returns (Song memory) {
        return _songs[songId];
    }

    function getCopyrights(
        uint256 songId
    ) public view returns (Copyright[] memory) {
        return _songs[songId].copyrights;
    }

    function supportsInterface(
        bytes4 interfaceId
    )
        public
        view
        virtual
        override(ERC721URIStorage, AccessControl)
        returns (bool)
    {
        return
            ERC721.supportsInterface(interfaceId) ||
            AccessControl.supportsInterface(interfaceId);
    }
}
