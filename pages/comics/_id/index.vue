<template>
  <v-row v-if="!$fetchState.pending">
    <v-col cols="12"
      ><v-btn text nuxt @click="$router.back()">
        <v-icon left>fa-arrow-left</v-icon>Retour
      </v-btn></v-col
    >
    <v-col cols="6">
      <v-img
        v-if="comic.thumbnail !== undefined"
        height="100%"
        max-height="75vh"
        :src="comic.thumbnail.path + '.' + comic.thumbnail.extension"
      ></v-img>
    </v-col>
    <v-col cols="6">
      <h2 class="text-h4 font-weight-bold mb-4">{{ comic.title }}</h2>
      <p v-if="comic.description !== ''" class="text-body-1">
        {{ comic.description }}
      </p>
      <v-btn
        v-for="url in comic.urls"
        :key="url.type"
        outlined
        class="mr-2 text-capitalize"
        @click="redirect(url)"
        >{{ url.type }}</v-btn
      >
      <UtilsCardInfo
        v-if="comic.characters.items.length > 0"
        url="characters"
        :items="comic.characters.items"
        title="Personnages"
      />
      <UtilsCardInfo
        v-if="comic.creators.items.length > 0"
        url="creators"
        :items="comic.creators.items"
        title="Créateurs"
      />
      <UtilsCardInfo
        v-if="comic.events.items.length > 0"
        url="events"
        :items="comic.events.items"
        title="Événements"
      />
      <UtilsCardInfo
        v-if="comic.stories.items.length > 0"
        url="stories"
        :items="comic.stories.items"
        title="Histoires"
      />
      <UtilsCardInfo
        v-if="comic.collections.length > 0"
        url="collections"
        :items="comic.collections"
        title="Collections"
      />
    </v-col>
  </v-row>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import { Comic } from '~/utils'

@Component({})
export default class PageComicsIndex extends Vue {
  public comic = {} as Comic

  public async fetch(): Promise<void> {
    const { data } = await this.$axios.$get(`/comics/${this.$route.params.id}`)
    this.comic = data.results[0]
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
