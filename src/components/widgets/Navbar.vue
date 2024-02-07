<script setup>
import { RouterLink } from 'vue-router'
</script>

<template>
  <!-- desktop version -->
  <nav class="navigation-desktop">
    <section class="navigation-section">
      <div class="navigation-link">
        <RouterLink to="/">
          <span class="material-symbols-outlined"> store </span>
        </RouterLink>
        <RouterLink to="/dashboard">
          <span class="material-symbols-outlined"> shopping_cart </span>
        </RouterLink>
        <RouterLink to="/create" class="animation-rotate">
          <span class="material-symbols-outlined"> settings </span>
        </RouterLink>
        <div class="indicador">
          <div class="indicador-list"></div>
        </div>
      </div>
    </section>
  </nav>

  <nav class="navigation-mobile">
    <section class="navigation-section">
      <div class="navigation-link">
        <RouterLink to="/">
          <span class="material-symbols-outlined"> store </span>
        </RouterLink>
        <RouterLink to="/dashboard">
          <span class="material-symbols-outlined"> shopping_cart </span>
        </RouterLink>
        <RouterLink to="/create" class="animation-rotate">
          <span class="material-symbols-outlined"> settings </span>
        </RouterLink>
        <!-- <div class="indicador">
          <div class="indicador-list"></div>
        </div> -->
      </div>
    </section>
  </nav>
</template>

<script>
export default {}
</script>

<style scoped>

.navigation-desktop{
  width: auto;
  position: relative;
}
.navigation-section {
  top: 0;
  left: 0;
  display: flex;
  width: 107px;
  height: 100%;
  z-index: 9999999999999999;
  align-items: center;
  position: fixed;
  background: var(--background-orange);
  box-shadow: 0 5px 10px 4px var(--background-black);
  flex-direction: column;
}

.navigation-link {
  margin-top: 70px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 18px;
}

a {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 75px;
  height: 75px;
  cursor: pointer;
  z-index: 10;
  z-index: 10;
  transition-delay: 125ms;
  color: var(--background-gray-600);
}

a span {
  transition: 1s;
  font-size: 34px;
  opacity: 0.5;
}

.indicador-list {
  width: 75px;
  height: 75px;
  position: relative;
  z-index: 300;
  background: var(--background-white);
  box-shadow: 0 5px 10px 4px var(--background-black);
  border-radius: 10px;
}

a.router-link-active span {
  color: var(--background-gray-600);
  opacity: 1;
}

.indicador {
  position: fixed;
  width: 98px;
  height: 89px;
  left: 10px;
  top: 63px;
  background: var(--background-gray-600);
  border-radius: 8px 0 0 8px;
  border: 8px solid var(--background-gray-600);
  transition: 0.5s;
}

.indicador::before {
  content: '';
  position: absolute;
  top: -28px;
  right: -7px;
  width: 20px;
  height: 20px;
  border-bottom-right-radius: 10px;
  background: var(--background-orange);
  box-shadow: 0 10px 0 0 var(--background-gray-600);
}

.indicador::after {
  content: '';
  position: absolute;
  right: -7px;
  bottom: -28px;
  width: 20px;
  height: 20px;
  border-top-right-radius: 10px;
  background: var(--background-orange);
  box-shadow: 0 -10px 0 0 var(--background-gray-600);
}

.navigation-mobile {
  display: none;
  width: 100%;
}

.navigation-mobile .navigation-section {
  width: 100%;
  height: 100px;
}

.navigation-mobile .navigation-link {
  flex-direction: row;
  height: 100%;
  display: flex;
  margin: 0 auto;
  align-items: center;
}

a.router-link-active {
  animation: animationLink 0.9s;
}

.animation-rotate.router-link-active {
  animation: rotation 5s linear infinite;
}

.navigation-link a.router-link-active:nth-child(2).router-link-active ~ .indicador {
  transform: translateY(calc(93px * 1));
}

.navigation-link a.router-link-active:nth-child(3).router-link-active ~ .indicador {
  transform: translateY(calc(93px * 2));
}

@keyframes animationLink {
  10% {
    transform: translateY(-20px);
  }

  25% {
    transform: rotate(-35deg);
  }

  50% {
    transform: translateY(-20px);
  }

  75% {
    transform: rotate(35deg);
  }
}

@keyframes rotation {
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
}

@media (max-width: 720px) {
  .navigation-desktop {
    display: none;
  }

  .navigation-mobile {
    display: flex;
  }

  .navigation-section {
    position: relative;
  }
}
</style>
