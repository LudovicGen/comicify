<template>
  <v-container fluid>
    <UtilsDefaultPage
      v-model="characters"
      :api-url="apiUrl"
      :title="title"
      :list-order-by="listOrderBy"
      :order-by="orderBy"
      param-search="nameStartsWith"
    >
      <template v-for="(character, index) in characters">
        <v-col
          v-if="
            character.thumbnail &&
            character.thumbnail.path !==
              'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available'
          "
          :key="index"
          cols="3"
        >
          <CharactersCard :character="character" />
        </v-col>
      </template>
    </UtilsDefaultPage>
  </v-container>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import { Character } from '~/utils'

@Component({})
export default class PageCharacters extends Vue {
  public characters: Character[] = []

  public apiUrl = '/characters'

  public title = 'Listes des personnages'

  public listOrderBy = [
    { text: 'Nom', value: 'name' },
    { text: 'Date de dernière modification', value: 'modified' },
  ]

  public orderBy = 'name'
}
</script>
