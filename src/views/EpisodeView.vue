<template>
    <episode-card :episodeId="episodeId" />
</template>

<script>
import EpisodeCard from "../components/EpisodeCard.vue";
export default {
    name: "EpisodeView",
    props: {
        episodeId: {
            type: String,
            required: true,
        }
    },
    components: {
        EpisodeCard,
    },
}
</script>

<style scoped>

</style>