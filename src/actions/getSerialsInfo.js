export default async function () {
    try {
        const request = await fetch('http://www.omdbapi.com/?apikey=88e836ce&i=tt0903747', {
            method: 'GET',
        });
        return await request.json();
    } catch (e) {
        console.log(e)
    }
}