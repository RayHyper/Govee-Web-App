<template>
  <h1>{{ name }}</h1>
  <h2>Govee Light Web App</h2>
  <p v-if="status">Light is on</p>
  <p v-else>Light is off</p>

  <div>
    <button @click="turnOn">Turn On</button>
    <button @click="turnOff">Turn Off</button>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      name: "Raymond Lam",
      status: false,
    };
  },

  methods: {
    async turnOn() {
      const data = {
        requestId: "uuid",
        payload: {
          sku: "H6052",
          device: "2D:19:CA:37:31:31:16:56",
          capability: {
            type: "devices.capabilities.on_off",
            instance: "powerSwitch",
            value: 1,
          },
        },
      };

      try {
        //make post request
        const response = await axios.post(
          "http://localhost:5000/device/onoff",
          data,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        console.log(response.data);

        this.status = true;
      } catch (error) {
        console.log(error);
      }
    },

    async turnOff() {
      const data = {
        requestId: "uuid",
        payload: {
          sku: "H6052",
          device: "2D:19:CA:37:31:31:16:56",
          capability: {
            type: "devices.capabilities.on_off",
            instance: "powerSwitch",
            value: 0,
          },
        },
      };

      try {
        //make post request
        const response = await axios.post(
          "http://localhost:5000/device/onoff",
          data,
          {
            headers: {
              "Content-Type": "application/json",
              "Govee-API-Key": import.meta.env.VITE_KEY,
            },
          }
        );

        console.log(response.data);

        this.status = false;
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>

<style scoped>
h1,
h2 {
  color: rgb(47, 189, 255);
}

button {
  margin-top: 100px;
  font-size: larger;
  padding: 100px;
}

* {
  text-align: center;
}

h1,
p {
  margin-top: 50px;
}
</style>
