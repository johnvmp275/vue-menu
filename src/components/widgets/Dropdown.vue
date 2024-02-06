<template>
    <div class="dropdown">
        <div class="selected-item" @click="OpenTheDropdown()">
            {{ SelectText }}
        </div>
        <div class="dropdown-list" v-show="showDropdown">
            <slot v-if="dataInserted.length" />

            <p v-else>
                Não há dados inseridos por aqui :(
            </p>

        </div>
    </div>
</template>
  
<script>
export default {
    data() {
        return {
            showDropdown: false,
        }
    },
    props: {
        SelectText: String,
        dataInserted: Array
    },
    methods: {
        OpenTheDropdown() {
            this.showDropdown = !this.showDropdown;
        }
    },
};
</script>
    
<style scoped>
.dropdown {
    margin-bottom: 30px;
    display: flex;
    flex-direction: column;
    gap: 10px;
}

.selected-item {
    width: 100%;
    height: 50px;
    padding: 10px;
    display: flex;
    align-items: center;
    background: var(--background-white);
    color: var(--background-gray-700);
    border-radius: 8px;
    cursor: pointer;
    box-shadow: 0 5px 10px 10px var(--background-gray-700);
}

.selected-item.invalid {
    border: 2px solid var(--background-red);
}

.dropdown-list {
    width: 100%;
    padding: 16px;
    gap: 8px;
    display: flex;
    background: var(--background-white);
    box-shadow: 0 5px 10px 1px var(--background-black);
    border-radius: 5px;
    color: black;
    z-index: 9999999;
}
</style>