<template>
  <v-card elevation="0" outlined height="100%">
    <v-img
      height="150"
      :src="character.thumbnail.path + '.' + character.thumbnail.extension"
    ></v-img>
    <v-card-title class="font-weight-bold">{{ character.name }}</v-card-title>
  </v-card>
</template>
<script lang="ts">
import { Component, Prop, Vue } from 'nuxt-property-decorator'
import { PropType } from 'vue'
import { Character } from '@/utils/character'

@Component({})
export default class Card extends Vue {
  @Prop({ type: Object as PropType<Character> })
  public character!: Character
}
</script>
