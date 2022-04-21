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
        height="100%"
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
    </v-col>
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
}
</script>
