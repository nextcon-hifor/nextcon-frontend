import axios from 'axios';
import { ref } from 'vue';
  
export default {
  name: 'FindUsername',
  setup() {
    const email = ref('');
    const message = ref('');

    const submitEmail = async () => {
      try {
        // 여기에 API 요청 로직을 추가합니다.
        const response = await axios.post(
            `${import.meta.env.VITE_API_BASE_URL}/user/findUsername`,
            { email: email.value },
            { withCredentials: true } // 인증 정보 포함
        );
        // 성공적으로 요청이 완료되었다고 가정하고 메시지를 설정합니다.
        
        message.value = `The request to find the ID has been completed. Your ID is "${response.data.username}".`;
        email.value = '';
      } catch (error) {
        // 오류가 발생했을 때의 메시지 설정
        message.value = 'Failed to find the ID. Please try again.';
      }
    };

    return {
      email,
      message,
      submitEmail,
    };
  },
};