<script lang="ts">
    import HeaderVue from "../components/general/Header.vue";
    import FooterVue from "../components/general/Footer.vue";
    import { defineComponent } from "vue";
    import MeetEdit from "@/components/meet/MeetEdit.vue";

    export default defineComponent({
    components: { HeaderVue, FooterVue, MeetEdit }
});
</script>

<template>
    <HeaderVue />
    <MeetEdit />
    <FooterVue />
</template>

<style lang="scss"></style>