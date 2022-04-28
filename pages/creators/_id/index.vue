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
        height="100vh"
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
      <p class="mt-4 font-weight-bold text-h6">Bandes dessinées :</p>
      <v-row>
        <v-col v-for="(comic, index) in creator.comics.items" :key="index" cols="4">
          <v-card
            elevation="0"
            outlined
            width="100%"
            height="18vh"
            nuxt
            :to="`/comics/${getId(comic.resourceURI)}`"
          >
            <v-card-text class="font-weight-bold text-body-1">
              {{ comic.name }}
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
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
