<script lang="ts">
    import CustomInputVue from "@/components/general/CustomInput.vue";
    import { defineComponent } from "vue";
    import userIcon from '../assets/images/user.svg';
    import loginIcon from '../assets/images/mail.svg';
    import passwordIcon from '../assets/images/key.svg';
    import { RegisterServices } from '@/services/RegisterServices';
    import router from "@/router";
import AvatarInput from "@/components/general/AvatarInput.vue";

    const registerServices = new RegisterServices();

    export default defineComponent({
    components: { CustomInputVue, AvatarInput },
    setup(){
        return {
            userIcon,
            loginIcon,
            passwordIcon
        }
    },
    data(){
        return {
            name: '',
            email: '',
            password: '',
            confirm: '',
            image: '',
            error: '',
            loading: false
        }
    },
    computed:{
        buttonText(){
            return this.loading ? '...Carregando' : 'Salvar';
        }
    },
    methods:{
        setMail(v: string){
            this.email = v;
        },
        setName(v: string){
            this.name = v;
        },
        setPassword(v: string){
            this.password = v;
        },
        setConfirm(v: string){
            this.confirm = v;
        },
        setImage(v: string){
            this.image = v;
        },
        async doRegister(){
            const {email, name, password, confirm, image} = this;

            try{
                if(!name || !name.trim() ||
                !email || !email.trim() ||
                !confirm || !confirm.trim() ||
                !image || !image.trim() ||
                !password || !password.trim()){
                    return this.error = "Favor preencher todos os dados";
                }

                if(password !== confirm){
                    return this.error = "Senha e confirmação precisam ser iguais";
                }

                this.loading = true;

                const body = {
                    name,
                    email,
                    password,
                    avatar: image
                }

                await registerServices.register(body);
                this.loading = false;
                return router.push({name: 'login', query: {success: 'true'}});

            }catch(e:any) {
                console.log("Erro ao cadastrar o usuário", e)

                if(e?.response.data?.message){
                    this.error = e?.response.data?.message;
                } else {
                    this.error = 'Não foi possível cadastrar o usuário, tente novamente';
                }
            }

            this.loading = false
        }
    }
});
</script>

<template>
    <div class="container-public register">
        <img src="../assets/images/logo.svg" alt="Logo Devameet" class="logo">
        <form>
            <AvatarInput :image="image" @setImage="setImage" />
            <p v-if="error" class="error">{{ error }}</p>
            <CustomInputVue
                :icon="userIcon"
                alt="Nome Completo"
                name="Nome Completo"
                placeholder="Nome Completo"
                type="text"
                :model-value="name"
                @setInput="setName"
            />
            <CustomInputVue
                :icon="loginIcon"
                alt="E-mail"
                name="E-mail"
                placeholder="E-mail"
                type="text"
                :model-value="email"
                @setInput="setMail"
            />
            <CustomInputVue
                :icon="passwordIcon"
                alt="Senha"
                name="Senha"
                placeholder="Senha"
                type="password"
                :model-value="password"
                @setInput="setPassword"
            />
            <CustomInputVue
                :icon="passwordIcon"
                alt="Confirmar Senha"
                name="Confirmar Senha"
                placeholder="Confirmar Senha"
                type="password"
                :model-value="confirm"
                @setInput="setConfirm"
            />

            <button type="button" @click="doRegister">{{ buttonText }}</button>
            <div class="link">
                <p>Já possui uma conta?</p>
                <RouterLink to="/">Faça seu login agora!</RouterLink>
            </div>
        </form>
    </div>
</template>

<style src="@/assets/styles/public.scss" lang="scss"></style>