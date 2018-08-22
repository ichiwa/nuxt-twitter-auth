<template>
  <section class="wrapper">
    <div>twitter user id: {{ user.id }}</div>
    <div>error: {{ error }}</div>
    <a href="http://127.0.0.1:3000/server/logout">logout</a>
  </section>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      user: {},
      error: null,
    };
  },
  mounted() {
    axios.get('http://127.0.0.1:3000/server/auth/twitter/callback', {
      params: this.$route.query,
    }).then(res => {
      this.user = res.data.user;
      console.log(this.user);
    }).catch(err => {
      this.error = err;
    });
  },
};
</script>

<style scoped>
.wrapper {
  width: 100%;
  text-align: center;
}
</style>
