import useDelayedColorMode from "@site/src/utils/use-delayed-color-mode";
import Chart from "./chart";
import CivChartConfig, { FilterLegendConfig } from "@site/src/utils/civ-chart-config";
import { merge } from 'lodash-es';
import { Filter } from "../filter/filter-dialog";
import { allCivs } from "@site/src/data/mapping";

export default function CivPickChart({ draftsData, filter }: { draftsData: { civDrafts: any[] }, filter: Filter }): JSX.Element {
    useDelayedColorMode();
    const baseDraftData: { [key: string]: { pick: number, snipe: number } } = Object.fromEntries(allCivs.map((civ) => [civ, { pick: 0, snipe: 0 }]));
    const draftPickData: { [key: string]: { pick: number, snipe: number } } = {
        ...baseDraftData,
        ...draftsData.civDrafts.reduce(
            (acc, draft) => {
                const picks = draft.draft.filter(v => ['pick', 'snipe'].includes(v.action));
                for (const pick of picks) {
                    if (!acc.hasOwnProperty(pick.map)) {
                        acc[pick.map] = { pick: 0, snipe: 0 };
                    }
                    if (pick.action == 'snipe') {
                        acc[pick.map]['pick'] -= 1;
                        acc[pick.map]['snipe'] += 1;
                    } else {
                        acc[pick.map]['pick'] += 1;
                    }
                }
                return acc;
            },
            {},
        )
    };
    const mutualPicks: Record<string, number> = draftsData.civDrafts.map(draft => draft.draft.filter(choice => choice.action == 'pick').map(choice => choice.map).reduce((occurrences, civ) => {
        if (!(civ in occurrences)) {
            occurrences[civ] = -1;
        }
        occurrences[civ] += 1;
        return occurrences;
    }, {} as Record<string, number>)).reduce((occurrences, draftCounts) => {
        return { ...occurrences, ...Object.fromEntries(Object.entries(draftCounts).map(([civ, count]) => [civ, count + (occurrences[civ] ?? 0)])) };
    }, {} as Record<string, number>);
    const pick_data = [];
    const mutual_data = [];
    const keys = [];
    for (const [key, value] of Object.entries(draftPickData).sort(([_ka, a], [_kb, b]) => b.pick + b.snipe - a.pick - a.snipe)) {
        const mutual = (mutualPicks[key] ?? 0) * 2
        pick_data.push(value.pick - mutual);
        mutual_data.push(mutual);
        keys.push(key);
    }

    const style = getComputedStyle(document.body);
    const options = merge(CivChartConfig(style, pick_data), FilterLegendConfig(style, filter, false), {
        plugins: {
            title: { display: true, text: 'Civilization picks' },
            tooltip: { enables: true },
        },
        scale: {
            x: {
                stacked: true
            },
            y: {
                stacked: true
            }
        }
    });
    return <Chart data={{
        datasets: [{
            data: pick_data,
            backgroundColor: pick_data.map((_v, i) => i % 2 === 0 ? style.getPropertyValue('--ifm-color-primary-lightest') : style.getPropertyValue('--ifm-color-secondary-lightest')),
            borderColor: pick_data.map((_v, i) => i % 2 === 0 ? style.getPropertyValue('--ifm-color-primary-dark') : style.getPropertyValue('--ifm-color-secondary-dark')),
            borderWidth: 1,
            label: "Picks"
        },
        {
            data: mutual_data,
            backgroundColor: mutual_data.map((_v, i) => i % 2 === 0 ? style.getPropertyValue('--ifm-color-primary-darkest') : style.getPropertyValue('--ifm-color-secondary-darkest')),
            borderColor: mutual_data.map((_v, i) => i % 2 === 0 ? style.getPropertyValue('--ifm-color-primary-dark') : style.getPropertyValue('--ifm-color-secondary-dark')),
            borderWidth: 1,
            label: "Mutual picks"
        }], labels: keys
    }} options={options}></Chart>;
};
