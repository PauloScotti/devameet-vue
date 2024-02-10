<script lang="ts">
    import HeaderVue from "../components/general/Header.vue";
    import FooterVue from "../components/general/Footer.vue";
    import { defineComponent } from "vue";
import RoomHome from "@/components/room/RoomHome.vue";

    export default defineComponent({
    components: { HeaderVue, FooterVue, RoomHome }
});
</script>

<template>
    <HeaderVue />
    <RoomHome />
    <FooterVue />
</template>
