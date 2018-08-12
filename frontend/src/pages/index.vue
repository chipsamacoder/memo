<template>
  <section>
    <div v-if="error" class="error">
      {{ message }}
    </div>
    <div class="main">
      <div class="login">
        <input type="text" name="username" v-model="username">
        <input type="password" name="password" v-model="password">
        <div>{{$store.state.username}}</div>
        <template v-if="$store.state.username">
          <button class="blue" @click="logout">
            로그아웃
          </button>
        </template>
        <template v-else>
          <button class="blue" @click="login">로그인</button>
        </template>
        <button class="blue" @click="create">회원가입</button>
      </div>
      <div class="write">
        <input type="text" name="body" v-model="body" size="100">
        <button class="blue" @click="write">메모 작성</button>
      </div>
      <div class="list">
        <div class="users">
          <div>유저 목록</div>
          <div v-for="(user, index) in users" :key="index" class="user">
            <div class="index">{{index}}</div>
            <div class="username">{{user.username}}</div>
          </div>
        </div>
        <div class="comments">
          <div>메모 목록</div>
          <div v-for="(list, index) in comments" :key="index" class="comment">
            <div class="index">{{index}}</div>
            <div class="username">{{list.username}}</div>
            <div class="body">{{list.body}}</div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import axios from '~/plugins/axios'
import cookies from 'js-cookie'
export default {
  data () {
    return {
      checkLogin: this.$store.state.username,
      username: '',
      password: '',
      body: '',
      comments: '',
      users: '',
      error: false,
      message: ''
    }
  },
  async created () {
    const { data } = await axios.get('/api/auth')
    this.users = data
    const res = await axios.get('/api/memo')
    this.comments = res.data
  },
  methods: {
    async reloadUsers() {
      const { data } = await axios.get('/api/auth')
      this.users = data
    },
    async reloadMemo() {
      const { data } = await axios.get('/api/memo')
      this.comments = data
    },
    async create() {
      const { data } = await axios.post('/api/auth', { 
        username: this.username, password: this.password 
      })
      this.reloadUsers()
    },
    async login () {
      try {
        const { data } = await axios.post('/api/auth/login', {
          username: this.username, password: this.password 
        })
        this.$store.commit('SET_USERNAME', this.username)  
      } catch (error) {
        console.log(error.response)
        this.error = true;
        this.message = '로그인 실패'
        setTimeout(()=>{
          this.error = false;
        }, 2000)        
      }
    },
    async logout () {
      cookies.remove('token')
      await axios.post('/api/auth/logout')
      this.$store.commit('SET_USERNAME', null)
    },
    async write () {
      try {
        const { data } = await axios.post('/api/memo', { 
          username: this.username, body: this.body
        })
        this.reloadMemo()
      } catch (error) {
        console.log(error.response)
        if (error.response.status === 401) {
          this.error = true;
          this.message = '메모작성은 로그인을 해야 합니다.'
          setTimeout(()=>{
            this.error = false;
          }, 2000)
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>

button {
  padding: 8px;
  border-radius: 4px;
  border: 1px solid #000;
  color: #fff;
}

.error {
  position: absolute;
  border-radius: 8px;
	top: 50%;
	left: 50%;
	width: 400px;
	height: 100px;
  transform:translate(-50%, -50%);
	border: 2px solid #ddd;
	background-color: #222;
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
}

button:hover {
  cursor: pointer;
}

.default {
  background-color: #E0E1E2;
}

.blue {
  background-color:#2185D0;
}

.green {
  background-color:#21BA45;
}

.red {
  background-color:#DB2828;
}

section {
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: flex-start;
}

.main {
  border: 1px solid blue;
  padding: 5px;
  div {
    margin: 0 auto;
    max-width: 1080px;
    padding: 5px;
  }
  .login {
    display: flex;
    border: 1px solid red;
  }
  .write {
    border: 1px solid red;
    display: flex;
    justify-content: space-between;
  }
  .list {
    display: flex;
    > div {
      border: 1px solid green;
      flex-grow: 1;
    }
    .users, .comments {
      > div {
        border-bottom: 1px solid #222;
        display: flex;
        justify-content: center;
      }
      .user {
        display: flex;
        div { 
          flex-basis: 0;
        }
        .index { flex-grow: 1; }
        .username { flex-grow: 4; }
      }
      .comment {
        display: flex;
        div { 
          flex-basis: 0;
        }
        .index { flex-grow: 1; }
        .username { flex-grow: 2; }
        .body { flex-grow: 7; }
      }
    }
    display: flex;
    border: 1px solid green;
  }
}
</style>


