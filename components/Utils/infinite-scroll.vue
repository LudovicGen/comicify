<template>
  <v-card
    v-intersect="{
      handler: onIntersect,
      options: {
        threshold: [0, 0.5, 1.0],
      },
    }"
    class="text-center"
    elevation="0"
  >
    <div class="font-weight-bold text-body-2">
      <v-card-text v-if="loadingNewPage"
        ><v-icon color="primary" large>fas fa-circle-notch fa-spin</v-icon>
        <p>{{ `Affichage ${items.length} sur ${total} éléments` }}</p></v-card-text
      >
      <v-card-text v-else>{{ `${total} sur ${total} éléments` }}</v-card-text>
    </div>
  </v-card>
</template>
<script lang="ts">
import { Component, Prop, VModel, Vue } from 'nuxt-property-decorator'
import type { PropType } from 'vue/types/options'

@Component({})
export default class UtilsInfiniteScroll<Entity> extends Vue {
  @VModel({ type: Array as PropType<Entity[]>, default: () => [] })
  public items!: Entity[]

  @Prop({ type: Number })
  public total!: number

  @Prop({ type: String })
  public apiUrl!: string

  @Prop({ type: String, required: false })
  public search!: string

  public page = 0

  public loadingNewPage = false

  public async onIntersect(entries?: { intersectionRatio: number }[]): Promise<void> {
    const isIntersecting = entries?.[0] ? entries[0].intersectionRatio >= 0.5 : false
    if (
      isIntersecting &&
      this.total > this.items.length &&
      !this.loadingNewPage &&
      (this.search === '' || this.search === null)
    ) {
      this.loadingNewPage = true
      const result = await this.loadNewPage()
      if (result.length > 0) {
        this.items.push(...result)
      }
      this.loadingNewPage = false
    }
  }

  public async loadNewPage(): Promise<Entity[]> {
    this.page = this.page + 20
    const { data } = await this.$axios.$get<Entity[]>(this.apiUrl, {
      params: { offset: this.page },
    })
    return data.results
  }
}
</script>
