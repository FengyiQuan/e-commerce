import { ref, Ref } from 'vue';
export interface LoginForm {
  username: string;
  password: string;
  checked: string[];
}

const createEmptyLoginForm = (): LoginForm => {
  return {
    username: '',
    password: '',
    checked: [],
  };
};

export const createLoginRef = (): Ref<LoginForm> => {
  return ref(createEmptyLoginForm());
};

export async function onLogin(
  user: LoginForm,
  cb: (errorMessage: string[]) => any
) {
  try {
    const response = await fetch('/api/login', {
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'POST',
      body: JSON.stringify(user),
    });
    if (response.ok) {
      window.location.href = response.url;
    } else {
      cb([(await response.json()).message]);
    }
  } catch (error) {
    console.log(error);
  }
}
