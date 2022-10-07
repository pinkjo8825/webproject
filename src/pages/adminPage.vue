<template>
  <div v-if="storeLogUser.currentUsername !== 'admin'">
    <h1 class="text-red">access denied</h1>
  </div>
  <div v-else class="q-pa-md">
    <q-layout
      view="hHh Lpr lff"
      container
      style="height: 90vh"
      class="shadow-2 rounded-borders"
    >
      <q-header elevated class="bg-black">
        <q-toolbar>
          <q-toolbar-title>admin</q-toolbar-title>
        </q-toolbar>
      </q-header>

      <q-drawer show-if-above :width="300" :breakpoint="500">
        <q-scroll-area class="fit">
          <q-list padding class="menu-list">
            <q-item>
              <q-item-section avatar>
                <q-icon name="account_circle" />
              </q-item-section>

              <q-item-section>
                Total Acc: {{ storeLogUser.users.length - 1 }}
              </q-item-section>
            </q-item>

            <q-item>
              <q-item-section avatar>
                <q-icon name="text_snippet" />
              </q-item-section>

              <q-item-section> Total Req: {{ totalRequest() }} </q-item-section>
            </q-item>

            <q-item>
              <q-item-section avatar>
                <q-icon name="pending_actions" />
              </q-item-section>

              <q-item-section>
                Pending Req: {{ getRequestType()[0] }}</q-item-section
              >
            </q-item>

            <q-item>
              <q-item-section avatar>
                <q-icon name="loop" />
              </q-item-section>

              <q-item-section>
                In-process Req: {{ getRequestType()[1] }}</q-item-section
              >
            </q-item>

            <q-item>
              <q-item-section avatar>
                <q-icon name="check_circle_outline" />
              </q-item-section>

              <q-item-section>
                Finished Req: {{ getRequestType()[2] }}</q-item-section
              >
            </q-item>
          </q-list>
        </q-scroll-area>
      </q-drawer>

      <q-page-container>
        <div
          v-for="user in storeLogUser.users"
          :key="user.id"
          class="q-pa-md column justify-start q-gutter-md"
        >
          <q-card v-for="value of user.requests" :key="value.id">
            <q-card-section class="bg-primary text-white">
              <div class=" text-h6 flex justify-between">
                <span>{{ value.licensePlate }}</span>
                <span> {{ user.username }}</span>
              </div>
              <div class="text-subtitle2">
                {{ value.carType }} {{ value.clean }}
              </div>
              <span v-for="service in value.additionServices" :key="service.key"
                >{{ service }},
              </span>
            </q-card-section>

            <q-separator />

            <q-card-actions align="right">
              <div class="text-subtitle1 text-weight-medium">
                {{ value.status }}
              </div>
              <div class="q-ml-xl">
                visible for user:<span class="text-purple">{{
                  value.visible
                }}</span>
              </div>
              <q-space />
              <div class="q-gutter-sm">
                <q-radio
                  v-model="value.status"
                  checked-icon="task_alt"
                  unchecked-icon="panorama_fish_eye"
                  val="pending"
                  label="pending"
                />
                <q-radio
                  v-model="value.status"
                  checked-icon="task_alt"
                  unchecked-icon="panorama_fish_eye"
                  val="inProcess"
                  label="inProcess"
                />
                <q-radio
                  v-model="value.status"
                  checked-icon="task_alt"
                  unchecked-icon="panorama_fish_eye"
                  val="finish"
                  label="finish"
                />
              </div>
              <div class="q-ml-md">
                Price:<span class="text-purple">{{ calPrice(value) }}</span>
              </div>
            </q-card-actions>
            <q-separator/>
            <q-form>
                  <p class="text-h6 q-pt-xs q-mb-none">License plate</p>
                  <q-input
                    outlined
                    v-model="value.licensePlate"
                    label="license plate"
                  />

                  <div>
                    <p class="text-h6 q-pt-xs q-mb-none">Car type</p>
                    <q-btn-toggle
                      label="Car type"
                      v-model="value.carType"
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
                    v-model="value.clean"
                    spread
                    no-caps
                    toggle-color="purple"
                    color="white"
                    text-color="black"
                    :options="[
                      { label: 'Outside Only', value: 'outsideOnly' },
                      {
                        label: 'Inside and Outsite',
                        value: 'insideAndOutsite',
                      },
                    ]"
                  />
                  <p class="text-h6 q-pt-xs q-mb-none">Addition Services</p>
                  <div class="q-gutter-sm">
                    <q-checkbox
                      v-model="value.additionServices"
                      val="hardWax"
                      label="Hard Wax"
                      color="green"
                    />
                    <q-checkbox
                      v-model="value.additionServices"
                      val="scratchRemoval"
                      label="Scratch Removal"
                      color="green"
                    />
                    <q-checkbox
                      v-model="value.additionServices"
                      val="carpetShampooing"
                      label="Carpet Shampooing"
                      color="green"
                    />
                    <q-checkbox
                      v-model="value.additionServices"
                      val="waterSpotRemoval"
                      label="Water Spot Removal"
                      color="green"
                    />
                    <q-checkbox
                      v-model="value.additionServices"
                      val="paintRestoration"
                      label="Paint Restoration"
                      color="green"
                    />
                  </div>
                  <div class="q-gutter-sm">
                    <q-toggle
                      v-model="value.visible"
                      color="green"
                      label="Set visible for user:"
                      left-label
                    />
                  </div>

                </q-form>

          </q-card>
        </div>
      </q-page-container>
    </q-layout>
  </div>
</template>

<script>
import { defineComponent } from "vue";
import { useCounterStore } from "../stores/users";
export default defineComponent({
  name: "adminPage",
  data() {
    return {
      storeLogUser: useCounterStore(),
      currentRequest: null,
      status: null,
    };
  },
  methods: {
    getRequestType() {
      let arr = [0, 0, 0];
      for (let user of this.storeLogUser.users) {
        for (let request of user.requests) {
          if (request.status === "pending") {
            arr[0]++;
          }
          if (request.status === "inProcess") {
            arr[1]++;
          }
          if (request.status === "finish") {
            arr[2]++;
          }
        }
      }
      return arr;
    },
    totalRequest() {
      const arr = this.getRequestType();
      let sum = 0;
      for (let value of arr) {
        sum += value;
      }
      return sum;
    },
    calPrice(value) {
      let sum = 0;
      if (value.clean === "outsideOnly") {
        if (value.carType === "car") sum += 12;
        if (value.carType === "suvAvg") sum += 15;
        if (value.carType === "suvL") sum += 20;
        if (value.carType === "pickUpS") sum += 15;
        if (value.carType === "pickUpL") sum += 20;
        if (value.carType === "pickUpXL") sum += 25;
        if (value.carType === "taxi") sum += 20;
      } else {
        if (value.carType === "car") sum += 20;
        if (value.carType === "suvAvg") sum += 25;
        if (value.carType === "suvL") sum += 30;
        if (value.carType === "pickUpS") sum += 25;
        if (value.carType === "pickUpL") sum += 30;
        if (value.carType === "pickUpXL") sum += 35;
        if (value.carType === "taxi") sum += 30;
      }
      for (let service of value.additionServices) {
        sum += 5;
      }
      return sum;
    },
  },
});
</script>
