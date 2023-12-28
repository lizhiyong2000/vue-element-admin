<script>
import {useRoute, useRouter} from 'vue-router'

export default {
  setup() {
    const router = useRouter()  
    const route = useRoute()
    return {
      router,
      route,
    }
  },
  created() {
    const { params, query } = this.$route
    const { path } = params
    this.router.replace({ path: '/' + path, query })
  },
  render: function(h) {
    return h() // avoid warning message
  }
}
</script>
