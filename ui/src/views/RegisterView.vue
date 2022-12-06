<template>
  <div class="container">
    <div class="row">
      <div class="col-sm-9 col-md-7 col-lg-5 mx-auto">
        <div class="card border-0 shadow rounded-3 my-5">
          <div class="card-body p-4 p-sm-5">
            <h5 class="card-title text-center mb-5 fw-light fs-5">Sign Up</h5>
            <message-box-component
              :messages="errorMessage"
            ></message-box-component>
            <form id="registerForm" @submit.prevent="onRegister" method="POST">
              <div class="form-floating mb-3">
                <input
                  type="text"
                  class="form-control"
                  id="username"
                  name="username"
                  v-model="registerForm.username"
                />
                <label for="username">Username</label>
              </div>
              <div class="form-floating mb-3">
                <input
                  type="email"
                  class="form-control"
                  id="email"
                  name="email"
                  v-model="registerForm.email"
                  required
                />
                <label for="email">Email</label>
              </div>
              <div class="form-floating mb-3">
                <input
                  type="password"
                  class="form-control"
                  id="password"
                  name="password"
                  v-model="registerForm.password"
                  required
                />
                <label for="password">Password</label>
              </div>
              <div class="form-floating mb-3">
                <input
                  type="password"
                  class="form-control"
                  id="password2"
                  v-model="registerForm.password2"
                  name="password2"
                  required
                />
                <label for="password2">Re-enter your password</label>
              </div>
              <div class="form-floating mb-3">
                <select
                  class="form-select"
                  id="roleType"
                  v-model="registerForm.roleType"
                  aria-label="Default is User role"
                  required
                >
                  <option selected :value="1">Buyer</option>
                  <option :value="2">Seller</option>
                  <option :value="3">Admin</option>
                </select>
                <label for="roleType">Choose your role type</label>
              </div>

              <p>
                By creating an account you agree to our
                <a href="#">Terms & Privacy</a>.
              </p>
              <div class="d-grid">
                <button
                  class="btn btn-primary btn-login text-uppercase fw-bold"
                  type="submit"
                >
                  Register
                </button>
              </div>
              <div class="d-grid">
                <p>Already have an account?<a href="/login">Login</a></p>
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
import MessageBoxComponent from '../components/MessageBoxComponent.vue';


const errorMessage: Ref<string[]> = ref([]);
interface RegisterForm {
  username: string;
  password: string;
  password2: string;
  email: string;
  roleType: number;
}

function createEmptyRegisterForm(): RegisterForm {
  return {
    username: '',
    password: '',
    password2: '',
    email: '',
    roleType: 1,
  };
}
const registerForm: Ref<RegisterForm> = ref(createEmptyRegisterForm());
async function onRegister() {
  try {
    const response = await fetch('/api/register', {
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'POST',
      body: JSON.stringify(registerForm.value),
    });
    // console.log(await response.json())
    // success login
    if (response.ok) {
      window.location.href = response.url;
    } else {
      errorMessage.value = (await response.json()).message;
    }
  } catch (error) {
    console.log(error);
  }
}
</script>
