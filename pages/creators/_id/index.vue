<template>
  <v-row v-if="!$fetchState.pending">
    <v-col cols="12"
      ><v-btn text nuxt @click="$router.back()">
        <v-icon left>fa-arrow-left</v-icon>Retour
      </v-btn></v-col
    >
    <v-col cols="6">
      <v-img
        v-if="creator.thumbnail !== undefined"
        height="75vh"
        :src="creator.thumbnail.path + '.' + creator.thumbnail.extension"
      ></v-img>
    </v-col>
    <v-col cols="6">
      <h2 class="text-h4 font-weight-bold mb-4">{{ creator.fullName }}</h2>
      <v-btn
        v-for="url in creator.urls"
        :key="url.type"
        outlined
        class="mr-2 text-capitalize"
        @click="redirect(url)"
        >{{ url.type }}</v-btn
      >
      <UtilsCardInfo
        v-if="creator.comics.items.length > 0"
        url="comics"
        :items="creator.comics.items"
        title="Bandes dessinées"
      />
      <UtilsCardInfo
        v-if="creator.series.items.length > 0"
        url="series"
        :items="creator.series.items"
        title="Séries"
      />
      <UtilsCardInfo
        v-if="creator.stories.items.length > 0"
        url="stories"
        :items="creator.stories.items"
        title="Histoires"
      />
      <UtilsCardInfo
        v-if="creator.events.items.length > 0"
        url="events"
        :items="creator.events.items"
        title="Événements"
      />
    </v-col>
  </v-row>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import { Creator } from '~/utils'

@Component({})
export default class PageCreatorIndex extends Vue {
  public creator = {} as Creator

  public async fetch(): Promise<void> {
    const { data } = await this.$axios.$get(`/creators/${this.$route.params.id}`)
    this.creator = data.results[0]
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
