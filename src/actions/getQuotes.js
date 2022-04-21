export default async function () {
    try {
        const request = await fetch('https://www.breakingbadapi.com/api/quotes', {
            method: 'GET',
        });
        return  await request.json();
    } catch (e) {
        console.log(e)
    }
}