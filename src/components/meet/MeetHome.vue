<script lang="ts">
    import { defineComponent } from "vue";
    import MeetUserHeader from "./MeetUserHeader.vue";
    import MeetListVue from "./MeetList.vue";
    
    export default defineComponent({
    components: { MeetUserHeader, MeetListVue }
});
</script>

<template>
    <div class="container-principal">
        <div class="container-meet">
            <MeetUserHeader />
            <MeetListVue />
        </div>
    </div>
</template>

<style src="@/assets/styles/principal.scss" lang="scss"></style>