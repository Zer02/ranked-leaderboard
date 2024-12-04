// Player Ratings Object (to be passed from external files)
export let playerRatings = {};

// Match result function
export function recordMatch(winner, loser) {
  const KFactor = 32; // Base K-Factor
  const maxRatingDiff = 400; // Maximum rating difference for K-Factor adjustment
  const minActivity = 0.5; // Minimum activity level for rating change

  // Calculate expected win probabilities
  const expectedWinner =
    1 /
    (1 +
      10 **
        ((playerRatings[loser].rating - playerRatings[winner].rating) / 400));
  const expectedLoser =
    1 /
    (1 +
      10 **
        ((playerRatings[winner].rating - playerRatings[loser].rating) / 400));

  // Calculate performance variance
  const winnerVolatility = Math.min(
    playerRatings[winner].volatility + 0.03,
    0.24
  ); // Maximum volatility capped at 0.24
  const loserVolatility = Math.min(
    playerRatings[loser].volatility + 0.03,
    0.24
  );

  // Calculate new ratings
  const winnerRatingChange =
    KFactor *
    (1 - expectedWinner) *
    Math.sqrt(
      maxRatingDiff /
        (Math.abs(playerRatings[winner].rating - playerRatings[loser].rating) +
          maxRatingDiff)
    ) *
    winnerVolatility;
  const loserRatingChange =
    KFactor *
    (0 - expectedLoser) *
    Math.sqrt(
      maxRatingDiff /
        (Math.abs(playerRatings[winner].rating - playerRatings[loser].rating) +
          maxRatingDiff)
    ) *
    loserVolatility;

  // Update player ratings
  playerRatings[winner].rating += winnerRatingChange;
  playerRatings[loser].rating += loserRatingChange;

  // Adjust K-Factor based on player activity
  playerRatings[winner].activity = Math.max(
    playerRatings[winner].activity,
    minActivity
  );
  playerRatings[loser].activity = Math.max(
    playerRatings[loser].activity,
    minActivity
  );
  const adjustedKFactorWinner =
    KFactor * Math.sqrt(playerRatings[winner].activity);
  const adjustedKFactorLoser =
    KFactor * Math.sqrt(playerRatings[loser].activity);

  // Update volatility and activity levels
  playerRatings[winner].volatility = winnerVolatility;
  playerRatings[loser].volatility = loserVolatility;
  playerRatings[winner].activity *= 0.9; // Decrease activity level over time
  playerRatings[loser].activity *= 0.9;

  console.log(`Match result - ${winner} wins!`);
  console.log(
    `${winner}: ${playerRatings[winner].rating.toFixed(
      2
    )} (${winnerRatingChange.toFixed(2)})`
  );
  console.log(
    `${loser}: ${playerRatings[loser].rating.toFixed(
      2
    )} (${loserRatingChange.toFixed(2)})`
  );
}
