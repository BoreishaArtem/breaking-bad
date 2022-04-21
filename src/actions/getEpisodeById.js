export default async function (episodeId) {
    try {
        const response = await fetch(`https://www.breakingbadapi.com/api/episodes/${episodeId}`, {
            method: 'GET',
        });
        const data = await response.json();
        return data[0];
    } catch (e) {
        console.log(e, 'the error occurred while GET episode by ID!');
    }
}
