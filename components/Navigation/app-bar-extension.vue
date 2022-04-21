<template>
  <v-container fluid>
    <v-btn
      v-for="(link, index) in links"
      :key="index"
      text
      class="text-center"
      nuxt
      :to="link.to"
      >{{ link.text }}</v-btn
    >
    <v-tooltip bottom>
      <template #activator="{ on, attrs }">
        <v-btn
          class="mr-2"
          v-bind="attrs"
          text
          icon
          color="primary"
          v-on="on"
          @click="$vuetify.theme.dark = !$vuetify.theme.dark"
        >
          <v-icon v-if="!$vuetify.theme.dark"> fas fa-moon </v-icon>
          <v-icon v-else> fas fa-sun </v-icon>
        </v-btn>
      </template>
      <span>{{ !$vuetify.theme.dark ? 'Dark mode' : 'Light mode' }}</span>
    </v-tooltip>
  </v-container>
</template>

<script lang="ts">
import Cookies from 'js-cookie'
import { Component, Vue } from 'nuxt-property-decorator'
@Component({})
export default class NavigationAppBarExtension extends Vue {
  public created(): void {
    const dateNow = new Date()
    this.$vuetify.theme.dark = !!(
      this.$dateFns.isAfter(dateNow, this.$dateFns.setHours(dateNow, 18)) ||
      this.$dateFns.isBefore(dateNow, this.$dateFns.setHours(dateNow, 6))
    )
  }

  public mounted(): void {
    if (Cookies.get('night-mode') === 'true') {
      this.$vuetify.theme.dark = true
    }
  }

  public links = [
    {
      text: 'Personnage',
      to: '/characters',
    },
    {
      text: 'Bandes dessinées',
      to: '/comics',
    },
    {
      text: 'Créateurs',
      to: '/creators',
    },
    {
      text: 'Séries',
      to: '/series',
    },
    {
      text: 'Histoires',
      to: '/stories',
    },
  ]
}
</script>
