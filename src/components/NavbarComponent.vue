<template>
    <nav class="fixed top-0 left-0 w-full z-50 bg-black text-white py-4 px-8 flex justify-between items-center">
      <h1 class="text-lg font-bold">Produtos da Loja</h1>
      <ul class="flex gap-6">
        <li><router-link to="/" class="hover:underline">Início</router-link></li>
        <li><router-link to="/about" class="hover:underline">Sobre</router-link></li>
        <li><router-link to="/produto" class="hover:underline">Produtos</router-link></li>
        <li><router-link to="/carrinho" class="hover:underline">Carrinho</router-link></li>
        <li><router-link to="/compras" class="hover:underline">Compras</router-link></li>
      </ul>
    </nav>
  </template>
  