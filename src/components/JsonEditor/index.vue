<template>
  <div class="json-editor">
    <textarea ref="textarea" />
  </div>
</template>

<script>

import { toRefs } from 'vue'


import CodeMirror from 'vue-codemirror'
import { EditorView, basicSetup} from "codemirror";
import {EditorState, Compartment} from "@codemirror/state"
import {javascript} from "@codemirror/lang-javascript"
// import 'codemirror/addon/lint/lint.css'
// import 'codemirror/lib/codemirror.css'
// import 'codemirror/theme/rubyblue.css'
// require('script-loader!jsonlint')

// import jsonlint from 'jsonlint-mod';


// new URL('script-loader!jsonlint/lib/jsonlint.js', import.meta.url).href;


// import 'codemirror/mode/javascript/javascript'
// import 'codemirror/addon/lint/lint'
// import 'codemirror/addon/lint/json-lint'

// window.jsonlint = jsonlint;

function editorFromTextArea(textarea, extensions) {
  let view = new EditorView({ doc: textarea.value, extensions })
  textarea.parentNode.insertBefore(view.dom, textarea)
  textarea.style.display = "none"
  return view
}

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
      const editorValue = this.jsonEditor.state.doc.toString()
      if (value &&value !== editorValue ) {
        this.jsonEditor.state.doc = JSON.stringify(value, null, 2)
      }
    }
  },
  mounted() {
    let language = new Compartment, tabSize = new Compartment
    let extensions =  [
        basicSetup,
        language.of(javascript()),
        tabSize.of(EditorState.tabSize.of(8))
      ]

    this.jsonEditor = editorFromTextArea(this.$refs.textarea, extensions)

    console.log('jsonEditor mounted, value:%0', this.value)
    if(this.value){
      this.jsonEditor.dispatch({
        changes: {from: 0, to: this.jsonEditor.state.doc.length, insert: JSON.stringify(this.value, null, 2)}
      })
      // this.jsonEditor.state.doc = JSON.stringify(this.value, null, 2)
    }

    // this.jsonEditor.on('change', cm => {
    //   this.$emit('changed', cm.state.doc.toString())
    //   this.$emit('input', cm.state.doc.toString())
    // })
  },
  methods: {
    getValue() {
      return this.jsonEditor.state.doc.toString()
    }
  }
}
</script>

<style lang="scss" scoped>
.json-editor {
  height: 100%;
  position: relative;

  :deep(.CodeMirror ){
    height: auto;
    min-height: 300px;
  }
  :deep(.CodeMirror-scroll){
    min-height: 300px;
  }
  :deep(.cm-s-rubyblue span.cm-string){
    color: #F08047;
  }

}
</style>
