<template>
  <div class="mt-5">
    <stripe-checkout
      ref="checkoutRef"
      mode="payment"
      :pk="publishableKey"
      :line-items="lineItems"
      :success-url="successURL"

      @loading="v => loading = v"
    />
    <button @click="submit">Pay now!</button>
  </div>
</template>

<script>
import { StripeCheckout } from '@vue-stripe/vue-stripe';
export default {

  components: {
    StripeCheckout,
  },
  data(){

    this.publishableKey= "pk_test_51KgsrTBLBTW0nqHlmnZRmo2EfH20auRISILV4xav0wDyHOxf0NERFfisLAJVfPU8qMPrcRvJVxgg3nkDWtVFhk4M00ZfHfqsTq"
    
    return {
          loading: false,
          lineItems: [
            {
              price: 'price_1KhbYgBLBTW0nqHlmM58QtYr', // The id of the one-time price you created in your Stripe dashboard
              quantity: 1,
              
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

}
</script>

<style>

</style>