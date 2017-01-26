<template>
  <md-layout>
    <div class="loading" v-if="loading">
      <md-spinner md-indeterminate></md-spinner>
    </div>
    <div v-if="error" class="error">
      {{ error }}
    </div>
    <md-layout v-if="!access && !error" md-flex="100">
      <md-whiteframe class="question" md-elevation="2">
        <md-layout>
          <span class="md-title">Для начала тестирования введите данные</span>
        </md-layout>
        <form novalidate @submit.stop.prevent="submit" md-align="center">
          <md-input-container>
            <label>Ваше ФИО</label>
            <md-input v-model="username" type="string" required></md-input>
          </md-input-container>
          <md-button type="submit" class="md-primary">Пройти к тесту</md-button>
        </form>
      </md-whiteframe>
    </md-layout>
    
    <test-card
      v-if="access && !error"
      v-for="(test, index) in tests"
      :test="test"
      :i=index
      v-on:onSelect="addAnswer"
      :key="test.id">
    </test-card>
    <div v-if="access && error && !lecture" class="btn">
      <md-button @click="getResult" class="md-raised md-accent">Узнать результат</md-button>
    </div>

    <div v-if="access && !error && lecture" class="btn">
      <md-button :href="this.$route.path" class="md-raised">Пройти снова</md-button>
    </div>

    <md-snackbar md-position="top center" ref="snackbar" md-duration="10000">
      <span>Результаты по лекции "{{ this.lecture }}"</span>
      <span>Количество правильных ответов: {{ this.scores }} </span>
      <span>Количество неправильных ответов: {{ this.fails }}</span>
      <md-button class="md-accent" md-theme="light-blue" @click="$refs.snackbar.close()">Скрыть</md-button>
    </md-snackbar>

  </md-layout>
</template>

<script>
  import TestCard from './TestCard.vue'

  export default {
    name: 'Test',

    components: {
      'test-card': TestCard
    },

    data () {
      return {
        loading: false,
        error: null,
        tests: [],
        selects: [],
        access: false,
        username: null,
        scores: null,
        fails: null,
        lecture: null
      }
    },

    created () {
      this.getAccess()
    },

    methods: {
      getAccess () {
        this.access = false
        this.username = null
        let user = localStorage.getItem('username')
        if (user) {
          this.username = user
          this.access = true
          this.getLectureTest()
        }
      },
      submit () {
        if (this.username) {
          localStorage.setItem('username', this.username)
          console.log('Ваше ФИО:', this.username)
          this.getAccess()
        } else {
          console.log('Введите ФИО')
        }
      },
      getResult () {
        let to_send = {
          selects: this.selects,
          username: this.username
        }
        this.$http.post("api/result", to_send)
          .then(response => {
            console.log(response.body)
            this.scores = response.body.scores
            this.fails = response.body.fails
            this.lecture = response.body.lecture
            this.$refs.snackbar.open();
          })
      },
      getLectureTest () {
        this.error = null
        this.tests = []
        this.loading = true
        this.$http.get("api/tests/" + this.$route.params.id)
          .then(response => {
            this.tests = response.body
            this.loading = false
            this.tests.map(test => {
              this.selects.push({
                testId: test.id,
                selected: null
              })
            })
          }, response => {
            if (response.status == 404)
              this.error = "По этой лекции нет тестов"
              this.loading = false
          })
      },
      addAnswer: function(value) {
        this.selects.map(select => {
          if (select.testId == value.testId) {
            select.selected = value.selected_option
          }
        })
      }
    }
  }
</script>

<style>
  .loading {
    top: 10px;
    margin: auto;
  }
  .error {
    color: red;
  }
  .btn {
    margin: 0 auto;
  }
</style>