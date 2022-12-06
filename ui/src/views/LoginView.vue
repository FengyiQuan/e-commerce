<template>
  <div class="container">
    <div class="row">
      <div class="col-sm-9 col-md-7 col-lg-5 mx-auto">
        <div class="card border-0 shadow rounded-3 my-5">
          <div class="card-body p-4 p-sm-5">
            <h5 class="card-title text-center mb-5 fw-light fs-5">Sign In</h5>
            <message-box-component
              :messages="errorMessage"
            ></message-box-component>
            <form @submit.prevent="handleLogin" method="POST">
              <div class="form-floating mb-3">
                <input
                  type="text"
                  class="form-control"
                  id="username"
                  name="username"
                  v-model="user.username"
                  required
                />
                <label for="floatingInput">Username</label>
              </div>
              <div class="form-floating mb-3">
                <input
                  type="password"
                  class="form-control"
                  id="password"
                  name="password"
                  v-model="user.password"
                />
                <label for="floatingPassword">Password</label>
              </div>

              <div class="form-check mb-3">
                <input
                  class="form-check-input"
                  type="checkbox"
                  value="RemeberPassword"
                  id="rememberPasswordCheck"
                  v-model="user.checked"
                />
                <label class="form-check-label" for="rememberPasswordCheck">
                  Remember password
                </label>
              </div>
              <div class="d-grid">
                <button
                  class="btn btn-primary btn-login text-uppercase fw-bold"
                  type="submit"
                >
                  Sign in
                </button>
              </div>
              <div class="d-grid">
                <a href="/register">Register</a>
              </div>
              <hr class="my-4" />
              <!-- <div class="d-grid mb-2">
                                            <button class="btn btn-google btn-login text-uppercase fw-bold"
                                                type="submit">
                                                <i class="fab fa-google me-2"></i> Sign in with Google
                                            </button>
                                        </div>
                                        <div class="d-grid">
                                            <button class="btn btn-facebook btn-login text-uppercase fw-bold"
                                                type="submit">
                                                <i class="fab fa-facebook-f me-2"></i> Sign in with Facebook
                                            </button>
                                        </div> -->
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, Ref } from 'vue';
import { LoginForm, createLoginRef, onLogin } from '../controllers/auth';
import MessageBoxComponent from '../components/MessageBoxComponent.vue';
const errorMessage: Ref<string[]> = ref([]);

const user: Ref<LoginForm> = createLoginRef();

const handleLogin = () => {
  onLogin(user.value, (errorMsg: string[]) => {
    errorMessage.value = errorMsg;
  });
};
</script>
