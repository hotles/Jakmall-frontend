<template>
  <div class="home">
    <div class="container">
      <div class="blocky-wrapper">
        <div class="blocky">
          <div class="blocky__inner">
            <h1 class="blocky__title blocky__title--hr">Shipment</h1>
          </div>
          <div class="bloky__inner">
            <form class="bloky__form"> 
              <div class="bloky__form__group">
                  <ValidationProvider name="email" rules="required|email" v-slot="{ errors }">
                    <input v-model="email"
                          placeholder="Email"
                          name="email"
                          type="text"
                          >
                    <span>{{ errors[0] }}</span>
                  </ValidationProvider>
                  </div>
              <div class="bloky__form__group">
                  <div class="bloky__form__controls">
                   

                    <VuePhoneNumberInput v-model="yourValue" />


                  </div>
              </div>
              <div class="bloky__form__group">
                  <div class="bloky__form__controls">
                      <textarea 
                        rows="6" 
                        type="text" 
                        placeholder="Delivery Address" 
                        name="address"
                        maxlength="120"
                        v-model="delivery_addres" 
                        @keyup='charCount()'
                      />
                      <p class="text__total"><small>{{ this.totalcharacter }} characters available.</small></p>
                  </div>
              </div>
            </form>
          </div>
        </div>

        <div class="blocky__checkbox">
          <div class="blocky__inner blocky__inner--checkbox">
            <input type="checkbox" id="checkbox" v-model="checked">
            <label for="checkbox">Send as dropshipper</label>
          </div>
           <div class="bloky__inner"  v-if="checked">
            <form class="bloky__form"> 
              <div class="bloky__form__group">
                  <div class="bloky__form__controls bloky__form__controls--dropshipper">
                      <input type="text" placeholder="Dropshipper name" name="dropship_name"/>
                  </div>
              </div>
              <div class="bloky__form__group">
                  <div class="bloky__form__controls">
                      <input type="number" placeholder="Dropshipper phone number" name="phone"/>
                  </div>
              </div>
            </form>
          </div>
          <div class="bloky__inner"  v-else>
            <form class="bloky__form"> 
              <div class="bloky__form__group">
                  <div class="bloky__form__controls bloky__form__controls--dropshipper">
                      <input type="text" placeholder="Dropshipper name" name="dropship_name" disabled/>
                  </div>
              </div>
              <div class="bloky__form__group">
                  <div class="bloky__form__controls">
                      <input type="number" placeholder="Dropshipper phone number" name="phone" disabled/>
                  </div>
              </div>
            </form>
          </div>
        </div>

        <div class="blocky__summary">
          <div class="blocky__inner">
            <h3 class="blocky__title blocky__title--summary">Summary</h3>
            <small>10 items purchased</small>
          </div>
          <div class="blocky__inner blocky__inner--payment">
            <div class="blocky__inner--summary">
              <p class="blocky__copy">Cost of goodss <strong class="blocky__copy__summary">{{cost_summary}}</strong></p>                
              <p class="blocky__copy">Dropshipping Fee <strong class="blocky__copy__summary">{{fee_summary}}</strong></p>
              <h3 class="blocky__title blocky__title--summary">Total <strong class="blocky__copy__summary">{{total_summary}}</strong></h3>                
            </div>
            <div class="blocky__inner">
              <button type="submit" v-on:click="firstStep()" class="btn btn__orange">Continue to payment</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from 'vue';
import { ValidationProvider, extend } from 'vee-validate';
import { required, email, } from 'vee-validate/dist/rules';
import VuePhoneNumberInput from 'vue-phone-number-input';
import 'vue-phone-number-input/dist/vue-phone-number-input.css';
extend('email', email);
extend('required', {
  ...required,
});
Vue.component('ValidationProvider', ValidationProvider);
Vue.component('vue-phone-number-input', VuePhoneNumberInput);

export default {
  name: 'Home',
  components: {
    ValidationProvider,
    VuePhoneNumberInput
  },
  data: function () {
    return {
      yourValue: '',
      phone: '',
      email           : '',
      checked         : '',
      maxcharacter    : 120,
      totalcharacter  : 0,
      cost_summary    : '500,000',
      fee_summary     : '5,900',
      total_summary   : '505,900',
      delivery_addres : '',
      first_formdata  :[],
    }
  },
  methods: {
    charCount : function(){
      this.totalcharacter = this.maxcharacter - this.delivery_addres.length
    },
    firstStep : function(){
    },
    
  }
}
</script>

<style scoped>
  .btn{
    padding: 15px;
    width: 100%;
    font-size: 16px;
    color: #fff;
    border: none;
  }
  :focus{
    outline: none;
  }
  .btn__orange{
    background: #FF8A00;
  }
  .btn__orange:hover{
    background: #e27900;
  }
  .blocky__copy__summary{
    padding-left: 65px;
  }
  .text__total{
    margin-top: 0px;
  }
  .blocky__summary{
    border-left: 1px solid #ccc;
    padding-left: 15px;
  }
  .blocky__title--summary{
    margin-top: 40px;
    margin-bottom: 12px;
  }
  input[type=text], input[type=email],input[type=number], textarea {
    width: 100%;
    padding: 12px 20px;
    margin: 8px 0;
    display: inline-block;
    border: 1px solid #ccc;
    box-sizing: border-box;
  }
  .bloky__form__controls--dropshipper{
    margin-top: 29px;
  }
  .blocky__inner--payment{
    position: absolute;
    bottom: 3vh;
  }
  .blocky__title{
    color: #FF8A00;
  }
  .blocky-wrapper{
    display: grid;
    grid-template-columns: auto auto auto auto;
    grid-gap: 20px;
    background-color: #fff;
    padding: 30px;
  }
  .blocky__title--hr{
    border-bottom: 9px solid #f1f1f1;
  }
  .blocky__inner--checkbox{
    text-align: right;
    margin-top: 40px;
    margin-right: 20px;
  }

</style>
