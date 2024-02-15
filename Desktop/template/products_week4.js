import { createApp } from 'https://cdnjs.cloudflare.com/ajax/libs/vue/3.2.29/vue.esm-browser.min.js';

const site = 'https://vue3-course-api.hexschool.io/v2/';
const api_path = 'casper-hexschool';

import pagination from './pagination.js';
import ProductModal from './ProductModal.js';

const app = createApp({
  data() {
    return {
      products: [],
      tempProduct: {
        imageUrl: [], // 多圖
      },
      pages: {},
      modalProduct: null, // productModal
      modalDel: null, // delModal
      isNew: false,
    };
  },
  methods: {
    getProducts(page = 1) {
      // 參數預設值
      const api = `${site}api/${api_path}/admin/products?page=${page}`; // 有分頁 > 第四要加入分頁
      axios.get(api).then((res) => {
        this.products = res.data.products;
        this.pages = res.data.pagination;
        console.log(res);
      });
    },
    openModal(status, product) {
      if (status === 'new') {
        this.tempProduct = {
          imagesUrl: [],
        };
        this.isNew = true;
        // this.modalProduct.show();
        this.$refs.pModal.openModal();
      } else if (status === 'edit') {
        this.tempProduct = { ...product };
        if (!Array.isArray(this.tempProduct.imagesUrl)) {
          this.tempProduct.imagesUrl = [];
        }
        this.isNew = false;
        // this.modalProduct.show();
        this.$refs.pModal.openModal();
      } else if (status === 'delete') {
        this.tempProduct = { ...product };
        this.modalDel.show();
      }
    },
    updateProduct() {
      // 新增
      let api = `${site}api/${api_path}/admin/product`; // 有分頁 > 第四要加入分頁
      let method = 'post';

      // 更新
      if (!this.isNew) {
        api = `${site}api/${api_path}/admin/product/${this.tempProduct.id}`;
        method = 'put';
      }

      axios[method](api, { data: this.tempProduct }).then((res) => {
        console.log(res);
        this.getProducts();
        // this.modalProduct.hide();
        this.$refs.pModal.closeModal();
        this.tempProduct = {};
      });
    },
    deleteProduct() {
      const api = `${site}api/${api_path}/admin/product/${this.tempProduct.id}`;

      axios.delete(api).then((res) => {
        console.log(res);
        this.getProducts();
        this.modalDel.hide();
      });
    },
  },
  mounted() {
    const token = document.cookie.replace(
      /(?:(?:^|.*;\s*)hexschoolToken\s*\=\s*([^;]*).*$)|^.*$/,
      '$1',
    );
    axios.defaults.headers.common['Authorization'] = token;
    this.getProducts();

    
    this.modalDel = new bootstrap.Modal(this.$refs.delProductModal);
  },
  components: {
    pagination,
    ProductModal,
  },
});

app.mount('#app');
