<template>
  <div></div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'

@Component({
  middleware: [
    ({ redirect }): void => {
      redirect(`${process.env.ROUTER_BASE !== undefined ? process.env.ROUTER_BASE : '/'}characters`)
    },
  ],
})
export default class Index extends Vue {}
</script>
