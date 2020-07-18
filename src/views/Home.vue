<template>
  <div class="home">
    <div class="container">
      <section v-if="step === 1">
        <ValidationObserver ref="observer" tag="form" @submit.prevent="submit">
          <div class="blocky-wrapper">
            <div class="blocky">
              <div class="blocky__inner">
                <h1 class="blocky__title blocky__title--hr">Shipment</h1>
              </div>
              <div class="bloky__inner">
                <form class="bloky__form"> 
                  <div class="bloky__form__group">
                    <ValidationProvider name="email" rules="required|email" v-slot="{ errors }">
                      <input v-model="formdata.email"
                        placeholder="Email"
                        name="email"
                        type="text"
                        >
                      <small>{{ errors[0] }}</small>
                    </ValidationProvider>
                  </div>
                  <div class="bloky__form__group">
                      <div class="bloky__form__controls">
                        <ValidationProvider name="Phone" rules="required" v-slot="{ errors }">
                          <VuePhoneNumberInput 
                            v-model="formdata.yourValue"
                            name="Phone"
                            default-country-code="ID" 
                            placeholder="Phone Number"
                          />
                          <small>{{ errors[0] }}</small>
                      </ValidationProvider>
                      </div>
                  </div>
                  <div class="bloky__form__group">
                      <div class="bloky__form__controls">
                        <ValidationProvider name="Address" rules="required" v-slot="{ errors }">
                          <textarea 
                            rows="6" 
                            type="text" 
                            placeholder="Delivery Address" 
                            name="Address"
                            maxlength="120"
                            v-model="formdata.delivery_addres" 
                            @keyup='charCount()'
                          />
                          <small>{{ errors[0] }}</small>
                        </ValidationProvider>
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
                          <validation-provider rules="required" v-slot="{ errors }">
                            <input v-model="formdata.name" name="name" type="text" placeholder="Dropshipper name"/>
                            <small>{{ errors[0] }}</small>
                          </validation-provider>
                      </div>
                  </div>
                  <div class="bloky__form__group">
                      <div class="bloky__form__controls">
                        <validation-provider name="Dropshipper phone number" rules="required" v-slot="{ errors }">
                          <VuePhoneNumberInput 
                            v-model="formdata.yourValue2" 
                            default-country-code="ID" 
                            placeholder="Dropshipper phone number"
                            />
                          <small>{{ errors[0] }}</small>
                        </validation-provider>
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
                          <!-- <input type="number" placeholder="Dropshipper phone number" name="phone" disabled /> -->
                          <VuePhoneNumberInput disabled/>
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
                  <h3 class="blocky__title blocky__title--summary">Total <strong class="blocky__copy__summary blocky__copy__summary--total">{{this.total_summary = this.cost_summary + this.fee_summary}}</strong></h3>                
                </div>
                <div class="blocky__inner">
                  <!-- <button type="submit" v-on:click="firstStep()" class="btn btn__orange">Continue to payment</button> -->
                  <button type="submit" class="btn btn__orange">Continue to payment</button>
                </div>
              </div>
            </div>
          </div>
        </ValidationObserver>
      </section>

      <section v-if="step === 2">
        <ValidationObserver ref="observer" tag="form" @submit.prevent="submit">
          <div class="payment">
            <div class="container">
              <div class="blocky-wrapper">
                <div class="blocky">
                  <div class="blocky__inner blocky__inner--back">
                    <h1 class="blocky__title blocky__title--hr">Shipment</h1>
                    <br>
                    <a href="" @click="goBack()" class="back">&larr; Back to delivery</a>
                  </div>
                  <div class="bloky__inner">
                    <form class="bloky__form"> 
                      <div class="bloky__form__group">
                          <div class="bloky__form__controls">

                          </div>
                      </div>
                      <div class="bloky__form__group">
                          <div class="bloky__form__controls" id="radioCustom">
                            <ValidationProvider name="Check payment" rules="required" v-slot="{ errors }">
                                <input class="checkbox-tools" value="gosend" type="radio" @click="pickedcustom1" v-model="picked1" name="Check payment" id="radiosend1">
                                <label class="for-checkbox-tools" for="radiosend1">
                                  <p class="p__send">GO-SEND</p>
                                  <p class="p__send--pay">{{pay_go_send}}</p>
                                </label>
                                <input class="checkbox-tools" value="jne" type="radio" @click="pickedcustom2" v-model="picked2" name="Check payment" id="radiosend2">
                                <label class="for-checkbox-tools" for="radiosend2">
                                  <p class="p__send">JNE</p>
                                  <p class="p__send--pay">{{pay_jne}}</p>
                                </label>
                                <input class="checkbox-tools" value="courir" @click="pickedcustom3" v-model="picked3" type="radio" name="Check payment" id="radiosend3">
                                <label class="for-checkbox-tools" for="radiosend3">
                                  <p class="p__send">Personal Courier</p>
                                  <p class="p__send--pay">{{pay_courier}}</p>
                                </label>
                                <span>{{ errors[0] }}</span>
                            </ValidationProvider>
                          </div>
                      </div>
                      <div class="blocky__inner">
                        <h1 class="blocky__title blocky__title--hr">Payment</h1>
                      </div>
                      <div class="bloky__form__group">
                          <div class="bloky__form__controls" id="radioCustom1">
                              <input class="checkbox-tools" value="e_wallet" type="radio" v-model="picked.e_wallet" name="tools1" id="radiopay1">
                              <label class="for-checkbox-tools" for="radiopay1">
                                <p class="p__send">e-Wallet</p>
                                <p class="p__send--pay"></p>
                              </label>
                              <input class="checkbox-tools" value="bank_transfer" type="radio" v-model="picked.bank_name" name="tools1" id="radiopay2">
                              <label class="for-checkbox-tools" for="radiopay2">
                                <p class="p__send">Bank Transfer</p>
                                <p class="p__send--pay"></p>
                              </label>
                              <input class="checkbox-tools" value="virtual_account" v-model="picked.virtual_number" type="radio" name="tools1" id="radiopay3">
                              <label class="for-checkbox-tools" for="radiopay3">
                                <p class="p__send">Virtual Account</p>
                                <p class="p__send--pay"></p>
                              </label>
                          </div>
                      </div>
                    </form>
                  </div>
                </div>

                <div class="blocky__checkbox">
                  <div class="blocky__inner blocky__inner--checkbox">
                    
                  </div>
                  <div class="bloky__inner">
                    <form class="bloky__form"> 
                      <div class="bloky__form__group">
                          <div class="bloky__form__controls bloky__form__controls--dropshipper">
                              <!-- <input type="text" placeholder="Dropshipper name" name="dropship_name" disabled/> -->
                          </div>
                      </div>
                      <div class="bloky__form__group">
                          <div class="bloky__form__controls">
                              <!-- <input type="number" placeholder="Dropshipper phone number" name="phone" disabled/> -->
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
                  <div class="blocky__estimation">
                    <small>Delivery estimation</small>
                    <p v-if="picked1" class="text__success">today by GO-SEND</p>
                    <p v-if="picked2" class="text__success">JNE: 2 days</p>
                    <p v-if="picked3" class="text__success">Personal Courier: 1 day</p>

                    <p v-else></p>
                  </div>
                  <div class="blocky__inner blocky__inner--payment">
                    <div class="blocky__inner--summary">
                      <p class="blocky__copy">Cost of goodss <strong class="blocky__copy__summary">{{cost_summary}}</strong></p>                
                      <p class="blocky__copy">Dropshipping Fee <strong class="blocky__copy__summary">{{fee_summary}}</strong></p>
                      <h3 class="blocky__title blocky__title--summary">Total <strong class="blocky__copy__summary">{{total_summary}}</strong></h3>                
                    </div>
                    <div class="blocky__inner">
                      <button type="submit" class="btn btn__orange">Continue to payment</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          </ValidationObserver>
      </section>

      <section v-if="step === 3">
        <h1>Success</h1>
      </section>
    </div>
  </div>
</template>

<script>
import Vue from 'vue';
import VuePhoneNumberInput from 'vue-phone-number-input';
import 'vue-phone-number-input/dist/vue-phone-number-input.css';
Vue.component('vue-phone-number-input', VuePhoneNumberInput);


export default {
  name: 'Home',
  components: {
    VuePhoneNumberInput
  },
  data: function () {
    return {
      step: 1,
      totalstep: 3,
      formdata: {},
      checked         : '',
      maxcharacter    : 120,
      totalcharacter  : 0,
      cost_summary    : 500000,
      fee_summary     : 5900,
      total_summary   : '',
      delivery_addres : '',
      picked1         : false,
      picked2         : false,
      picked3         : false,
      picked: {
        e_wallet      : '',
        bank_name     : '',
        virtual_number: ''
      },
      pay_go_send     : '15,000',
      pay_jne         : '9,000',
      pay_courier     : '29,000',
    }
  },
  methods: {
    charCount : function(){
      this.totalcharacter = this.maxcharacter - this.formdata.delivery_addres.length
    },
    async submit() {
      const valid = await this.$refs.observer.validate();
      if (valid) {
        this.savePreferDate();
        console.log("Form is valid");
      } else {
        // this.$swal.fire({
        //   icon: "error",
        //   title: "Sorry",
        //   text: "Please select Send as dropshipper"
        // });
        console.log("Form is invalid");
      }
    },
    savePreferDate(){
      this.step++;
    },

    goBack: function(){
      window.history.back();
      this.step--;
    },
    pickedcustom1: function(){
      this.picked1  = true;
      this.picked2  = false;
      this.picked3  = false;
    },
    pickedcustom2: function(){
      this.picked1  = false;
      this.picked2  = true;
      this.picked3  = false;
    },
    pickedcustom3: function(){
      this.picked1  = false;
      this.picked2  = false;
      this.picked3  = true;
    },

  }
}
</script>
<style scoped>

/* ❤  */

:root {
	--white: #ffffff;
	--light: #f0eff3;
	--black: #000000;
	--dark-blue: #1f2029;
	--dark-light: #353746;
	--red: #da2c4d;
	--yellow: #f8ab37;
	--grey: #ecedf3;
}

/* #Primary
================================================== */

body{
	width: 100%;
	background: var(--dark-blue);
	overflow-x: hidden;
    font-family: 'Poppins', sans-serif;
	font-size: 17px;
	line-height: 30px;
	-webkit-transition: all 300ms linear;
	transition: all 300ms linear; 
}

.p__send--pay{
  position: absolute;
  left: 7px;
}

.p__send{
  font-size: 10px;
  font-weight: bold;
  position: absolute;
  top: 0px;
  left: 8px;
}
::selection {
	color: var(--white);
	background-color: var(--black);
}
::-moz-selection {
	color: var(--white);
	background-color: var(--black);
}
mark{
	color: var(--white);
	background-color: var(--black);
}
.section {
  position: relative;
	width: 100%;
	display: block;
	text-align: center;
	margin: 0 auto;
}
.over-hide {
    overflow: hidden;
}
.z-bigger {
    z-index: 100 !important;
}


.background-color{
	position: fixed;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	background-color: var(--dark-blue);
	z-index: 1;
	-webkit-transition: all 300ms linear;
	transition: all 300ms linear; 
}

[type="radio"]:checked,
[type="radio"]:not(:checked){
	position: absolute;
	left: -9999px;
	width: 0;
	height: 0;
	visibility: hidden;
}

.checkbox-tools:checked + label,
.checkbox-tools:not(:checked) + label{
	position: relative;
	display: inline-block;
	padding: 20px;
	width: 111px;
  height: 23px;
	font-size: 14px;
	line-height: 20px;
	letter-spacing: 1px;
	margin: 0 auto;
	margin-left: 15px;
  border: 1px solid #999;
	margin-right: 5px;
	margin-bottom: 10px;
	text-align: center;
	border-radius: 4px;
	overflow: hidden;
	cursor: pointer;
	text-transform: uppercase;
	color: var(--white);
	-webkit-transition: all 300ms linear;
	transition: all 300ms linear; 
}
.checkbox-tools:not(:checked) + label{
	background-color: var(--dark-light);
	box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.1);
}
.checkbox-tools:checked + label{
	background-color: #E8FBF2;
	box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.2);
  border: 1px solid #1BD97B;
}
.checkbox-tools:not(:checked) + label:hover{
	box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.2);
}
.checkbox-tools:checked + label::before,
.checkbox-tools:not(:checked) + label::before{
	position: absolute;
	content: '';
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	border-radius: 4px;
	background-image: linear-gradient(298deg, var(--red), var(--yellow));
	z-index: -1;
}
.checkbox-tools:checked + label .uil,
.checkbox-tools:not(:checked) + label .uil{
	font-size: 24px;
	line-height: 24px;
	display: block;
	padding-bottom: 10px;
}

.checkbox:checked ~ .section .container .row .col-12 .checkbox-tools:not(:checked) + label{
	background-color: var(--light);
	color: var(--dark-blue);
	box-shadow: 0 1x 4px 0 rgba(0, 0, 0, 0.05);
}

.checkbox-budget:checked + label,
.checkbox-budget:not(:checked) + label{
	position: relative;
	display: inline-block;
	padding: 0;
	padding-top: 20px;
	padding-bottom: 20px;
	width: 260px;
	font-size: 52px;
	line-height: 52px;
	font-weight: 700;
	letter-spacing: 1px;
	margin: 0 auto;
	margin-left: 5px;
	margin-right: 5px;
	margin-bottom: 10px;
	text-align: center;
	border-radius: 4px;
	overflow: hidden;
	cursor: pointer;
	text-transform: uppercase;
	-webkit-transition: all 300ms linear;
	transition: all 300ms linear; 
	-webkit-text-stroke: 1px var(--white);
    text-stroke: 1px var(--white);
    -webkit-text-fill-color: transparent;
    text-fill-color: transparent;
    color: transparent;
}

.checkbox-tools:not(:checked) + label[data-v-fae5bece]:hover{
  border: 1px solid transparent;
}

.link-to-page {
	position: fixed;
    top: 30px;
    right: 30px;
    z-index: 20000;
    cursor: pointer;
    width: 50px;
}
.link-to-page img{
	width: 100%;
	height: auto;
	display: block;
}
</style>