<template>
  <md-layout md-align="center">
    <div v-if="loading" class="loading">
      <md-spinner md-indeterminate></md-spinner>  
    </div>
    <div v-if="error" class="error">
      {{ error }}
    </div>
    <md-table>
      <md-table-header>
        <md-table-row>
          <md-table-head>#</md-table-head>
          <md-table-head >ФИО</md-table-head>
          <md-table-head>Лекция</md-table-head>
          <md-table-head md-numeric>Прав. отв.</md-table-head>
          <md-table-head md-numeric>Неправ. отв.</md-table-head>
        </md-table-row>
      </md-table-header>
      <md-table-body>
        <md-table-row v-for="result in results">
          <md-table-cell>{{ result.id }}</md-table-cell>
          <md-table-cell>{{ result.username }}</md-table-cell>
          <md-table-cell>{{ lecture }}</md-table-cell>
          <md-table-cell>{{ result.scores }}</md-table-cell>
          <md-table-cell>{{ result.fails }}</md-table-cell>
        </md-table-row>
      </md-table-body>
    </md-table>
  </md-layout>
</template>

<script>
  export default {
    data () {
      return {
        loading: false,
        results: [],
        lecture: null,
        error: null,
      }
    },

    created () {
      this.getResults()
    },

    methods: {
      getResults () {
        this.error = null
        this.results = []
        this.loading = true
        this.$http.get("api/results")
          .then(response => {
            this.results = response.body.results
            this.lecture = response.body.lecture
            this.loading = false
          }, response => {
            if (response.status == 404)
              this.error = "Нет результатов"
              this.loading = false
          })
      }
    }
  }
</script>

<style>
  
</style>