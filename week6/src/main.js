// 需要在整個專案載入的套件寫在這裡
import { createApp } from 'vue'
import 'bootstrap'
import axios from 'axios'
import VueAxios from 'vue-axios'
import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(router)
app.use(VueAxios, axios)
app.mount('#app')
