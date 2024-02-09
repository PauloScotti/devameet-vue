<script lang="ts">
    import { defineComponent } from "vue";
    import MeetUserHeader from "./MeetUserHeader.vue";
    import MeetListVue from "./MeetList.vue";
    import ObjectsRoomVue from "../room/ObjectsRoom.vue";
    import { MeetServices } from "@/services/MeetServices";
import router from "@/router";

    const meetServices = new MeetServices();
    
    export default defineComponent({
        data() {
            return {
                link: '',
                objects: [] as any
            }
        },
        components: { MeetUserHeader, MeetListVue, ObjectsRoomVue },
        methods: {
            async getObjectsById(id: string) {
                if(id) {
                    const meetResult = await meetServices.getMeetById(id);

                    if(!meetResult?.data) {
                        return
                    }

                    this.link = meetResult.data.link;

                    const objects = await meetServices.getObjectsById(id);

                    if(objects?.data) {
                        this.objects = objects.data.map((e: any) => {
                            return {...e, type: e?.name?.split('_')[0]}
                        })
                    }
                }
            },
            navigateToRoom() {
                router.push('room/'+this.link);
            }
        }
    });
</script>

<template>
    <div class="container-principal">
        <div class="container-meet">
            <MeetUserHeader />
            <MeetListVue @selectItem="getObjectsById" />
        </div>
        <ObjectsRoomVue :objects="objects" v-if="objects && objects.length > 0" @enterRoom="navigateToRoom()" />
    </div>
</template>

<style src="@/assets/styles/principal.scss" lang="scss"></style>