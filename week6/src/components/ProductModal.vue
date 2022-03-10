<template>
  <div class="container">
    <div
      class="modal fade"
      id="productModal"
      tabindex="-1"
      role="dialog"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
      ref="modal"
    >
      <div class="modal-dialog modal-xl" role="document">
        <div class="modal-content border-0">
          <div class="modal-header bg-dark text-white">
            <h5 class="modal-title" id="exampleModalLabel">
              <span>{{ product.title }}</span>
            </h5>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body">
            <div class="row">
              <div class="col-sm-6">
                <img
                  class="img-fluid"
                  :src="product.imageUrl"
                  :alt="product.title"
                />
              </div>
              <div class="col-sm-6">
                <span class="badge bg-primary rounded-pill">{{
                  product.category
                }}</span>
                <p>商品描述：{{ product.description }}</p>
                <p>商品內容：{{ product.content }}</p>
                <div class="h5" v-if="product.origin_price === product.price">
                  {{ product.price }} 元
                </div>
                <div v-else>
                  <del class="h6">原價 {{ product.origin_price }} 元</del>
                  <div class="h5">現在只要 {{ product.price }} 元</div>
                </div>
                <div>
                  <div class="input-group">
                    <select
                      id="itemNum"
                      class="form-select"
                      v-model="qty"
                      min="1"
                    >
                      <option :value="num" v-for="num in 20" :key="`${num}`"
                        >{{ num }}
                      </option>
                    </select>
                    <button
                      type="button"
                      class="btn btn-primary"
                      @click="addToCart"
                    >
                      加入購物車
                    </button>
                  </div>
                </div>
              </div>
              <!-- col-sm-6 end -->
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Modal from 'bootstrap/js/dist/modal'

export default {
  props: ['id'],
  data () {
    return {
      productModal: '',
      product: {},
      qty: 1
    }
  },
  watch: {
    id () {
      this.getProduct()
    }
  },
  methods: {
    getProduct () {
      const url = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/product/${this.id}`
      this.$http
        .get(url)
        .then(res => {
          // console.log(res)
          this.product = res.data.product
        })
        .catch(err => {
          alert(err.data.message)
        })
    },
    addToCart () {
      this.$emit('add-to-cart', this.product.id, this.qty)
      this.closeModal()
    },
    openModal () {
      this.productModal.show()
    },
    closeModal () {
      this.productModal.hide()
    }
  },
  mounted () {
    this.productModal = new Modal(this.$refs.modal)
  }
}
</script>
