export default async function ({ air_date }) {
    const BASE_URL = 'https://www.metaweather.com/api/location';
    const CROSS_DOMAIN = 'https://the-ultimate-api-challenge.herokuapp.com'
    try {
        const cityCode = '2352824';
        const cityDate = new Date(air_date);
        const day = cityDate.getDate();
        const month = cityDate.getUTCMonth() + 1;
        const year = cityDate.getFullYear();
        const correctDate = `${year}/${month}/${day}`;
        const request = await fetch(`${CROSS_DOMAIN}/${BASE_URL}/${cityCode}/${correctDate}`, {
            method: 'GET',
            Origin: 'https://www.metaweather.com'
        });
        console.log(request)
        // const weather = await request.json();

    } catch (e) {
        console.log('the error during get the weather', e)
    }
}