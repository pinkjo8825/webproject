<template>
  <q-layout view="hHh lpR fFf">
    <q-header
      reveal
      elevated
      class="bg-primary text-white flex"
      height-hint="91"
    >
      <q-icon
      name="img:local_car_wash_black_24dp.svg"
      color="primary"
      size="45px"
      />
      <q-tabs>
        <q-route-tab to="/about" label="About us" />
        <q-route-tab to="/price" label="Services & Pricing" />
      </q-tabs>
      <q-btn>

      </q-btn>
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>

    <q-footer reveal bordered class="bg-grey-8 text-white">
      <q-toolbar>
        <q-toolbar-title>
          <q-avatar>
            <img src="https://cdn.quasar.dev/logo-v2/svg/logo-mono-white.svg" />
          </q-avatar>
        </q-toolbar-title>
      </q-toolbar>
    </q-footer>
  </q-layout>
</template>

