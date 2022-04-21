<template>
  <v-app dark>
    <v-app-bar app fixed elevation="0" color="bg" class="pb-0">
      <v-app-bar-nav-icon
        v-if="$vuetify.breakpoint.mobile"
        style="margin-right: 15px"
        @click="showMenu = !showMenu"
      />
      <v-card color="error" elevation="0" class="text-center" nuxt to="/">
        <v-card-title class="justify-center">
          <span class="white--text text-uppercase font-weight-bold text-h5">Comicify</span>
        </v-card-title>
      </v-card>
      <v-spacer />
      <div>
        <NavigationAppBarExtension />
      </div>
    </v-app-bar>
    <v-main style="height: 100%">
      <v-container>
        <Nuxt />
      </v-container>
    </v-main>
    <v-footer absolute app>
      <span>&copy; {{ new Date().getFullYear() }}</span>
    </v-footer>
  </v-app>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'

@Component({})
export default class LayoutsDefault extends Vue {}
</script>
