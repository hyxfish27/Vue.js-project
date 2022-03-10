<template>
  <div class="container">
    <ProductModal
      :id="productId"
      ref="productModal"
      @add-to-cart="addToCart"
    ></ProductModal>
    <h3 class="h3 text-center mt-4">產品列表</h3>
    <table class="table align-middle">
      <thead>
        <tr>
          <th>圖片</th>
          <th>商品名稱</th>
          <th>價格</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="product in products" :key="product.id">
          <td style="width: 200px">
            <div
              :style="{ backgroundImage: `url(${product.imageUrl})` }"
              style="
                  height: 100px;
                  background-size: cover;
                  background-position: center"
            ></div>
          </td>
          <td>
            {{ product.title }}
          </td>
          <td>
            <div class="h5" v-if="product.price === product.origin_price">
              {{ product.price }} 元
            </div>
            <div v-else>
              <del class="h6">原價 {{ product.origin_price }} 元</del>
              <div class="h5">現在只要 {{ product.price }} 元</div>
            </div>
          </td>
          <td>
            <div class="btn-group btn-group-sm">
              <button
                type="button"
                class="btn btn-outline-secondary"
                @click="openProductModal(product.id)"
                :disabled="isLoading === product.id"
              >
                <!-- <i class="fas fa-spinner fa-pulse"></i> -->
                查看更多
              </button>
              <button
                type="button"
                class="btn btn-outline-danger"
                @click="addToCart(product.id)"
                :disabled="isLoading === product.id"
              >
                <i
                  class="fas fa-spinner fa-pulse"
                  v-show="isLoading === product.id"
                ></i>
                加到購物車
              </button>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import ProductModal from '@/components/ProductModal.vue'
export default {
  data () {
    return {
      products: [],
      productId: '',
      isLoading: ''
    }
  },
  components: {
    ProductModal
  },
  methods: {
    getProducts () {
      const url = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/products/all`
      this.$http
        .get(url)
        .then(res => {
          this.products = res.data.products
        })
        .catch(err => {
          alert(err.data.message)
        })
    },
    addToCart (id, qty = 1) {
      const url = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/cart`
      this.isLoading = id
      const cart = {
        product_id: id,
        qty
      }
      this.$http
        .post(url, { data: cart })
        .then(res => {
          // console.log(res)
          alert(res.data.message)
          this.isLoading = ''
        })
        .catch(err => {
          alert(err.data.message)
        })
    },
    openProductModal (id) {
      // 外層資料 -> 內層
      this.productId = id
      // 調用 ProductModal 元件底下的 openModal() 方法
      this.$refs.productModal.openModal()
    }
  },
  mounted () {
    this.getProducts()
  }
}
</script>
