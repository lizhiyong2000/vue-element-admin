<template>
  <div class="app-container">
    <switch-roles @change="handleRolesChange" />
  </div>
</template>

<script>
import SwitchRoles from './components/SwitchRoles'
import {useRoute, useRouter} from 'vue-router'

export default {
  name: 'PagePermission',
  components: { SwitchRoles },
  setup() {
    const router = useRouter()  
    const route = useRoute()
    return {
      router,
      route,
    }
  },
  methods: {
    handleRolesChange() {
      this.router.push({ path: '/permission/index?' + +new Date() })
    }
  }
}
</script>
