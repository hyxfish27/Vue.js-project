import { createApp } from 'https://cdnjs.cloudflare.com/ajax/libs/vue/3.2.27/vue.esm-browser.min.js';
import pagination from './pagination.js';
import product_modal from './product-modal.js'
import delete_modal from './delete-modal.js'

const url = 'https://vue3-course-api.hexschool.io/v2';
const path = 'hyxfish27';

// 取得Token
const token = document.cookie.replace(/(?:(?:^|.*;\s*)myToken\s*\=\s*([^;]*).*$)|^.*$/, "$1");
axios.defaults.headers.common['Authorization'] = token;

const app = createApp({
  components: {
    product_modal,
    delete_modal,
    pagination
  },
  data() {
    return {
      ready: false,
      isNew: true,
      productModal: "",
      delProductModal: "",
      products: [],
      tempProduct: {
        "imagesUrl": [
        ]
      },
      pagination: {}
    }
  },
  methods: {
    // Get product
    getProduct(page = 1) {
      axios
        .get(`${url}/api/${path}/admin/products?page=${page}`)
        .then(res => {
          this.products = res.data.products;
          this.pagination = res.data.pagination;
          this.ready = true;
        })
        .catch(err => {
          console.dir(err)
        })
    },
    // Remove product
    removeProduct() {
      this.ready = false;
      // console.log(this.tempProduct.id);
      axios
        .delete(`${url}/api/${path}/admin/product/${this.tempProduct.id}`)
        .then(res => {
          alert(res.data.message);
          this.getProduct();
        })
        .catch(err => {
          // console.dir(err);
          alert(err.data.message)
        })
      this.delProductModal.hide();
    },
    // check Admin
    checkAdmin() {
      axios
        .post(`${url}/api/user/check`)
        .then(res => {
          console.log(res)
          this.getProduct();
        })
        .catch(err => {
          alert(err.data.message);
          // console.dir(err)
          window.location = "index.html"
        })
    },
    // Modal Execution
    openModal(modal, product) {
      if (modal === 'delete') {
        this.tempProduct = { ...product };
        this.delProductModal.show();
      }
      else if (modal === 'edit') {
        this.isNew = false;
        this.tempProduct = { ...product };
        this.productModal.show();
      }
      else if (modal === 'new') {
        this.isNew = true;
        this.tempProduct = { imagesUrl: [] };
        this.productModal.show();
      }
    },
    // create Modals
    createModals() {
      this.productModal = new bootstrap.Modal(document.querySelector('#productModal'));
      this.delProductModal = new bootstrap.Modal(document.querySelector('#delProductModal'));
    },
  },
  mounted() {
    this.checkAdmin();
    this.createModals();
  },
})


app.mount('#app');