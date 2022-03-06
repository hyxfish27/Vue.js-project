import { createApp } from 'https://cdnjs.cloudflare.com/ajax/libs/vue/3.2.27/vue.esm-browser.min.js';

const apiUrl = 'https://vue3-course-api.hexschool.io/v2';
const apiPath = 'hyxfish27';

// {
//     "data": {
//       "title": "超級特惠價格",
//       "is_enabled": 1,
//       "percent": 80,
//       "due_date": 1555459200,
//       "code": "testCode"
//     }
//   }

const app = createApp({
    data() {
        return {
            coupon: {
                title: '',
                is_enabled: 1,
                percent: '',
                due_date: 1555459200,
                code: ''
            }
        }
    },
    methods: {
        uploadCoupon() {
            const time = new Date().getTime() + 30 * 24 * 60 * 60;
            this.coupon.due_date = time;
            const url = `${apiUrl}/api/${apiPath}/admin/coupon`;
            const data = this.coupon;
            axios
                .post(url, { data })
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
        // 取得Token
        const token = document.cookie.replace(/(?:(?:^|.*;\s*)myToken\s*\=\s*([^;]*).*$)|^.*$/, "$1");
        axios.defaults.headers.common['Authorization'] = token;

    },
});

app.mount('#app');