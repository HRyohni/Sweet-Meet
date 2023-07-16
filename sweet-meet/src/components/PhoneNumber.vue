<template>
  <div className="m-10">
    <h3>Phone Number</h3>
    <VuePhoneNumberInput v-model="phoneNumber"/>
    <p className="grey--text">{{ phoneNumber }}</p>
  </div>
</template>

<script>
import VuePhoneNumberInput from 'vue-phone-number-input';
import 'vue-phone-number-input/dist/vue-phone-number-input.css';

export default {
  name: 'HelloWorld',
  components: {
    VuePhoneNumberInput,
  },
  data() {
    return {
      phoneNumber: '', // Initialize phoneNumber as an empty string
    };
  },
  watch: {
    phoneNumber(newPhoneNumber) {
      this.$emit('phone-number', newPhoneNumber); // Emit an event with the newPhoneNumber value
    },
  },
};
</script>

<style scoped>
</style>
