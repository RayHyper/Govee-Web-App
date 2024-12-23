<template>
  <div>
    <h3>Brightness</h3>
    <button @click="changeBright(1), noti()">1</button>
    <button @click="changeBright(10), noti()">10</button>
    <button @click="changeBright(15), noti()">15</button>
    <button @click="changeBright(30), noti()">30</button>
    <button @click="changeBright(50), noti()">50</button>
    <button @click="changeBright(100), noti()">100</button>
  </div>
</template>

<script>
import axios from "axios";
import { useToast } from "vue-toast-notification";
import "vue-toast-notification/dist/theme-sugar.css";
export default {
  methods: {
    noti() {
      const $toast = useToast();
      $toast.open({
        message: "Request sent to device!",
        type: "success",
        position: "top-right",
        duration: 3000,
      });
    },
    async changeBright(bright) {
      const data = {
        requestId: "uuid",
        payload: {
          sku: "H6052",
          device: "2D:19:CA:37:31:31:16:56",
          capability: {
            type: "devices.capabilities.range",
            instance: "brightness",
            value: bright,
          },
        },
      };

      try {
        //make post request
        const response = await axios.post(
          "http://localhost:5000/device/changeBright",
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

