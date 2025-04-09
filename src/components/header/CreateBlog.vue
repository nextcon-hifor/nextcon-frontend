<template>
  <div class="create-blog">
    <h1>블로그 글 작성</h1>

    <form @submit.prevent="submitBlog">
      <!-- 제목 -->
      <div>
        <label for="title">제목</label><br />
        <input id="title" v-model="title" placeholder="제목을 입력하세요" />
      </div>

      <!-- 카테고리, 언어, 파일 첨부 -->
      <div class="row">
        <div>
          <label for="category">카테고리</label><br />
          <select id="category" v-model="category">
            <option disabled value="">선택하세요</option>
            <option>tip</option>
            <option>news</option>
            <option>blog</option>
          </select>
        </div>

        <div>
          <label for="language">언어</label><br />
          <select id="language" v-model="language">
            <option disabled value="">선택하세요</option>
            <option>한국어</option>
            <option>English</option>
            <option>日本語</option>
            <option>Tiếng Việt</option>
          </select>
        </div>

        <div>
          <label for="file">파일 첨부</label><br />
          <input type="file" id="file" @change="handleFileUpload" />
        </div>
      </div>

      <!-- ✅ 소제목 입력 -->
      <div style="margin-top: 1rem;">
        <label>소제목</label>
        <div v-for="(subtitle, idx) in subtitles" :key="idx" style="margin-bottom: 0.5rem;">
          <input v-model="subtitles[idx]" placeholder="소제목을 입력하세요" />
        </div>
        <button type="button" @click="addSubtitle">+ 소제목 추가</button>
      </div>

      <!-- ✅ FAQ 입력 -->
      <div style="margin-top: 1rem;">
        <label>FAQ</label>
        <div v-for="(faq, idx) in faqs" :key="idx" style="margin-bottom: 1rem;">
          <input v-model="faq.question" placeholder="질문" style="width: 100%;" />
          <textarea v-model="faq.answer" placeholder="답변" style="width: 100%; margin-top: 0.5rem;" />
        </div>
        <button type="button" @click="addFaq">+ FAQ 추가</button>
      </div>

      <!-- ✅ 관련글 입력 -->
      <div style="margin-top: 1rem;">
        <label>관련 글</label>
        <div v-for="(link, idx) in relatedLinks" :key="idx" style="margin-bottom: 1rem;">
          <input v-model="link.url" placeholder="링크 주소" style="width: 100%;" />
          <input v-model="link.description" placeholder="링크 설명" style="width: 100%; margin-top: 0.5rem;" />
        </div>
        <button type="button" @click="addRelatedLink">+ 관련글 추가</button>
      </div>

      <!-- 제출 버튼 -->
      <button type="submit" style="margin-top: 1.5rem;">포스트</button>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const title = ref('');
const category = ref('');
const language = ref('');
const file = ref(null);

// 새로 추가된 데이터
const subtitles = ref(['']);
const faqs = ref([{ question: '', answer: '' }]);
const relatedLinks = ref([{ url: '', description: '' }]);

const handleFileUpload = (e) => {
  file.value = e.target.files[0];
};

const addSubtitle = () => {
  subtitles.value.push('');
};

const addFaq = () => {
  faqs.value.push({ question: '', answer: '' });
};

const addRelatedLink = () => {
  relatedLinks.value.push({ url: '', description: '' });
};

const submitBlog = () => {
  if (!title.value || !content.value) {
    alert('제목과 내용을 모두 입력해주세요.');
    return;
  }

  const blogData = {
    title: title.value,
    category: category.value,
    language: language.value,
    fileName: file.value?.name || '',
    subtitles: subtitles.value,
    faqs: faqs.value,
    relatedLinks: relatedLinks.value,
  };

  console.log('📝 블로그 제출:', blogData);
  alert('블로그가 임시로 저장되었습니다!');
};
</script>

<style scoped>
.create-blog {
  max-width: 700px;
  margin: 2rem auto;
  padding: 1.5rem;
  border: 1px solid #ddd;
  border-radius: 8px;
}
input,
textarea,
select {
  width: 100%;
  padding: 0.5rem;
  margin-bottom: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 4px;
}
.row {
  display: flex;
  gap: 1rem;
  margin-top: 1rem;
}
.row > div {
  flex: 1;
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
