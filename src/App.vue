<template>
    <header class="main-header">
        <div class="favorites">
            <span @click="toggleFavorites"
                  title="favorites">Favorite characters &#128171;</span>
            <ul v-show="favoritesVisible" class="favorites-list">
                <li v-for="favoriteChar in favorites"
                    :key="favoriteChar.name">
                    <router-link :to="{
                        name: 'CharacterView',
                        params: {
                            characterId: favoriteChar.char_id
                        }
                    }">{{ favoriteChar.name }}</router-link>
                </li>
            </ul>
        </div>
    </header>
    <RouterView v-if="!isLoading" />
    <p class="loading" v-else>Loading...</p>
</template>

<script>
import {onMounted, ref} from "vue";
import state from "./state";
import SeriesSearch from "./components/SeriesSearch.vue";
import getEpisodes from "./actions/getEpisodes";
import getDeaths from "./actions/getDeaths";
import getCharacters from "./actions/getCharacters";
import getSerialsInfo from "./actions/getSerialsInfo";
import getQuotes from "./actions/getQuotes";
export default {
    name: "App",
    components: {
        SeriesSearch,
    },
    setup() {
        const isLoading = ref(true);
        const favorites = ref([]);
        const favoritesVisible = ref(false);

        onMounted(() => {
            if (state.episodes && state.deaths && state.characters && state.serialInfo) return;

            Promise.all([getCharacters(), getEpisodes(), getDeaths(), getSerialsInfo(), getQuotes()])
                .then(([characters, episodes, deaths, serialInfo, quotes]) => {

                    state.episodes = episodes;
                    state.deaths = deaths;
                    state.characters = characters;
                    state.serialInfo = serialInfo;
                    state.quotes = quotes;

                    isLoading.value = false;
                }).catch(e => {
                console.log('Error occurred during get data!', e);
            });

            getFavorites();
        });

        const getFavorites = () => {
            favorites.value = JSON.parse(localStorage.getItem('favorites'));
        };

        const toggleFavorites = () => {
            favoritesVisible.value = !favoritesVisible.value;
            getFavorites();
        }


        return {
            isLoading,
            favorites,
            favoritesVisible,
            getFavorites,
            toggleFavorites
        }
    }
}
</script>

<style>
@import '@/assets/base.css';
.loading {
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 42px;
    font-weight: 600;
    height: 100vh;
}

.main-header {
    padding: 20px;
    position: relative;
}

.favorites {
    max-width: 300px;
    text-align: center;
    position: absolute;
    right: 5%;
    z-index: 5;
}

.favorites > span {
    font-size: 24px;
    cursor: pointer;
}

.favorites > ul {
    position: absolute;
    top: 100%;
    width: 100%;
    right: 0;
}

.favorites > ul > li:hover {
    text-decoration: underline;
    cursor: pointer;
}

.favorites-list {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
}
.favorites-list > li {
    width: 100%;
}
</style>
