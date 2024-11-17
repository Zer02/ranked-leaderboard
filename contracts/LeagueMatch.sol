// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract LeagueMatch {
    struct Player {
        address wallet;
        uint256 elo;
        uint256 matchesPlayed;
        uint256 wins;
    }

    struct Court {
        string name;
        address[] topPlayers;
        mapping(address => bool) registeredPlayers;
    }

    mapping(address => Player) public players;
    mapping(string => Court) public courts;

    event MatchRecorded(string courtName, address winner, address loser);

    function registerPlayer(string memory courtName) public {
        require(!courts[courtName].registeredPlayers[msg.sender], "Already registered");
        courts[courtName].registeredPlayers[msg.sender] = true;

        // Initialize player stats if not already registered in the system
        if (players[msg.sender].wallet == address(0)) {
            players[msg.sender] = Player(msg.sender, 1000, 0, 0); // Start with ELO 1000
        }
    }

    function recordMatch(
        string memory courtName,
        address winner,
        address loser
    ) public {
        require(courts[courtName].registeredPlayers[winner], "Winner not registered");
        require(courts[courtName].registeredPlayers[loser], "Loser not registered");

        // Update stats
        players[winner].elo += 20; // Example ELO gain
        players[loser].elo -= 10;  // Example ELO loss
        players[winner].wins += 1;
        players[winner].matchesPlayed += 1;
        players[loser].matchesPlayed += 1;

        // Emit event for leaderboard updates
        emit MatchRecorded(courtName, winner, loser);

        // Update court leaderboard
        _updateLeaderboard(courtName, winner);
    }

    function getLeaderboard(string memory courtName) public view returns (address[] memory) {
        return courts[courtName].topPlayers;
    }

    function _updateLeaderboard(string memory courtName, address player) internal {
        address[] storage leaderboard = courts[courtName].topPlayers;

        // Ensure the player is on the leaderboard
        bool found = false;
        for (uint256 i = 0; i < leaderboard.length; i++) {
            if (leaderboard[i] == player) {
                found = true;
                break;
            }
        }
        if (!found) {
            leaderboard.push(player);
        }

        // Sort leaderboard by ELO (highest first)
        for (uint256 i = 0; i < leaderboard.length; i++) {
            for (uint256 j = i + 1; j < leaderboard.length; j++) {
                if (players[leaderboard[j]].elo > players[leaderboard[i]].elo) {
                    (leaderboard[i], leaderboard[j]) = (leaderboard[j], leaderboard[i]);
                }
            }
        }

        // Trim leaderboard to top N (e.g., top 10 players)
        if (leaderboard.length > 10) {
            leaderboard.pop();
        }
    }
}
