export default async function (characterId) {
    try {
        const response = await fetch(`https://www.breakingbadapi.com/api/characters/${characterId}`, {
            method: 'GET',
        });
        const data = await response.json();
        return data[0];
    } catch (e) {
        console.log(e, 'the error occurred while GET character!');
    }
};