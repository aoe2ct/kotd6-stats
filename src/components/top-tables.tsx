import styles from './civ-tables.module.css';
import CivStats, { civStats } from './civ-stats';

const topPicks = civStats.toSorted((civ1, civ2) => {
  if (civ1.playerPicks != civ2.playerPicks) {
    return civ2.playerPicks - civ1.playerPicks;
  }
  console.log({ civ1, civ2 })
  return civ2.winRate - civ1.winRate;
}).slice(0, 6);

const topPlayed = civStats.toSorted((civ1, civ2) => {
  if ((civ1.wins + civ1.losses) != (civ2.wins + civ2.losses)) {
    return civ2.wins + civ2.losses - civ1.wins - civ1.losses;
  }
  return civ2.winRate - civ1.winRate;
}).slice(0, 6);

const topBanned = civStats.toSorted((civ1, civ2) => {
  if (civ1.playerBans != civ2.playerBans) {
    return civ2.playerBans - civ1.playerBans;
  }
  return civ2.winRate - civ1.winRate;
}).slice(0, 6);

const leastPlayed = civStats.filter(civ => civ.playerPicks > 1).toSorted((civ1, civ2) => {
  const playRate1 = (civ1.wins + civ1.losses) / civ1.playerPicks;
  const playRate2 = (civ2.wins + civ2.losses) / civ2.playerPicks;
  if (playRate1 != playRate2) {
    return playRate1 - playRate2;
  }
  return civ1.playerPicks - civ2.playerPicks;
}).slice(0, 6);

const leastPicked = civStats.toSorted((civ1, civ2) => {
  if (civ1.playerPicks != civ2.playerPicks) {
    return civ1.playerPicks - civ2.playerPicks;
  }
  return civ1.playerBans + civ1.adminBans - civ2.playerBans - civ2.adminBans;
}).slice(0, 6);

const leastBanned = civStats.toSorted((civ1, civ2) => {
  if (civ1.playerBans != civ2.playerBans) {
    return civ1.playerBans - civ2.playerBans;
  }
  return civ1.adminBans - civ2.adminBans;
}).slice(0, 6);

const bestWin = civStats.filter(civ => (civ.wins + civ.losses) > 2).toSorted((civ1, civ2) => {
  if (civ1.winRate != civ2.winRate) {
    return civ2.winRate - civ1.winRate;
  }
  return civ2.wins + civ2.losses - civ1.wins - civ1.losses;

}).slice(0, 4);

const worstWin = civStats.filter(civ => (civ.wins + civ.losses) > 2).toSorted((civ1, civ2) => {
  if (civ1.winRate != civ2.winRate) {
    return civ1.winRate - civ2.winRate;
  }
  return civ2.wins + civ2.losses - civ1.wins - civ1.losses;

}).slice(0, 4);

export default function civTables() {
  return <div className={styles.statsTable}>
    <div>
      <h2>Top picks</h2>
      <CivStats stats={topPicks} />
    </div>
    <div>
      <h2>Top played</h2>
      <CivStats stats={topPlayed} />
    </div>
    <div>
      <h2>Top banned by players</h2>
      <CivStats stats={topBanned} />
    </div>
    <div>
      <h2>Least played among picks (min. 2 picks)</h2>
      <CivStats stats={leastPlayed} />
    </div>
    <div>
      <h2>Least picked</h2>
      <CivStats stats={leastPicked} />
    </div>
    <div>
      <h2>Least banned by players</h2>
      <CivStats stats={leastBanned} />
    </div>
    <div>
      <h2>Best winrate (min. 3 games)</h2>
      <CivStats stats={bestWin} />
    </div>
    <div></div>
    <div>
      <h2>Worst winrate (min. 3 games)</h2>
      <CivStats stats={worstWin} />
    </div>
  </div>;
};
