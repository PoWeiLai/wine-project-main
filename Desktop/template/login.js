import { createApp } from 'https://cdnjs.cloudflare.com/ajax/libs/vue/3.2.29/vue.esm-browser.min.js';

const site = 'https://vue3-course-api.hexschool.io/v2/';

const app = createApp({
  data() {
    return {
      user: {
        username: '',
        password: ''
      },
    }
  },
  methods: {
    login() {
      const api = `${site}admin/signin`;
      axios.post(api, this.user)
        .then(res => {
          const { token, expired} = res.data;
          document.cookie = `hexschoolToken=${token}; expires=${new Date(expired)}`;
          window.location = 'week2.html';
        })
        // 補一些判斷，登入失敗就...
        .catch(err => {
          alert('登入失敗')
        })
      // Fetch(請自己想辦法判斷), Axios(狀態馬判斷)
    }
  },
  mounted() {
  }
});

app.mount('#app')