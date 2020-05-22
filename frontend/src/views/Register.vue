<template>
<div class="register">
    <v-col cols="12" xl="12" lg="12" md="12" sm="12">
        <v-row>
            <v-card-title>
                <v-icon color="indigo">mdi-xing</v-icon>
                <v-toolbar-title style="" class="ml-1 pl-1">
                    <h5 class="indigo--text">Register</h5>
                </v-toolbar-title>
            </v-card-title>
            <v-spacer />
            <v-row>
                <v-col>
                    <v-col>
                        <v-text-field flat solo-inverted v-model="search" append-icon="mdi-magnify" hide-details single-line></v-text-field>
                    </v-col>
                </v-col>
            </v-row>
            <v-card-title>
                <v-flex class="mt-2 mb-2">
                    <Popupcreate />
                </v-flex>
            </v-card-title>

            <v-col cols="12" lg="12">

                <v-data-table class="font-weight-black" :headers="headers" :items="registers" :search="search">

                    <!-- ກົດລາຍລະອຽດ -->
                    <template v-slot:item.action="{ index, item }">
                        <v-tooltip left color="indigo">
                            <template v-slot:activator="{ on }">
                                <v-btn small color="indigo mr-2" dark v-on="on">
                                    <v-icon small @click="detailItem(item.register_id)">mdi-eye</v-icon>
                                </v-btn>
                            </template>
                            <span>Dedia</span>
                        </v-tooltip>
                        <!-- ກົດແກ້ໄຂ -->

                        <v-tooltip left color="#F9A825">
                            <template v-slot:activator="{ on }">
                                <v-btn small class="mr-2" v-on="on">
                                    <Popupedit small @click="editItem(item.register_id)" />
                                </v-btn>
                            </template>
                            <span>Edit</span>
                        </v-tooltip>
                        <!-- ກົດລົບ -->
                        <v-tooltip right color="red">
                            <template v-slot:activator="{ on }">
                                <v-btn small color="red" dark v-on="on">
                                    <v-icon small @click="deleteItem(item.register_id)">mdi-delete</v-icon>
                                </v-btn>
                            </template>
                            <span>Delete</span>
                        </v-tooltip>

                    </template>
                    <!-- <template v-slot:item.created_at="{ item }">

                        <v-text>{{ item.created_at | formatDate }}</v-text>

                    </template> -->
                    <template  v-slot:item.img_pass="{ item }">
                        <v-avatar size="50" >
                            <v-img :src="item.img_pass"></v-img>
                        </v-avatar>
                    </template>
                </v-data-table>
            </v-col>
        </v-row>
    </v-col>
</div>
</template>

<script>
import Vue from "vue";
import axios from "axios";
import VueAxios from "vue-axios";

import Popupcreate from '../components/Popupcreate.vue'
import Popupedit from '../components/Popupedit.vue'
// import AuthService from "@/services/AuthService.js";

Vue.use(VueAxios, axios);

export default {
    name: 'Register',
    components: {
        Popupcreate,
        Popupedit
    },
    data: () => ({
        search: "",
        headers: [{
                text: "ເພດ",
                align: "left",
                value: "img_pass",
                width: "0"
            },
            {
                text: "ລະຫັດ",
                align: "left",
                value: "register_id",
                width: "0"
            },
            {
                text: "ເພດ",
                align: "left",
                value: "gender",
                width: "0"
            },
            {
                text: "ຊື່ົ",
                align: "left",
                value: "owner_name",
                width: "0"
            },
            {
                text: "ເບີໂທ",
                align: "left",
                value: "phone",
                width: "0"
            },
            // {
            //     text: "ວັນທີ",
            //     align: "left",
            //     value: "created_at",
            //     width: "0"
            // },
            {
                text: "ແກ້ໄຂ, ລົບ",
                value: "action",
                width: "200px",
                align: "right"
            },
        ],
        //ສະແດງ
        registers: [],
        // editedIndex: -1,

    }),

    // computed: {
    //     formTitle() {
    //         return this.editedIndex === -1 ? "New Item" : "Edit Item";
    //     }
    // },

    // watch: {
    //     dialog(val) {
    //         val || this.close();
    //     }
    // },
    async created() {
        this.initialize();
    },

    methods: {
        //ສະແດງ ແລະ ບັນທຶກ 
        initialize() {
            this.axios.get("/api/register").then(response => {
                this.registers = response.data.registers;
            });
        },
        //ລາຍລະອຽດ
        detailItem(register_id) {
            this.$router.push("Register/Detail?register_id=" + register_id);
        },
        //ແກ້ໄຂ
        editItem(register_id) {
            this.$router.push("Register/Edit?register_id=" + register_id);
        },
        //ລົບ
        async deleteItem(register_id, index) {
            if (confirm("Ayre you sure delete ?")) {
                let res = this.axios
                    .delete("/api/register/delete/" + register_id)
                    .then();
                if (res) {
                    this.registers.splice(index, 1);
                    this.$router.replace("Register");
                }
            }
        }
    }
};
</script>

<style>
.project.complete {
    border-left: 4px solid #3cd1c2;
}

.project.no {
    border-left: 4px solid orange;
}

.project.up {
    border-left: 4px solid red;
}

.project.yes {
    border-left: 4px solid yellow;
}

.v-chip.complete {
    color: #3cd1c2;
}

.p.ovnored {
    color: orange;
}

.p.up {
    color: red;
}

.p.yes {
    color: yellow;
}
</style>
