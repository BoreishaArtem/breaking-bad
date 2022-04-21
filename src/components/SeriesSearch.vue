<template>
    <div class="series-search">
        <input type="text" v-model="search" :placeholder="searchState[searchBy].placeholder">
        <p class="series-search-by" @click="toggleSelector">Search by - {{ searchBy }}</p>
        <ul class="series-search-selector" v-show="searchSelectorVisible">
            <li @click="enableFilters('episodes')" class="series-search-selector-item">Episode title</li>
            <li @click="enableFilters('character')" class="series-search-selector-item">Character name</li>
            <li @click="enableFilters('quote')" class="series-search-selector-item">Quote</li>
            <li @click="enableFilters('deaths')" class="series-search-selector-item">Death</li>
        </ul>
        <ul v-if="result.length > 0 && search.length > 0" class="search-results">
            <li v-for="resultItem in result" :key="resultItem.key" class="search-results-item">
                <router-link :to="searchState[searchBy].to(resultItem)">
                    {{ resultItem[searchState[searchBy].resultField] }}
                </router-link>
            </li>
        </ul>
    </div>
</template>

<script>
import {ref, computed, onMounted} from "vue";
import state from "../state";

export default {
    name: "SeriesSearch",
    setup() {
        const search = ref('');
        const searchBy = ref('episodes');
        const searchSelectorVisible = ref(false);

        const toggleSelector = () => {
            searchSelectorVisible.value = !searchSelectorVisible.value;
        };

        const searchState = {
            episodes: {
                placeholder: 'Episode title',
                array: Object.values(state.episodes).map(season => season.episodes),
                cb: (acc, currValue) => {
                    currValue.forEach(el => {
                        if (el.title.toLowerCase().startsWith(search.value.toLowerCase())) {
                            acc.push(el)
                        }
                    });
                    return acc;
                },
                resultField: 'title',
                to: (item) => ({
                    name: 'EpisodeView',
                    params: {
                        episodeId: item.episode_id,
                        season: item.season
                    },
                }),
            },
            deaths: {
                placeholder: 'Death ID',
                array: state.deaths,
                resultField: 'death',
                to: (death) => '/',
                cb: (acc, currValue) => {
                    if (Number(currValue.death_id) === Number(search.value)) {
                        acc.push(currValue)
                    }
                    return acc;
                },
            },
            character: {
                placeholder: 'Character name',
                array: state.characters,
                resultField: 'name',
                to: (item) => ({
                    name: 'CharacterView',
                    params: {
                        characterId: item.char_id,
                    },
                }),
                cb: (acc, currValue) => {
                    if (currValue.name.toLowerCase().startsWith(search.value.toLowerCase())) {
                        acc.push(currValue)
                    }
                    return acc;
                },
            },
            quote: {
                placeholder: 'Quote string',
                array: state.quotes,
                resultField: 'quote',
                to: (quote) => '/',
                cb: (acc, currValue) => {
                    if (currValue.quote.toLowerCase().startsWith(search.value.toLowerCase())) {
                        acc.push(currValue)
                    }
                    return acc;
                },
            },
        };

        const enableFilters = (filter) => {
            searchBy.value = filter;
            searchSelectorVisible.value = false;
            search.value = '';
        };

        const result = computed(() => {
            const selectedType = searchState[searchBy.value];
            return selectedType.array
                .reduce((acc, item) => selectedType.cb(acc, item), []);
        });

        onMounted(() => {
            enableFilters(searchBy.value);
        })

        return {
            search,
            result,
            searchBy,
            searchState,
            searchSelectorVisible,
            enableFilters,
            toggleSelector
        }
    }
}
</script>

<style scoped>
.series-search {
    position: absolute;
    left: 0;
    top: 0;
    transform: translateX(-60%) translateY(-100%);
    width: 100%;
    max-width: 500px;
    z-index: 5;
}

.series-search-selector {
    position: absolute;
    top: 100%;
    width: 100%;
    display: flex;
    z-index: 3;
    background: white;
    justify-content: space-between;
    align-items: center;
}

.series-search-selector-item {
    cursor: pointer;
    font-size: 16px;
    font-weight: 600;
}

.series-search-by {
    margin-top: 20px;
    margin-bottom: 20px;
    z-index: 2;
    cursor: pointer;
}

.series-search > input {
    width: 100%;
    font-size: 18px;
    padding: 10px;
    z-index: 1;
}

.search-results {
    position: absolute;
    top: 100%;
    width: 100%;
    border: 1px solid #000000;
}

.search-results-item {
    cursor: pointer;
}
</style>