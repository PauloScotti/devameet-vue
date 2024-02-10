<script lang="ts">
    import router from "@/router";
import { defineComponent } from "vue";
    
    export default defineComponent({
        setup(){
            return {
                mobile: window.innerWidth <= 992
            }
        },
        props: {
            meet: null as any,
            selectedId: String
        },
        methods: {
            getSelectedClsas(id: string) {
                if(id === this.selectedId) {
                    return 'selected';
                }
                return '';
            },
            goToRoom(){
                router.push('room/'+this.meet?.link);
            },
            goToEdit(){
                router.push('edit/'+this.meet?.id);
            },
            copyLink(){
                window.innerWidth <= 992 ? navigator?.clipboard?.writeText(this.meet?.link) : navigator?.clipboard?.writeText(window?.location?.href+this.meet?.link);
            }
        }
    });
</script>

<template>
    <div class="container-meet-list-item">
        <div class="meet" @click="!mobile && $emit('selectItem', meet?.id)">
            <div class="color" :style="{backgroundColor: meet.color}" />
            <span :class="getSelectedClsas(meet.id)">{{ meet.name }}</span>
        </div>
        <div class="actions">
            <img src="../../assets/images/link_list.svg" v-if="mobile" @click="goToRoom" alt="Entrar na reunião" />
            <img src="../../assets/images/copy.svg" alt="Copiar código da reunião" @click="copyLink" />
            <img src="../../assets/images/edit.svg" v-if="!mobile" alt="Editar a reunião" @click="goToEdit" />
            <img src="../../assets/images/thrash.svg" alt="Deletar a reunião" @click="$emit('selectToRemove', meet?.id)" />
        </div>
    </div>
</template>

<style src="@/assets/styles/meetListItem.scss" lang="scss"></style>