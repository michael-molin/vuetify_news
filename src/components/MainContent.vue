<template>
    <v-layout row="row" wrap="wrap" align-center="align-center">
        <v-flex lg8="lg8" offset-lg2="offset-lg2" align-center="align-center">
            <div v-for="article in articles" :key="article.title">
                <v-card class="my-3 card-align">
                    <v-img height="350px" :src="article.urlToImage"></v-img>
                    <v-container fill-height="fill-height" fluid="fluid">
                        <v-layout>
                            <v-flex xs12="xs12" align-end="align-end" d-flex="d-flex">
                                <span class="headline">{{ article.title }}</span>
                            </v-flex>
                        </v-layout>
                    </v-container>
                </v-card-media>
                <v-card-text>
                    {{ article.description }}
                </v-card-text>
                <v-card-actions class="d-flex flex-wrap justify-center">
                    <v-chip xs12="xs12" small="small" color="secondary" class="white--text">
                        {{article.source.name}}
                    </v-chip>
                    <v-spacer></v-spacer>
                    <v-btn icon="icon" class="red--text">
                        <v-icon small="small">fa-instagram</v-icon>
                    </v-btn>
                    <v-btn icon="icon" class="light-blue--text">
                        <v-icon small="small">fa-twitter</v-icon>
                    </v-btn>
                    <v-btn icon="icon" class="blue--text text--darken-4">
                        <v-icon small="small">fa-facebook</v-icon>
                    </v-btn>
                    <v-btn icon="icon" class="blue--text text--darken-4">
                            <v-icon small="small">fa-linkedin</v-icon>
                    </v-btn>
                    <v-spacer></v-spacer>
                    <v-btn xs12="xs12" small="small" replace="replace" color="info" :href="article.url" target="_blank">Articolo Completo</v-btn>
                </v-card-actions>
                </v-card>
            </div>
        </v-flex>
    </v-layout>
</template>

<script>
export default {
  props: {
      articles: Array
  },
}
</script>
<style>
    .card-align {
        margin: 0 auto;
    }
</style>
