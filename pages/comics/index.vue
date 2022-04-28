<template>
  <v-container fluid>
    <UtilsDefaultPage
      v-model="comics"
      :api-url="apiUrl"
      :title="title"
      :list-order-by="listOrderBy"
      :order-by="orderBy"
    >
      <template v-for="(comic, index) in comics">
        <v-col
          v-if="
            comic.thumbnail &&
            comic.thumbnail.path !==
              'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available'
          "
          :key="index"
          cols="3"
        >
          <ComicsCard :comic="comic" />
        </v-col>
      </template>
    </UtilsDefaultPage>
  </v-container>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import { Comic } from '~/utils'

@Component({})
export default class PageComics extends Vue {
  public comics: Comic[] = []

  public apiUrl = '/comics'

  public title = 'Listes des bandes dessinées'

  public listOrderBy = [
    { text: 'Titre', value: 'title' },
    { text: 'Date de dernière modification', value: 'modified' },
  ]

  public orderBy = 'title'
}
</script>
