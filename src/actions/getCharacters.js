export default async function () {
    try {
        const response = await fetch(`https://www.breakingbadapi.com/api/characters`, {
            method: 'GET',
        });

        return await response.json();
    } catch (e) {
        console.log(e, 'the error occurred while GET characters!');
    }
}