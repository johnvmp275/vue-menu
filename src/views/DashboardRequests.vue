<script setup>
import Button from '@/components/widgets/Button-Loader.vue'
import Dropdown from '@/components/widgets/Dropdown.vue'
</script>

<template>
  <template v-if="requests.length">
    <table class="table-desktop">
      <tr class="table-header">
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

        <td class="edit-table">
          <p>{{ request.status }}</p>
          <Button>
            <span class="material-symbols-outlined"> delete </span>
          </Button>
        </td>
      </tr>
    </table>
  </template>

  <template v-else>
    <p class="warning">Ops! Você não possui nenhum pedido :(</p>
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

        this.requests = data

        console.log(this.requests)
      } catch (error) {
        console.error('Houve um erro de busca', error)
      }
      this.isLoader = true
    }
  },
  mounted() {
    this.getDadosFromRequests()
  }
}
</script>

<style scoped>
table {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  color: var(--background-white);
  padding: 16px;
}

th,
td {
  display: flex;
  align-items: center;
}

tr {
  width: 100%;
  display: grid;
  grid-template-columns: repeat(4, 2fr);
  padding: 16px;
  border-bottom: 1px solid var(--background-white);
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

.edit-table {
  display: flex;
  gap: 20px;
}

Button {
    max-width: 50px;
}

@media (max-width: 750px) {
  .table-desktop {
    display: none;
  }
}
</style>
