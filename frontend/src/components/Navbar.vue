<template>
<nav>
    <v-app-bar color="indigo" dark app>
        <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
        <v-toolbar-title class="text-uppercase ">
            <span class="font-weight-light">khammai</span>
            <span>jdb</span>
        </v-toolbar-title>
        <v-spacer></v-spacer>
        <v-menu offset-y>
            <template v-slot:activator="{ on }">
                <v-btn text v-on="on">
                    <v-icon left>expand_more</v-icon>
                    <span>Menu</span>
                </v-btn>
            </template>
            <v-list flat>
                <v-list-item v-for="link in links" :key="link.text" router :to="link.route" active-class="border">
                    <v-list-item-title>{{link.text}}</v-list-item-title>
                </v-list-item>
            </v-list>
        </v-menu>
        <v-btn text>
            <span>Exit</span>
            <v-icon right>exit_to_app</v-icon>
        </v-btn>
    </v-app-bar>
    <v-navigation-drawer v-model="drawer" dark app class="indigo darken-4">
        <v-layout column align-center>
            <v-flex class="mt-5">
                <v-avatar size="100">
                    <img src="/img1.png" alt="">
                </v-avatar>
                <p class="white--text subheading mt-1 text-center">Username</p>
            </v-flex>
            <v-flex class="mt-4 mb-4">
                <Popupcreate />
            </v-flex>
        </v-layout>
        <v-list flat>
            <v-list-item v-for="link in links" :key="link.text" router :to="link.route" active-class="border">
                <v-list-item-action>
                    <v-icon>{{link.icon}}</v-icon>
                </v-list-item-action>
                <v-list-item-content>
                    <v-list-item-title>{{link.text}}</v-list-item-title>
                </v-list-item-content>
            </v-list-item>
        </v-list>
    </v-navigation-drawer>
</nav>
</template>

<script>
import Popupcreate from './Popupcreate.vue'
import AuthService from "@/services/AuthService.js";
export default {
    components: {
        Popupcreate
    },
    data: () => ({
        drawer: true,
        links: [{
                icon: 'dashboard',
                text: 'Dashboard',
                route: '/'
            },
            {
                icon: 'folder',
                text: 'Register',
                route: '/register'
            },

            {
                icon: 'person',
                text: 'Team',
                route: '/team'
            }
        ]

    }),
    async created() {
        if (!this.$store.getters.isLoggedIn) {
            this.$router.push("login");
        }
        this.Team = this.$store.getters.getUser.Team;
        this.Dashboadr = this.$store.getters.getUser.Dashboadr;
        this.register = this.$store.getters.getUser.register;
        this.secretMessage = await AuthService.getSecretContent();
    },
    methods: {

        toggleMenu() {
            this.menuOpen = !this.menuOpen;
        },
        logout() {
            this.$store.dispatch("logout");
            this.$router.push("login");
        },
        changePasswordTo(users_id) {
            this.$router.push("ChangePassword?users_id=" + users_id);
        }
    }

}
</script>

<style scoped>
.border {
    border-left: 4px solid #0ba518;
}
</style>
