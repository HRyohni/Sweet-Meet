<template>
  <div classsd="phone-input-container">
    <h3>Phone Number</h3>
    <VuePhoneNumberInput v-model="phoneNumber"/>
    <p>{{phoneNumber}}</p>
  </div>
</template>

<script>
import VuePhoneNumberInput from 'vue-phone-number-input';
import 'vue-phone-number-input/dist/vue-phone-number-input.css';
import {mapMutations} from "vuex";

export default {


  computed: {
    ...mapMutations
    ({
      setPhoneNumber: "setPhoneNumber",
    })
  },
  name: 'PhoneNumberInput',
  components: {
    VuePhoneNumberInput,
  },
  data() {
    return {
      phoneNumber: "",
    };
  },
  watch: {
    phoneNumber(newPhoneNumber) {
      this.$emit('update:phoneNumber', newPhoneNumber);
    },
  },
};
</script>

<style scoped>
.phone-input-container {
  margin: 10px;
}
</style>
