import { createApp } from 'https://cdnjs.cloudflare.com/ajax/libs/vue/3.2.27/vue.esm-browser.min.js'
import { debounce } from 'https://cdn.jsdelivr.net/npm/@esm-bundle/lodash@4.17.21/esm/index.js';

const url = 'https://vue3-course-api.hexschool.io/v2';
const path = 'hyxfish27';

// 取得Token
const token = document.cookie.replace(/(?:(?:^|.*;\s*)myToken\s*\=\s*([^;]*).*$)|^.*$/, "$1");
axios.defaults.headers.common['Authorization'] = token;

let productModal, delProductModal = "";

const app = {
    data() {
        return {
            ready: false,
            isNew: true,
            modal: "",
            products: [],
            tempProduct: {
                "imagesUrl": [
                ]
            },
            tempImageUrl: ""
        }
    },
    methods: {
        // 取得產品
        getProducts() {
            axios
                .get(`${url}/api/${path}/admin/products/all`)
                .then(res => {
                    this.products = res.data.products;
                    this.ready = true;
                })
                .catch(err => {
                    console.dir(err)
                })
        },
        // 新增產品
        addProduct() {
            this.ready = false;
            axios
                .post(`${url}/api/${path}/admin/product`, { data: this.tempProduct })
                .then(res => {
                    this.getProducts();
                    alert(res.data.message);
                })
                .catch(err => {
                    // console.dir(err);
                    alert(err.data.message)
                })
            productModal.hide();
        },
        // 更新產品
        updateProduct() {
            this.ready = false;
            axios
                .put(`${url}/api/${path}/admin/product/${this.tempProduct.id}`, { data: this.tempProduct })
                .then(res => {
                    this.getProducts();
                    alert(res.data.message);
                })
                .catch(err => {
                    // console.dir(err);
                    alert(err.data.message)
                })
            productModal.hide();
        },
        // 移除產品
        removeProduct() {
            this.ready = false;
            // console.log(this.tempProduct.id);
            axios
                .delete(`${url}/api/${path}/admin/product/${this.tempProduct.id}`)
                .then(res => {
                    alert(res.data.message);
                    this.getProducts();
                })
                .catch(err => {
                    // console.dir(err);
                    alert(err.data.message)
                })
            delProductModal.hide();

        },
        // 檢查登入狀態
        checkLogin() {
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
        },
        // initial imagesUrl Array
        initialImgArray() {
            // console.log(Array.isArray(this.tempProduct.imagesUrl)) 
            // false則進行初始化
            this.tempProduct.imagesUrl = [];
            this.tempProduct.imagesUrl.push('');

        },
        // Modal Execution
        openModal(modal, product) {
            if (modal === 'delete') {
                this.tempProduct = { ...product };
                delProductModal.show();
            }
            else if (modal === 'edit') {
                this.isNew = false;
                this.tempProduct = { ...product };
                this.tempImageUrl = "";
                productModal.show();
            }
            else if (modal === 'new') {
                this.isNew = true;
                this.tempProduct = { imagesUrl: [] };
                this.tempImageUrl = "";
                productModal.show();
            }
        },
        createModals() {
            productModal = new bootstrap.Modal(document.querySelector('#productModal'));
            delProductModal = new bootstrap.Modal(document.querySelector('#delProductModal'));
        },

    },
    watch: {
        // 使用debounce監聽tempProduct下的imageUrl，1000ms後才會v-bind至<img>，避免網址爆掉
        'tempProduct.imageUrl': debounce(function () {
            this.tempImageUrl = this.tempProduct.imageUrl;
        }, 500)
    },
    mounted() {
        this.checkLogin();
        this.createModals();
    },
}

createApp(app).mount('#app')