<template>
  <v-row v-if="!$fetchState.pending">
    <v-col cols="12"
      ><v-btn text nuxt @click="$router.back()">
        <v-icon left>fa-arrow-left</v-icon>Retour
      </v-btn></v-col
    >
    <v-col cols="6">
      <v-img
        v-if="story.thumbnail != undefined"
        height="100vh"
        :src="story.thumbnail.path + '.' + story.thumbnail.extension"
      ></v-img>
    </v-col>
    <v-col cols="6">
      <h2 class="text-h4 font-weight-bold mb-4">{{ story.title }}</h2>
      <p v-if="story.description !== ''" class="text-body-1">
        {{ story.description }}
      </p>
      <p>
        Type :<span class="font-weight-bold">{{ translate(story.type) }}</span>
      </p>
      <v-btn
        v-for="url in story.urls"
        :key="url.type"
        outlined
        class="mr-2 text-capitalize"
        @click="redirect(url)"
        >{{ story.type }}</v-btn
      >
    </v-col>
  </v-row>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import { Story } from '~/utils'

@Component({})
export default class PageStoryIndex extends Vue {
  public story = {} as Story

  public async fetch(): Promise<void> {
    const { data } = await this.$axios.$get(`/stories/${this.$route.params.id}`)
    this.story = data.results[0]
  }

  public redirect(url: { url: string; type: string }): void {
    open(`${url.url}`, `${url.type}`)
  }

  public getId(redirectUri: string): string {
    const redirectUriSplit = redirectUri.split('/')
    return redirectUriSplit[6]
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
}
</script>
