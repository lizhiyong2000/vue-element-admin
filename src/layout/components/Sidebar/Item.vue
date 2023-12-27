<script lang="jsx">

import { h, ref } from "vue";

export default {
  name: 'MenuItem',
  functional: true,
  props: {
    icon: {
      type: String,
      default: ''
    },
    title: {
      type: String,
      default: ''
    }
  },

  setup(props, context) {
    // const age = ref(123);
    return () =>{
       const { icon, title } = props
      //  console.log(`icon in setup:%0, title:%0`, icon, title)
       const vnodes = []

      if (icon) {
        if (icon.includes('el-icon')) {
          vnodes.push(<i class={[icon, 'sub-el-icon']} />)
        } else {
          vnodes.push(<svg-icon icon-class={icon}/>)
        }
      }

      if (title) {
        vnodes.push(<span slot='title'>{(title)}</span>)
      }
      return vnodes
    }
      // h(
      //   "h1", // 标签名称
      //   age // 标签内容
      // );

  },


  render() {
    const { icon, title } = props
    const vnodes = []

    if (icon) {
      if (icon.includes('el-icon')) {
        vnodes.push(<i class={[icon, 'sub-el-icon']} />)
      } else {
        vnodes.push(<svg-icon icon-class={icon}/>)
      }
    }

    if (title) {
      vnodes.push(<span slot='title'>{(title)}</span>)
    }
    return vnodes
  }
}
</script>

<style scoped>
.sub-el-icon {
  color: currentColor;
  width: 1em;
  height: 1em;
}
</style>
