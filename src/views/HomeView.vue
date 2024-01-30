<script lang="ts">
    import HeaderVue from "../components/general/Header.vue";
    import FooterVue from "../components/general/Footer.vue";
    import { defineComponent } from "vue";

    export default defineComponent({
    components: { HeaderVue, FooterVue }
});
</script>

<template>
    <HeaderVue />
    <FooterVue />
</template>

<style lang="scss"></style>