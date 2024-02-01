<script lang="ts">
    import { defineComponent } from "vue";
    import NavigationVue from "./Navigation.vue";

    export default defineComponent({
    components: { NavigationVue },
    props: {
        hide: Boolean
    }
});
</script>

<template>
    <div class="container-header" :class="{hide: hide}">
        <img src="../../assets/images/logo.svg" alt="Logo Devameet" class="logo">
        <NavigationVue />
    </div>
</template>

<style src="@/assets/styles/header.scss" lang="scss"></style>