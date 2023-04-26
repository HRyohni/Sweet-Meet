<template>
 <v-container
  centered
 style="background-color: aqua;">
  <h1>kurac</h1>
  <Vue2InteractDraggable 
  @draggedRight="draggedRight"
  :interact-max-rotation="15"
  :interact-out-of-sight-x-coordinate="500"
  :interact-x-threshold="200"
>
  <div>
    <v-card
    width="100px"
    height="200"
    outlined 
    >
      <h1>test</h1>
    </v-card>
  </div>
</Vue2InteractDraggable>
 </v-container>
</template>







<script>

import { Vue2InteractDraggable } from 'vue2-interact'

export default {
  components: {
    Vue2InteractDraggable
  }
}
</script>