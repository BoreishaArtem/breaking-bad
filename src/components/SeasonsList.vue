<template>
    <ul class="seasons-list">
        <li v-for="(season, key) in state.episodes" :class="{ 'seasons-list-item-opened': season.opened }" :key="key" class="seasons-list-item">
            <span class="season-index"
                  tabindex="1"
                  @mousedown.stop="season.opened = !season.opened"
                  @focus="season.opened = true"
                  @blur="season.opened = false">Season {{ key }}</span>
            <svg class="open-icon" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                <path d="M24 10h-10v-10h-4v10h-10v4h10v10h4v-10h10z"/>
            </svg>

            <svg class="close-icon" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                <path d="M0 10h24v4h-24z"/>
            </svg>
            <transition name="fade">
                <episodes-list :episodes="season.episodes"
                               :season="season.season"
                               v-show="season.opened" />
            </transition>
        </li>
    </ul>
</template>

<script>
import state from "../state";
import EpisodesList from "./EpisodesList.vue";

export default {
    name: "SeasonsList",
    components: {
        EpisodesList,
    },
    setup() {
        return {
            state,
        }
    }
}
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
    opacity: 0;
}
.season-index {
    cursor: pointer;
}

.seasons-list {
    margin: 40px auto;
    width: 100%;
    text-align: center;
    font-size: 20px;
}

.open-icon {
    opacity: 0;
    width: 10px;
    height: 10px;
}

.close-icon {
    opacity: 0;
    width: 10px;
    height: 10px;
    position: absolute;
    margin-left: 10px;
    margin-top: 11px;
    transition: all .25s ease-in-out;
}

.seasons-list-item {
    width: 100%;
    transition: 0.25s ease-in-out;
    position: relative;
}

.seasons-list-item span:hover + .open-icon {
    opacity: 1;
    transform: translateY(-50%) rotate(90deg);
}

.seasons-list-item.seasons-list-item-opened .close-icon {
    opacity: 1;
}

.seasons-list-item > .open-icon {
    opacity: 0;
    position: absolute;
    margin-left: 10px;
    top: 50%;
    transition: all .3s ease-in-out;
    transform: translateY(-50%);
}
</style>