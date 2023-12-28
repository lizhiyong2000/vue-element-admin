<template>
  <div class="json-editor">
    <textarea ref="textarea" />
  </div>
</template>

<script>

import { toRefs } from 'vue'


import CodeMirror from 'codemirror'
import 'codemirror/addon/lint/lint.css'
import 'codemirror/lib/codemirror.css'
import 'codemirror/theme/rubyblue.css'
// require('script-loader!jsonlint')

import jsonlint from 'jsonlint-mod';


new URL('script-loader!jsonlint/lib/jsonlint.js', import.meta.url).href;


import 'codemirror/mode/javascript/javascript'
import 'codemirror/addon/lint/lint'
import 'codemirror/addon/lint/json-lint'

window.jsonlint = jsonlint;

export default {
  name: 'JsonEditor',
  /* eslint-disable vue/require-prop-types */
  props: ['value'],
  setup(props){
    console.log('JsonEditor setup, props:%0', props)
      const {value} = toRefs(props)
      // const formatText = `Hi,${text.value}`
      return {
          value
      }
  },

  data() {
    return {
      jsonEditor: false
    }
  },
  watch: {
    value(value) {
      const editorValue = this.jsonEditor.getValue()
      if (value &&value !== editorValue ) {
        this.jsonEditor.setValue(JSON.stringify(value, null, 2))
      }
    }
  },
  mounted() {
    this.jsonEditor = CodeMirror.fromTextArea(this.$refs.textarea, {
      lineNumbers: true,
      mode: 'application/json',
      gutters: ['CodeMirror-lint-markers'],
      theme: 'rubyblue',
      lint: true
    })

    console.log('jsonEditor mounted, value:%0', this.value)
    if this.value{
      this.jsonEditor.setValue(JSON.stringify(this.value, null, 2))
    }
    
    this.jsonEditor.on('change', cm => {
      this.$emit('changed', cm.getValue())
      this.$emit('input', cm.getValue())
    })
  },
  methods: {
    getValue() {
      return this.jsonEditor.getValue()
    }
  }
}
</script>

<style lang="scss" scoped>
.json-editor {
  height: 100%;
  position: relative;

  ::v-deep {
    .CodeMirror {
      height: auto;
      min-height: 300px;
    }

    .CodeMirror-scroll {
      min-height: 300px;
    }

    .cm-s-rubyblue span.cm-string {
      color: #F08047;
    }
  }
}
</style>
