<template>
  <v-row v-if="!$fetchState.pending">
    <v-col cols="12"
      ><v-btn text nuxt @click="$router.back()">
        <v-icon left>fa-arrow-left</v-icon>Retour
      </v-btn></v-col
    >
    <v-col cols="6">
      <v-img
        v-if="serie.thumbnail !== undefined"
        height="100vh"
        :src="serie.thumbnail.path + '.' + serie.thumbnail.extension"
      ></v-img>
    </v-col>
    <v-col cols="6">
      <h2 class="text-h4 font-weight-bold mb-4">{{ serie.title }}</h2>
      <v-btn
        v-for="url in serie.urls"
        :key="url.type"
        outlined
        class="mr-2 text-capitalize"
        @click="redirect(url)"
        >{{ url.type }}</v-btn
      >
    </v-col>
  </v-row>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import { Serie } from '~/utils'

@Component({})
export default class PageSerieIndex extends Vue {
  public serie = {} as Serie

  public async fetch(): Promise<void> {
    const { data } = await this.$axios.$get(`/series/${this.$route.params.id}`)
    this.serie = data.results[0]
  }

  public redirect(url: { url: string; type: string }): void {
    open(`${url.url}`, `${url.type}`)
  }

  public getId(redirectUri: string): string {
    const redirectUriSplit = redirectUri.split('/')
    return redirectUriSplit[6]
  }
}
</script>
