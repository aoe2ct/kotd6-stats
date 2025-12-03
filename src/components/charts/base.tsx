import gamesData from '../../data/games.json';
import draftsData from '../../data/drafts.json';
import { Fragment, useState } from 'react';
import Chart from './chart';
import MapPickChart from './map-pick-chart';
import MapBanChart from './map-ban-chart';
import CivPickChart from './civ-pick-chart';
import CivBanChart from './civ-ban-chart';
import CivPlayChart from './civ-play-chart';
import CivWinChart from './civ-win-chart';
import styles from './base.module.css';
import GameTimeChart from './game-time-chart';
import MapPlayChart from './map-play-chart';
import ApmChart from './apm-chart';
import { acceptableMisnamedMaps } from '@site/src/data/mapping';

export default function Base(): JSX.Element {
    const [filter, setFilter] = useState(null);
    (window as any).setFilter = setFilter;
    let filteredGamesData = gamesData;
    let filteredDraftsData = draftsData;
    if (filter != null) {
        filteredGamesData = gamesData.filter((game) => filter.brackets.includes(game.bracket) && filter.maps.includes(acceptableMisnamedMaps[game.map] ?? game.map) && filter.stages.includes(game.stage));
        filteredDraftsData = {
            civDrafts: draftsData.civDrafts.filter(draft => filter.brackets.includes(draft.bracket) && filter.stages.includes(draft.stage)),
            mapDrafts: draftsData.mapDrafts.filter(draft => filter.brackets.includes(draft.bracket) && filter.stages.includes(draft.stage)),
        };
    }
    const isFilterApplied = gamesData.length !== filteredGamesData.length;
    return (
        <Fragment>
            <p>So let's jump in with the most encompassing stats first:</p>
            <p>There were <span className={styles['highlighted-text']}>{Math.max(filteredDraftsData.mapDrafts.length, filteredDraftsData.civDrafts.length)}</span> sets played over the course of the tournmament{isFilterApplied ? ", that match the selected filters" : ""}.</p>
            {
                isFilterApplied ?
                    <p>Looking at individual games, there were <span className={styles['highlighted-text']}>{filteredGamesData.length}</span> games played over the course of the tournmament, that match the selected filters.</p> :
                    <p>Looking at individual games, there were <span className={styles['highlighted-text']}>{filteredGamesData.length}</span> games played over the course of the tournmament.</p>
            }
            <h2>Drafts data</h2>
            <p>The following charts summarize the data gathered from the drafts.</p>
            <p>First up here are the most picked civilizations in the drafts.</p>
            <CivPickChart draftsData={filteredDraftsData} filter={filter}></CivPickChart>
            <p>And civilization bans.</p>
            <CivBanChart draftsData={filteredDraftsData} filter={filter}></CivBanChart>
            <h2>Games data</h2>
            <p>The next chart shows the number of times a civilization was played.</p>
            <CivPlayChart gamesData={filteredGamesData.filter(game => game.map != null)} filter={filter}></CivPlayChart>
            <p>Which civ is the best? Below is the win rate chart. Hover each column to get the important additional context of the number of games played.</p>
            <CivWinChart draftsData={filteredDraftsData} gamesData={filteredGamesData.filter(game => game.map != null)} filter={filter}></CivWinChart>
            <p>How long each game was? Let's see on the next graph!</p>
            <GameTimeChart gamesData={filteredGamesData.filter(game => game.map != null)} filter={filter}></GameTimeChart>
            <p>Who is the fastest player in the tournament? We can see the eAPM over various stages of the tournament</p>
            <ApmChart gamesData={gamesData.filter(game => game.map != null)} filter={filter}></ApmChart>
            <hr></hr>
            Thanks for checking out King of the Desert VI in Stats!
        </Fragment >
    );
}
