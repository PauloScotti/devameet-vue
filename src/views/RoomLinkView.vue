<script lang="ts">
    import HeaderVue from "../components/general/Header.vue";
    import FooterVue from "../components/general/Footer.vue";
    import RouterLink from "../components/room/RoomLink.vue";
    import { defineComponent } from "vue";
    import router from "@/router";

    export default defineComponent({
        setup(){
            return {
                mobile: window.innerWidth <= 992
            }
        },
        beforeCreate(){
            if(!this.mobile) {
                router.push({name: 'home'});
            }
        },
        components: { HeaderVue, FooterVue, RouterLink }
    });
</script>

<template>
    <HeaderVue />
    <RouterLink />
    <FooterVue />
</template>

<style lang="scss"></style>