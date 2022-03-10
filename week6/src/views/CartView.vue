<template>
  <div class="container">
    <h3 class="h3 text-center mt-4">購物車</h3>
    <div class="text-end">
      <button
        class="btn btn-outline-danger"
        :disabled="isLoading !== ''"
        type="button"
        @click="clearAllCart"
      >
        清空購物車
      </button>
    </div>
    <table class="table align-middle">
      <thead>
        <tr>
          <th></th>
          <th>品名</th>
          <th style="width: 150px">數量/單位</th>
          <th>單價</th>
        </tr>
      </thead>
      <tbody>
        <template v-if="cartData.carts">
          <tr v-for="cart in cartData.carts" :key="cart.id">
            <td>
              <button
                type="button"
                class="btn btn-outline-danger btn-sm"
                :disabled="isLoading === cart.id"
                @click="removeCartItem(cart.id)"
              >
                <i
                  class="fas fa-spinner fa-pulse"
                  v-show="isLoading === cart.id"
                ></i>
                x
              </button>
            </td>
            <td>
              {{ cart.product.title }}
              <div class="text-success" v-if="cart.final_total !== cart.total">
                已套用優惠券
              </div>
            </td>
            <td>
              <div class="input-group input-group-sm">
                <div class="input-group mb-3">
                  <!-- <input min="1" type="number" class="form-control" :value="cart.qty"> -->
                  <!-- 不要相信使用者->用選的就不會出錯 -->
                  <select
                    id="cartNum"
                    class="form-select"
                    v-model="cart.qty"
                    :disabled="isLoading === cart.id"
                    @change="updateCartItem(cart)"
                  >
                    <option
                      :value="num"
                      v-for="num in 20"
                      :key="`${num}${cart.id}`"
                      >{{ num }}
                    </option>
                  </select>
                  <span class="input-group-text" id="basic-addon2">{{
                    cart.product.unit
                  }}</span>
                </div>
              </div>
            </td>
            <td class="text-end">
              <div class="row justify-content-center">
                <div class="col-md-6" v-if="cart.final_total !== cart.total">
                  <del>原價 : {{ cart.total }}</del>
                </div>
                <div class="col-md-6 text-center">
                  <small
                    class="text-success"
                    v-if="cart.final_total !== cart.total"
                    >折扣價：</small
                  >
                  {{ cart.final_total }}
                </div>
              </div>
            </td>
          </tr>
        </template>
      </tbody>
      <tfoot>
        <tr>
          <td colspan="3" class="text-end">總計</td>
          <td class="text-end">{{ cartData.total }}</td>
        </tr>
        <tr v-if="cartData.final_total !== cartData.total">
          <td colspan="3" class="text-end text-success">折扣價</td>
          <td class="text-end text-success">{{ cartData.final_total }}</td>
        </tr>
      </tfoot>
    </table>
    <div class="row justify-content-center">
      <p class="h5 text-danger col-md-12 col-sm-6">大大大優惠!!</p>
      <p class="h6 col-md-12 col-sm-6 mb-5">
        輸入折扣碼 <b class="text-success">big777</b> 即可享有77折優惠
      </p>
    </div>

    <div class="row input-group">
      <label for="codeInput" class="col-md-3 form-label text-center"
        >折扣碼</label
      >
      <input
        type="text"
        class="col-md-3 mb-3 form-control"
        id="codeInput"
        v-model="code"
      />
      <button
        type="button"
        class="col-md-3 mb-3 btn btn-outline-success"
        @click="useCoupon"
      >
        使用折扣碼
      </button>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      code: '',
      isLoading: '',
      qty: 1,
      cartData: []
    }
  },
  methods: {
    getCart () {
      const url = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/cart`
      this.$http
        .get(url)
        .then(res => {
          // console.log(res)
          this.cartData = res.data.data
        })
        .catch(err => {
          alert(err.data.message)
        })
    },
    updateCartItem (cart) {
      const url = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/cart/${cart.id}`
      const update = {
        product_id: cart.id,
        qty: cart.qty
      }
      this.$http
        .put(url, { data: update })
        .then(res => {
          alert(res.data.message)
          this.getCart()
        })
        .catch(err => {
          alert(err.data.message)
        })
    },
    removeCartItem (cartID) {
      const url = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/cart/${cartID}`
      this.isLoading = cartID
      this.$http
        .delete(url)
        .then(res => {
          // console.log(res)
          alert(res.data.message)
          this.getCart()
          this.isLoading = ''
        })
        .catch(err => {
          alert(err.data.message)
        })
    },
    clearAllCart () {
      const url = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/carts`
      this.isLoading = 'clear'
      this.$http
        .delete(url)
        .then(res => {
          alert(res.data.message)
          this.getCart()
          this.isLoading = ''
        })
        .catch(err => {
          alert(err.data.message)
        })
    },
    useCoupon () {
      const code = this.code
      const url = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/coupon`
      this.$http
        .post(url, { data: { code } })
        .then(res => {
          alert(res.data.message)
          this.getCart()
        })
        .catch(err => {
          alert(err.data.message)
        })
    }
  },
  mounted () {
    this.getCart()
  }
}
</script>
