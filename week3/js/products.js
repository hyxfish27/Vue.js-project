import { createApp } from 'https://cdnjs.cloudflare.com/ajax/libs/vue/3.2.27/vue.esm-browser.min.js'

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
            }
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
                    alert(res.data.message);
                })
                .catch(err => {
                    // console.dir(err);
                    alert(err.data.message)
                })
            // console.log('add Product')
            this.getProducts();
            productModal.hide();
        },
        // 更新產品
        updateProduct() {
            this.ready = false;
            // console.log('update Product')
            axios
                .put(`${url}/api/${path}/admin/product/${this.tempProduct.id}`, { data: this.tempProduct })
                .then(res => {
                    alert(res.data.message);
                })
                .catch(err => {
                    console.dir(err);
                })
            productModal.hide();
            this.getProducts();
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
                    console.dir(err);
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
                    window.location = "index.html"
                })
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
                productModal.show();
            }
            else if (modal === 'new') {
                this.isNew = true;
                this.tempProduct = { imagesUrl: [] };
                productModal.show();
            }
        },
        createModals() {
            productModal = new bootstrap.Modal(document.querySelector('#productModal'));
            delProductModal = new bootstrap.Modal(document.querySelector('#delProductModal'));
        },

    },
    mounted() {
        this.checkLogin();
        this.createModals();
    },
}

createApp(app).mount('#app')