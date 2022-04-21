<template>
  <v-container fluid>
    <v-row>
      <template v-for="character in characters">
        <v-col
          v-if="
            character.thumbnail.path !==
            'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available'
          "
          :key="character.name"
          cols="3"
        >
          <Card :character="character" />
        </v-col>
      </template>
      <v-col cols="12">
        <UtilsInfiniteScroll v-model="characters" :total="total" api-url="/characters" />
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import { Character } from '~/utils/character'

@Component({})
export default class PageCharacters extends Vue {
  public characters: Character[] = []

  public total = 0

  public async fetch(): Promise<void> {
    const { data } = await this.$axios.$get('/characters')
    this.characters = data.results
    this.total = data.total
  }
}
</script>
