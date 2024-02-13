<template>
    <div class="dropdown-item" @click="closeItemDropdown">
        <slot />
    </div>
</template>

<script>
export default{
    methods:{
        closeItemDropdown(){
            const selectLists = document.querySelectorAll('.select-list');

            selectLists.forEach(selectList => {

                if (selectList.classList.contains('show')) {
                    selectList.classList.remove('show');
                }
            });
        }
    }
}
</script>

<style>
.dropdown-item {
    display: flex;
    align-items: center;
    cursor: pointer;
    height: 30px;
    gap: 8px;
    width: 100%;
    height: auto;
}
</style>