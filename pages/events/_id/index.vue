<template>
  <v-row v-if="!$fetchState.pending">
    <v-col cols="12"
      ><v-btn text nuxt @click="$router.back()">
        <v-icon left>fa-arrow-left</v-icon>Retour
      </v-btn></v-col
    >
    <v-col cols="6">
      <v-img
        v-if="event.thumbnail !== undefined"
        height="75vh"
        :src="event.thumbnail.path + '.' + event.thumbnail.extension"
      ></v-img>
    </v-col>
    <v-col cols="6">
      <h2 class="text-h4 font-weight-bold mb-4">{{ event.title }}</h2>
      <p v-if="event.description !== ''" class="text-body-1">
        {{ event.description }}
      </p>
      <v-btn
        v-for="url in event.urls"
        :key="url.type"
        outlined
        class="mr-2 text-capitalize"
        @click="redirect(url)"
        >{{ url.type }}</v-btn
      >
      <UtilsCardInfo
        v-if="event.comics.items.length > 0"
        url="comics"
        :items="event.comics.items"
        title="Bandes dessinées"
      />
      <UtilsCardInfo
        v-if="event.stories.items.length > 0"
        url="stories"
        :items="event.stories.items"
        title="Histoires"
      />
      <UtilsCardInfo
        v-if="event.series.items.length > 0"
        url="series"
        :items="event.series.items"
        title="Séries"
      />
      <UtilsCardInfo
        v-if="event.characters.items.length > 0"
        url="characters"
        :items="event.characters.items"
        title="Personnages"
      />
      <UtilsCardInfo
        v-if="event.creators.items.length > 0"
        url="creators"
        :items="event.creators.items"
        title="Créateurs"
      />
    </v-col>
  </v-row>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import { Event } from '~/utils'

@Component({})
export default class PageEventIndex extends Vue {
  public event = {} as Event

  public async fetch(): Promise<void> {
    const { data } = await this.$axios.$get(`/events/${this.$route.params.id}`)
    this.event = data.results[0]
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
