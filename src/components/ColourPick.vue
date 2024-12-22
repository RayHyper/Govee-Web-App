<template>
  <div class="colour-pick">
    <h3>Pick Colour</h3>
    <button @click="changeColour(16711680)">Red</button>
    <button @click="changeColour(255)">Blue</button>
    <button @click="changeColour(65280)">Green</button>
    <button @click="changeColour(16777215)">White</button>
    <button @click="changeColour(16776960)">Yellow</button>
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

<style scoped>
h3 {
  margin-top: 50px;
}
</style>
