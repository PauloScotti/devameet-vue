<script lang="ts">
    import { defineComponent } from "vue";
    import ObjectsRoomVue from "../room/ObjectsRoom.vue";
    import { RoomServices } from "@/services/RoomServices";
    import router from "@/router";

    const roomServices = new RoomServices();
    
    export default defineComponent({
        data() {
            return {
                color: '',
                name: '',
                link: '',
                objects: [] as any
            }
        },
        components: { ObjectsRoomVue },
        async mounted() {
            try {
                if(!this.$route.params?.link) {
                    router.push({name: 'home'});
                }

                this.link = this.$route.params?.link as string;

                const result = await roomServices.getRoomByLink(this.link);

                if(!result || !result.data) {
                    return;
                }

                const {link, color, name, objects} = result.data;
                this.name = name;
                this.color = color;
                this.link = link;

                this.objects = objects.map((e: any) => {
                    return {...e, type: e?.name?.split('_')[0]}
                })
            } catch (e) {
                console.log('Erro ao obter dados da reunião', e);
            }
        },
        methods: {
            copyLink() {
                navigator.clipboard.writeText(window.location.href);
            }
        }
    });
</script>

<template>
    <div class="container-principal">
        <div class="container-room">
            <div class="resume" v-if="objects && objects.length > 0">
                <div @click="copyLink">
                    <span><strong>Reunião </strong>{{ link }}</span>
                    <img src="../../assets/images/copy.svg" />
                </div>
                <p :style="{ color }">{{ name }}</p>
            </div>
            <ObjectsRoomVue :objects="objects" v-if="objects && objects.length > 0" />
            <div class="empty" v-else>
                <img src="../../assets/images/empty.svg" />
                <p>Reunião não encontrada</p>
            </div>
        </div>
    </div>
</template>

<style src="@/assets/styles/principal.scss" lang="scss"></style>