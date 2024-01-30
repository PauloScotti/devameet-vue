<script lang="ts">
    import CustomInputVue from "@/components/general/CustomInput.vue";
    import { defineComponent } from "vue";
    import loginIcon from '../assets/images/mail.svg';
    import passwordIcon from '../assets/images/key.svg';

    export default defineComponent({
    components: { CustomInputVue },
    setup(){
        return {
            loginIcon,
            passwordIcon
        }
    },
    data(){
        return {
            login: '',
            password: '',
            error: '',
            loading: false
        }
    },
    computed:{
        buttonText(){
            return this.loading ? '...Carregando' : 'Login';
        }
    }
});
</script>

<template>
    <div class="container-public">
        <img src="../assets/images/logo.svg" alt="Logo Devameet" class="logo">
        <form>
            <p v-if="error" class="error">{{ error }}</p>
            <CustomInputVue
                :icon="loginIcon"
                alt="Login"
                name="Login"
                placeholder="Login"
                type="text"
                :model-value="login"
            />
            <CustomInputVue
                :icon="passwordIcon"
                alt="Senha"
                name="Senha"
                placeholder="Senha"
                type="password"
                :model-value="password"
            />

            <button>{{ buttonText }}</button>
            <div class="link">
                <p>Não possui uma conta?</p>
                <RouterLink to="/register">Faça seu cadastro agora</RouterLink>
            </div>
        </form>
    </div>
</template>

<style src="@/assets/styles/public.scss" lang="scss"></style>