<template>
  <v-app>
  <Navbar/>
    <v-content id="keep" class="fontsize ma-4">
      <router-view></router-view>
    </v-content>
     <Footer/>
  </v-app>
 
</template>

<script>

import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
export default {
  name: 'App',

  components: {
   Navbar,
   Footer
  },

  data: () => ({
    //
  }),
};
</script>

<style>
#keep{
  font-family: 'Vision','Noto Sans Lao','Phetsarath OT','Saysettha OT',Roboto, Tahoma, Geneva, Verdana, sans-serif;
  font-size: 16px;
}
.indigo--text{
  font-size: 16px;
}


</style>
