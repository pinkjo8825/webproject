<template>
  <div v-if="!storeLogUser.logInStatus">
    <h1 class="text-red">access denied</h1>
  </div>
  <div v-else class="q-pa-md">
    <q-layout
      view="lHh Lpr lff"
      container
      style="height: 90vh"
      class="shadow-2 rounded-borders"
    >
      <q-header elevated class="bg-cyan-8">
        <q-toolbar>
          <q-toolbar-title>Request</q-toolbar-title>
          <q-btn
            color="red"
            icon="add_circle"
            @click="this.newRequestDialog = true"
            label="Make new request"
          />
        </q-toolbar>
      </q-header>

      <q-drawer show-if-above :width="200" :breakpoint="400">
        <q-scroll-area
          style="
            height: calc(100% - 150px);
            margin-top: 150px;
            border-right: 1px solid #ddd;
          "
        >
          <q-list padding>
            <q-item>
              <q-item-section avatar>
                <q-icon name="pending_actions" />
              </q-item-section>
              <q-item-section>
                <q-item-label>{{
                  this.storeLogUser.users[this.storeLogUser.getCurrentUserIndex]
                    .requestsType[0]
                }}</q-item-label>
                <q-item-label caption>Pending Request</q-item-label>
              </q-item-section>
            </q-item>

            <q-item>
              <q-item-section avatar>
                <q-icon name="loop" />
              </q-item-section>

              <q-item-section>
                <q-item-label>{{
                  this.storeLogUser.users[this.storeLogUser.getCurrentUserIndex]
                    .requestsType[1]
                }}</q-item-label>
                <q-item-label caption>In-process Request</q-item-label>
              </q-item-section>
            </q-item>

            <q-item>
              <q-item-section avatar>
                <q-icon name="check_circle_outline" />
              </q-item-section>

              <q-item-section>
                <q-item-label>{{
                  this.storeLogUser.users[this.storeLogUser.getCurrentUserIndex]
                    .requestsType[2]
                }}</q-item-label>
                <q-item-label caption>Finished Request</q-item-label>
              </q-item-section>
            </q-item>
          </q-list>
        </q-scroll-area>

        <q-img
          class="absolute-top"
          src="https://cdn.quasar.dev/img/material.png"
          style="height: 150px"
        >
          <div class="absolute-bottom bg-transparent">
            <q-avatar size="72px" class="q-mb-sm">
              <img
                :src="
                  storeLogUser.users[storeLogUser.getCurrentUserIndex].imageUrl
                "
              />
            </q-avatar>
            <div class="text-weight-bold">
              {{ storeLogUser.currentUsername }}
            </div>
          </div>
        </q-img>
      </q-drawer>

      <q-page-container>
        <q-page padding>
          <div class="q-pa-md column justify-start q-gutter-md">
            <q-card
              v-for="(value, index) of storeLogUser.users[storeLogUser.getCurrentUserIndex].requests"
              :key="index"
            >
              <q-card-section class="bg-primary text-white">
                <div class="text-h6">{{ value.licensePlate }}</div>
                <div class="text-subtitle2">
                  {{ value.carType }} {{ value.clean }}
                </div>
                <span
                  v-for="service in value.additionServices"
                  :key="service.key"
                  >{{ service }},
                </span>
              </q-card-section>

              <q-separator />

              <q-card-actions align="right">
                <div class="text-subtitle1 text-weight-medium">
                  {{ value.status }}
                </div>
                <q-space />
                <q-btn
                  color="secondary"
                  v-if="value.status === 'pending'"
                  @click="() => {paymentDialog = true;
                  this.currentRequest = index}"
                  >Payment</q-btn
                >
              </q-card-actions>
            </q-card>
          </div>
        </q-page>
      </q-page-container>
      <q-dialog v-model="paymentDialog" ref="paymentDialogref">
        <q-card>
          <q-card-section>
            <q-toolbar>
              <q-toolbar-title>Choose payment methods</q-toolbar-title>
            </q-toolbar>
          </q-card-section>
            <q-btn-toggle
            spread
              label="Car type"
              v-model="paymentType"
              toggle-color="purple"
              :options="[
                { value: 'cash', slot: 'one' },
                { value: 'card', slot: 'two' },
              ]"
            >
              <template v-slot:one>
                <div class="row items-center no-wrap">
                  <q-icon name="local_atm" />
                  <div class="text-center">Cash</div>
                </div>
              </template>

              <template v-slot:two>
                <div class="row items-center no-wrap">
                  <q-icon name="credit_card" />
                  <div class="text-center">Credit Card</div>
                </div>
              </template>
            </q-btn-toggle>
          <q-separator />
          <q-card-actions align="right">
                <q-btn flat label="Decline" color="primary" v-close-popup />
                <q-btn label="Sumbit" v-close-popup @click="() => {
                  storeLogUser.users[storeLogUser.getCurrentUserIndex].requestsType[0]--;
                  storeLogUser.users[storeLogUser.getCurrentUserIndex].requestsType[1]++;
                  storeLogUser.users[storeLogUser.getCurrentUserIndex].requests[currentRequest].status = 'inProcess';
                }" color="primary" />
              </q-card-actions>
        </q-card>
      </q-dialog>
      <q-dialog v-model="newRequestDialog" full-width ref="newRequestDialogref">
        <q-card>
          <q-card-section>
            <q-toolbar>
              <q-toolbar-title>New Request</q-toolbar-title>
            </q-toolbar>
          </q-card-section>

          <q-separator />

          <q-card-section>
            <q-form @submit.prevent="onSubmit">
              <p class="text-h6 q-pt-xs q-mb-none">License plate</p>
              <q-input
                outlined
                v-model="licensePlate"
                label="license plate"
                lazy-rules
                :rules="[
                  (val) =>
                    (val && val.length > 0) || 'Must be at least 1 character!',
                ]"
              />

              <div>
                <p class="text-h6 q-pt-xs q-mb-none">Car type</p>
                <q-btn-toggle
                  label="Car type"
                  v-model="carType"
                  toggle-color="purple"
                  :options="[
                    { value: 'car', slot: 'one' },
                    { value: 'suvAvg', slot: 'two' },
                    { value: 'suvL', slot: 'three' },
                    { value: 'pickUpS', slot: 'four' },
                    { value: 'pickUpL', slot: 'five' },
                    { value: 'pickUpXL', slot: 'six' },
                    { value: 'taxi', slot: 'seven' },
                  ]"
                >
                  <template v-slot:one>
                    <div class="row items-center no-wrap">
                      <q-icon name="directions_car" />
                      <div class="text-center">Car</div>
                    </div>
                  </template>

                  <template v-slot:two>
                    <div class="row items-center no-wrap">
                      <q-icon name="airport_shuttle" />
                      <div class="text-center">SUV Average</div>
                    </div>
                  </template>

                  <template v-slot:three>
                    <div class="row items-center no-wrap">
                      <q-icon name="airport_shuttle" />
                      <div class="text-center">SUV Large</div>
                    </div>
                  </template>

                  <template v-slot:four>
                    <div class="row items-center no-wrap">
                      <q-icon name="local_shipping" />
                      <div class="text-center">Pick-up Small</div>
                    </div>
                  </template>
                  <template v-slot:five>
                    <div class="row items-center no-wrap">
                      <q-icon name="local_shipping" />
                      <div class="text-center">Pick-up Large</div>
                    </div>
                  </template>
                  <template v-slot:six>
                    <div class="row items-center no-wrap">
                      <q-icon name="local_shipping" />
                      <div class="text-center">Pick-up XL</div>
                    </div>
                  </template>
                  <template v-slot:seven>
                    <div class="row items-center no-wrap">
                      <q-icon name="local_taxi" />
                      <div class="text-center">Taxi</div>
                    </div>
                  </template>
                </q-btn-toggle>
              </div>
              <p class="text-h6 q-pt-xs q-mb-none">Clean</p>
              <q-btn-toggle
                class="q-mb-none"
                v-model="clean"
                spread
                no-caps
                toggle-color="purple"
                color="white"
                text-color="black"
                :options="[
                  { label: 'Outside Only', value: 'outsideOnly' },
                  { label: 'Inside and Outsite', value: 'insideAndOutsite' },
                ]"
              />
              <p class="text-h6 q-pt-xs q-mb-none">Addition Services</p>
              <div class="q-gutter-sm">
                <q-checkbox
                  v-model="additionServices"
                  val="hardWax"
                  label="Hard Wax"
                  color="green"
                />
                <q-checkbox
                  v-model="additionServices"
                  val="scratchRemoval"
                  label="Scratch Removal"
                  color="green"
                />
                <q-checkbox
                  v-model="additionServices"
                  val="carpetShampooing"
                  label="Carpet Shampooing"
                  color="green"
                />
                <q-checkbox
                  v-model="additionServices"
                  val="waterSpotRemoval"
                  label="Water Spot Removal"
                  color="green"
                />
                <q-checkbox
                  v-model="additionServices"
                  val="paintRestoration"
                  label="Paint Restoration"
                  color="green"
                />
              </div>
              <q-separator />
              <q-card-actions align="right">
                <q-btn flat label="Decline" color="primary" v-close-popup />
                <q-btn label="Sumbit" type="submit" color="primary" />
              </q-card-actions>
            </q-form>
          </q-card-section>
        </q-card>
      </q-dialog>
    </q-layout>
  </div>
</template>

<script>
import { defineComponent } from "vue";
import { useCounterStore } from "../stores/users";
const store = useCounterStore();
export default defineComponent({
  name: "userPage",
  data() {
    return {
      leftDrawerOpen: true,
      newRequestDialog: false,
      paymentDialog: false,
      storeLogUser: store,
      licensePlate: "",
      carType: "car",
      clean: "outsideOnly",
      additionServices: [],
      currentIndex: null,
      requestStatus: null,
      currentRequest: null,
      paymentType: 'cash',
    };
  },
  methods: {
    onSubmit() {
      let newRequest = {
        licensePlate: this.licensePlate,
        carType: this.carType,
        clean: this.clean,
        additionServices: this.additionServices,
        status: "pending",
      };
      this.storeLogUser.users[this.storeLogUser.getCurrentUserIndex]
        .requestsType[0]++;
      this.storeLogUser.users[
        this.storeLogUser.getCurrentUserIndex
      ].requests.push(newRequest);
      this.$refs.newRequestDialogref.hide();
      this.licensePlate = "";
      this.carType = "car";
      this.clean = "outsideOnly";
      this.additionServices = [];
    },
  },
});
</script>
