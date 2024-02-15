<script setup>
import Button from '@/components/widgets/Button-Loader.vue'
import Select from '@/components/widgets/SelectDefault.vue'
import SelectItem from '@/components/widgets/select/SelectItem.vue'
import counterOfRequests from '@/components/counterOfRequests.vue'
import Loader from '@/components/Loader.vue'
</script>

<template>
  <Loader :loaderIsActive="loaderIsActive" />
  <template v-if="requests.length">
    <input type="search" placeholder="Pesquise o Pedido Cadastrado" v-model="search" />

    <counterOfRequests :requests="requests" :getDadosFromRequests="getDadosFromRequests"/>

    <!-- desktop version of the ordering process -->
    <table class="table-desktop">
      <tr class="table-header">
        <th>Nome:</th>
        <th>Pedido:</th>
        <th>Acompanhamentos:</th>
        <th>Status:</th>
      </tr>

      <tr v-for="request in searchOfRequersts" :key="request.id">
        <td>
          <p>{{ request.name }}</p>
        </td>

        <td>
          <ul>
            <li v-for="(request, index) in request.food" :key="index">
              <p>
                {{ request.type }}
                <strong> x{{ request.count }}</strong>
              </p>
            </li>
          </ul>
        </td>

        <td>
          <ul>
            <li v-for="(request, index) in request.optional" :key="index">
              <p>
                {{ request.optional }}
                <strong> x{{ request.count }}</strong>
              </p>
            </li>
          </ul>
        </td>

        <td class="edit-table">
          <Select getClass="select-list" :dataInserted="status">
            <template v-slot:selected>
              <div
                class="circle_status"
                :style="{ background: getCircleColor(request.status) }"
              ></div>
              <p>{{ getSelectedStatus(request.status) }}</p>
            </template>
            <SelectItem
              v-for="(s, index) in status"
              :key="s.id"
              @click="updateStatus(s.type, request.id, index)"
            >
              <div class="circle_status" :style="{ background: s.color }"></div>
              <p>{{ s.type }}</p>
            </SelectItem>
          </Select>
          <Button @click="deletedRequestItem(request.id)">
            <span class="material-symbols-outlined"> delete </span>
          </Button>
        </td>
      </tr>
    </table>

    <!-- mobile version of the ordering process -->
    <section class="table-mobile">
      <Select
        v-for="request in requests"
        :key="request.id"
        :dataInserted="status"
        getClass="dropdown-list"
      >
        <template v-slot:selected>
          <p><strong>Nome:</strong> {{ request.name }}</p>
        </template>

        <SelectItem>
          <ul>
            <strong>Pedido:</strong>
            <li v-for="(request, index) in request.food" :key="index">
              <p>
                {{ request.type }}
                <strong> x{{ request.count }}</strong>
              </p>
            </li>
          </ul>
        </SelectItem>

        <SelectItem>
          <ul>
            <strong>Acompanhamentos:</strong>
            <li v-for="(request, index) in request.optional" :key="index">
              <p>
                {{ request.optional }}
                <strong> x{{ request.count }}</strong>
              </p>
            </li>
          </ul>
        </SelectItem>

        <div class="edit-table">
          <strong>Status:</strong>
          <Select getClass="select-list" :dataInserted="status">
            <template v-slot:selected>
              <div
                class="circle_status"
                :style="{ background: getCircleColor(request.status) }"
              ></div>
              <p>{{ getSelectedStatus(request.status) }}</p>
            </template>
            <SelectItem
              v-for="(s, index) in status"
              :key="s.id"
              @click="updateStatus(s.type, request.id, index)"
            >
              <div class="circle_status" :style="{ background: s.color }"></div>
              <p>{{ s.type }}</p>
            </SelectItem>
          </Select>
          <Button @click="deletedRequestItem(request.id)">
            <span class="material-symbols-outlined"> delete </span>
          </Button>
        </div>
      </Select>
    </section>
  </template>

  <template v-else>
    <p class="warning">Ops! Você não possui nenhum pedido :(</p>
  </template>
</template>

<script>
//Objeto que mapeia tipos de status para cores
const statusColors = {
  'Em produção': 'purple',
  Finalizado: 'green',
  'Aguardando...': 'orange'
}
export default {
  data() {
    return {
      requests: [],
      status: [],
      loaderIsActive: true,
      status: [],
      search: '',
      color: 'green'
    }
  },
  computed: {
    searchOfRequersts() {
      return this.requests.filter((request) => request.name.match(this.search.toLowerCase()))
    }
  },
  methods: {
    async getDadosFromRequests() {
      try {
        const req = await fetch('http://localhost:3000/requests')
        const data = await req.json()

        this.requests = data
      } catch (error) {
        console.error('Houve um erro de busca', error)
      } finally {
        this.loaderIsActive = false
      }
    },
    async getStatusForRequests() {
      try {
        const req = await fetch('http://localhost:3000/status')
        const data = await req.json()

        this.status = data

        console.log(this.status)
      } catch (error) {
        console.error('Houve um erro de busca', error)
      } finally {
        this.loaderIsActive = false
      }
    },
    async deletedRequestItem(id) {
      try {
        await fetch(`http://localhost:3000/requests/${id}`, {
          method: 'DELETE'
        })

        this.getDadosFromRequests()
      } catch (error) {
        console.error('Não foi possivel deletar a tarefa', error)
      }
    },
    async updateStatus(selectedStatus, id) {
      try {
        const dataJson = JSON.stringify({ status: selectedStatus })

        const req = await fetch(`http://localhost:3000/requests/${id}`, {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: dataJson
        })

        const res = await req.json()

        //Troca cor dos status de acordo com seu valor
        switch (selectedStatus) {
          case 'Em produção':
            this.color = statusColors['Em produção']
            break
          case 'Finalizado':
            this.color = statusColors['Finalizado']
            break
          case 'Aguardando...':
            this.color = statusColors['Aguardando...']
            break

          default:
            this.color = 'green'
        }

        // Atualizar o status selecionado apenas para o item específico
        this.getDadosFromRequests()
      } catch (error) {
        console.error('Houve um erro de busca', error)
      }
    },
    getSelectedStatus(requestId) {
      return (this.selectedStatus = requestId)
    },
    getCircleColor(status) {
      const findColor = this.status.find((s) => s.type === status)

      if (findColor) {
        return findColor.color
      } else {
        return 'green'
      }
    }
  },
  mounted() {
    this.getDadosFromRequests()
    this.getStatusForRequests()
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
  padding: 16px 0;
}

.table-mobile {
  display: none;
}

th,
td {
  display: flex;
  min-width: 100%;
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

p {
  display: flex;
  gap: 8px;
  text-transform: capitalize;
}

.edit-table {
  display: flex;
  gap: 20px;
}

Button {
  width: 80px;
  background: var(--background-red);
}

.circle_status {
  width: 20px;
  height: 20px;
  border-radius: 100%;
}

.table-mobile {
  width: 100%;
  gap: 20px;
  flex-direction: column;
}

input {
  margin-bottom: 30px;
}

@media (max-width: 900px) {
  .table-desktop {
    display: none;
  }

  .table-mobile {
    display: flex;
  }

  .edit-table {
    flex-direction: column;
  }

  .table-mobile Button {
    width: 100%;
  }

  .table-mobile .dropdown-item {
    margin-bottom: 20px;
  }
}
</style>
