<template>
  <q-layout view="hHh lpR fFf">

    <q-header reveal elevated class="bg-primary text-white" height-hint="91">
      <q-toolbar>
        <q-btn flat to="/" icon="local_car_wash" label="Car Washing System" />
        <q-space />
        <q-btn
          class="no-shadow text-yellow-14"
          flat
          v-if="storeLogUser.logInStatus"
          label="Car Wash Request"
          @click="
            username.toLowerCase() == 'admin'
              ? this.$router.push('/admin')
              : this.$router.push('/user')
          "
        />
        <q-space />
        <q-tabs>
          <q-route-tab to="/about" label="About us" />
          <q-route-tab to="/price" label="Services & Pricing" />
        </q-tabs>

        <q-btn
          v-if="storeLogUser.logInStatus"
          style="background: #ff0080; color: white"
          label="Log out"
          @click="onLogout"
        />
        <q-btn
          v-else
          style="background: #50b112; color: white"
          label="Log in"
          @click="showLoginDialog = true"
        />

        <q-dialog persistent v-model="showLoginDialog" ref="loginDialog">
          <q-card>
            <q-card-section class="q-mx-sm flex justify-between">
              <div class="text-h6">Login</div>

              <q-btn flat icon="close" v-close-popup ref="loginCloseBtn" />
            </q-card-section>

            <q-card-section class="q-pt-none">
              <q-form class="q-gutter-md" @submit.prevent="onSubmit">
                <div>
                  <q-input
                    v-model="username"
                    type="text"
                    label="Your Username"
                    lazy-rules
                    :rules="[
                      (val) =>
                        (val && val.length > 0) ||
                        'Must be at least 1 character!',
                    ]"
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
                        (val && val.length >= 6) ||
                        'Must be at least 6 characters',
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
                <div>
                  <q-btn
                    label="login"
                    color="primary"
                    type="submit"
                    style="width: 100%"
                  />
                </div>
              </q-form>
            </q-card-section>

            <q-card-actions align="left">
              <q-btn
                flat
                style="color: #ff0080"
                label="Create an account."
                v-close-popup
                @click="this.$router.push('/register')"
              />
            </q-card-actions>
          </q-card>
        </q-dialog>
      </q-toolbar>
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>
    <q-footer reveal bordered class="bg-grey-8 text-white"> </q-footer>
  </q-layout>
</template>

<script>
import { emailValidate, requiredValidate } from "../utils/validations";
import { useCounterStore } from "../stores/user";
import { Notify } from "quasar";
export default {
  name: "LandingLayout",
  data() {
    return {
      showLoginDialog: false,
      username: null,
      password: null,
      isPwd: true,
      storeLogUser: useCounterStore(),
    };
  },
  methods: {
    emailValidate,
    requiredValidate,
    onSubmit() {
      let data = {
        username: this.username,
        password: this.password,
      };
      console.log(data);
      this.storeLogUser.username = data.username;
      this.storeLogUser.password = data.password;
      this.storeLogUser.logInStatus = true;
      this.$refs.loginDialog.hide();
      Notify.create({
        type: "positive",
        message: "Login successfully.",
      });
      this.username = "";
      this.password = "";
    },
    onLogout() {

      this.storeLogUser.$reset()
      Notify.create({
        type: "positive",
        message: "Logout successfully.",
      });
      setTimeout(() => {
        this.$router.push("/");
      }, 2000);
    },
  },
};
</script>
