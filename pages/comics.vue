<template>
  <v-container fluid>
    <v-row>
      <template v-for="(comic, index) in comics">
        <v-col
          v-if="
            comic.thumbnail.path !==
            'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available'
          "
          :key="index"
          cols="3"
        >
          <ComicsCard :comic="comic" />
        </v-col>
      </template>
      <v-col cols="12">
        <UtilsInfiniteScroll v-model="comics" :total="total" api-url="/comics" />
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import { Comic } from '~/utils/comic'

@Component({})
export default class PageComics extends Vue {
  public comics: Comic[] = []

  public total = 0

  public async fetch(): Promise<void> {
    const { data } = await this.$axios.$get('/comics')
    this.comics = data.results
    this.total = data.total
  }
}
</script>
