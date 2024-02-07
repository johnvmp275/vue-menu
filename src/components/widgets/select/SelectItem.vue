<template>
    <div class="dropdown-item">
        <slot />
    </div>
</template>

<style>
.dropdown-item {
    display: flex;
    align-items: center;
    cursor: pointer;
    height: 30px;
    gap: 8px;
    padding: 10px;
    width: 100%;
}
</style>