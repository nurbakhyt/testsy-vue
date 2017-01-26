<template>
  <md-layout md-gutter="16">
    <div class="loading" v-if="loading">
      <md-spinner md-indeterminate></md-spinner>
    </div>
    
    <div v-if="error" class="error">
      {{ error }}
    </div>
    <div v-if="!error">
      <md-layout md-align="center">
        <span class="md-display-1 lecture-title">{{ lecture.title }}</span>
      </md-layout>
      <md-layout md-align="center">
        <iframe class="video" width="853" height="480" :src="'https://www.youtube.com/embed/' + lecture.video" frameborder="0" allowfullscreen></iframe>
      </md-layout>
      <div class="divider"></div>
      <p class="md-body-1">
        {{ lecture.description }}
      </p>
      <md-layout md-align="center">
        <md-button :href="/test/ + lecture.id" class="md-raised md-primary">Перейти к тесту</md-button>
      </md-layout>
    </div>
  </md-layout>
</template>

<script>  
  export default {
    name: 'Lecture',
    
    data () {
      return {
        loading: false,
        lecture: {},
        error: null
      }
    },

    created () {
      this.getLecture()
    },

    watch: {
      '$route': 'getLecture'
    },

    methods: {
      getLecture () {
        this.error = null
        this.lecture = {}
        this.loading = true
        this.$http.get("api/lectures/" + this.$route.params.id)
          .then(response => {
            console.log(response)
            this.lecture = response.body
            this.loading = false
          }, response => {
            if (response.status == 404)
              this.error = "Лекция не найдена"
              this.loading = false
          })
      }
    }
  }
</script>

<style scoped>
  .lecture-title {
    margin-bottom: 16px;
  }
  .loading {
    /*position: absolute;
    top: 10px;
    right: 10px;*/
    top: 10px;
    margin: 0 auto;
  }
  .error {
    color: red;
  }
  .content {
    transition: all .35s ease;
    position: absolute;
  }
  .slide-enter {
    opacity: 0;
    transform: translate(30px, 0);
  }
  .slide-leave-active {
    opacity: 0;
    transform: translate(-30px, 0);
  }
  .video {
    height: 480px
  }
  .divider {
    padding: 20px 0;
  }
</style>