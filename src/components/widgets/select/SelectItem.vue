<template>
    <div class="dropdown-item">
        <slot />
    </div>
</template>

<style>
.dropdown-item {
    display: flex;
    align-items: center;
    height: 30px;
    gap: 8px;
    padding: 10px;
    width: 45%;
}

@media (max-width : 750px) {
    .dropdown-item {
        width: 100%;
    }
}
</style>