<template>
  <div>
   {{idClient}}
    <stripe-checkout
      ref="checkoutRef"
      mode="payment"
      :pk="publishableKey"
      :line-items="lineItems"
      :success-url="successURL"
      :amount="amount"
      :cancel-url="cancelURL"
      @loading="v => loading = v"
    />
    <button @click="submit">Pay now!</button>
  

  </div>
</template>


<script>
import { StripeCheckout } from '@vue-stripe/vue-stripe';
import axios from 'axios';
import Vue from "vue";
import VueJwtDecode from "vue-jwt-decode"
export default {
  components: {
    StripeCheckout,
  },
  data () {
    this.publishableKey = "pk_test_51KgsrTBLBTW0nqHlmnZRmo2EfH20auRISILV4xav0wDyHOxf0NERFfisLAJVfPU8qMPrcRvJVxgg3nkDWtVFhk4M00ZfHfqsTq";
    return {
      idClient : {},
      loading: false,
      lineItems: [
        {
          price: null, // The id of the one-time price you created in your Stripe dashboard
          quantity : 1
          
        },
      ],
      successURL: 'http://localhost:8080/success'
    };
  },
  methods: {
    submit () {
      // You will be redirected to Stripe's secure checkout page
      this.$refs.checkoutRef.redirectToCheckout();
    },
    getUserDetails() {
      // get token from localstorage
      let token = Vue.$cookies.get('token');
      
      if(token != null){
         try {
          //decode token here and attach to the user object
          let decoded = VueJwtDecode.decode(token);
          // console.log(decoded);
          this.idClient = decoded.id
          // this.user = decoded;    
          } catch (error) {
            // return error in production env
            console.log(error, 'error from decoding token')
          }
        }
      },
  },
  mounted(){
    axios.post(`http://localhost:3500/gestion/paiment/add/${this.idClient._id}`,{client :this.idClient}).then((res)=>{
      alert(this.idClient)
      this.lineItems[0].price = res.data.id
    }).catch((err)=>{
      console.log(err)
    })
  },
  created(){
    this.getUserDetails().then(()=>{
      
    })
  }
};
</script>