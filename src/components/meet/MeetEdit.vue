<script lang="ts">
    import { defineComponent } from "vue";
    import MeetAddEditHeaderVue from "./MeetAddEditHeader.vue";
    import router from "@/router";
    import { MeetServices } from "@/services/MeetServices";
    import MeetObjectPicker from "./MeetObjectPicker.vue";
    import waalIcon from "../../assets/images/wall.svg";
    import floorIcon from "../../assets/images/floor.svg";
    import rugIcon from "../../assets/images/rug.svg";
    import chairIcon from "../../assets/images/chair.svg";
    import couchIcon from "../../assets/images/couch.svg";
    import tableIcon from "../../assets/images/table.svg";
    import decorIcon from "../../assets/images/decor.svg";
    import plantsIcon from "../../assets/images/plants.svg";

    import objectAssetsJson from '../../assets/objects/objects.json';
    import MeetObjectsRoom from "./MeetObjectsRoom.vue";

    const meetServices = new MeetServices();
    
    export default defineComponent({
        setup(){
            return {
                mobile: window.innerWidth <= 992,
                waalIcon,
                floorIcon,
                rugIcon,
                chairIcon,
                couchIcon,
                tableIcon,
                decorIcon,
                plantsIcon,
                objectAssetsJson
            }
        },
        beforeCreate(){
            if(this.mobile) {
                router.push({name: 'home'});
            }
        },
        components: { MeetAddEditHeaderVue, MeetObjectPicker, MeetObjectsRoom },
        data(){
            return {
                index: 1,
                id: '' as any,
                meet: {} as any,
                objects: [] as any,
                selected: null as any
            }
        },
        async mounted() {
            try{
                if(!this.$route.params?.id) {
                    return router.push({name: 'home'});
                }

                this.id = this.$route.params.id;
                const result = await meetServices.getMeetById(this.id);

                if(!result?.data) {
                    return router.push({name: 'home'});
                }

                this.meet = result.data;

                const objects = await meetServices.getObjectsById(this.id);

                if(objects?.data) {
                    this.objects = objects.data.map((e: any) => {
                        return {...e, type: e?.name?.split('_')[0]}
                    })
                }

                }catch(e:any) {
                    console.log("Erro ao obter dados da reunião", e);
                }
        },
        methods: {
            setName(n: string) {
                this.meet.name = n;
            },
            setColor(c: string) {
                this.meet.color = c;
            },
            goBack() {
                router.back();
            },
            async updateMeet() {
                try{
                    if(this.meet.name.trim().length < 2 || !this.meet.name.trim() ||
                    this.meet.color.trim().length < 3 || !this.meet.color.trim()){
                        return;
                    }

                    const body = {
                        name: this.meet.name,
                        color: this.meet.color,
                        objects: this.objects,
                    }

                    await meetServices.updateMeet(this.id, body);

                    router.push('/');

                }catch(e:any) {
                    console.log("Erro ao atualizar reunião", e);
                }

            },
            setObject(object: any) {
                object._id = this.index++;
                if(object.selectMultiple === true) {
                    this.objects.push(object);
                } else {
                    const filtered = this.objects.filter((o: any) => o.type !== object.type);
                    filtered.push(object);
                    this.objects = filtered;
                }

                this.selected = object;
            },
            selectObject(object: any) {
                if(this.selected?._id === object._id) {
                    this.selected = null;
                } else {
                    this.selected = object;
                }
            },
            deleteObject(object: any) {
                if (object?._id) {
                    const filtered = this.objects.filter((o: any) => o._id !== object._id);
                    this.objects = filtered
                }
            },
            rotateObject(object: any) {
                const {selected, to} = object;

                if (selected?._id && (selected?.type === 'chair' || selected?.type === 'couch')) {
                    const index = this.objects.indexOf(selected);

                    if(to === 'left') {
                        switch(selected?.orientation) {
                            case 'back':
                                selected.orientation = 'left';
                                break;
                            case 'left':
                                selected.orientation = 'front';
                                break;
                            case 'front':
                                selected.orientation = 'right';
                                break;
                            case 'right':
                                selected.orientation = 'back';
                                break;
                            default: break;
                        }
                    } else {
                        switch(selected?.orientation) {
                            case 'back':
                                selected.orientation = 'right';
                                break;
                            case 'left':
                                selected.orientation = 'back';
                                break;
                            case 'front':
                                selected.orientation = 'left';
                                break;
                            case 'right':
                                selected.orientation = 'front';
                                break;
                            default: break;
                        }
                    }
                    
                    this.selected = selected;
                    this.objects[index] = selected;
                }
            },
            moveObject(object: any) {
                const {selected, to} = object;
                console.log(selected, to)

                if(selected?._id && selected?.type !== 'wall' && selected?.type !== 'floor') {
                    const index = this.objects.indexOf(selected);

                    switch(to) {
                        case 'up':
                            selected.y = selected.y > 0 ? selected.y - 1 : 0;
                            break;
                        case 'down':
                            selected.y = selected.y < 6 ? selected.y + 1 : 6;
                            break;
                        case 'left':
                            selected.x = selected.x > 0 ? selected.x - 1 : 0;
                            break;
                        case 'right':
                            selected.x = selected.x < 6 ? selected.x + 1 : 6;
                            break;
                        default: break;
                    }

                    this.selected = selected;
                    this.objects[index] = selected;
                }
            }
        },
        computed: {
            isFormValid(){
                return this.meet.color && this.meet.color.trim().length > 0 && this.meet.name && this.meet.name.trim().length > 0;
            },
            getFormValidClass(){
                if(!this.meet.color || this.meet.color.trim().length < 4 || !this.meet.name || this.meet.name.trim().length < 2) {
                    return 'disabled'
                }

                return '';
            },
        }
});
</script>

<template>
    <div class="container-principal">
        <div class="container-meet">
            <MeetAddEditHeaderVue :color="meet.color" :name="meet.name" @setColor="setColor" @setName="setName" />
            <div class="scroll">
                <MeetObjectPicker label="Paredes" :image="waalIcon" alt="Paredes" :asset="objectAssetsJson.wall" @setObject="setObject" />
                <MeetObjectPicker label="Pisos" :image="floorIcon" alt="Pisos" :asset="objectAssetsJson.floor" @setObject="setObject" />
                <MeetObjectPicker label="Tapetes" :image="rugIcon" alt="Tapetes" :asset="objectAssetsJson.rug" @setObject="setObject" />
                <MeetObjectPicker label="Mesas" :image="tableIcon" alt="Mesas" :asset="objectAssetsJson.table" @setObject="setObject" />
                <MeetObjectPicker label="Cadeiras" :image="chairIcon" alt="Cadeiras" :asset="objectAssetsJson.chair" @setObject="setObject" />
                <MeetObjectPicker label="Sofás" :image="couchIcon" alt="Sofás" :asset="objectAssetsJson.couch" @setObject="setObject" />
                <MeetObjectPicker label="Decorações" :image="decorIcon" alt="Decorações" :asset="objectAssetsJson.decor" @setObject="setObject" />
                <MeetObjectPicker label="Plantas" :image="plantsIcon" alt="Plantas" :asset="objectAssetsJson.nature" @setObject="setObject" />
            </div>
            <div class="actions">
                <span @click="goBack">Voltar</span>
                <button @click="updateMeet" :class="getFormValidClass" :disabled="!isFormValid">Salvar</button>
            </div>
        </div>
        <MeetObjectsRoom :objects="objects" :selected="selected" @selectObject="selectObject" @deleteObject="deleteObject" @rotateObject="rotateObject" @moveObject="moveObject" />
    </div>
</template>

<style src="@/assets/styles/principal.scss" lang="scss"></style>