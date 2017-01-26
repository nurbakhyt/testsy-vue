<template>
  <md-layout md-gutter="16">
    <div v-if="loading" class="loading">
      <md-spinner md-indeterminate></md-spinner>  
    </div>
    <div v-if="error" class="error">
      {{ error }}
    </div>
    <card
      v-for="lecture in lectures"
      :lecture="lecture"
      :key="lecture.id">
    </card>
  </md-layout>
</template>

<script>
  import Card from './Card.vue'
  
  export default {
    name: 'Feed',

    components: {
      'card': Card
    },

    data () {
      return {
        loading: false,
        lectures: [],
        error: null,
      }
    },

    created () {
      this.getLectures()
    },

    methods: {
      getLectures () {
        this.error = null
        this.lectures = []
        this.loading = true
        this.$http.get("api/lectures")
          .then(response => {
            this.lectures = response.body
            this.loading = false
          }, response => {
            if (response.status == 404)
              this.error = "Лекции не найдены"
              this.loading = false
          })
      }
    }
  }
</script>

<style scoped>
  .loading {
    top: 10px;
    margin: auto;
  }
  .error {
    color: red;
    margin: auto;
  }
  .slide-enter {
    opacity: 0;
    transform: translate(30px, 0);
  }
  .slide-leave-active {
    opacity: 0;
    transform: translate(-30px, 0);
  }
</style>