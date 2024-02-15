import { createApp } from 'https://cdnjs.cloudflare.com/ajax/libs/vue/3.2.29/vue.esm-browser.min.js';

const site = 'https://vue3-course-api.hexschool.io/v2/';
const api_path = 'casper-hexschool'

const app = createApp({
  data() {
    return {
      tempProduct: {},
      products: {}
    }
  },
  methods: {
    checkUser() {
      const api = `${site}api/user/check`;
      axios.post(api)
        .then((res) => {
          // this.products = res.data.products;
          // console.log(this.products);
          console.log(res.data.success);
          if (res.data.success) {
            this.getData()
          }
        })
        .catch(err => {
          console.log(err);
          window.location = 'login.html'
        })
    },
    getData() {
      const api = `${site}api/${api_path}/admin/products/all`;
      axios.get(api).then((res) => {
        this.products = res.data.products;
        console.log(this.products);
      });
    }
  },
  mounted() {
    const token = document.cookie.replace(
      /(?:(?:^|.*;\s*)hexschoolToken\s*\=\s*([^;]*).*$)|^.*$/,
      '$1',
    );
    axios.defaults.headers.common['Authorization'] = token;

    // this.getData()
    this.checkUser()
  }
})

app.mount('#app')
