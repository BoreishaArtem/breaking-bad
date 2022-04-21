<template>
    <main class="main-wrapper">

        <h1 class="serials-title">{{ state.serialInfo.Title }}</h1>

        <img :src="state.serialInfo.Poster" class="serials-icon" alt="Wrapper">

        <series-search/>

        <ul class="serials-info">
            <li v-for="(info, key) in serialInfo">
                <span>{{ key }}: </span>
                <p>{{ info }}</p>
            </li>
        </ul>

        <p @click="currTab = 'SeasonsList'" class="tab">seasons</p>
        <p @click="currTab = 'CharacterOccupations'" class="tab">characters occupations</p>


        <div class="tabs-wrapper">
            <component :is="currTab"></component>
        </div>

    </main>
</template>

<script>
import {ref, computed} from "vue";
import state from "../state";
import CharacterOccupations from "../components/CharacterOccupations.vue";
import SeasonsList from "../components/SeasonsList.vue";
import SeriesSearch from "../components/SeriesSearch.vue";

export default {
    name: "HomeView",
    components: {
        SeasonsList,
        SeriesSearch,
        CharacterOccupations,
    },
    setup() {
        const currTab = ref('SeasonsList');
        const excludedFields = [
            'Poster',
            'Ratings',
            'imdbID',
            'Type',
            'Response',
        ];

        const serialInfo = computed(() => {
            return Object.keys(state.serialInfo).reduce((acc, key) => {
                const keyIncluded = excludedFields.includes(key) ? false : key;
                if (keyIncluded) acc[keyIncluded] = state.serialInfo[keyIncluded];
                return acc;
            }, {});
        });

        return {
            currTab,
            serialInfo,
            state,
        }
    }
}
</script>

<style scoped>
.tab {
    margin-top: 100px;
    margin-bottom: 50px;
    text-align: center;
    cursor: pointer;
    width: 50%;
    font-size: 24px;
    font-weight: 600;
    text-transform: capitalize;
}

.tab:hover {
    text-decoration: underline;
}

.main-wrapper {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    width: 100%;
    max-width: 1200px;
    margin: 120px auto;
}

.serials-icon {
    height: 500px;
    object-fit: contain;
}

.serials-title {
    font-size: 40px;
    width: 100%;
    text-align: center;
    margin-top: 40px;
    margin-bottom: 80px;
}

.serials-info {
    width: 50%;
    margin-left: 200px;
    justify-content: flex-end;
}

.serials-info > li > *:first-child {
    font-weight: 600;
    display: inline-block;
    min-width: 100px;
    margin-right: 20px;
}

.serials-info > li {
    display: flex;
    margin-bottom: 10px;
}

.tabs-wrapper {
    width: 100%;
    margin-bottom: 200px;
}
</style>