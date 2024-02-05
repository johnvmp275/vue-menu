<script setup>
import ButtonLoader from '@/components/widgets/Button-Loader.vue';
import Dropdown from '@/components/widgets/DropdownDefault.vue';
import DropdownItem from '@/components/widgets/dropdown/DropdownItem.vue';
</script>

<template>
    <div class="table-for-annotation">

        <label for="titles" :class="{ 'invalid': invalidComposition }">
            Nome do Cliente:
            <input type="text" name="titles" id="titles" v-model="titles" placeholder="Nome do Cliente" class="annotation-name" @keydown.enter="submitTheRequests" />
        </label>

        <label for="food">
            Cardápio:
            <Dropdown :dataInserted="foods" dropdownText="Escolha o prato">
                <DropdownItem v-for="food in foods" :key="food.id">
                    <input type="checkbox" name="food" id="food" v-model="selectedFoods" :value="food.type" />
                    <span>
                        {{ food.type }}
                    </span>
                    <input type="number" name="number" id="number" v-model="count.id">
                </DropdownItem>
            </Dropdown>
        </label>

        <label for="optional">
            Acompanhamento:
            <Dropdown :dataInserted="optional" dropdownText="Escolha o Acompanhamento">
                <DropdownItem v-for="optional in optional" :key="optional.id">
                    <input type="checkbox" name="optional" id="optional" v-model="selectedOptions" :value="optional.type" />
                    <span>
                        {{ optional.type }}
                    </span>
                </DropdownItem>
            </Dropdown>
        </label>

        <ButtonLoader :buttonIsLoading="buttonIsLoading" @click="submitTheRequests">
            Enviar o Pedido
        </ButtonLoader>

    </div>
</template>

<script>
export default {
    data() {
        return {
            ingredients: {},
            titles: '',
            foods: [],
            optional: [],
            selectedOptions: [],
            selectedFoods: [],
            countSelected: [],
            buttonIsLoading: false,
            invalidComposition: false,
            count: ''
        }
    },
    watch: {
        titles: 'validateRequestFields',
    },
    methods: {
        async getDadosFromIngredients() {
            try {
                const req = await fetch('http://localhost:3000/ingredients')
                const data = await req.json()

                this.ingredients = data;
                this.foods = data.foods;
                this.optional = data.optional;

            } catch (error) {
                console.error('Houve um erro de busca', error)
            }
            this.isLoader = true
        },
        async submitTheRequests() {
            try {

                if (this.titles !== '') {

                    this.buttonIsLoading = true

                    const data = {
                        name: this.titles,
                        food: Array.from(this.selectedFoods, food => ({type: food, count: this.count})),
                        optional: Array.from(this.selectedOptions),
                        status: 'Aguardando...'
                    }

                    const dataJson = JSON.stringify(data)

                    const req = await fetch('http://localhost:3000/requests', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: dataJson
                    })

                    const res = await req.json()

                    // Reset fields after sending orders

                    this.selectedOptions = []
                    this.selectedFoods = []
                    this.titles = ''

                } else {
                    this.invalidComposition = true
                }

            } catch (error) {
                console.error('Houve um erro de busca', error)
            } finally {
                this.buttonIsLoading = false
            }
        },
        validateRequestFields() {
            if (this.titles !== '') {
                this.invalidComposition = false
            }
        }
    },
    mounted() {
        this.getDadosFromIngredients()
    }
}
</script>

<style scoped>
.table-for-annotation {
    justify-content: center;
    flex-direction: column;
    display: flex;
    width: 100%;
    height: 100%;
    align-items: center;
    max-width: 536px;
}

label {
    display: flex;
    flex-direction: column;
    width: 100%;
    margin-bottom: 40px;
    gap: 8px;
    color: var(--background-white);
}

.annotation-name {
    box-shadow: 0 5px 10px 1px var(--background-black);
    transition: .5s;
    border-radius: 8px;
    padding: 0 16px;
    width: 100%;
    height: 50px;
}

label.invalid .annotation-name {
    border: 1.5px solid var(--background-red);
    box-shadow: 0 0 10px 0 var(--background-red);
}

button {
    width: 100%;
    height: 50px;
    font-weight: bold;
    font-size: 16px;
    border-radius: 8px;
    background: var(--background-orange);
    color: var(--background-white);
}

input[type="checkbox"] {
    cursor: pointer;
    max-width: 20px;
    height: 20px;
}

span{
    width: 100%;
    font-size: 14px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}


</style>