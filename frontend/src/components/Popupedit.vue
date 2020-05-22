<template>
<v-row justify="center">
    <v-dialog id="keep" v-model="dialog" persistent max-width="500px">

        <template v-slot:activator="{ on }">
            <v-btn small color="#00C853" dark v-on="on">
                <v-icon small>mdi-pencil</v-icon>
            </v-btn>
        </template>

        <v-card>
            <v-card-title>
                <v-col>
                    <v-row align="start" justify="left">
                        <v-icon color="indigo">mdi-xing</v-icon>
                        <v-toolbar-title style="" class="ml-0 pl-2">
                            <h5 class="indigo--text">Edit</h5>
                        </v-toolbar-title>
                        <v-spacer />
                    </v-row>
                </v-col>
            </v-card-title>
            <v-col class="12" xl="6" lg="12" md="12" sm="12" align="left">
                <v-card-text class="py-1">

                    <v-row align="start" justify="left">
                        <v-col cols="12" xl="12" lg="12" md="12" sm="12">
                            <v-card ref="form">
                                <div class="base-image-input pt-4" :style="{ 'background-image': `url(${imageData})` }" @click="chooseImage">
                                    <span v-if="!imageData" class="placeholder">
                                        <v-icon style="font-size:90px">mdi-camera-image</v-icon>
                                    </span>
                                    <input class="file-input" ref="img_pass" type="file" @change="onSelect" @input="onSelectFile" />
                                    <input type="text" v-model="img_pass" hidden>
                                </div>
                            </v-card>
                        </v-col>
                        <v-col cols="12" xl="12" lg="12" md="12" sm="12">

                            <v-col cols="12" xl="12" lg="12" md="12" sm="12" xs="12">
                                <v-text-field :items="register_id" label="ID"  item-text="register_id" dense v-model="register_id" style="font-family: 'Vision','Noto Sans Lao','Phetsarath OT','Saysettha OT',Roboto, Tahoma, Geneva, Verdana, sans-serif;"></v-text-field>
                            </v-col>

                        </v-col>
                        <v-col cols="12" xl="12" lg="12" md="12" sm="12">

                            <v-col cols="12" xl="12" lg="12" md="12" sm="12" xs="12">

                                <v-select  :items="genders" label="Genders" item-text="gender" dense v-model="gender" style="font-family: 'Vision','Noto Sans Lao','Phetsarath OT','Saysettha OT',Roboto, Tahoma, Geneva, Verdana, sans-serif;"></v-select>
                            </v-col>

                        </v-col>
                        <v-col cols="12" xl="12" lg="12" md="12" sm="12">

                            <v-col cols="12" xl="12" lg="12" md="12" sm="12" xs="12">
                                <v-text-field label="Name" small dense v-model="owner_name" type="text"></v-text-field>
                            </v-col>

                        </v-col>
                        <v-col cols="12" xl="12" lg="12" md="12" sm="12">

                            <v-col cols="12" xl="12" lg="12" md="12" sm="12" xs="12">
                                <v-text-field label="Phone" small dense v-model="phone" type="number"></v-text-field>
                            </v-col>

                        </v-col>
                        <v-col cols="12" xl="12" lg="12" md="12" sm="12">
                            <v-menu ref="menu1" v-model="menu1" :close-on-content-click="false" transition="scale-transition" offset-y max-width="290px" min-width="290px">
                                <template v-slot:activator="{ on }">
                                    <v-text-field v-model="created_at" label="Date" hint="MM/DD/YYYY format" persistent-hint prepend-icon="event" @blur="date = parseDate(created_at)" v-on="on"></v-text-field>
                                </template>
                                <v-date-picker v-model="date" no-title @input="menu1 = false"></v-date-picker>
                            </v-menu>
                        </v-col>

                    </v-row>

                </v-card-text>

            </v-col>
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="red" @click="dialog = false" class="white--text">
                    <v-icon> cancel</v-icon>

                </v-btn>
                <v-btn color="#00C853" class="white--text" @click="update">
                    <v-icon> save</v-icon>

                </v-btn>

            </v-card-actions>
        </v-card>
    </v-dialog>
</v-row>
</template>

<script>
import Vue from "vue";
import axios from "axios";
import VueAxios from "vue-axios";
Vue.use(VueAxios, axios);
export default {
    name: 'popupedit',

    data: vm => ({
        genders: ["ຊາຍ", "ຍິງ"],
        //filed tabale to save
        register_id: "",
        owner_name: "",
        gender: "",
        phone: "",
        img_pass: "",
        //box
        dialog: false,
        title: '',
        content: '',
        due: null,
        date: new Date().toISOString().substr(0, 10),
        created_at: vm.formatDate(new Date().toISOString().substr(0, 10)),
        menu1: false,
        inputRules: [
            v => v.length >= 3 || 'Minimum lenght is 3 charachters'
        ]

    }),

    methods: {
       
        //ເເກ້ໄຂ
        chooseImage() {
            this.$refs.img_pass.click();
        },
        onSelectFile() {
            const input = this.$refs.img_pass;
            const files = input.files;
            if (files && files[0]) {
                const reader = new FileReader();
                reader.onload = e => {
                    this.imageData = e.target.result;
                };
                reader.readAsDataURL(files[0]);
                this.$emit("input", files[0]);
            }
        },
        onSelect() {
            const allowedTypes = ["image/jpeg", "image/jpg", "image/png"];
            const img_pass = this.$refs.img_pass.files[0];
            this.img_pass = img_pass;
            if (!allowedTypes.includes(img_pass.type)) {
                this.message = "Filetype is wrong!!";
            }
            if (img_pass.size > 500000) {
                this.message = "Too large, max size allowed is 500kb";
            }
        },
         async update() {
            let res = await this.axios.put("/api/register/update", {
                register_id: this.register_id,
                owner_name: this.owner_name,
                gender: this.gender,
                phone: this.phone,
                img_pass: this.img_pass,
                created_at: this.created_at,
            });

            if (res) {
                this.$router.replace("../Register");
            }
        },
        //ວັນທີ
        formatDate(date) {
            if (!date) return null
            const [year, month, day] = date.split('-')
            return `${year}/${month}/${day}`
        },
        parseDate(date) {
            if (!date) return null

            const [year, month, day] = date.split('/')
            return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`
        },
    },
    computed: {
        computedcreated_at() {
            return this.formatDate(this.date)
        },
    },

    watch: {
        date() {
            this.created_at = this.formatDate(this.date)
        },
    },

}
</script>

<style scoped>
#keep {
    font-family: 'Vision', 'Noto Sans Lao', 'Phetsarath OT', 'Saysettha OT', Roboto, Tahoma, Geneva, Verdana, sans-serif;
    font-size: 16px;
}

.indigo--text {
    font-size: 16px;
}

.base-image-input {
    /* display: block; */
    width: 100%;
    height: 130px;
    /* cursor: pointer; */
    background-size: cover;
    background-position: center center;
}

.placeholder {
    /* background: indigo; */
    width: 100%;
    height: 100px;
    display: flex;
    justify-content: center;
    align-items: center;
    /* color: #333; */
    font-size: 18px;
    /* font-family: Helvetica; */
}

.placeholder:hover {
    background: #b3c4c7;
}

.file-input {
    display: none;
}
</style>
