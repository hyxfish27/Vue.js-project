import { createApp } from "https://cdnjs.cloudflare.com/ajax/libs/vue/3.2.27/vue.esm-browser.min.js";

const url = "https://vue3-course-api.hexschool.io/v2";
const path = "hyxfish27";

const app = {
  data() {
    return {
      user: {
        username: "",
        password: "",
      },
    };
  },
  methods: {
    login() {
      // console.log(this.user);
      axios.post(`${url}/admin/signin`, this.user)
        // succesful
        .then((res) => {
          let { token, expired } = res.data;
          document.cookie = `myToken = ${token}; 
          expires = ${new Date(expired)}`;

          // 登入成功訊息
          Swal.fire({
            icon: 'success',
            title: '登入成功',
            text: '將導入產品頁面...',
            showCancelButton: true,
            confirmButtonText: '前往商品頁',
          }).then((res) => {
            if (res.isConfirmed) {
              window.location = "products.html";
            } else {
              window.location = "login.html";
            }
          }).catch((err) => {
            console.dir(err)
          })
        })
        // failed
        .catch((err) => {
          // console.dir(err);
          // alert(err.data.message + err.data.error.code);

          // 登入失敗訊息
          Swal.fire({
            title: err.data.message,
            text: err.data.error.code,
            icon: 'error',
            confirmButtonText: 'Try Again'
          }).then((res) => {
            if (res.isConfirmed) {
              this.user.password = "";
            }
          }).catch((err) => {
            console.dir(err)
          })
        });
    },
  },
  mounted() { },
};

createApp(app).mount("#app");
