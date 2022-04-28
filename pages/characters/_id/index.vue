<template>
  <v-row v-if="!$fetchState.pending">
    <v-col cols="12"
      ><v-btn text nuxt @click="$router.back()">
        <v-icon left>fa-arrow-left</v-icon>Retour
      </v-btn></v-col
    >
    <v-col cols="6">
      <v-img
        v-if="character.thumbnail !== undefined"
        height="100vh"
        :src="character.thumbnail.path + '.' + character.thumbnail.extension"
      ></v-img>
    </v-col>
    <v-col cols="6">
      <h2 class="text-h4 font-weight-bold mb-4">{{ character.name }}</h2>
      <p v-if="character.description !== ''" class="text-body-1">
        {{ character.description }}
      </p>
      <v-btn
        v-for="url in character.urls"
        :key="url.type"
        outlined
        class="mr-2 text-capitalize"
        @click="redirect(url)"
        >{{ url.type }}</v-btn
      >
      <p class="mt-4 font-weight-bold text-h6">Bandes dessinées :</p>
      <v-row>
        <v-col v-for="comic in character.comics.items" :key="comic.id" cols="4">
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
      <p class="mt-4 font-weight-bold text-h6">Histoires :</p>
      <v-row>
        <v-col v-for="story in character.stories.items" :key="story.id" cols="4">
          <v-card elevation="0" outlined width="100%" height="18vh">
            <v-card-text class="font-weight-bold text-body-1">
              {{ story.name }}
              <p class="text-body-2">{{ translate(story.type) }}</p>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
      <p class="mt-4 font-weight-bold text-h6">Événements :</p>
      <v-row v-if="character.events.items.length > 0">
        <v-col v-for="event in character.events.items" :key="event.id">
          <v-card elevation="0" outlined width="100%" height="18vh">
            <v-card-text class="font-weight-bold text-body-1">
              {{ event.name }}
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
      <p v-else>Aucun résultats</p>
    </v-col>
    <v-col cols="12"> </v-col>
  </v-row>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import { Character } from '~/utils'
@Component({})
export default class Index extends Vue {
  public character = {} as Character

  public async fetch(): Promise<void> {
    const { data } = await this.$axios.$get(`/characters/${this.$route.params.id}`)
    this.character = data.results[0]
  }

  public redirect(url: { url: string; type: string }): void {
    open(`${url.url}`, `${url.type}`)
  }

  public translate(type: string): string {
    switch (type) {
      case 'interiorStory':
        return 'histoire intérieure'
      case 'cover':
      default:
        return 'couverture'
    }
  }

  public getId(redirectUri: string): string {
    const redirectUriSplit = redirectUri.split('/')
    return redirectUriSplit[6]
  }
}
</script>
