<script setup>
import { useComprasStore } from '../stores/compras'

const compras = useComprasStore()

function devolver(id) {
  compras.devolverCompra(id)
}
</script>

<template>
  <div class="p-4">
    <h1 class="text-2xl font-bold mb-4">Compras</h1>

    <div v-if="compras.lista.length === 0">
      Nenhum produto comprado ainda.
    </div>

    <ul v-else>
      <li
        v-for="item in compras.lista"
        :key="item.id"
        class="mb-3 p-3 border rounded flex justify-between items-center">
        <div>
          <strong>{{ item.title }}</strong><br />
          R$ {{ item.price }} (x{{ item.quantidade }})
        </div>
        <button
          @click="devolver(item.id)"
          class="px-5 py-1 text-sm font-bold border border-red-900 text-red-900 bg-transparent hover:text-red-400 transition-colors mx-2">
          Devolver
        </button>
      </li>
    </ul>
  </div>
</template>
