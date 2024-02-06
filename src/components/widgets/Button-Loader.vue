<template>
    <button>
        <slot v-if="!buttonIsLoading" />
        <span v-else class="material-symbols-outlined">
            progress_activity
        </span>

    </button>
</template>

<script>

export default {
    props:{
        buttonIsLoading: {
          type: Boolean,
          required: false
        }
    }
}

</script>

<style scoped>

span {
    animation: loader .9s linear infinite;
    color: var(--background-branco);
}

button {
    outline: none;
    width: 100%;
    height: 51px;
    border: none;
    cursor: pointer;
    box-shadow: 0 5px 10px 1px var(--background-black);
    font-weight: bold;
    font-size: 16px;
    border-radius: 8px;
    background: var(--background-orange);
    color: var(--background-white);
}

@keyframes loader {
    from {
        transform: rotate(0deg);
    }
    to {
        transform: rotate(360deg);
    }
}
</style>