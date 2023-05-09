<script setup>
import { useCollection } from 'vuefire'
import { collection } from 'firebase/init'

const todos = useCollection(collection(db, 'name'))
</script>

<template>
  <ul>
    <li v-for="todo in todos" :key="todo.id">
     <span>{{ todo.text }}</span>
    </li>
  </ul>
</template>
