<script lang="ts">
    import { defineComponent } from "vue";

    export default defineComponent({

    });
</script>

<template>
    <h1>Login</h1>
    <div class="container-public">
        <div class="logo">
            <img src="../assets/images/logo.svg" alt="Logo Devameet">
        </div>
        <form>
            <input type="email" name="E-mail" id="email" placeholder="E-mail">
            <input type="password" name="Senha" id="password" placeholder="Senha">
        </form>
    </div>
</template>