<script setup>
import ButtonLoader from '@/components/widgets/Button-Loader.vue';
import Select from '@/components/widgets/SelectDefault.vue';
import SelectItem from '@/components/widgets/select/SelectItem.vue';
</script>

<template>
    <div class="table-for-annotation">

        <label for="titles" :class="{ 'invalid': invalidComposition }">
            Nome do Cliente:
            <input type="text" name="titles" id="titles" v-model="titles" placeholder="Nome do Cliente" class="annotation-name" @keydown.enter="submitTheRequests" />
        </label>

        <section>
            Cardápio:
            <Select :dataInserted="foods" SelectText="Escolha o prato">
                <SelectItem v-for="food in foods" :key="food.id">
                    <input type="checkbox" name="checkbox" id="checkbox" v-model="selectedFoods" :value="food.type" />
                    <span>
                        {{ food.type }}
                    </span>
                    <input type="tel" name="tel" id="tel" oninput="this.value = this.value.replace(/[^0-9.]/g, '').replace(/(\..*?)\..*/g, '$1');" v-model="countSelected[food.type]">
                </SelectItem>
            </Select>
        </section>

        <section>
            Acompanhamento:
            <Select :dataInserted="optional" SelectText="Escolha o Acompanhamento">
                <SelectItem v-for="optional in optional" :key="optional.id">
                    <input type="checkbox" name="optional" id="optional" v-model="selectedOptions" :value="optional.type" />
                    <span>
                        {{ optional.type }}
                    </span>
                    <input type="tel" name="tel" id="tel" oninput="this.value = this.value.replace(/[^0-9.]/g, '').replace(/(\..*?)\..*/g, '$1');" v-model="countSelected[optional.type]">
                </SelectItem>
            </Select>
        </section>

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
            countSelected: {},
            buttonIsLoading: false,
            invalidComposition: false,
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
                        food: Array.from(this.selectedFoods, food => ({type: food, count: this.countSelected[food] || 1})),
                        optional: Array.from(this.selectedOptions, optional => ({optional, count: this.countSelected[optional] || 1})),
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

label, section {
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

#tel{
    width: 40px;
    padding: 0px;
    text-align: center;
    background: transparent;
    color: var(--background-black);
    border: 1px solid var(--background-black);
    border-radius: 0px;
}

</style>