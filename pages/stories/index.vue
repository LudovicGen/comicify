<template>
  <v-container fluid>
    <UtilsDefaultPage
      v-model="stories"
      :api-url="apiUrl"
      :title="title"
      :list-order-by="listOrderBy"
      :order-by="orderBy"
    >
      <template v-for="(story, index) in stories">
        <v-col :key="index" cols="3">
          <StoriesCard :story="story" />
        </v-col>
      </template>
    </UtilsDefaultPage>
  </v-container>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import { Story } from '~/utils'

@Component({})
export default class PageStories extends Vue {
  public stories: Story[] = []

  public apiUrl = '/stories'

  public title = 'Listes des histoires'

  public listOrderBy = [{ text: 'Date de dernière modification', value: 'modified' }]

  public orderBy = 'modified'
}
</script>
