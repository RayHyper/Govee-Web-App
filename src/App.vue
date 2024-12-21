


<template>
  <h1>{{name}}</h1>
  <h2>Govee Light Web App</h2>
  <p v-if="status">Light is on</p>
  <p v-else>Light is off</p>




  <div>
    <button @click="postOn">Turn On</button>

<button @click="postOff">Turn Off</button>
  </div>
 


</template>


<script>

   export default{
    data(){
      return{
        name: "Raymond Lam",
        status: false,
        tasks: [1,2,3,4],
        link: "https://google.com",
        count: 0,
      }
    },

    methods: {
    async postOn(){
    
   

    const url = "/api";
    try{
        //make get request
        const response = await fetch(url,{
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Govee-API-Key":  import.meta.env.VITE_KEY,
              },
              body: JSON.stringify({
                "requestId": "uuid",
                "payload": {
                  "sku": "H6052",
                  "device": "2D:19:CA:37:31:31:16:56",
                  "capability": {
                    "type": "devices.capabilities.on_off",
                    "instance": "powerSwitch",
                    "value": 1
                  }
                }
              })

        });

        const json = await response.json();

        console.log(json);
        this.status = true;

    }
    catch(error){
        console.log(error);
    }

},
async postOff(){
    
    const url = "/api";
    try{
        //make get request
        const response = await fetch(url,{
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Govee-API-Key": import.meta.env.VITE_KEY,
              },
              body: JSON.stringify({
                "requestId": "uuid",
                "payload": {
                  "sku": "H6052",
                  "device": "2D:19:CA:37:31:31:16:56",
                  "capability": {
                    "type": "devices.capabilities.on_off",
                    "instance": "powerSwitch",
                    "value": 0
                  }
                }
              })

        });

        const json = await response.json();

        console.log(json);
        this.status = false;
    }
    catch(error){
        console.log(error);
    }

}
   }
   }

  

</script>

<style scoped>

h1, h2{
  color:rgb(47, 189, 255);
}

button{
  margin-top: 100px;
  font-size: larger;
  padding:100px;
}

*{
  text-align: center;
  
}

h1, p{
  margin-top: 50px;
}


</style>