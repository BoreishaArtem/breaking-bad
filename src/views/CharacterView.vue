<template>
    <character-card :characterId="characterId" />
</template>

<script>
import CharacterCard from "../components/CharacterCard.vue";

export default {
    name: "CharacterView",
    props: {
        characterId: {
            type: String,
            require: true,
        }
    },
    components: {
        CharacterCard,
    }
}
</script>

<style scoped>

</style>