<script lang="ts">
    import { defineComponent } from "vue";
    import MeetUserHeader from "../meet/MeetUserHeader.vue";
    import CustomInput from "../general/CustomInput.vue";
    import chainIcon from '../../assets/images/chain.svg';
import router from "@/router";
    
    export default defineComponent({
        setup(){
            return {
                chainIcon
            }
        },
        data() {
            return {
                link: '',
                error: ''
            }
        },
        methods: {
            setLink(v: string) {
                this.link = v;
            },
            navigateToRoom() {
                if(this.link && this.link.length > 8) {
                    return router.push('room/' + this.link);
                }
                return this.error = "Link inválido, por favor verifique!"
            }
        },
        components: { MeetUserHeader, CustomInput }
    });
</script>

<template>
    <div class="container-principal">
        <div class="container-meet">
            <MeetUserHeader />
            <p class="error" v-if="error && error.length > 0">{{ error }}</p>
            <CustomInput :icon="chainIcon" alt="Link" name="Link" placeholder="Informe o link da reunião para entrar" :model-value="link" @setInput="setLink">
            </CustomInput>
            <button @click="navigateToRoom">Entrar</button>
        </div>
    </div>
</template>

<style src="@/assets/styles/principal.scss" lang="scss"></style>