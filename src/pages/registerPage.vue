<template>
  <q-page class="flex flex-center">
    <q-card class="my-card bg-grey-1 q-px-md q-py-md">
      <q-card-section class="q-pt-xl">
        <div class="text-h6">Register</div>
        <q-card-section>
          <q-form
            @submit.prevent="onSubmit"
            @reset="onReset"
            class="q-gutter-md"
            ref="registerForm"
          >
            <div>
              <q-input
                v-model="storeLogUser.Fullname"
                type="text"
                label="Your Fullname"
                lazy-rules
                :rules="[
                  (val) => (val && val.length > 0) || 'Field is required',
                ]"
              />
            </div>
            <div>
              <q-input
                v-model="storeLogUser.email"
                type="text"
                label="Your Email"
                lazy-rules
                :rules="[emailValidate, requiredValidate]"
              />
            </div>
            <div>
              <q-input
                v-model="username"
                type="text"
                label="Your username"
                lazy-rules
                :rules="[requiredValidate]"
              />
            </div>
            <div>
              <q-input
                v-model="password"
                :type="isPwd ? 'password' : 'text'"
                label="Your Password"
                lazy-rules
                :rules="[
                  (val) =>
                    (val && val.length >= 6) || 'Must be at least 6 characters',
                ]"
              >
                <template #append>
                  <q-icon
                    :name="isPwd ? 'visibility_off' : 'visibility'"
                    class="cursor-pointer"
                    @click="isPwd = !isPwd"
                  />
                </template>
              </q-input>
            </div>
          </q-form>
        </q-card-section>
        <q-card-actions align="right">
          <q-btn flat label="reset" type="reset" color="secondary" />
          <q-btn label="Submit" type="submit" color="primary" />
        </q-card-actions>
      </q-card-section>
    </q-card>
  </q-page>
</template>
<script>
import { useCounterStore } from "../stores/user";
import { emailValidate, requiredValidate } from "../utils/validations";
export default {
  name: "registerPage",
  data() {
    return {
      storeLogUser: useCounterStore(),
    }
  },
  methods: {
    emailValidate,
    requiredValidate,
  },

};
</script>
