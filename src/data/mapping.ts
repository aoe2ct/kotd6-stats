import useBaseUrl from "@docusaurus/useBaseUrl";

export const acceptableMisnamedMaps: Record<string, string> = {
};
export const mapDraftNameToGameNameMapping: Record<string, string> = {
};

export const GameNameMappingToDisplayName: Record<string, string> = Object.fromEntries(Object.values(mapDraftNameToGameNameMapping).map(gameName => [gameName, mapNameToDisplay(gameName)]));

export const BracketNameToImage = {
    Top64: null,
    Top32: null,
    Top16: null,
    Top8: null
};

export const bracketColors: { [bracket in keyof typeof BracketNameToImage]: string } = {
    Top64: "#1f77b4",
    Top32: "#ff7f0e",
    Top16: "#2ca02c",
    Top8: "#d62728",
    // Crossbows: "#9467bd",
    // Militia: "#8c564b",
    // "Group G": "#e377c2",
    // "Group H": "#7f7f7f",
    // "Other": "#bcbd22",
};

export const winnerStages: string[] = ['Round of 64', 'Round of 32', 'Round of 16', 'Quarterfinals', 'Semifinals', 'Final'];
export const loserStages: string[] = [];

export const allCivs = [
    "Britons",
    "Byzantines",
    "Celts",
    "Chinese",
    "Franks",
    "Goths",
    "Japanese",
    "Mongols",
    "Persians",
    "Saracens",
    "Teutons",
    "Turks",
    "Vikings",
    "Aztecs",
    "Huns",
    "Koreans",
    "Mayans",
    "Spanish",
    "Italians",
    "Incas",
    "Magyars",
    "Slavs",
    "Berbers",
    "Ethiopians",
    "Malians",
    "Portuguese",
    "Burmese",
    "Khmer",
    "Malay",
    "Vietnamese",
    "Bulgarians",
    "Cumans",
    "Lithuanians",
    "Tatars",
    "Burgundians",
    "Sicilians",
    "Bohemians",
    "Poles",
    "Bengalis",
    "Dravidians",
    "Gurjaras",
    "Hindustanis",
    "Romans",
    "Armenians",
    "Georgians",
    "Khitans",
    "Jurchens",
    "Shu",
    "Wei",
    "Wu"
];

function mapNameToDisplay(_gameName: string) {
    return "Arabia"
}
export function mapDraftNameToDisplay(draftName: string) {
    return mapNameToDisplay(mapDraftNameToGameNameMapping[draftName] ?? draftName) ?? draftName;
}

export function mapGameNameToDisplay(gameName: string) {
    const correctedName = acceptableMisnamedMaps[gameName] ?? gameName;
    const mapName = mapNameToDisplay(correctedName);
    if (!mapName) {
        console.log("Unknown Map:", correctedName);
        return correctedName;
    }
    return mapName;

}

export function getBracketImage(bracket: string) {
    if (!(bracket in BracketNameToImage)) {
        return undefined;
    }
    return useBaseUrl(BracketNameToImage[bracket]);
}

export const tournamentMaps = Object.values(GameNameMappingToDisplayName);
