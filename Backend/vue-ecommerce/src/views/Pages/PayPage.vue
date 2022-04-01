<template>
  <div>
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
export default {
  components: {
    StripeCheckout,
  },
  data () {
    this.publishableKey = "pk_test_51KgsrTBLBTW0nqHlmnZRmo2EfH20auRISILV4xav0wDyHOxf0NERFfisLAJVfPU8qMPrcRvJVxgg3nkDWtVFhk4M00ZfHfqsTq";
    return {
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
  },
  created(){
    axios.post('http://localhost:3500/gestion/paiment/paiment').then((res)=>{
      this.lineItems[0].price = res.data.id
    }).catch((err)=>{
      console.log(err)
    })
  }
};
</script>