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

<style>
::-webkit-scrollbar {
  width: 8px;
  height: 8px;
}
::-webkit-scrollbar-track {
  background-color: rgba(0, 0, 0, 0.4);
  border-radius: 10px;
}
::-webkit-scrollbar-thumb {
  background-color: #dfdfdf;
  border-radius: 10px;
}
</style>
