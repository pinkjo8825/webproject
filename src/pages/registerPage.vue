<template>
  <q-page class="flex flex-center">
    <q-card class="my-card bg-grey-1 q-px-md q-py-md">
      <q-card-section class="q-pt-xl">
        <div class="text-h6">Register</div>
        <div class="flex flex-center" v-if="isShowIcon">
          <q-icon name="account_circle" color="grey-6" size="4rem" />
        </div>
        <div class="flex flex-center" v-else>
          <q-img
            :src="imageUrl"
            :ratio="4 / 3"
            spinner-color="primary"
            spinner-size="82px"
          />
        </div>
        <q-card-section>
          <q-form
            @submit.prevent="onSubmit"
            @reset="onReset"
            class="q-gutter-md"
            ref="registerForm"
          >
            <div>
              <q-input
                v-model="fullname"
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
                v-model="email"
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
            <q-file
              standout
              v-model="upload_avatar"
              label="Your Avatar"
              max-file-size="1048576"
              accept=".jpg, .jpeg, .png"
              @rejected="onRejected"
              @update:model-value="uploadFile()"
            >
              <template #append>
                <q-icon name="attach_file" />
              </template>
            </q-file>
            <q-card-actions align="right">
              <q-btn flat label="reset" type="reset" color="secondary" />
              <q-btn label="Submit" type="submit" color="primary" />
            </q-card-actions>
          </q-form>
        </q-card-section>
      </q-card-section>
    </q-card>
  </q-page>
</template>
<script>
import { emailValidate, requiredValidate } from "../utils/validations";
import { useCounterStore } from "../stores/user";
import { Notify } from "quasar";
export default {
  name: "registerPage",
  data() {
    return {
      storeLogUser: useCounterStore(),
      isShowIcon: true,
      imageUrl: null,
      isPwd: true,
      fullname: "john wick",
      email: "john_wick@gmail.com",
      username: "johnlovedog",
      password: "dogdielol",
      upload_avatar: null,
    };
  },
  methods: {
    emailValidate,
    requiredValidate,
    onRejected(rejectedEntries) {
      let msg;
      if (rejectedEntries[0].failedPropValidation == "accept")
        msg = "Only images (jpg, jpeg, png) are allowed.";
      else if (rejectedEntries[0].failedPropValidation == "max-file-size")
        msg = "File size cannot be larger than 1MB.";
      Notify.create({
        type: "negative",
        message: msg,
      });
    },
    uploadFile() {
      this.isShowIcon = false;
      this.imageUrl = URL.createObjectURL(this.upload_avatar);
    },
    onReset() {
      this.isShowIcon = true;
      this.imageUrl = null;
      this.fullname = null;
      this.email = null;
      this.username = null;
      this.password = null;
      this.upload_avatar = null;
    },
    onSubmit() {
      let data = {
        fullname: this.fullname,
        email: this.email,
        username: this.username,
        password: this.password,
      };
      Notify.create({
        type: "position",
        message: "create an account successfully.",
      });
      console.log(data);
      setTimeout(() => {
        this.$router.push("/");
      }, 2000);
    },
  },
};
</script>
