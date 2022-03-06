// import { createApp } from 'https://cdnjs.cloudflare.com/ajax/libs/vue/3.2.27/vue.esm-browser.min.js';

const url = 'https://vue3-course-api.hexschool.io/v2';
const path = 'hyxfish27';

const { defineRule, Form, Field, ErrorMessage, configure } = VeeValidate; // 驗證
const { required, email, min, max } = VeeValidateRules; // 規則
const { localize, loadLocaleFromURL } = VeeValidateI18n; // 語系

// 定義驗證規則
defineRule('required', required);
defineRule('email', email);
defineRule('min', min);
defineRule('max', max);

// 讀取外部的資源
loadLocaleFromURL('https://unpkg.com/@vee-validate/i18n@4.1.0/dist/locale/zh_TW.json');

// Activate the locale
configure({
    generateMessage: localize('zh_TW'),
    validateOnInput: true, // 調整為：輸入文字時，就立即進行驗證
});

const app = Vue.createApp({
    data() {
        return {
            cartData: {},
            products: [],
            productId: '',
            isLoading: '',
            form: {
                user: {
                    name: '',
                    email: '',
                    tel: '',
                    address: '',
                },
                message: ''
            },
            code: ''
        }
    },
    // Vee-validate做區域註冊
    components: {
        VForm: Form,
        VField: Field,
        ErrorMessage: ErrorMessage,
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
        getCart() {
            axios
                .get(`${url}/api/${path}/cart`)
                .then(res => {
                    // console.log(res)
                    this.cartData = res.data.data;
                })
                .catch(err => {
                    console.dir(err)
                })
        },
        // Add New Item to Cart
        addToCart(id, qty = 1) {
            this.isLoading = id;
            const data = {
                product_id: id,
                qty
            }
            axios
                .post(`${url}/api/${path}/cart/`, { data })
                .then(res => {
                    console.log(res)
                    alert(res.data.message);
                    this.getCart();
                    this.isLoading = '';
                })
                .catch(err => {
                    console.dir(err)
                })
        },
        // Remove Cart
        removeCartItem(id) {
            this.isLoading = id;
            axios
                .delete(`${url}/api/${path}/cart/${id}`)
                .then(res => {
                    // console.log(res)
                    alert(res.data.message);
                    this.getCart();
                    this.isLoading = '';
                })
                .catch(err => {
                    console.dir(err)
                })
        },
        updateCartItem(id) {
            axios
                .put(`${url}/api/${path}/cart/${id}`)
                .then(res => {
                    // console.log(res)
                    alert(res.data.message);
                    this.getCart();
                    this.isLoading = '';
                })
                .catch(err => {
                    console.dir(err)
                })
        },
        // Clear All Cart Items
        clearAllCart() {
            this.isLoading = 'clear';
            axios
                .delete(`${url}/api/${path}/carts`)
                .then(res => {
                    // console.log(res)
                    alert(res.data.message);
                    this.getCart();
                    this.isLoading = '';
                })
                .catch(err => {
                    console.dir(err)
                })
        },
        // Use coupon and update final_total
        useCoupon() {
            const code = this.code;
            axios
                .post(`${url}/api/${path}/coupon`, { data: { code } })
                .then(res => {
                    console.log(res)
                    alert(res.data.message);
                    this.getCart();
                })
                .catch(err => {
                    console.dir(err)
                })
        },
        isPhone(value) {
            const phoneNumber = /^(09)[0-9]{8}$/
            return phoneNumber.test(value) ? true : '需要正確的電話號碼'
        },
        createOrder() {
            const order = this.form
            axios
                .post(`${url}/api/${path}/order`, { data: order })
                .then(res => {
                    console.log(res)
                    alert(res.data.message);
                })
                .catch(err => {
                    console.dir(err)
                })
        }
    },
    mounted() {
        this.getProducts();
        this.getCart();
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