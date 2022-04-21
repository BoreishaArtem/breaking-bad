<template>
    <g-back-btn>back</g-back-btn>

    <template v-if="!isLoading">
        <div class="character-card">
            <span class="favorite" v-if="isFavorite" @click="toggleFavorite">&#11088;</span>
            <span class="favorite" v-else @click="toggleFavorite">&#128683;</span>

            <p class="character-card-name">{{ character.name }}</p>

            <img class="character-card-image" :src="character.img" :alt="character.name">

            <div class="character-card-info">
                <p>
                    <span>Birthday:</span>
                    <span>{{ character.birthday }}</span>
                </p>
                <p>
                    <span>Category:</span>
                    <span>{{ character.category }}</span>
                </p>
                <p>
                    <span>Nickname:</span>
                    <span>{{ character.nickname }}</span>
                </p>
                <p>
                    <span>Occupation:</span>
                    <span>{{ character.occupation.join(', ') }}</span>
                </p>
                <p>
                    <span>Portrayed:</span>
                    <span>{{ character.portrayed }}</span>
                </p>
                <p>
                    <span>Status:</span>
                    <span>{{ character.status }}</span>
                </p>
                <character-time-line :timeline="characterTimeLine" />
            </div>
        </div>
    </template>
    <p class="loading" v-else>Loading...</p>
</template>

<script>

import CharacterTimeLine from "./CharacterTimeLine.vue";
import {ref, onMounted, reactive, watch} from "vue";
import state from "../state";
import GBackBtn from "./GBackBtn.vue";
import getCharacterInfo from "../actions/getCharacterInfo";

export default {
    name: "CharacterCard",
    props: {
        characterId: {
            type: String,
            required: false,
        },
    },
    components: {
        GBackBtn,
        CharacterTimeLine,
    },
    setup(props) {
        const character = ref([]);
        const isLoading = ref(true);
        const isFavorite = ref(false);

        const characterTimeLine = reactive({});

        const createTimeline = () => {
            //birth
            defineCharacterBirthday();

            episodesWithCharacter();
            characterKills();

            //current status
            characterTimeLine[currentDate()] = character.value.status;
        };

        const currentDate = () => {
            const date = new Date();
            const day = date.getDay() < 9 ? `0${date.getDay()}` : date.getDay();
            const month = date.getMonth() < 9 ? `0${date.getMonth()}` : date.getMonth();
            return `${day}-${month}-${date.getFullYear()}`;
        };

        const defineCharacterBirthday = () => {
            const birthday = character.value.birthday === 'Unknown' ? 0 : character.value.birthday;
            characterTimeLine[birthday] = 'birthday';
            return characterTimeLine[birthday];
        };

        const episodesWithCharacter = () => {
            Object.values(state.episodes).forEach(season => {
                season.episodes.forEach(series => {
                    if (series.characters.includes(character.value.name)) {
                        characterTimeLine[series.air_date] = {
                            series
                        }
                        characterKills(series);
                    }
                });
            });
        };

        const characterKills = (series) => {
            state.deaths.forEach(death => {
                const kill = death.responsible.includes(character.value.name);
                if (kill && series) {
                    if (Number(series.episode) === death.episode && Number(series.season) === death.season) {
                        const serie = characterTimeLine[series.air_date];
                        if (!serie.kills) serie.kills = []
                        serie.kills.push(death);
                    }
                }
            });
        };

        const getFavorites = () => localStorage.getItem('favorites')
            ? JSON.parse(localStorage.getItem('favorites'))
            : false;

        const isCharacterFavorite = () => getFavorites() ? getFavorites()[character.value.name] : false;

        const toggleFavorite = () => {
            !isCharacterFavorite() ? addToFavorite() : removeFromFavorite();
        };

        const addToFavorite = () => {
            const favorites = getFavorites() || {};
            favorites[character.value.name] = character.value;
            localStorage.setItem('favorites', JSON.stringify(favorites));
            isFavorite.value = true;
        };

        const removeFromFavorite = () => {
            const favorites = getFavorites();
            delete favorites[character.value.name];
            localStorage.setItem('favorites', JSON.stringify(favorites));
            isFavorite.value = false;
        };

        watch(() => props.characterId, async (id) => {
            character.value = await getCharacterInfo(props.characterId);
            createTimeline();
            isFavorite.value = !!isCharacterFavorite();
        })

        onMounted(async () => {
            character.value = await getCharacterInfo(props.characterId);
            isLoading.value = false;
            createTimeline();
            isFavorite.value = !!isCharacterFavorite();
        });

        return {
            character,
            isLoading,
            isFavorite,
            toggleFavorite,
            removeFromFavorite,
            characterTimeLine,
        }
    }
}
</script>

<style scoped>
.character-card {
    width: 100%;
    display: flex;
    justify-content: space-around;
    align-items: flex-start;
    flex-wrap: wrap;
    padding: 100px 200px;
}

.character-card-name {
    text-align: center;
    margin: 20px 0 100px 0;
    font-size: 42px;
    width: 100%;
}

.character-card-image {
    width: 50%;
    max-width: 500px;
}

.character-card-info {
    width: 50%;
    padding-top: 100px;
    font-size: 24px;
}

.character-card-info > p {
    margin-bottom: 10px;
}

.character-card-info > p > *:first-child {
    font-weight: 600;
    margin-right: 10px;
}

.favorite {
    z-index: 1;
    cursor: pointer;
}
</style>