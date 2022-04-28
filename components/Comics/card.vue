<template>
  <v-card elevation="0" outlined height="100%" nuxt :to="`/comics/${comic.id}`">
    <v-img height="150" :src="comic.thumbnail.path + '.' + comic.thumbnail.extension"></v-img>
    <v-card-title class="font-weight-bold">{{ comic.title }}</v-card-title>
  </v-card>
</template>
<script lang="ts">
import { Component, Prop, Vue } from 'nuxt-property-decorator'
import { PropType } from 'vue'
import { Comic } from '~/utils/comic'

@Component({})
export default class ComicsCard extends Vue {
  @Prop({ type: Object as PropType<Comic> })
  public comic!: Comic
}
</script>
