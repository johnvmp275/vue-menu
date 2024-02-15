<template>
  <section>
    <Strong class="total-product">
      Total de Pedidos <span>{{ requests.length }} </span></Strong
    >
    <Strong class="total-product-avaible">
      Pedidos Finalizados <span>{{ totalRequestsAvailable }} </span></Strong
    >
    <Strong class="total-product-out-of-stock">
      Pedidos em Aguardo <span>{{ totalRequestsOutOfStock }} </span></Strong
    >
    <Strong class="total-product-waiting">
      Pedidos em Produção <span>{{ totalRequestsWaiting }} </span></Strong
    >
  </section>
</template>

<script>
export default {
  props: {
    requests: Array,
    getDadosFromRequests: Function
  },
  computed: {
    totalRequestsAvailable() {
      return this.requests.filter((request) => request.status === 'Finalizado').length
    },
    totalRequestsOutOfStock() {
      return this.requests.filter((request) => request.status === 'Aguardando...').length
    },
    totalRequestsWaiting() {
      return this.requests.filter((request) => request.status === 'Em Produção').length
    }
  }
}
</script>

<style scoped>
section {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  color: var(--background-white);
  width: 100%;
  padding: 6px 16px;
  margin-bottom: 20px;
}

Strong {
  display: flex;
  font-size: 14px;
  color: var(--background-white);
}

span {
  display: flex;
  background: var(--background-orange);
  color: var(--background-white);
  font-size: 12px;
  min-width: 34px;
  transition: 0.5s;
  height: 19px;
  border-radius: 25px;
  padding: 5px 14px;
  margin-left: 10px;
  box-shadow: 0 5px 10px 1px var(--background-black);
  justify-content: center;
  align-items: center;
}

.total-product-avaible span {
  background: green;
}

.total-product-out-of-stock span {
  background: orange;
}

.total-product-waiting span {
  background: purple;
}

@media (max-width: 750px) {
  section {
    padding: 6px 0;
    align-items: flex-start;
  }

  strong {
    font-size: 12px;
    width: 47%;
    justify-content: space-between;
  }

  span {
    margin-left: 5px;
  }
}
</style>
