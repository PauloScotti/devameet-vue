<script lang="ts">
    import HeaderVue from "../components/general/Header.vue";
    import MeetHomeVue from "../components/meet/MeetHome.vue";
    import FooterVue from "../components/general/Footer.vue";
    import { defineComponent } from "vue";

    export default defineComponent({
    components: { HeaderVue, MeetHomeVue, FooterVue }
});
</script>

<template>
    <HeaderVue />
    <MeetHomeVue />
    <FooterVue />
</template>

<style lang="scss"></style>