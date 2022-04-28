<template>
  <v-container fluid>
    <UtilsDefaultPage
      v-model="creators"
      :api-url="apiUrl"
      :title="title"
      :list-order-by="listOrderBy"
      :order-by="orderBy"
    >
      <template v-for="(creator, index) in creators">
        <v-col :key="index" cols="3">
          <CreatorsCard :creator="creator" />
        </v-col>
      </template>
    </UtilsDefaultPage>
  </v-container>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import { Creator } from '~/utils'

@Component({})
export default class PageCreators extends Vue {
  public creators: Creator[] = []

  public apiUrl = '/creators'

  public title = 'Listes des créateurs'

  public listOrderBy = [
    { text: 'Nom de famille', value: 'lastName' },
    { text: 'Prénom', value: 'firstName' },
    { text: 'Date de dernière modification', value: 'modified' },
  ]

  public orderBy = 'lastName'
}
</script>
