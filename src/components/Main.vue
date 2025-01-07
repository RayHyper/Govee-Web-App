<template>
  <h1>{{ name }}</h1>
  <p v-if="status">Light is on</p>
  <p v-else>Light is off</p>

  <div>
    <button class="on" @click="power(1), noti('On')">
      <img
        width="30"
        height="30"
        src="https://img.icons8.com/ios/50/FFFFFF/shutdown--v1.png"
        alt="shutdown--v1"
      />
    </button>
    <button class="off" @click="power(0), noti('Off')">
      <img
        width="30"
        height="30"
        src="https://img.icons8.com/ios/50/FFFFFF/shutdown--v1.png"
        alt="shutdown--v1"
      />
    </button>
  </div>

  <ColourPick />
  <Brightness />
</template>

<script>
import axios from "axios";
import ColourPick from "./ColourPick.vue";
import Brightness from "./Brightness.vue";
import { useToast } from "vue-toast-notification";
import "vue-toast-notification/dist/theme-sugar.css";
import Nav from "./Nav.vue";
import { RouterLink } from "vue-router";

export default {
  components: {
    ColourPick,
    Brightness,
    Nav,
  },
  data() {
    return {
      name: "Govee Light",
      status: false,
    };
  },

  methods: {
    //Notification 
    noti(power) {
      const $toast = useToast();
      $toast.open({
        message: "Turning " + power,
        type: "info",
        position: "top-right",
        duration: 3000,
      });
    },
    //Power state
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
        //make post request to endpoint
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
  font-family: "Funnel Sans", serif;
  font-weight: 500;
  margin: 0px;
  padding: 0px;
}
body {
  background-color: rgba(255, 255, 255, 0.849);
}
.container {
  background-color: white;
  text-align: center;
  border-radius: 30px;
  box-shadow: rgba(0, 0, 0, 0.4) 0px 2px 4px,
    rgba(0, 0, 0, 0.3) 0px 7px 13px -3px, rgba(0, 0, 0, 0.2) 0px -3px 0px inset;
  margin: auto;
  width: 450px;
  height: 700px;
  margin-top: 100px;
  padding: 15px;
  line-height: 50px;
}

button {
  font-size: 15px;
  padding: 20px;
  border-radius: 20px;
  border: 0px black solid;
  box-shadow: rgba(0, 0, 0, 0.4) 0px 2px 4px,
    rgba(0, 0, 0, 0.3) 0px 7px 13px -3px, rgba(0, 0, 0, 0.2) 0px -3px 0px inset;
  background-color: white;
  color: grey;
  margin: 5px;
}

button:hover {
  opacity: 0.8;
}
button:active {
  opacity: 0.5;
  cursor: pointer;
  box-shadow: none;
  transform: translateY(4px);
  box-shadow: rgba(0, 0, 0, 0.4) 0px 2px 4px,
    rgba(0, 0, 0, 0.3) 0px 7px 13px -3px, rgba(0, 0, 0, 0.2) 0px -3px 0px inset;
}

.on {
  background-color: rgb(109, 218, 109);
  width: 40%;
  color: white;
}
.off {
  background-color: rgb(228, 70, 70);
  width: 40%;
  color: white;
}

.colour-pick {
  margin-top: 50px;
}
h1 {
  color: rgb(52, 189, 231);
}
</style>
