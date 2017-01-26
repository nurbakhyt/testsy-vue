<template>
  <md-layout md-flex="100">
    <md-whiteframe class="question" md-elevation="2">
      <div>
        <md-layout>
          <span class="md-title">{{ i + 1 + ". " + test.question }}</span>
        </md-layout>
        <md-layout>
          <ul class="test-options">
            <li>
              <md-radio
                v-if="this.test.a"
                v-model="selected"
                v-bind:id="'option-A' + i"
                md-value="a"
                class="md-primary">
                  {{ this.test.a }}
              </md-radio>
            </li>
            <li>
              <md-radio
                v-if="this.test.b"
                v-model="selected"
                v-bind:id="'option-B' + i"
                md-value="b"
                class="md-primary">
                  {{ this.test.b }}
              </md-radio>
            </li>
            <li>
              <md-radio
                v-if="this.test.c"
                v-model="selected"
                v-bind:id="'option-C' + i"
                md-value="c"
                class="md-primary">
                  {{ this.test.c }}
              </md-radio>
            </li>
            <li>
              <md-radio
                v-if="this.test.d"
                v-model="selected"
                v-bind:id="'option-D' + i"
                md-value="d"
                class="md-primary">
                  {{ this.test.d }}
              </md-radio>
            </li>
            <li>
              <md-radio
                v-if="this.test.e"
                v-model="selected"
                v-bind:id="'option-E' + i"
                md-value="e"
                class="md-primary">
                  {{ this.test.e }}
              </md-radio>
            </li>
          </ul>
        </md-layout>
      </div>
    </md-whiteframe>
  </md-layout>
</template>

<script>

  export default {
    name: 'TestCard',

    props: [ 'test', 'i' ],

    data () {
      return {
        selected: null
      }
    },

    watch: {
      selected: function() {
        this.$emit('onSelect', { testId: this.test.id, selected_option: this.selected })
      } 
    }
  }
</script>

<style>
  .question {
    padding: 16px 24px;
    width: 100%;
    margin-bottom: 16px;
  }
  .test-options {
    list-style: none;
  }
</style>