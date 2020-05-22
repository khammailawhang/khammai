<template>
<div id="login">
 <v-row align="center" justify="center">
    <v-col cols="12" xl="10" lg="3" md="10" sm="11">

        <v-app-bar  app color="indigo" dark>

            <v-toolbar-title style="width: 100%" class="ml-0 pl-4">
                <h3 class="font-family:Vision,Phetsarath OT">Mai App</h3>
            </v-toolbar-title>
        
            <v-spacer />
            <Language></Language>
        </v-app-bar>
        <v-card ref="form">
            <v-row align="center mr-2" justify="center">

                <v-col cols="12" class="py-6"></v-col>
                <v-col cols="12" lg="10" md="6" sm="6" align="center">
                    <h1 class="text-center pb-12">Login</h1>
                    <v-text-field :label="Username" prepend-icon="mdi-account-circle ml-2" v-model="username" type="text" autocomplete="off"></v-text-field>
                  

                    <v-text-field prepend-icon="mdi-lock ml-2" v-model="password" :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye'" :type="showPassword ? 'text' : 'password'" name="input-10-1" autocomplete="off" :label="Password" @click:append="showPassword = !showPassword"></v-text-field>
                    <v-btn color="indigo" class="white--text mr-2" @click="login">Login</v-btn>

                    <v-btn color="red" @click="reset" class="white--text">reset</v-btn>
                    <br /> <br /> <br />
                    <v-spacer />
                    <p v-if="msg">{{ msg }}</p>
                </v-col>

            </v-row>
        </v-card>
    </v-col>
 </v-row>
</div>
</template>

<script>
import AuthService from "@/services/AuthService.js";
export default {

    data() {
        return {
            username: "",
            password: "",
            msg: "",
            showPassword: false
        };
    },

    methods: {
        async reset() {
            (this.username = ""), (this.password = "");
        },

        async login() {
            try {
                const credentials = {
                    username: this.username,
                    password: this.password
                };
                const response = await AuthService.login(credentials);
                this.msg = response.msg;

                const token = response.token;
                const user = response.user;
                this.$store.dispatch("login", {
                    token,
                    user
                });
                this.$router.push("Dashboard");
            } catch (error) {
                this.msg = error.response.data.msg;
            }
        }
    }
};
</script>
