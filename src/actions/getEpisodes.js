export default async function () {
    try {
        const response = await fetch('https://www.breakingbadapi.com/api/episodes', {
            method: 'GET',
        });
        const data = await response.json();
        return episodesBySeasons(data);
    } catch (e) {
        console.log(e, 'the error occurred while GET episodes!');
    }
}

const episodesBySeasons = (episodes) => {
    return episodes.reduce((acc, item) => {
        const season = `${item.season.trim()}`; // because some seasons id has a typo like ' 1' but must be a '1'
        if (!acc[season]) acc[season] = { season, episodes: [], showList: false }; // patch seasons object with show list property, which is about to add 'accordeon' functionality
        acc[season].episodes.push(item);
        return acc;
    }, {});
};