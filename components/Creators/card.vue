<template>
  <v-card elevation="0" outlined height="100%">
    <v-img height="150" :src="creator.thumbnail.path + '.' + creator.thumbnail.extension"></v-img>
    <v-card-title class="font-weight-bold">{{ creator.fullName }}</v-card-title>
  </v-card>
</template>
<script lang="ts">
import { Component, Prop, Vue } from 'nuxt-property-decorator'
import { PropType } from 'vue'
import { Creator } from '~/utils/creator'

@Component({})
export default class CreatorsCard extends Vue {
  @Prop({ type: Object as PropType<Creator> })
  public creator!: Creator
}
</script>
