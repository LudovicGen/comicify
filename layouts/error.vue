<template>
  <v-app dark>
    <v-container class="fill-height">
      <v-row justify="end">
        <v-col cols="6" align="center">
          <v-icon size="500px" color="info"> fa-ghost </v-icon>
        </v-col>
        <v-col cols="6">
          <div class="mb-10">
            <v-chip v-if="error.statusCode === 404" class="mb-6" color="info">{{
              error.statusCode === 404 ? pageNotFound : otherError
            }}</v-chip>
            <h1 class="text-h2 font-weight-bold">Oh Non! Erreur {{ error.statusCode }}</h1>
            <h3 class="text-h4 font-weight-light">
              Le fantôme vous a trouvé. <br />
              Revenez sur la page d'accueil
            </h3>
          </div>

          <v-btn color="primary" style="text-transform: none" nuxt link to="/" class="text-body-1">
            Retour à l'Accueil</v-btn
          >
          <v-btn
            text
            color="primary"
            style="text-transform: none"
            class="text-body-1"
            @click="$router.back()"
          >
            Revenir en arrière</v-btn
          >
        </v-col>
      </v-row>
    </v-container>
  </v-app>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'nuxt-property-decorator'

@Component({})
export default class LayoutsError extends Vue {
  @Prop({ type: Object, default: undefined })
  public error!: {
    statusCode: number
    path: string
    message: string
  }

  public pageNotFound = 'Page non trouvée'

  public otherError = 'Une erreur est survenue'
}
</script>
