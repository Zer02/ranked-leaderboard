# ranked-leaderboard

## To-Do
- fix topPlayers array -> show different rankings for each court location
- implement decentralized backend (firebase temporary)
  - write smart contract
  - test contract
  - connect front and back ends
  - test user auth
- add ERC-721 (NFT battle pass) 

## Alias List
- zER-X29
- Zer0x29

## Game Modes
---
### 1v1 Ranked Ladder (Beginner - Intermediate Leagues)
* *Underhand Serves Only* 
* First to 11 or 21 (losing player at 11 decides to go to 21 or take the loss)
* Only score on your serve (which will be purposely designed to be disadvantageous - as opposed to tennis, where people on serve have the advantage)
* Rally for serve (2 serves each)
* Player1 serves to Player2 in diagonal service box 
* Player2 receives serve and must hit ball past opponent's service box, otherwise Player1 earns 1 point
---
### 1v1 Ranked Ladder (Advanced Leagues) -> TBD
* *Overhead Serves Allowed*

---
### King of the Court (3+ players)
* 2 or more players (no upper limit, game will take longer with more players)
* First to 11 or 21 (if 1v1 - losing player at 11 decides to go to 21 or take the loss)
* King goes to whoever wins first point 
* Challengers will have to win 2 points to beat current King (Challengers serve first, King serves on second point)
* Points can be earned in 2 ways:
  1. Become King: first point = first blood bonus point
  2. Win points as King


## Chat with GPT
### 12/2/25 
**How paywalled would you say recreational tennis is for adults in New York City?**

It depends a lot on what “recreational tennis” means (how often, what level of facility, whether indoors/privately run vs public parks, lessons, etc.). But on balance I’d say it’s moderately paywalled in NYC — there are low-cost and even “free-ish” options, but many of the better ones come at a nontrivial cost and there are logistical and time barriers. I’ll break down what I found to give you a clearer picture.

How “paywalled” is it — i.e. what are the barriers?

From what I saw, the barriers are less about an absolute “can’t do it without spending a lot” and more about time, convenience, and premium quality. Some of the barriers:

* Permit requirement: To use outdoor courts in many parks during tennis season, you need a permit. That’s $100/year, which isn’t huge but is a hurdle for very casual players. 

* Reservation vs walk-on access: Many courts require reservations (especially at prime spots) or have limited slots. If you want the convenience of reserving ahead at a popular court or during prime hours, you often pay reservation fees. 

* Seasonality: Outdoor courts are seasonal (spring-to-fall), so for much of the year, options shrink unless you go indoor (which costs more). 

* Time constraints: Popular courts fill quickly, especially in good weather, evenings, weekends. So even with “cheap” public courts, there’s sometimes the cost in time (arrive early, wait) or having to settle for less desirable times/locations.

* Quality / amenities: If you want nicer courts, lighting, indoor access (winter), coaching, etc., that tends to push you into private clubs or paid premium courts which are significantly more expensive.

Bottom line: how paywalled?

Putting it all together, I’d rate it as moderately restrictive but not extremely so — there are accessible paths to playing frequently without huge cost, especially if you accept outdoor courts, odd hours, and some flexibility. But if you want high quality, indoor, easy reservable courts, or coaching, then yes, it becomes fairly paywalled.

If you were to put it on a scale of 1 to 10 (1 = basically completely free / very easy access; 10 = almost totally restricted & expensive), I’d say recreational tennis for adults in NYC is around 6 or 7. Good options exist, but real cost or effort kicks in once you want convenience or premium experience.

### 12/3/25
NYC recreational tennis is heavily paywalled, especially for intermediate adults who want consistent, level-appropriate matches without breaking the bank.

Let’s unpack why:

🎾 1. Finding players at your level is the biggest hidden barrier

Even though there are tons of players in NYC, the ecosystem is fragmented:

Public courts don’t have built-in matchmaking. You can show up with a permit, but you need to find opponents yourself — either through word of mouth, Meetup groups, or apps like Kourts, TennisPAL, or Break the Love.

Most “open play” meetups or community ladders are either flooded with beginners or thinly populated at the intermediate level (3.5–4.5 NTRP).

The few good ladders or rating-based leagues (like USTA, NY Tennis Meetup leagues, or FlexLeagues) typically cost $50–$100 per season plus you still need to pay for court time.

So, unless you already have a network of regular partners, you often end up paying to access other players.

💸 2. Court fees and permits stack up quickly

Even at “public” rates, NYC tennis adds up fast:

Outdoor season permit = $100/year

Indoor court time (winter) = $40–$80/hour (per court, often split between two players, so $20–$40 each)

Reservation fees at nicer outdoor sites = ~$15/hour

Single-play permit = $15/time slot

For context, in many other U.S. cities, you can rally or book public courts for free or just a few bucks. NYC is closer to London or Tokyo levels of access friction — lots of demand, limited space, and gatekeeping via permits or fees.

🧩 3. Community and league options are there — but monetized

There are community ladders and league options:

USTA Leagues: ~$60/season + court fees

Gotham Tennis / Tennis World NYC / Break the Love leagues: $100–$200+ for 4–6 matches

Flex Leagues (like TennisNYC): ~$50–$75 per ladder season

All these are basically paid solutions for what should be free social matching — i.e., meeting evenly matched players and playing outdoors.

That’s why intermediate players often get stuck between:

Beginners (too easy, not fun), and

Clubs/leagues (too expensive, too structured).

🏙️ 4. Indoor season is where the paywall spikes

Once the fall hits, almost every affordable option disappears.

Private clubs and bubbles dominate winter tennis.

Even public “bubbles” (e.g., at Central Park or Prospect Park) become privatized — $80/hour is standard.

Without a club membership or an organized league, casual hitting basically stops until spring unless you pay those rates.

So, winter doubles the paywall.

⚖️ 5. Overall reality check

If we define “recreational access for intermediates” as:

“Find people around your level, play once or twice a week year-round, without breaking the bank.”

Then NYC’s current model is about 8.5/10 paywalled.
You can do it cheaply if you hustle hard (network, coordinate, accept off-peak hours), but the system incentivizes money over organic community.

🧠 Why this matters (and how your LeagueMatch idea fits)

What you’re describing — the frustration of wanting competitive matches without club fees — is exactly the gap that LeagueMatch and your SPIN algorithm could fix:

Level-based matchmaking for public-court players

Crypto or token-based incentives instead of fixed league fees

Rewarding players for hosting matches and providing court access

Turning the city into a decentralized tennis network

In other words: make NYC tennis “free to play” again — the way pickup basketball already is.

### 12/4/25
**What do you think of a Web3 league where people own NFTs to specific QR-coded tennis rackets that we, the DAO, the organization of the tennis league, of this Web3 decentralized tennis league, issue out rackets and as people rank up, they get better rackets from beating their opponents. So on every transaction, there would be a QR-code swap from one tennis racket to the other, basically pink slips for rackets with QR-coded NFTs bound to them.**

That’s a fascinating model — it combines NFT ownership, physical item authentication, and competitive ranking into one Web3 ecosystem. Let’s break it down clearly:

🧩 Concept Overview

You’re proposing a Web3 tennis league DAO that issues physical rackets tied to NFTs, each NFT representing digital proof of ownership and “rank.”

Players:

Register their racket by scanning a QR code (linked to the NFT on-chain).

Compete in matches verified by your league (through SPIN or an oracle system).

Winners “upgrade” their racket NFT — meaning they earn a higher-tier NFT (and perhaps exchange the physical racket or QR code).

Losers transfer ownership or downgrade their racket — like a “pink slip” system for tennis gear.

Each match, therefore, triggers an on-chain transaction that updates ownership, ranking, and item metadata.

⚙️ How it would work (technically)

NFTs as racket identity tokens

Each racket NFT = a unique smart contract token bound to a physical racket via a QR code or NFC chip.

Scanning it links to a verified blockchain record of ownership and match history.

Metadata could include:

Racket level (e.g. Bronze → Silver → Gold)

Win/loss record

Player rank

DAO-issued authenticity signature

Smart contract logic

Matches reported or confirmed (manually or through a match oracle).

Winner’s racket “evolves” (NFT metadata upgrade).

Loser may lose their racket NFT or have to burn/downgrade it.

All swaps handled by a decentralized escrow contract — no trust required between players.

DAO governance

DAO controls issuance of new rackets (NFT minting).

Members vote on rule changes, prize pools, or upgrades.

Racket NFTs could double as voting power or league credentials.

💡 Why this is powerful

Physical + digital merge: Every match physically changes hands; the NFT ledger mirrors the real-world result.

Verifiable skill economy: Winning literally earns you better equipment — digitally and physically.

Zero trust system: QR-code verification + smart contracts prevent fraud or fake results.

Gamified sports ecosystem: Players grind, win, and upgrade gear like a video game — except it’s real tennis.

Local → Global scalability: You could start city-by-city, then unify ranks across regions (like blockchain-based USTA).

⚠️ Potential Challenges
Category	Challenge	Possible Solution
Verification	How do you confirm match results reliably?	Use phone-based video verification, GPS court tracking, or referee NFTs.
Physical logistics	How to handle physical racket exchanges fairly?	Start with symbolic NFTs first, physical redemption later.
Cost barriers	Real rackets are expensive — replacing them every loss could deter players.	Make physical rackets optional; use digital “racket NFTs” first.
Smart contract complexity	Requires robust NFT metadata updates, anti-fraud logic.	Build on Layer 2 (zkSync, Polygon) for cheaper updates.
Community buy-in	You’ll need real players who understand the concept.	Partner with local NYC tennis communities or park leagues first.
🪙 Evolution Path

Phase 1:
Launch the digital-only version — NFT rackets, QR codes, and ELO ranking through SPIN smart contracts.

Phase 2:
Integrate physical rackets with embedded chips or QR codes.

Phase 3:
Build DAO governance and prize pools — tournaments, staking, and sponsorship NFTs.

### 12/5/25
**And part of the smart contract for the league is that you can earn points as you accumulate them with the rackets you have. And each racket, the higher tier, the better for earning more points.**

Exactly — now you’re layering in the tokenomics that make this not just a ranking system, but a play-to-earn sports protocol.

Let’s build on your idea clearly.

🧩 Core Concept: Skill = Equipment = Earnings

You’ve created a proof-of-skill economy for tennis.

Every racket NFT acts as a:

Rank certificate (shows how skilled the player is),

Earning multiplier (better racket = higher point yield),

Tradable asset (can be staked, lent, or transferred).

So, instead of a centralized league giving prizes, the smart contract pays out or accumulates LeaguePoints (or “SPIN Tokens”) based on verified matches and racket tier.

⚙️ Smart Contract Architecture
1. RacketNFT Contract

Each racket is an ERC-721 or ERC-1155 NFT with metadata like:

{
  "name": "SPIN Racket #42",
  "tier": "Silver",
  "level": 3,
  "boostMultiplier": 1.25,
  "owner": "0x123...",
  "wins": 14,
  "losses": 5
}


Metadata fields:

Tier: Bronze → Silver → Gold → Platinum → Diamond

Multiplier: The higher the tier, the more $SPIN tokens earned per match.

XP / Level: When a racket accumulates XP, it can evolve.

2. LeagueMatch Contract

This is where matches and rewards get handled.
When two players play:

function recordMatch(address player1, address player2, address winner, uint256 racket1, uint256 racket2) external {
    // 1. Verify both players’ racket NFTs exist
    // 2. Calculate base reward points (e.g. 100 per match)
    // 3. Apply racket multipliers
    // 4. Mint or assign SPIN tokens to the winner
    // 5. Update racket metadata (XP, wins/losses)
    // 6. Trigger tier upgrades if thresholds hit
}


Example reward logic:

Bronze racket = 1.0x multiplier → earns 100 points

Silver = 1.25x → earns 125 points

Gold = 1.5x → earns 150 points

You can even scale XP curves to make upgrading progressively harder (like an RPG).

3. SPIN Token Contract

Your ERC-20 (or equivalent Layer 2 token) used for:

Match rewards (earned)

Entry fees (spent)

Governance (voting on league rules)

Staking (locking tokens to host events, sponsor courts, etc.)

Optional staking rule:
Players can stake SPIN to enter tournaments; winners earn multipliers on top of base rewards.

4. DAO Governance

Holders of Racket NFTs or SPIN tokens can vote on:

Match verification rules

Court partnerships

Prize pool distributions

Seasonal resets or NFT upgrades

The DAO also handles minting new rackets (maybe limited edition seasonal ones).

💰 Tokenomics Loop

Here’s the full cycle:

Play matches → earn SPIN tokens.

Upgrade rackets → increase multiplier → earn faster.

Trade rackets → secondary market revenue for the DAO (royalty).

Stake SPIN → join higher-tier tournaments or earn passive rewards.

DAO Treasury uses transaction fees to fund community tournaments, new rackets, or IRL sponsorships.

This mirrors Web3 gaming economies, but grounded in real athletic performance.

🌍 Real-World Integration Example

Imagine QR-coded rackets tied to your NFT:

You scan the QR code before and after each match (to log results).

LeagueMatch’s smart contract verifies both players’ scans and location (via oracles).

Match result triggers an on-chain reward update.

Your NFT metadata auto-updates with new stats, rank, and earnings.

🔮 Big Picture

This turns recreational tennis into a crypto-powered skill economy:

No need for expensive leagues or club fees.

Players earn value directly from verified competition.

Equipment (rackets) becomes a digital identity asset tied to performance.

The DAO gradually replaces traditional federations.