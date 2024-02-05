<template>
    <div class="dropdown">
        <div class="selected-item" @click="OpenTheDropdown()">
            {{ ItemSelected }} {{ dropdownText }}
        </div>
        <div class="dropdown-list" v-show="showDropdown">
            <slot v-if="dataInserted.length"/>

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
    props:{
        dropdownText: String,
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
    position: relative;
    display: flex;
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
    position: absolute;
    top: 60px;
    width: 100%;
    padding: 16px;
    gap: 8px;
    display: flex;
    flex-wrap: wrap;
    background: var(--background-white);
    box-shadow: 0 5px 10px 1px var(--background-black);
    border-radius: 5px;
    color: black;
    z-index: 9999999;
}

.dropdown-list::before {
    content: '';
    position: absolute;
    z-index: 1000;
    display: flex;
    width: 10px;
    height: 10px;
    top: -6px;
    right: calc(50% - 5px);
    transform: rotate(45deg);
    background: var(--background-white);
    border-left: 1px solid var(--background-gray-700);
    border-top: 1px solid var(--background-gray-700);
}
</style>