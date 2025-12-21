import useBaseUrl from "@docusaurus/useBaseUrl";
import { useEffect, useState } from "react";
import styles from "./civ-tables.module.css";

async function get_data(name: string) {
  const data = await import(`../data/${name.toLowerCase()}.json`);
  return data.default;
}
export default function Finalist({ name, reverse = false }) {
  const [playerData, setPlayerData] = useState({});

  useEffect(() => {
    async function get_player_data() {
      setPlayerData(await get_data(name));
    }
    get_player_data();
  }, [name]);

  return <div className={styles.finalistCard}>
    <div className={styles.playerImage}>
      <img src={useBaseUrl(`/img/${name.toLowerCase()}.png`)} />
    </div>
    <div className={styles.finalistTables + ' ' + styles.playerStats} >
      <table className={styles.civs}>
        <colgroup>
          <col width={400} />
          <col />
        </colgroup>
        <thead>
          <tr>
            <th colSpan={2}>Player stats</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Wins</td>
            <td>{playerData.wins}</td>
          </tr>
          <tr>
            <td>Losses</td>
            <td>{playerData.losses}</td>
          </tr>
          <tr>
            <td>Winrate</td>
            <td>{Math.round((playerData.winrate ?? 0) * 10000) / 100}%</td>
          </tr>
          <tr>
            <td>Favourite Colour</td>
            <td><div className={`${styles['player-color']} ${styles['player-color-' + playerData['color']]}`}>{playerData['color']}</div></td>
          </tr>
        </tbody>
      </table>
      <table className={styles.civs}>
        <colgroup>
          <col width={400} />
          <col />
        </colgroup>
        <thead>
          <tr>
            <th colSpan={2}>Time played</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Longest game</td>
            <td>0{playerData?.duration?.longest}</td>
          </tr>
          <tr>
            <td>Shortest game</td>
            <td>0{playerData?.duration?.shortest}</td>
          </tr>
          <tr>
            <td>Median</td>
            <td>0{playerData?.duration?.median}</td>
          </tr>
          <tr>
            <td>Overall</td>
            <td>{playerData?.duration?.cumulative}</td>
          </tr>
        </tbody>
      </table>
    </div>
    <div className={styles.finalistTables + ' ' + styles.gamesStats}>
      <table className={styles.civs}>
        <colgroup>
          <col width={400} />
          <col />
        </colgroup>
        <thead>
          <tr>
            <th colSpan={2}>eAPM</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Max</td>
            <td>{playerData?.eapm?.max}</td>
          </tr>
          <tr>
            <td>Min</td>
            <td>{playerData?.eapm?.min}</td>
          </tr>
          <tr>
            <td>Median</td>
            <td>{playerData?.eapm?.median}</td>
          </tr>
        </tbody>
      </table>
      <table className={styles.civs}>
        <colgroup>
          <col width={400} />
          <col />
        </colgroup>
        <thead>
          <tr>
            <th colSpan={2}>Vils queued</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Max</td>
            <td>{playerData?.vils_queued?.max}</td>
          </tr>
          <tr>
            <td>Min</td>
            <td>{playerData?.vils_queued?.min}</td>
          </tr>
          <tr>
            <td>Median</td>
            <td>{playerData?.vils_queued?.median}</td>
          </tr>
          <tr>
            <td>Overall</td>
            <td>{playerData?.vils_queued?.total}</td>
          </tr>
        </tbody>
      </table>
    </div>
    <div className={styles.finalistTables + ' ' + styles.civStats}>
      <table className={styles.civs}>
        <colgroup>
          <col width={400} />
          <col />
        </colgroup>
        <thead>
          <tr>
            <th colSpan={2}>Civ stats</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Civs played</td>
            <td>{playerData.civ_variety}</td>
          </tr>
          <tr>
            <td>Favourite civ</td>
            <td className={styles.civ}>
              <div className={styles['civ-cell']}>
                <img src={`https://aoe2techtree.net/img/Civs/${playerData?.best_civ?.name?.toLowerCase()}.png`} width="32" height="32" alt={playerData?.best_civ?.name + " emblem"} loading="lazy" />
                <span>{playerData?.best_civ?.name}</span>
              </div>
            </td>
          </tr>
          <tr>
            <td>Games</td>
            <td>{playerData?.best_civ?.games}</td>
          </tr>
          <tr>
            <td>Winrate</td>
            <td>{Math.round((playerData?.best_civ?.winrate ?? 0) * 1000) / 10}%</td>
          </tr>
          <tr>
            <td>Most picked</td>
            <td className={styles.civ}>
              <div className={styles['civ-cell']}>
                <img src={`https://aoe2techtree.net/img/Civs/${playerData?.most_picked?.name?.toLowerCase()}.png`} width="32" height="32" alt={playerData?.most_picked?.name + " emblem"} loading="lazy" />
                <span>{playerData?.most_picked?.name} ({playerData?.most_picked?.picks})</span>
              </div>
            </td>
          </tr>
          <tr>
            <td>Most banned</td>
            <td className={styles.civ}>
              <div className={styles['civ-cell']}>
                <img src={`https://aoe2techtree.net/img/Civs/${playerData?.most_banned?.name?.toLowerCase()}.png`} width="32" height="32" alt={playerData?.most_banned?.name + " emblem"} loading="lazy" />
                <span>{playerData?.most_banned?.name} ({playerData?.most_banned?.bans})</span>
              </div>
            </td>
          </tr>
          <tr>
            <td>Longest played</td>
            <td className={styles.civ}>
              <div className={styles['civ-cell']}>
                <img src={`https://aoe2techtree.net/img/Civs/${playerData?.civ_played_longest?.name?.toLowerCase()}.png`} width="32" height="32" alt={playerData?.civ_played_longest?.name + " emblem"} loading="lazy" />
                <span>{playerData?.civ_played_longest?.name} (0{playerData?.civ_played_longest?.duration})</span>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div >
}
