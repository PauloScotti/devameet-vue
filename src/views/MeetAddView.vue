<script lang="ts">
    import HeaderVue from "../components/general/Header.vue";
    import FooterVue from "../components/general/Footer.vue";
    import { defineComponent } from "vue";
    import MeetAddVue from "@/components/meet/MeetAdd.vue";

    export default defineComponent({
    components: { HeaderVue, FooterVue, MeetAddVue }
});
</script>

<template>
    <HeaderVue />
    <MeetAddVue />
    <FooterVue />
</template>

<style lang="scss"></style>