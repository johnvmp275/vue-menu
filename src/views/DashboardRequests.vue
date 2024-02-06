<script setup>
import Button from '@/components/widgets/Button-Loader.vue'
import Dropdown from '@/components/widgets/Dropdown.vue'
</script>

<template>
    <template v-if="requests.length">

        <table>

            <tr>
                <th>Nome:</th>
                <th>Pedido:</th>
                <th>Acompanhamentos:</th>
                <th>Status:</th>
            </tr>

            <tr v-for="request in requests" :key="request.id">

                <td>
                    <p>{{ request.name }}</p>
                </td>

                <td>
                    <ul>
                        <li v-for="(request, index) in request.food" :key="index">
                            <p>{{ request.type }}</p>
                            <bold> x{{ request.count }}</bold>
                        </li>
                    </ul>
                </td>

                <td>
                    <ul>
                        <li v-for="(request, index) in request.optional" :key="index">
                            <p>{{ request.optional }}</p>
                            <bold> x{{ request.count }}</bold>
                        </li>
                    </ul>
                </td>

                <td>
                    <p>{{ request.status }}</p>
                    <Button>Teste</Button>
                </td>
            </tr>

        </table>

    </template>

    <template v-else>
        <p class="warning">
            Ops! Você não possui nenhum pedido :(
        </p>
    </template>
</template>

<script>
export default {
    data() {
        return {
            requests: [],
            status: []
        }
    },
    methods: {
        async getDadosFromRequests() {
            try {
                const req = await fetch('http://localhost:3000/requests')
                const data = await req.json()

                this.requests = data;

                console.log(this.requests);

            } catch (error) {
                console.error('Houve um erro de busca', error)
            }
            this.isLoader = true
        },
    },
    mounted() {
        this.getDadosFromRequests()
    }
}
</script>

<style scoped>

table {
    width: 100%;
    display: flex;
    flex-direction: column;
    background: var(--background-white);
    padding: 16px;
}

tr {
    width: 100%;
    display: flex;
    justify-content: space-between;
}

.edit-status-request {
    display: flex;
}

.warning {
    color: var(--background-white);
    display: flex;
    height: 100%;
    align-items: center;
}

li {
    display: flex;
    gap: 8px;
}
</style>