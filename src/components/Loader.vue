<template>
    <section v-if="loaderIsActive">
        <div class="loader">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
        </div>
    </section>
</template>


<script>
export default {
  props: {
    loaderIsActive: {
      type: String,
    }
  }
}
</script>

<style scoped>

section {
    position: fixed;
    top: 0;
    left: 0;
    display: flex;
    align-items: center;
    z-index: 999999999999;
    background: var(--background-gray-700);
    justify-content: center;
    width: 100%;
    height: 100vh;
}

.loader {
    position: relative;
    display: grid;
    grid-template-columns: 33% 33% 33%;
    grid-gap: 2px;
    width: 100px;
    height: 100px;
}

.loader>div {
    position: relative;
    width: 100%;
    height: 100%;
    background: var(--background-orange);
    transform: scale(0.0);
    transform-origin: center center;
    animation: loader 2s infinite linear;
}
.loader>div:nth-of-type(1),
.loader>div:nth-of-type(5),
.loader>div:nth-of-type(9) {
    animation-delay: 0.4s;
}

.loader>div:nth-of-type(4),
.loader>div:nth-of-type(8) {
    animation-delay: 0.2s;
}

.loader>div:nth-of-type(2),
.loader>div:nth-of-type(6) {
    animation-delay: 0.6s;
}

.loader>div:nth-of-type(3) {
    animation-delay: 0.8s;
}

@keyframes loader {
    0% {
        transform: scale(0.0);
    }

    40% {
        transform: scale(1.0);
    }

    80% {
        transform: scale(1.0);
    }

    100% {
        transform: scale(0.0);
    }
}
</style>