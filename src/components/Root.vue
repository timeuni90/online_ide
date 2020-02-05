<template>
  <div style="height: 100%; display: flex; flex-direction: column">
    <menu-component></menu-component>
    <div :style="{display: 'flex', height: '100%', flexGrow: 1}">
      <nav></nav>
      <explorer-component
        ref="explorer_vm"
        @created-file="openEditor"
        @node-click="openEditor"
        @rename-enter="renameEditorTag"
        @delete-node="deleteNode"
        :treeItemsProp="nodes">
      </explorer-component>
      <editor-component
        ref='editor_vm'
        :files-prop="files">
      </editor-component>
    </div>
    <footer></footer>
  </div>
</template>

<script>
import menuComponent from "./Menu.vue";
import explorerComponent from "./Explorer.vue";
import editorComponent from "./Editor.vue";
// 测试数据
var file = {
  id: 1,
  fileName: 'UserContriller.java',
  fileContent: 'hello',
  type: 'directory'
}
var files = [
  
]
var nodes = [
  {id: 1, label: 'node.js', type: 'directory', children: [{id: 2, label: 'vue.js', children: null, type: 'file', fileContent: 'vue.js'}]},
  {id: 3, label: 'main.js', type: 'directory', children: [{id: 4, label: 'index.html', children: null, type: 'file', fileContent: 'index.html'}]},
  {id: 5, label: 'User.class', type: 'directory', children: [{id: 6, label: 'vue.js', children: null, type: 'file', fileContent: 'main.js'}]}
]
export default {
  components: { menuComponent, explorerComponent, editorComponent },
  data: function() {
    return {files, nodes}
  },
  methods: {
    openEditor: function(node) {
      if(node.type === 'directory') {
        return
      }
      this.$refs.editor_vm.appendFile({
        id: node.id,
        fileName: node.label,
        fileContent: node.fileContent ? node.fileContent : ''
      })
    },
    renameEditorTag: function(node) {
      if(node.type === 'directory') {
        return
      }
      this.$refs.editor_vm.renameFile(node.id, node.label)
    },
    deleteNode: function(id) {
      this.$refs.editor_vm.removeFileById(id)
    }
  }
};
</script>

<style scoped>
nav {
  height: 100%;
  width: 70px;
  background-color: rgb(28, 32, 34);
  border-right: 2px solid rgb(17, 21, 24);
}
footer {
  height: 30px;
  width: 100%;
  background-color: rgb(28, 32, 34);
  border-top: 2px solid rgb(17, 21, 24);
}
</style>