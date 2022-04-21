<template>
  <v-container fluid>
    <v-row v-if="!$fetchState.pending">
      <template v-for="(creator, index) in creators">
        <v-col :key="index" cols="3">
          <CreatorsCard :creator="creator" />
        </v-col>
      </template>
      <v-col cols="12">
        <UtilsInfiniteScroll v-model="creators" :total="total" api-url="/creators" />
      </v-col>
    </v-row>
    <v-skeleton-loader v-else type="card-avatar@4" />
  </v-container>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import { Creator } from '~/utils'

@Component({})
export default class PageCreators extends Vue {
  public creators: Creator[] = []

  public total = 0

  public async fetch(): Promise<void> {
    const { data } = await this.$axios.$get('/creators')
    this.creators = data.results
    this.total = data.total
  }
}
</script>
