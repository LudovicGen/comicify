<template>
  <v-container fluid>
    <v-row>
      <template v-for="(serie, index) in series">
        <v-col :key="index" cols="3">
          <SeriesCard :serie="serie" />
        </v-col>
      </template>
      <v-col cols="12">
        <UtilsInfiniteScroll v-model="series" :total="total" api-url="/series" />
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import { Serie } from '~/utils/serie'

@Component({})
export default class PageSeries extends Vue {
  public series: Serie[] = []

  public total = 0

  public async fetch(): Promise<void> {
    const { data } = await this.$axios.$get('/series')
    this.series = data.results
    this.total = data.total
  }
}
</script>
