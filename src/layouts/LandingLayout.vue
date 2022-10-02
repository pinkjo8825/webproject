<template>
  <q-layout view="hHh lpR fFf">
    <q-header reveal elevated class="bg-primary text-white" height-hint="91">
      <q-toolbar>
        <q-btn flat to="/" icon="local_car_wash" label="Car Washing System" />
        <q-space />

        <q-tabs>
          <q-route-tab to="/about" label="About us" />
          <q-route-tab to="/price" label="Services & Pricing" />
        </q-tabs>

        <q-btn
          v-if="logInStatus"
          style="background: #ff0080; color: white"
          label="Log out"
        />
        <q-btn
          v-else
          style="background: #50b112; color: white"
          label="Log in"
          @click="showLoginDialog = true"
        />
        <q-dialog persistent v-model="showLoginDialog">
          <q-card>
            <q-card-section>
              <div class="text-h6">Login</div>
            </q-card-section>

            <q-card-section class="q-pt-none">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum
              repellendus sit voluptate voluptas eveniet porro. Rerum blanditiis
              perferendis totam, ea at omnis vel numquam exercitationem aut,
              natus minima, porro labore.
            </q-card-section>

            <q-card-actions align="right">
              <q-btn flat style="color: #FF0080" label="Create an account."
              @click="showRegisterDialog = true" />
              <q-space/>
              <q-btn flat label="Cancel" color="secondary" v-close-popup />
              <q-btn flat label="OK" color="primary" v-close-popup />
            </q-card-actions>
          </q-card>
        </q-dialog>

        <q-dialog persistent v-model="showRegisterDialog">
          <q-card>
            <q-card-section>
              <div class="text-h6">Register</div>
            </q-card-section>

            <q-card-section class="q-pt-none">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum
            </q-card-section>
            <q-card-actions align="right">
              <q-btn flat label="Cancel" color="secondary" v-close-popup />
              <q-btn flat label="OK" color="primary" v-close-popup />
            </q-card-actions>
          </q-card>
        </q-dialog>
      </q-toolbar>
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>

    <q-footer reveal bordered class="bg-grey-8 text-white">
      <q-toolbar>
        <q-toolbar-title>
          <!-- <q-avatar>
            <img src="https://cdn.quasar.dev/logo-v2/svg/logo-mono-white.svg" />
          </q-avatar> -->
        </q-toolbar-title>
      </q-toolbar>
    </q-footer>
  </q-layout>
</template>
<script>
export default {
  name: "LandingLayout",
  data() {
    return {
      showLoginDialog: false,
      showRegisterDialog: false,
      logInStatus: false,
    };
  },
  method: {
  }
};
</script>
