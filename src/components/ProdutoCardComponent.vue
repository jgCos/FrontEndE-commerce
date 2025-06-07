<template>
    <div class="rounded-lg p-4 text-black shadow-md bg-gray-200 hover:bg-gray-300 hover:shadow-xl">
        <img :src="produto.image" :alt="produto.name" class="mx-auto mb-2 h-20">
        <h2 class="text-center capitalize font-bold">{{ ProdutoComponent.name }}</h2>
        <p class="text-center text-sm uppercase">{{ ProdutoComponent.preco }}</p>
        <p class="text-center text-sm uppercase">{{ ProdutoComponent.categoria }}</p>
        <p class="text-center text-sm uppercase">{{ ProdutoComponent.estoque }}</p>
    </div>
</template>
<script setup>
defineProps({
    produto: {
        type: Object,
        required: true
    }
});
</script>