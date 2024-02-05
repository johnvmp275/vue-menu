<script setup>
import Button from '@/components/widgets/Button-Loader.vue'
</script>

<template>
    <template v-if="requests.length">
        <section class="table-request" v-for="request in requests" :key="request.id">

            <div>
                <strong>Nome:</strong>
                <p>{{ request.name }}</p>
            </div>

            <div>
                <strong>Pedido:</strong>
                <ul>
                    <li v-for="(request, index) in request.food" :key="index">
                        <p>{{ request.type }}</p>
                        <bold> x{{ request.count }}</bold>
                    </li>
                </ul>
            </div>

            <div>
                <strong>Acompanhamentos:</strong>
                <ul>
                    <li v-for="(request, index) in request.optional" :key="index">
                        <p>{{ request }}</p>
                    </li>
                </ul>
            </div>

            <div>
                <strong>Status:</strong>
                <p>{{ request.status }}</p>
            </div>

            <div>
                <Button>Teste</Button>
            </div>

        </section>
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
.table-request {
    margin-top: 20px;
    background: var(--background-white);
    padding: 16px;
    border-radius: 8px;
    width: 100%;
    display: flex;
    flex-wrap: wrap;
}

div {
    width: 20%;
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