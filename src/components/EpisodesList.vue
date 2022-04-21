<template>
    <ul class="episodes-list">
        <li v-for="episode in episodes" :key="episode.title" class="episode-list-item">
            <router-link :to="{
                name: 'EpisodeView',
                params: {
                    episodeId: episode.episode_id,
                    season,
                },
            }" class="episode-name">{{ episode.title }}
            </router-link>
            <p class="episode-air-date">
                <span class="text-bold">Air date: </span>
                {{ episode.air_date }}</p>
            <p class="episode-characters"><span class="text-bold">Characters:</span> {{ episode.characters.join(', ') }}</p>
        </li>
    </ul>
</template>

<script>
export default {
    name: "EpisodesList",
    components: {},
    props: {
        season: {
            type: String,
            required: true
        },
        episodes: {
            type: Array,
            required: true
        }
    },
    setup(props) {
    }
}
</script>

<style scoped>
.episode-list-item {
    margin-left: 50px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
    flex-wrap: wrap;
}

.episode-list-item > * {
    width: 100%;
    display: inline-block;
}

.episode-list-item > * > * {
    margin-top: 10px;
}

.episode-characters {
    width: 400px;
    margin: 15px auto;
}
</style>