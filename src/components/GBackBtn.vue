<template>
    <button class="back-btn" @click="$router.back()"><slot></slot></button>
</template>

<script>
export default {
    name: "GBackBtn"
}
</script>

<style scoped>
.back-btn {
    text-decoration: none;
    font-size: 18px;
    font-weight: 500;
    color: #000;
    position: fixed;
    z-index: 1;
    top: 2%;
    left: 2%;
    border: none;
    background: none;
    text-transform: capitalize;
    cursor: pointer;
}

.back-btn:hover {
    color: #2c3e50;
    text-decoration: underline;
}
</style>