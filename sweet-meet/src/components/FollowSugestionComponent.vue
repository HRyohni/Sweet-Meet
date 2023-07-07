<template>
  <v-card width="400">
    <v-card-title> Who to follow.</v-card-title>

    <v-card-text>
      <v-card class="pa-2 ma-2" elevation-10>
        <v-avatar>
          <img
              src="https://cdn.vuetifyjs.com/images/john.jpg"
              alt="John"
          />
        </v-avatar>
        <v-card-title class="d-inline">John Hohnny</v-card-title>
        <v-btn color="primary">follow</v-btn>
      </v-card>
      <v-card class="pa-2 ma-2" elevation-10>
        <v-avatar>
          <img
              src="https://cdn.vuetifyjs.com/images/john.jpg"
              alt="John"
          />
        </v-avatar>
        <v-card-title class="d-inline">John Hohnny</v-card-title>
        <v-btn color="primary">follow</v-btn>
      </v-card>
      <v-card class="pa-2 ma-2" elevation-10>
        <v-avatar>
          <img
              src="https://cdn.vuetifyjs.com/images/john.jpg"
              alt="John"
          />
        </v-avatar>

        <v-card-title class="d-inline">John Hohnny</v-card-title>
        <v-btn color="primary">follow</v-btn>
      </v-card>
    </v-card-text>
  </v-card>
</template>
<script>
export default {
  name: 'FollowSugestionComponent'
}
</script>