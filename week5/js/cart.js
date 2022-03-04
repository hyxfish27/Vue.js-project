import { createApp } from 'https://cdnjs.cloudflare.com/ajax/libs/vue/3.2.27/vue.esm-browser.min.js';

const url = 'https://vue3-course-api.hexschool.io/v2';
const path = 'hyxfish27';

const app = createApp({
    data() {
        return {
            cart: {},
            products: [],
            productId: ''
        }
    },
    methods: {
        getProducts() {
            axios
                .get(`${url}/api/${path}/products/all`)
                .then(res => {
                    this.products = res.data.products;
                })
                .catch(err => {
                    console.dir(err)
                })
        },
        openProductModal(id) {
            this.productId = id;
            // 按按鈕之後才發 AJAX 請求

            // 取得 product-modal 元件底下的 openModal 方法
            this.$refs.productModal.openModal();
        },

        // Cart Execution
        addToCart(product) {
            this.cart.push(product);

        },
        clearCart() {

        }
    },
    mounted() {
        this.getProducts();
    },
});


app.component('product-modal', {
    props: ['id'],
    template: '#userProductModal',
    data() {
        return {
            productModal: '',
            product: {}
        }
    },
    watch: {
        // id 改變時取得遠端資料
        id() {
            this.getProduct();
        }
    },
    methods: {
        openModal() {
            this.productModal.show();
        },
        getProduct() {
            axios
                .get(`${url}/api/${path}/product/${this.id}`)
                .then(res => {
                    // console.log(res);
                    this.product = res.data.product;
                })
                .catch(err => {
                    console.dir(err)
                })
        }
    },
    mounted() {
        // 初始化 Modal
        this.productModal = new bootstrap.Modal(this.$refs.modal);
    },
});

app.mount('#app');