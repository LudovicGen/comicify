<template>
  <div>
    <p class="mt-4 font-weight-bold text-h6">{{ title }} :</p>
    <v-row style="height: 20vh" class="overflow-y-auto">
      <v-col v-for="comic in items" :key="comic.id" cols="4">
        <v-card
          elevation="0"
          outlined
          width="100%"
          height="18vh"
          nuxt
          :to="`/${url}/${getId(comic.resourceURI)}`"
        >
          <v-card-text class="font-weight-bold text-body-1">
            {{ comic.name }}
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script lang="ts">
import { PropType } from 'vue'
import { Component, Prop, Vue } from 'vue-property-decorator'

@Component({})
export default class UtilsCardInfo<Entity> extends Vue {
  @Prop({ type: Array as PropType<Entity[]> })
  public items!: Entity[]

  @Prop({ type: String })
  public readonly title!: string

  @Prop({ type: String })
  public readonly url!: string

  public getId(redirectUri: string): string {
    const redirectUriSplit = redirectUri.split('/')
    return redirectUriSplit[6]
  }
}
</script>
