<template>
  <div class="editor">
    <div class="header" v-show="files.length">
      <span
        @click="currentFileId=file.id"
        v-for="file in files"
        :key="file.id"
        class="file-name"
        :class="{'file-active': file.isShow}">
        {{ file.fileName }}
        <i
          @click.stop="removeFileById(file.id)"
          class="el-icon-close">
        </i>
      </span>
    </div>
    <div style="height: 15px"></div>
    <div 
        class="main"
        v-show="file.isShow"
        v-for="file in files"
        :key="file.id">
      <div class="sider">
        <div class="number" v-for="item in file.lineNumbers" :key="item.id">{{item.number}}</div>
      </div>
      <textarea
        :id="file.id + textareaSuffix"
        v-model="file.fileContent"
        @input="inputContent"
        @keydown.tab.prevent>
      </textarea>
    </div>
  </div>
</template>

<script>
import uuidV1 from "uuid/v1";
export default {
  data: function() {
    return {
      files: this.filesProp.map(file => {
        return Object.assign(
          {},
          file,{isShow: false,lineNumbers: this.createLineNumbers(file.fileContent)})
      }),
      currentFileId: null,
      textareaSuffix: '-textarea'
    }
  },
  props: {
    filesProp: { // id, fileName, fileContent, isShow
      // type: 'Array',
      default: function() {
        return new Array()
      }
    },
    currentFileIdProp: {
      default: null
    }
  },
  watch: {
    currentFileId: {
      deep: true,
      handler: function(newId, oldId) {
        if(newId != undefined && newId != null) {
          var file = this.searchFileById(newId)
          if(file) {
            this.$set(file, 'isShow', true)
            setTimeout(() => {
              document.getElementById(newId+this.textareaSuffix).focus()
            }, 1)
          }
        }
        if(oldId != undefined && oldId != null) {
          var file = this.searchFileById(oldId)
          if(file) {
            this.$set(file, 'isShow', false)
          }
        }
      }
    }
  },
  methods: {
    createLineNumbers: function(text) {
      var lineNumbers = [{id: uuidV1(), number: 1}]
      var enterList = text.match(/\n/g)
      var enterQuantity =  enterList ? enterList.length : 0 
      for(var i=0; i<enterQuantity; i++) {
        lineNumbers.push({id: uuidV1(), number: i+2})
      }
      return lineNumbers
    },
    enter: function() {
      var fileLineNumbers = this.searchFileById(this.currentFileId).lineNumbers
      fileLineNumbers.push({id: uuidV1(), number: fileLineNumbers.length+1})
    },
    // 暴力搜索 /n 个数
    inputContent: function(eve) {
      var numbers = this.searchFileById(this.currentFileId).lineNumbers
      var enterQuantity = this.searchFileById(this.currentFileId).fileContent.match(/\n/g)
      enterQuantity = enterQuantity? enterQuantity.length: 0
      var delta = (enterQuantity + 1) - numbers.length
      if(delta > 0) {
        for(var i=0; i<delta; i++) {
          numbers.push({id: uuidV1(), number: numbers.length+1})
        }
      } else if(delta < 0) {
        for(var i=0-delta; i>0; i--) {
          numbers.pop()
        }
      }
    },
    searchFileById: function(id) {
      for(var i=0; i<this.files.length; i++) {
        if(this.files[i].id === id) {
          return this.files[i]
        }
      }
      return null
    },
    removeFileById: function(id) {
      for(var i=0; i<this.files.length; i++) {
        if(this.files[i].id === id) {
          if(this.files.splice(i, 1)[0].id === this.currentFileId) {
            this.currentFileId = 
              this.files.length ? this.files[i%this.files.length].id : null
          }
          return
        }
      }
    },
    appendFile: function(file) {
      if(!file) {
        return
      }
      this.currentFileId = file.id
      if(this.searchFileById(file.id)) {
        return
      }
      file.lineNumbers = this.createLineNumbers(file.fileContent)
      this.files.push(file)
    },
    renameFile: function(id, newName) {
      var file = this.searchFileById(id)
      if(file) {
        file.fileName = newName
      }
    }
  },
  created: function() {
    this.currentFileId =
      this.currentFileIdProp ?
        this.currentFileIdProp :
        this.files.length ?
          this.files[0].id : null
  }
}
</script>

<style scoped>
  .editor {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    font-size: 15px;
    background-color: #1c2022;
    font-family: consolas;
  }
  .header {
    height: 35px;
    width: 100%;
    background-color: rgb(17, 21, 24);
  }
  .main {
    flex-grow: 1;
    height: 100%;
    width: 100%;
    display: flex;
  }
  .file-name {
    display: inline-block;
    width: 120px;
    height: 100%;
    text-align: center;
    line-height: 35px;
    color: rgba(255, 255, 255, 0.5);
    cursor: pointer;
  }
  .file-name i {
    font-size: 10px;
  }
  .file-active {
    color: rgb(255, 255, 255) !important;
    background-color: #1c2022;
    border-bottom: rgb(38, 109, 77) 2px solid
  }
  .sider {
    width: 55px;
    height: 100%;
    margin-right: 26px;
  }
  .number {
    width: 55px;
    height: 20px;
    line-height: 20px;
    text-align: right;
    color: #858585;
  }
  textarea {
    height: 100%;
    width: 100%;
    font-size: 15px;
    font-family: consolas;
    color: #c6c6c6;
    line-height: 20px;
    background-color: #1c2022;
    resize: none;
    border: none;
    outline: none;
    caret-color: #66b9f4;
  }
</style>