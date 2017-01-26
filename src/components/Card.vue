<template>
  <md-layout class="card" md-flex-xsmall="100" md-flex-small="50" md-flex-medium="33" md-flex-large="25">
    <md-card class="card-ripple" md-with-hover>
      <md-ink-ripple />
      <md-card-media>
        <img :src="videoCover" :alt="lecture.title">
      </md-card-media>
      <md-card-header>
        <span class="md-subheading">{{ lecture.title }}</span>
      </md-card-header>
      <md-card-content>
        {{ lecture.desc }}
      </md-card-content>
      <a class="link" :href="/lecture/+lecture.id"></a>
    </md-card>
  </md-layout>
</template>

<script>
  export default {
    name: 'Card',

    props: [ 'lecture' ],

    computed: {
      videoCover: function () {
        return 'https://img.youtube.com/vi/' + this.lecture.video + '/0.jpg'
      }
    }
  }
</script>

<style scoped>
  .link {
    display: block;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
  .card {
    margin-bottom: 16px;
  }
</style>