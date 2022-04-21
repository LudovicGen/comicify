<template>
  <v-card elevation="0" outlined height="100%">
    <v-card-title class="font-weight-bold">{{ story.title }}</v-card-title>
  </v-card>
</template>
<script lang="ts">
import { Component, Prop, Vue } from 'nuxt-property-decorator'
import { PropType } from 'vue'
import { Story } from '~/utils'

@Component({})
export default class StoriesCard extends Vue {
  @Prop({ type: Object as PropType<Story> })
  public story!: Story
}
</script>
