<script lang="ts">
    import { defineComponent } from "vue";
    import NavigationVue from "./Navigation.vue";

    export default defineComponent({
    components: { NavigationVue }
});
</script>

<template>
    <div class="container-footer">
        <NavigationVue />
    </div>
</template>

<style src="@/assets/styles/footer.scss" lang="scss"></style>