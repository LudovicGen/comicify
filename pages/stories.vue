<template>
  <v-container fluid>
    <v-row v-if="!$fetchState.pending">
      <template v-for="(story, index) in stories">
        <v-col :key="index" cols="3">
          <StoriesCard :story="story" />
        </v-col>
      </template>
      <v-col cols="12">
        <UtilsInfiniteScroll v-model="stories" :total="total" api-url="/stories" />
      </v-col>
    </v-row>
    <v-skeleton-loader v-else type="card-avatar@4" />
  </v-container>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import { Story } from '~/utils'

@Component({})
export default class PageStories extends Vue {
  public stories: Story[] = []

  public total = 0

  public async fetch(): Promise<void> {
    const { data } = await this.$axios.$get('/stories')
    this.stories = data.results
    this.total = data.total
  }
}
</script>
