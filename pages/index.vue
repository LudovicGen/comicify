<template>
  <v-container fluid>
    <v-row>
      <v-col v-for="(character, index) in characters" :key="index" cols="3">
        <Card :character="character" />
      </v-col>
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
export default class Index extends Vue {
  public characters: Character[] = []

  public total = 0

  public async fetch(): Promise<void> {
    const { data } = await this.$axios.$get('/characters')
    this.characters = data.results
    this.total = data.total
  }
}
</script>
