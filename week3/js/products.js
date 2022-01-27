import { createApp } from 'https://cdnjs.cloudflare.com/ajax/libs/vue/3.2.27/vue.esm-browser.min.js'

const url = 'https://vue3-course-api.hexschool.io/v2';
const path = 'hyxfish27';

let productModal, delProductModal = "";

const app = {
    data() {
        return {
            ready: false,
            isNew: true,
            modal: "",
            products: [],
            newProduct: {
                "data": {
                    "title": "測試商品",
                    "category": "測試",
                    "origin_price": 99999,
                    "price": 999,
                    "unit": "個",
                    "description": "測試內容",
                    "content": "測試",
                    "is_enabled": 1,
                    "imageUrl": "主圖網址",
                    "imagesUrl": [
                        "圖片網址一",
                        "圖片網址二",
                        "圖片網址三",
                        "圖片網址四",
                        "圖片網址五"
                    ]
                }
            }
        }
    },
    methods: {
        // 取得產品
        getProducts() {
            axios
                .get(`${url}/api/${path}/admin/products/all`)
                .then(res => {
                    // console.log(res.data.products)
                    this.products = res.data.products;
                    // console.log(this.products)
                })
                .catch(err => {
                    console.dir(err)
                })
        },
        // 新增產品
        addProduct() {
            productModal.show();
        },
        // 編輯產品
        editProduct() {

        },
        // 移除產品
        removeProduct(id) {
            console.log(id);
            delProductModal.show();
            // axios
            //     .delete(`${url}/api/${path}/admin/product/${id}`)
            //     .then(res => {
            //         console.log(res.data)
            //         this.getProducts();
            //     })
            //     .catch(err => {
            //         console.dir(err);
            //     })

        },
        // 檢查登入狀態
        checkLogin() {
            const token = document.cookie.replace(/(?:(?:^|.*;\s*)myToken\s*\=\s*([^;]*).*$)|^.*$/, "$1");
            axios.defaults.headers.common['Authorization'] = token;

            axios
                .post(`${url}/api/user/check`)
                .then(res => {
                    // console.log(res);
                    this.getProducts();
                })
                .catch(err => {

                })
        },
        createModals() {
            productModal = new bootstrap.Modal(document.querySelector('#productModal'));
            delProductModal = new bootstrap.Modal(document.querySelector('#delProductModal'));
        },
        openModal(modal) {
            if (modal === 'delete') {
                console.log('delete');
            }
            else if (modal === 'edit') {
                console.log('edit');
            }
            else if (modal === 'new') {
                console.log('new');
            }
        }

    },
    mounted() {
        this.checkLogin();
        this.createModals();
    },
}

createApp(app).mount('#app')