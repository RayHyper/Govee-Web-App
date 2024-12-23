<template>
  <div class="colour-pick">
    <div>
      <img width="30" height="30" src="https://img.icons8.com/external-smashingstocks-hand-drawn-black-smashing-stocks/99/1A1A1A/external-colour-education-smashingstocks-hand-drawn-black-smashing-stocks.png" alt="external-colour-education-smashingstocks-hand-drawn-black-smashing-stocks"/>
    </div>
    <button @click="changeColour(16711680), noti()">Red</button>
    <button @click="changeColour(255), noti()">Blue</button>
    <button @click="changeColour(65280), noti()">Green</button>
    <button @click="changeColour(16777215), noti()">White</button>
    <button @click="changeColour(16776960), noti()">Yellow</button>
  </div>
</template>

<script>
import axios from "axios";
import { useToast } from "vue-toast-notification";
import "vue-toast-notification/dist/theme-sugar.css";

export default {
  data() {
    return {
      name: "Raymond Lam",
      status: false,
    };
  },

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
    async changeColour(rgbCode) {
      const data = {
        requestId: "uuid",
        payload: {
          sku: "H6052",
          device: "2D:19:CA:37:31:31:16:56",
          capability: {
            type: "devices.capabilities.color_setting",
            instance: "colorRgb",
            value: rgbCode,
          },
        },
      };

      try {
        //make post request
        const response = await axios.post(
          "http://localhost:5000/device/changeColour",
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

