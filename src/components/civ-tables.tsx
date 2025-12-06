import styles from './civ-tables.module.css';
import gamesData from '../data/games.json';
import draftsData from '../data/drafts.json';
import { allCivs } from '../data/mapping';

const gameStats = gamesData.reduce((stats, game) => {
  return {
    ...stats,
    [game.winningCiv]: { wins: 1 + (stats[game.winningCiv]?.wins ?? 0), losses: stats[game.winningCiv]?.losses ?? 0 },
    [game.losingCiv]: { wins: stats[game.losingCiv]?.wins ?? 0, losses: 1 + (stats[game.losingCiv]?.losses ?? 0) }
  };
}, {})
const draftStats = draftsData.civDrafts.reduce((stats, draft) => {
  return mergeDraftStats(stats, extractDraftStats(draft.draft))
}, {});

const civStats = allCivs
  .map(civ => ({
    name: civ,
    wins: gameStats[civ]?.wins ?? 0,
    losses: gameStats[civ]?.losses ?? 0,
    playerPicks: draftStats[civ]?.playerPicks ?? 0,
    playerBans: draftStats[civ]?.playerBans ?? 0,
    adminBans: draftStats[civ]?.adminBans ?? 0
  }))
  .map(stat => ({ ...stat, winRate: stat.wins / (stat.wins + stat.losses) }))
  .map(stat => ({ ...stat, winRate: isNaN(stat.winRate) ? 0 : stat.winRate })).toSorted((stat1, stat2) => {
    if (stat1.winRate != stat2.winRate) {
      return stat2.winRate - stat1.winRate
    }
    return stat2.wins + stat2.losses - stat1.wins - stat1.losses;
  });

type draftStats = Record<string, { playerPicks: number, playerBans: number, adminBans: number }>
function extractDraftStats(draft) {
  return draft.reduce((stats, draft) => {
    const civStat = {
      playerPicks: draft.type == 'player' && draft.action == 'pick' ? 1 : 0,
      playerBans: draft.type == 'player' && draft.action == 'ban' ? 1 : 0,
      adminBans: draft.type == 'admin' && draft.action == 'ban' ? 1 : 0,
    };
    return {
      ...stats, [draft.map]: {
        playerPicks: civStat.playerPicks + (stats[draft.map]?.playerPicks ?? 0),
        playerBans: civStat.playerBans + (stats[draft.map]?.playerBans ?? 0),
        adminBans: civStat.adminBans + (stats[draft.map]?.adminBans ?? 0)
      } as draftStats
    }
  }, {});
}

function mergeDraftStats(stats1: draftStats, stats2: draftStats) {
  const merged = Object.fromEntries(
    Object.keys(stats2).map(civ => [civ, {
      playerPicks: (stats1[civ]?.playerPicks ?? 0) + stats2[civ].playerPicks,
      playerBans: (stats1[civ]?.playerBans ?? 0) + stats2[civ].playerBans,
      adminBans: (stats1[civ]?.adminBans ?? 0) + stats2[civ].adminBans
    }])
  )
  return { ...stats1, ...merged }
}

function CivStats({ stats }) {
  return <table className={styles.civs}>
    <thead>
      <tr>
        <th className={styles.civ}>CIVILIZATION</th>
        <th className={styles.winRate}>WINRATE</th>
        <th className={styles.wins}>WINS</th>
        <th className={styles.losses}>LOSSES</th>
        <th className={styles.playerPicks}>PICKS</th>
        <th className={styles.playerBans}>BANS</th>
        <th className={styles.adminBans}>ADMIN BANS</th>
      </tr>
    </thead>
    <tbody>
      {
        stats.map(civStat => {
          return <tr key={civStat.name}>
            <td className={styles.civ}>
              <div className={styles['civ-cell']}>
                <img src={`https://aoe2techtree.net/img/Civs/${civStat.name.toLowerCase()}.png`} width="32" height="32" alt={civStat.name + " emblem"} loading="lazy" />
                <span>{civStat.name}</span>
              </div>
            </td>
            <td className={styles.winRate}>{(civStat.winRate * 100).toFixed(1)}%</td>
            <td className={styles.wins}>{civStat.wins}</td>
            <td className={styles.losses}>{civStat.losses}</td>
            <td className={styles.playerPicks}>{civStat.playerPicks}</td>
            <td className={styles.playerBans}>{civStat.playerBans}</td>
            <td className={styles.adminBans}>{civStat.adminBans}</td>
          </tr>
        })
      }
    </tbody>
  </table>
}
export default function civTables() {
  return <div className={styles.statsTable}>
    <CivStats stats={civStats.slice(0, 17)} />
    <CivStats stats={civStats.slice(17, 34)} />
    <CivStats stats={civStats.slice(34, 50)} />
  </div>;
};
