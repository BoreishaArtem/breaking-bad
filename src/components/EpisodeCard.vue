<template>
    <g-back-btn>back</g-back-btn>

    <template v-if="!isLoading">
        <p class="episode-supheading">Season {{ season }}</p>
        <p class="episode-supheading">Episode {{ episode.episode }}, Air date: {{ episode.air_date }}</p>

        <h1 class="episode-heading">
            "{{ episode.title }}"
        </h1>

        <p class="episode-subheading">{{charactersHeading}}</p>

        <ul class="characters-list">
            <li v-for="character in characters" :key="character" class="characters-list-item">
                <router-link :to="{
                name: 'CharacterView',
                params: {
                    characterId: character.char_id,
                },
            }" class="character-link">
                    <img :src="character.img" :alt="character.name" class="episode-card-img">

                    <div class="character-info">
                        <p class="character-name">
                            <span>Name: </span>
                            <span>{{ character.name }}</span>
                        </p>
                        <p class="character-birthday">
                            <span>Birthday: </span>
                            <span>{{ character.birthday }}</span>
                        </p>
                        <p class="character-occupation">
                            <span>Occupation: </span>
                            <span>{{ occupationsToString(character.occupation) }}</span>
                        </p>
                        <p class="character-nickname">
                            <span>Nickname: </span>
                            <span>{{ character.nickname }}</span>
                        </p>
                        <p class="character-status">
                            <span>Status: </span>
                            <span>{{ character.status }}</span>
                        </p>
                    </div>
                </router-link>
            </li>
        </ul>

        <p class="episode-deaths">{{ deathsHeading }}</p>

        <ul class="episode-deaths-list">
            <li v-for="(death, idx) in deathsInEpisode" class="death-list-item" :key="death.death_id">
                <p class="death-index">{{ idx + 1 }}</p>
                <p>
                    <span>Death: </span>
                    <span>{{ death.death }}</span>
                </p>
                <p>
                    <span>Cause: </span>
                    <span>{{ death.cause }}</span>
                </p>
                <p>
                    <span>Responsible: </span>
                    <span>{{ death.responsible }}</span>
                </p>
                <p>
                    <span>Last words: </span>
                    <span><i>"{{ death.last_words }}"</i></span>
                </p>
                <p>
                    <span>Number of deaths: </span>
                    <span>{{ death.number_of_deaths }}</span>
                </p>
            </li>
        </ul>
    </template>
    <p class="loading" v-else>Loading...</p>
</template>

<script>
import getEpisodeById from "../actions/getEpisodeById";
import getWeather from "../actions/getWeather";

import GBackBtn from "./GBackBtn.vue";

import {ref, computed, onMounted} from "vue";
import state from "../state";
export default {
    name: "EpisodeCard",
    props: {
        episodeId: {
            type: String,
            required: true,
        },
        season: {
            type: String,
            required: true
        }
    },
    components: {
        GBackBtn,
    },
    setup(props) {
        const isLoading = ref(true);

        const episode = ref([]);
        const characters = ref([]);
        const deaths = ref([]);
        const weather = ref([]);

        const deathsInEpisode = computed(() => state.deaths.filter(death => {
            const episodesMatches = Number(death.episode) === Number(episode.value.episode);
            const seasonsMatches = death.season === Number(props.season);
            return seasonsMatches && episodesMatches;
        }));

        const charactersHeading = computed(() => characters.value.length > 1 ? 'Characters' : 'Character')

        const deathsHeading = computed(() => {
            return deathsInEpisode.value.length === 0 ? 'Nobody dead' : 'Deaths'
        });

        const occupationsToString = occupations => occupations.join(', ');

        const charactersInEpisode = (allCharacters, inEpisode) => {
            return allCharacters.filter(character => inEpisode.includes(character.name));
        };

        onMounted(async () => {
            episode.value = await getEpisodeById(props.episodeId);

            if (state.characters && state.deaths) {
                characters.value = charactersInEpisode(state.characters, episode.value.characters);
                deaths.value = state.deaths;
                isLoading.value = false;
            }

            await getWeather(episode.value);
        });

        return {
            episode,
            isLoading,
            deathsInEpisode,
            characters,
            charactersHeading,
            deathsHeading,
            occupationsToString,
        }
    }
}
</script>

<style scoped>
.episode-heading {
    font-weight: 600;
    text-align: center;
    font-size: 54px;
}

.episode-subheading {
    font-size: 28px;
    text-align: center;
}

.episode-supheading {
    margin: 20px 0;
    font-size: 24px;
    text-align: center;
}

.episode-card-img {
    width: 200px;
    object-fit: cover;
    height: 200px;
    border-radius: 50%;
}

.episode-deaths {
    text-align: center;
    font-weight: 600;
    font-size: 42px;
}

.episode-deaths-list {
    width: 50%;
    margin: 10px auto 100px auto;
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
}

.death-index {
    position: absolute;
    bottom: 80%;
    right: 100%;
    margin-right: 10px;
    color: #ccc;
    font-size: 48px;
    font-weight: 600;
}

.death-list-item {
    position: relative;
    max-width: 250px;
    margin: 50px 30px;
}

.character-link {
    text-decoration: none;
    color: #2c3e50;
}

.characters-list {
    margin: 100px auto;
    width: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
    list-style: none;
}

.characters-list-item {
    position: relative;
    cursor: pointer;
    margin-bottom: 50px;
    text-align: center;
    margin-right: 50px;
}

.characters-list-item:hover .character-info {
    opacity: 1;
    width: 300px;
    height: 100px;
    margin-bottom: 100px;
    transform: translateY(20%);
}

.characters-list-item:hover img {
    box-shadow: 0 0 20px rgba(0,0,0,.7);
}

.character-info {
    width: 0;
    height: 0;
    text-align: center;
    opacity: 0;
    transition: .25s ease-in-out;
}

.character-info > p {
    white-space: pre-wrap;
}

.character-info > p > *:first-child {
    font-weight: 600;
}
</style>