<template>
  <div class="app-container">
    <aside>
      The guide page is useful for some people who entered the project for the first time. You can briefly introduce the
      features of the project. Demo is based on
      <a href="https://github.com/kamranahmedse/driver.js" target="_blank">driver.js.</a>
    </aside>
    <el-button icon="el-icon-question" type="primary" @click.prevent.stop="guide">
      Show Guide
    </el-button>
  </div>
</template>

<script>
import {driver} from 'driver.js' // import driver.js
import 'driver.js/dist/driver.css' // import driver.js css
import steps from './steps'

export default {
  name: 'Guide',
  data() {
    return {
      driver: null
    }
  },
  mounted() {
    this.driver = driver({
      animate: true, // 在更改突出显示的元素时是否设置动画，
      // 当header的position为fixed时，会覆盖元素，这是driver.js的bug，
      // 详细内容见https://github.com/kamranahmedse/driver.js/issues/97
      overlayOpacity: 0.75, // 背景不透明度（0表示只有弹出窗口，没有覆盖）
      // doneBtnText: "完成", // 最后一个按钮上的文本
      // closeBtnText: "关闭", // 此步骤的“关闭”按钮上的文本
      // nextBtnText: "下一步", // 此步骤的下一步按钮文本
      // prevBtnText: "上一步", // 此步骤的上一个按钮文本
      steps: steps,
    });

  },
  methods: {
    guide() {
      // this.driver.defineSteps(steps)
      this.driver.drive()
    }
  }
}
</script>
