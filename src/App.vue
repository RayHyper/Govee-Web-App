<template>
  <div class="container" id="card">
    <h2>{{ name }}</h2>
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

    <button>
      <img
        width="20"
        height="20"
        src="https://img.icons8.com/ios-filled/50/home.png"
        alt="home"
      />
    </button>
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
      name: "Govee Light",
      status: false,
    };
  },

  methods: {
    noti(power) {
      const $toast = useToast();
      $toast.open({
        message: "Turning " + power,
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
  font-family: "Funnel Sans", serif;
  font-weight: 400;
  margin: 0px;
  padding: 0px;
}
body {
  background-color: rgba(5, 5, 5, 0.849);
}
.container {
  background-color: white;
  text-align: center;
  border-radius: 30px;
  box-shadow: rgba(0, 0, 0, 0.06) 0px 2px 4px 0px inset;
  margin: auto;
  width: 450px;
  height: 700px;
  margin-top: 100px;
  padding: 15px;
  line-height: 50px;
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
h2{
  color:rgb(52, 189, 231);
}
</style>
