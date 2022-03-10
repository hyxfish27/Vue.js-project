<template>
  <div>
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
      <div class="container-fluid">
        <router-link class="navbar-brand" to="/admin">後台首頁</router-link>
        <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNavAltMarkup"
          aria-controls="navbarNavAltMarkup"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
          <div class="navbar-nav">
            <router-link class="nav-link" to="/">回到前台</router-link>
            <router-link class="nav-link" to="/admin/products">
              後台產品列表
            </router-link>
            <router-link class="nav-link" to="/admin/order">
              後台訂單管理
            </router-link>
          </div>
          <button class="btn btn-danger my-2" type="button" @click="logout">
            登出
          </button>
        </div>
      </div>
    </nav>
    <h2 class="text-center mt-4">這裡是後台</h2>
    <router-view v-if="adminStatus"></router-view>
  </div>
</template>

<script>
export default {
  data () {
    return {
      adminStatus: false
    }
  },
  methods: {
    checkAdmin () {
      const token = document.cookie.replace(
        /(?:(?:^|.*;\s*)myToken\s*=\s*([^;]*).*$)|^.*$/,
        '$1'
      )
      // token 存在，存取登入權限
      if (token) {
        this.$http.defaults.headers.common.Authorization = `${token}`

        const url = `${process.env.VUE_APP_API}/api/user/check`
        this.$http
          .post(url)
          .then(() => {
            this.adminStatus = true
          })
          .catch(err => {
            alert(err.data.message)
            this.$router.replace('/login')
          })
      } else {
        alert('請重新登入 > <')
        this.$router.push('/login')
      }
    },
    logout () {
      const url = `${process.env.VUE_APP_API}/logout`
      this.$http.post(url).then(res => {
        if (res.data.success) {
          document.cookie = 'myToken=;expires=;'
          alert('已成功登出')
          this.$router.replace('/')
        }
      })
    }
  },
  mounted () {
    this.checkAdmin()
  }
}
</script>
