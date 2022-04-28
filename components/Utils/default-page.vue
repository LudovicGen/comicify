<template>
  <v-container fluid>
    <v-toolbar elevation="0" color="transparent">
      <v-row justify="end">
        <v-col cols="7"
          ><h2 class="text-5">{{ title }}</h2>
        </v-col>
        <v-col cols="2">
          <v-text-field
            v-model="search"
            clearable
            clear-icon="fa-times"
            label="Rechercher"
            class="text-body-2"
            @input="debouncedSearch"
          >
            <template v-if="search === '' || search == undefined" #append>
              <v-icon color="classicIcon">fas fa-search</v-icon>
            </template>
          </v-text-field>
        </v-col>
        <v-col cols="2">
          <v-autocomplete
            v-model="orderBy"
            label="Trié par"
            :items="listOrderBy"
            item-text="text"
            item-value="value"
            @change="loadData"
          />
        </v-col>
        <v-col cols="1" class="text-center" align-self="start">
          <v-tooltip bottom>
            <template #activator="{ on, attrs }">
              <v-btn v-bind="attrs" icon v-on="on" @click="changeSort">
                <v-icon>{{
                  asc ? 'fa-solid fa-arrow-down-a-z' : 'fa-solid fa-arrow-down-z-a'
                }}</v-icon></v-btn
              >
            </template>
            <span>{{
              !asc ? "Trié dans l'ordre alphabétique" : "Trié dans l'ordre alphabétique inversé"
            }}</span>
          </v-tooltip>
        </v-col>
      </v-row>
    </v-toolbar>
    <v-row v-if="!$fetchState.pending">
      <slot></slot>
      <v-col cols="12">
        <UtilsInfiniteScroll v-model="items" :total="total" :api-url="apiUrl" :search="search" />
      </v-col>
    </v-row>
    <v-skeleton-loader v-else type="card-avatar@4" />
  </v-container>
</template>
<script lang="ts">
import { Component, Prop, VModel, Vue } from 'nuxt-property-decorator'
import { PropType } from 'vue'
import type { DebouncedFunc } from 'lodash'
import debounce from 'lodash/debounce'

@Component({})
export default class UtilsDefaultPage<Entity> extends Vue {
  @VModel({ type: Array as PropType<Entity[]> })
  public items!: Entity[]

  @Prop({ type: String })
  public readonly title!: string

  @Prop({ type: String })
  public apiUrl!: string

  @Prop({ type: Array as PropType<string[]>, default: () => [{ text: 'Nom', value: 'name' }] })
  public listOrderBy!: string[]

  @Prop({ type: String })
  public orderBy!: string

  @Prop({ type: String })
  public paramSearch!: string

  public total: number = 0

  public search: string = ''

  public debouncedSearch!: DebouncedFunc<() => Promise<void>>

  public asc = true

  public created(): void {
    this.debouncedSearch = debounce(() => {
      this.items = []
      // eslint-disable-next-line no-void
      void this.loadData()
    }, 1000)
  }

  public async loadData(): Promise<void> {
    const { data } = await this.$axios.$get<Entity[]>(this.apiUrl, {
      params: {
        nameStartsWith: this.search !== '' ? this.search : undefined,
        orderBy: this.asc ? this.orderBy : `-${this.orderBy}`,
      },
    })
    this.items = data.results
    this.total = data.total
  }

  public async fetch(): Promise<void> {
    await this.loadData()
  }

  public async changeSort(): Promise<void> {
    this.asc = !this.asc
    await this.loadData()
  }

  public reloadLastQuery(): void {
    if (this.$route.query.search !== undefined && typeof this.$route.query.search === 'string') {
      this.search = this.$route.query.search
    }
    if (this.$route.query.orderBy !== undefined && typeof this.$route.query.orderBy === 'string') {
      this.orderBy = this.$route.query.orderBy
    }
  }
}
</script>
