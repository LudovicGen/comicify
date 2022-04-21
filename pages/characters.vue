<template>
  <v-container fluid>
    <v-toolbar elevation="0">
      <v-row justify="end">
        <v-col cols="8"><h2 class="text-5">Listes des personnages</h2></v-col>
        <v-col cols="4">
          <v-text-field
            v-model="search"
            clearable
            clear-icon="fa-times"
            label="Rechercher"
            class="text-body-2"
            @keypress.enter="loadData"
          >
            <template v-if="search === '' || search == undefined" #append>
              <v-icon color="classicIcon">fas fa-search</v-icon>
            </template>
          </v-text-field>
        </v-col>
      </v-row>
    </v-toolbar>
    <v-row v-if="!$fetchState.pending">
      <template v-for="character in characters">
        <v-col
          v-if="
            character.thumbnail.path !==
            'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available'
          "
          :key="character.name"
          cols="3"
        >
          <CharactersCard :character="character" />
        </v-col>
      </template>
      <v-col cols="12">
        <UtilsInfiniteScroll v-model="characters" :total="total" api-url="/characters" />
      </v-col>
    </v-row>
    <v-skeleton-loader v-else type="card-avatar@4" />
  </v-container>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import { Character } from '~/utils'

@Component({})
export default class PageCharacters extends Vue {
  public characters: Character[] = []

  public total = 0

  public search: string = ''

  public async loadData(): Promise<void> {
    const { data } = await this.$axios.$get('/characters', {
      params: { nameStartsWith: this.search !== '' ? this.search : undefined },
    })
    this.characters = data.results
    this.total = data.total
  }

  public async fetch(): Promise<void> {
    await this.loadData()
  }
}
</script>
