<template>
    <ul class="occupations-list">
        <li class="occupations-list-item" v-for="(characters, occupation) in occupations" :key="occupation">
            <span>{{ occupation }}</span>
            <ul>
                <li v-for="(character, idx) in characters" :key="character + idx">{{ character }}</li>
            </ul>
        </li>
    </ul>
</template>

<script>
import {computed, onMounted} from "vue";
import state from "../state";

export default {
    name: "CharacterOccupations",
    setup() {
        const occupations = computed(() => {
            const occupationList = {}

            state.characters.forEach((item) => {
                item.occupation.forEach(ocp => {
                    if (!occupationList[ocp]) occupationList[ocp] = [];
                    occupationList[ocp].push(item.name)
                });
            });

            return occupationList;
        });

        return {
            occupations
        }
    }
}
</script>

<style scoped>
.occupations-list-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
}

.occupations-list-item span {
    width: 200px;
    font-weight: 600;
}

.occupations-list {
    margin: 0 auto;
    width: 100%;
    font-size: 18px;
    max-width: 400px;
}
</style>