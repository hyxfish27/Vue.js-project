import { createApp } from 'https://cdnjs.cloudflare.com/ajax/libs/vue/3.2.27/vue.esm-browser.min.js'

const url = 'https://vue3-course-api.hexschool.io/v2';
const path = 'hyxfish27';

const app = {
    data() {
        return {
            newProduct: [{
                data: {
                    title: '男性潮流襯衫',
                    category: '衣服2',
                    origin_price: 1000,
                    price: 750,
                    unit: '個',
                    description: 'Sit down please 名設計師設計',
                    content: '這是內容',
                    is_enabled: 1,
                    imageUrl: 'https://images.unsplash.com/photo-1573662012516-5cb4399006e7?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1267&q=80'
                }
            },
            {
                data: {
                    title: '冬季日系古著',
                    category: '衣服2',
                    origin_price: 600,
                    price: 450,
                    unit: '個',
                    description: 'Sit down please 名設計師設計',
                    content: '這是內容',
                    is_enabled: 1,
                    imageUrl: 'https://images.unsplash.com/photo-1573662012516-5cb4399006e7?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1267&q=80'
                }
            },
            {
                data: {
                    title: '動物園造型衣服',
                    category: '衣服2',
                    origin_price: 300,
                    price: 250,
                    unit: '個',
                    description: 'Sit down please 名設計師設計',
                    content: '這是內容',
                    is_enabled: 1,
                    imageUrl: 'https://images.unsplash.com/photo-1573662012516-5cb4399006e7?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1267&q=80'
                }
            },
            ],
            ready: false,
            products: [],
        }
    },
    methods: {
        // 取得產品
        getProducts() {
            this.ready = false;;
            axios.get(`${url}/api/${path}/admin/products`)
                .then((res) => {
                    this.products = res.data.products;
                    this.ready = true;
                })
                .catch((err) => {
                    console.dir(err);
                    // 取得產品失敗訊息
                    Swal.fire({
                        title: err.data.message,
                        text: err.data.error.code,
                        icon: 'error',
                        confirmButtonText: 'OK'
                    })
                })
        },
        // 隨機新增產品
        addProduct() {
            let random = parseInt(Math.random() * 3);
            axios.post(`${url}/api/${path}/admin/product`, this.newProduct[random])
                .then((res) => {
                    Swal.fire({
                        icon: 'success',
                        title: res.data.message,
                        text: '產品已上傳至資料庫',
                        showConfirmButton: false,
                        timer: 1200
                    })
                    this.getProducts();
                })
                .catch((err) => {
                    console.dir(err);
                })
        },
        // 移除產品
        removeProduct(id) {
            // console.log(id);
            Swal.fire({
                title: 'Are you sure?',
                text: "確定要刪?????",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: '刪，都刪',
                cancelButtonText: 'No，我反悔了'
            }).then((res) => {
                if (res.isConfirmed) {
                    return axios.delete(`${url}/api/${path}/admin/product/${id}`)
                        .then((res) => {
                            // console.log(res.data.message);
                            Swal.fire(
                                '刪得不錯!',
                                res.data.message,
                                'success'
                            ).then(res => {
                                this.getProducts();
                            })
                        })
                        .catch((err) => {
                            console.dir(err.data.message);
                        })
                }
            })
        },
        // 登出按鈕觸發事件
        logout() {
            Swal.fire({
                title: 'Are you sure?',
                text: "確定要登出?????",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#d33',
                cancelButtonColor: '#3085d6',
                confirmButtonText: '登，都登',
                cancelButtonText: '先不要'
            })
                // 確認登出
                .then((res) => {
                    if (res.isConfirmed) {
                        return axios.post(`${url}/logout`)
                            // 登出成功訊息
                            .then(res => {
                                Swal.fire({
                                    title: '登出了喔!',
                                    text: res.data.message,
                                    icon: 'success',
                                    confirmButtonText: 'OK'
                                })
                                    // 跳轉頁面
                                    .then(res => {
                                        window.location = "login.html";
                                    })
                            })
                            .catch(err => {
                                console.dir(err);
                            })
                    }
                })
                .catch((err) => {
                    console.dir(err.data.message);
                })
        },
        // 檢查登入狀態
        checkLogin() {
            const token = document.cookie.replace(/(?:(?:^|.*;\s*)myToken\s*\=\s*([^;]*).*$)|^.*$/, "$1");
            axios.defaults.headers.common['Authorization'] = token;

            axios.post(`${url}/api/user/check`)
                .then((res) => {
                    if (res.data.success) {
                        this.getProducts();
                    }
                })
                // 取得token失敗
                .catch((err) => {
                    console.dir(err.data.message);
                    Swal.fire({
                        title: err.data.message,
                        text: "將為您重新導至登入頁",
                        icon: 'error',
                        confirmButtonText: '好的'
                    })
                        // 移至登入頁面
                        .then((res) => {
                            if (res.isConfirmed) {
                                window.location = "login.html";
                            }
                        })
                        .then((res => {
                            Swal.fire({
                                title: '已登出',
                                text: res.data.message,
                                icon: 'success',
                                confirmButtonText: 'OK'
                            })
                        }))
                        .catch(err => {
                            console.dir(err)
                        })
                })
        },
    },
    mounted() {
        this.checkLogin();
    }
}

createApp(app).mount('#app');