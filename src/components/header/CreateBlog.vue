<template>
    <div class="create-blog">
      <h1>블로그 글 작성</h1>
  
      <form @submit.prevent="submitBlog">
        <div>
          <label for="title">제목</label><br />
          <input id="title" v-model="title" placeholder="제목을 입력하세요" />
        </div>
  
        <div style="margin-top: 1rem;">
          <label for="content">내용</label><br />
          <textarea
            id="content"
            v-model="content"
            placeholder="내용을 입력하세요"
            rows="10"
            style="width: 100%;"
          />
        </div>
  
        <button type="submit" style="margin-top: 1.5rem;">작성 완료</button>
      </form>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  
  const title = ref('');
  const content = ref('');
  
  const submitBlog = () => {
    if (!title.value || !content.value) {
      alert('제목과 내용을 모두 입력해주세요.');
      return;
    }
  
    // 나중에 API 연결 가능
    console.log('📝 새 블로그 작성:', {
      title: title.value,
      content: content.value,
    });
  
    alert('블로그가 임시로 작성되었습니다!');
    title.value = '';
    content.value = '';
  };
  </script>
  
  <style scoped>
  .create-blog {
    max-width: 600px;
    margin: 2rem auto;
    padding: 1.5rem;
    border: 1px solid #ddd;
    border-radius: 8px;
  }
  input,
  textarea {
    width: 100%;
    padding: 0.5rem;
    border: 1px solid #ccc;
    border-radius: 4px;
  }
  button {
    padding: 0.5rem 1rem;
    background-color: #007acc;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }
  button:hover {
    background-color: #005fa3;
  }
  </style>
  