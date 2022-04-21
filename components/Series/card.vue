<template>
  <v-card elevation="0" outlined height="100%">
    <v-img height="150" :src="serie.thumbnail.path + '.' + serie.thumbnail.extension"></v-img>
    <v-card-title class="font-weight-bold">{{ serie.title }}</v-card-title>
  </v-card>
</template>
<script lang="ts">
import { Component, Prop, Vue } from 'nuxt-property-decorator'
import { PropType } from 'vue'
import { Serie } from '~/utils/serie'

@Component({})
export default class SeriesCard extends Vue {
  @Prop({ type: Object as PropType<Serie> })
  public serie!: Serie
}
</script>
