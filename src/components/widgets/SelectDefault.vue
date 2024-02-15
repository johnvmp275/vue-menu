<template>
    <div class="select">
        <div class="selected-item" @click="showItemDropdown">
            <slot name="selected"></slot>

            {{ SelectText }}

        </div>
        <div :class="[getClass, { 'show': showSelect }]">
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
            showSelect: false,
        }
    },
    props: {
        SelectText: String,
        getClass: String,
        dataInserted: Array,
    },
    methods: {
        showItemDropdown() {
            this.showSelect = !this.showSelect;

            const selectLists = document.querySelectorAll('.select-list');

            selectLists.forEach(selectList => {

                if (selectList.classList.contains('show')) {
                    selectList.classList.remove('show');
                }
                
            });
        },
    }
};
</script>
    
<style >
.select {
    position: relative;
    display: flex;
    flex-direction: column;
    width: 100%;
}

.selected-item {
    width: 100%;
    height: 50px;
    gap: 8px;
    padding: 10px;
    display: flex;
    align-items: center;
    background: var(--background-white);
    color: var(--background-gray-700);
    border-radius: 8px;
    cursor: pointer;
    box-shadow: 0 5px 10px 1px var(--background-gray-700);
}

.selected-item.invalid {
    border: 2px solid var(--background-red);
}


.select-list {
    position: absolute;
    top: 60px;
    width: 100%;
    height: auto;
    padding: 10px;
    gap: 8px;
    display: none;
    flex-wrap: wrap;
    background: var(--background-white);
    box-shadow: 0 5px 10px 1px var(--background-black);
    border-radius: 5px;
    color: black;
    z-index: 9999999;
}

.select-list.show {
    display: flex;
}

.select-list::before {
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

.dropdown-list {
    margin-top: 20px;
    height: auto;
    padding: 16px;
    gap: 8px;
    display: none;
    flex-wrap: wrap;
    background: var(--background-white);
    box-shadow: 0 5px 10px 1px var(--background-black);
    border-radius: 5px;
    color: black;
    z-index: 9999999;
}

.dropdown-list.show {
    display: flex;
}
</style>