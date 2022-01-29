import { createApp } from 'https://cdnjs.cloudflare.com/ajax/libs/vue/3.2.27/vue.esm-browser.min.js';
import modal_product from './modal-product.js';

const url = 'https://vue3-course-api.hexschool.io/v2';
const path = 'hyxfish27';

// 取得Token
const token = document.cookie.replace(/(?:(?:^|.*;\s*)myToken\s*\=\s*([^;]*).*$)|^.*$/, "$1");
axios.defaults.headers.common['Authorization'] = token;

const app = {
    data() {
        return {

        }
    },
    methods: {
        // Get product
        getProduct() {

        },
        // check Admin
        checkAdmin() {
            axios
                .post(`${url}/api/user/check`)
                .then(res => {
                    // console.log(res);
                    this.getProducts();
                })
                .catch(err => {
                    alert(err.data.message);
                    window.location = "index.html"
                })
        }
    },
    mounted() {
        this.checkAdmin();
    },
    component: {
        modal_product
    }
}