<template>
    <v-container fluid>
        <v-img :width="max" height="max" cover src="../assets/girlBackground.jpg">
            <div class="naslov ma-16">
                Sweet Meet

            </div>
            <div class="naslovBottomText" style="text-align: center; color: aliceblue; font-size: 1vw;">
                <p>Social App</p>
                <v-btn elevation="12" raised color="white" text-color="white"> Join Now</v-btn>
            </div>


            <div class="hangout">
                <v-row>
                    <v-col>
                        <h1>Hangout and</h1>
                        <h1>meet new</h1>
                        <h1>people</h1>
                    </v-col>

                    <v-col>
                        <v-img class="rounded-xl" width="500" src="../assets/noodle.jpg"></v-img>
                    </v-col>
                </v-row>

            </div>


            <div class="features pa-12">
                <v-row class="xs">
                    <v-col>
                        <div class="box rounded-xl pa-12">
                            <h1>Meet People</h1>

                            <v-avatar color="primary ma-2" size="56">te</v-avatar>
                            <v-avatar color="primary ma-2" size="56">te</v-avatar>
                            <v-avatar color="primary ma-2" size="56">te</v-avatar>
                            <v-avatar color="primary ma-2" size="56">te</v-avatar>

                            <div class="msgs rounded-xl pa-5">
                                <p><v-avatar color="primary" size="30"></v-avatar> Marta Butorac </p>
                                <hr>
                                <p><v-avatar color="primary" size="30"></v-avatar> Leo M</p>
                                <hr>
                                <p><v-avatar color="primary" size="30"></v-avatar> Kurac</p>
                                <hr>
                                <p><v-avatar color="primary" size="30"></v-avatar> test </p>

                            </div>
                        </div>
                    </v-col>
                    <v-col>
                        <div class="box rounded-xl pa-12">
                            <h1>5 min Calls</h1>

                            <h3>03:18</h3>
                            <h4>min Left</h4>
                            <p>meet your partner with live call of 5 minutes</p>
                        </div>

                    </v-col>
                    <v-col>
                        <div class="box rounded-xl pa-12">

                        </div>
                    </v-col>
                </v-row>
            </div>


        </v-img>

    </v-container>
</template>

<script>
export default {

}
</script>

<style scoped>
* {
    font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;

}

.container {

    padding: 0px;

}

.naslov {

    text-align: center;
    margin-top: auto;
    margin-bottom: auto;
    font-size: 500px;
}

.naslov {
    text-align: center;
    font-size: 8vw;
    color: rgb(255, 255, 255);

}

.hangout {
    margin-left: auto;
    margin-right: auto;
    text-align: left;
    padding: 50px;
    color: white;
    font-size: 2vw;
}

.features {
    color: rgb(0, 0, 0);


}

.box {
    background: rgb(35, 98, 111);
    background: linear-gradient(0deg, rgba(35, 98, 111, 0) 0%, rgba(255, 255, 255, 1) 100%);
    text-align: center;
    height: fit-content;

}

.msgs {
    background-color: white;
    text-align: left;
}
</style>

