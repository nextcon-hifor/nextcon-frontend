<script setup>
import { ref } from 'vue'
import { Editor, EditorContent } from '@tiptap/vue-3'
import StarterKit from '@tiptap/starter-kit'

// 에디터 인스턴스 생성
const editor = ref(new Editor({
  extensions: [StarterKit], // 기본 기능 확장
  content: '<p>Hello, World!</p>', // 초기 내용
}))
</script>

<template>
  <div>
    <div class="editor-toolbar">
      <button @click="editor.chain().focus().toggleBold().run()">Bold</button>
      <button @click="editor.chain().focus().toggleItalic().run()">Italic</button>
      <button @click="editor.chain().focus().toggleStrike().run()">Strike</button>
    </div>
    <EditorContent :editor="editor" />
  </div>
</template>

<style>
.editor-toolbar button {
  margin-right: 5px;
  padding: 5px;
  cursor: pointer;
}
</style>
