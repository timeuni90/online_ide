<template>
    <el-card
        tabindex="1000"
        v-show="menu.isShow"
        :style="{
            position: 'absolute',
            top: menu.positionY,
            left: menu.positionX,
            outline: 'none'
        }"
        shadow="always"
        :body-style="{
            padding: '15px 0',
            fontSize: '13px',
            cursor: 'pointer'
        }">
        <div
            class="menu-item"
            @click="$emit('create-file-click')">
            Create File
        </div>
        <div
            @click="$emit('create-directory-click')"
            class="menu-item">
            Creata Directory
        </div>
        <div
            @click="$emit('rename-click')"
            class="menu-item">
            Rename
        </div>
        <div
            @click="$emit('delete-click')"
            class="menu-item">
            Delete
        </div>
    </el-card>
</template>

<script>
import { Card } from "element-ui";
export default {
    components: {
        elCard: Card
    },
    props: {
        menu: {
            required: true,
            type: Object // positionX positionY isShow
        }
    }
};
</script>

<style scoped>
.menu-item {
    padding: 5px 0 5px 10px
}
.menu-item:hover {
    background-color: #409EFF;
    color: #FFFFFF
}
</style>