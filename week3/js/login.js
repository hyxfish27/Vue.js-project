import { createApp } from 'https://cdnjs.cloudflare.com/ajax/libs/vue/3.2.27/vue.esm-browser.min.js'

const url = 'https://vue3-course-api.hexschool.io/v2';
const path = 'hyxfish27';

const app = {
    data() {
        return {
            user: {
                username: "",
                password: ""
            }
        }
    },
    methods: {
        login() {
            axios
                .post(`${url}/admin/signin`, this.user)
                .then(res => {
                    // console.log(res);
                    let { token, expired } = res.data;
                    document.cookie = `myToken = ${token}; 
          expires = ${new Date(expired)}`;
                    window.location = "product.html"
                })
                .catch(err => {
                    console.dir(err);
                })
        }
    },
    mounted() {

    },
}

createApp(app).mount('#app');