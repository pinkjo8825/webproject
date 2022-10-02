<template>
  <q-layout view="hHh lpR fFf">
    <q-header reveal elevated class="bg-primary text-white" height-hint="91">
      <q-toolbar>
        <q-btn flat to="/" icon='img:local_car_wash_black_24dp.svg' label="Car Washing System" />
        <q-space />

        <q-tabs>
          <q-route-tab to="/about" label="About us" />
          <q-route-tab to="/price" label="Services & Pricing" />
        </q-tabs>
        <q-btn style="background: #FF0080; color: white" label="Log in" />
        <q-btn style="background: #50b112; color: white" label="Log out" />
      </q-toolbar>
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
