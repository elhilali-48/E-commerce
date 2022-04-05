<template>
  <div>
    <form @submit.prevent="modifier">
      <div>
        <label for="password">nouveau mot de passe</label>
        <input
          type="password"
          id="password"
          placeholder="password"
          v-model="password"
        />
      </div>

      <div>
        <label for="password-confim">confirmer mot de passe</label>
        <input
          type="password"
          id="password-confirm0"
          placeholder="password"
          v-model="confirm"
        />
      </div>
      <button type="submit">{{ password }}</button>
    </form>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "Modifier-Password-Client",
  data() {
    return {
      password: "",
      confirm: "",
    };
  },
  methods: {
    modifier() {
      axios
        .put(
          `http://localhost:3500/client/modifiermdp/${this.$route.params.id}`,
          {
            password: this.password,
          }
        )
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>

<style></style>
