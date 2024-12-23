<template>
  <div class="container" id="card">
    <h2>Govee Light Web App</h2>
    <p v-if="status">Light is on</p>
    <p v-else>Light is off</p>

    <div>
      <button class="on" @click="power(1), noti()">Turn On</button>
      <button class="off" @click="power(0), noti()">Turn Off</button>
    </div>

    <ColourPick />
    <Brightness />
  </div>
</template>

<script>
import axios from "axios";
import ColourPick from "./components/ColourPick.vue";
import Brightness from "./components/Brightness.vue";
import { useToast } from "vue-toast-notification";
import "vue-toast-notification/dist/theme-sugar.css";

export default {
  components: {
    ColourPick,
    Brightness,
  },
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
        message: "Power",
        type: "info",
        position: "top-right",
        duration: 3000,
      });
    },
    async power(state) {
      const data = {
        requestId: "uuid",
        payload: {
          sku: "H6052",
          device: "2D:19:CA:37:31:31:16:56",
          capability: {
            type: "devices.capabilities.on_off",
            instance: "powerSwitch",
            value: state,
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
        if (this.status == true) {
          this.status = false;
        } else if (this.status == false) {
          this.status = true;
        }
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>

<style>
* {
  font-family: Arial, Helvetica, sans-serif;
  margin: 0px;
  padding: 0px;
}
body {
  background-color: rgba(104, 172, 189, 0.233);
}
.container {
  background-color: white;
  text-align: center;
  border-radius: 20px;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
  margin: auto;
  width: 450px;
  height: 700px;
  margin-top: 100px;
  padding: 15px;
  line-height: 60px;
}

button {
  padding: 20px;
  border-radius: 20px;
  border: 0px black solid;
  box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
  background-color: white;
  color: grey;
  margin: 5px;
}

button:hover {
  opacity: 0.7;
}
button:active {
  opacity: 0.5;
  cursor: pointer;
}

.on {
  background-color: rgb(109, 218, 109);
  color: white;
}
.off {
  background-color: rgb(228, 70, 70);
  color: white;
}
</style>
