<template>
  <v-container fluid>
    <UtilsDefaultPage
      v-model="series"
      :api-url="apiUrl"
      :title="title"
      :list-order-by="listOrderBy"
      :order-by="orderBy"
      param-search="titleStartsWith"
    >
      <template v-for="(serie, index) in series">
        <v-col
          v-if="
            serie.thumbnail &&
            serie.thumbnail.path !==
              'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available'
          "
          :key="index"
          cols="3"
        >
          <SeriesCard :serie="serie" />
        </v-col>
      </template>
    </UtilsDefaultPage>
  </v-container>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import { Serie } from '~/utils'

@Component({})
export default class PageSeries extends Vue {
  public series: Serie[] = []

  public apiUrl = '/series'

  public title = 'Listes des séries'

  public listOrderBy = [
    { text: 'Titre', value: 'title' },
    { text: 'Date de dernière modification', value: 'modified' },
  ]

  public orderBy = 'title'
}
</script>
