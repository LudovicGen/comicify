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
        height="75vh"
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
      <UtilsCardInfo
        v-if="serie.comics.items.length > 0"
        url="comics"
        :items="serie.comics.items"
        title="Bandes dessinées"
      />
      <UtilsCardInfo
        v-if="serie.stories.items.length > 0"
        url="stories"
        :items="serie.stories.items"
        title="Histoires"
      />
      <UtilsCardInfo
        v-if="serie.events.items.length > 0"
        url="events"
        :items="serie.events.items"
        title="Événements"
      />
      <UtilsCardInfo
        v-if="serie.characters.items.length > 0"
        url="characters"
        :items="serie.characters.items"
        title="Personnages"
      />
      <UtilsCardInfo
        v-if="serie.creators.items.length > 0"
        url="creators"
        :items="serie.creators.items"
        title="Créateurs"
      />
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
