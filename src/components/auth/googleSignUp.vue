<template xmlns="http://www.w3.org/1999/html">
  <div class="login-container">

    <div class="create-image">
      <p class="banner-title">
        Start real <br>
        Korean Life <br>
        from the <span style="color: #58C3FF;">HiFor.</span>
      </p>
    </div>

    <div class="create-form">
      <h1>Sign Up</h1>
      <p>Your life in Korea becomes more enjoyable here!</p>

      <form @submit.prevent="handleRegister">
        <div class="form-group">
          <label for="email">User name</label>
          <input type="text" v-model="name" placeholder="ex.HiFor" readonly />

        </div>
        <div class="form-group">
          <div class="row half-input-row">
            <div class="col-6 email-box">
              <label for="email">Email</label>
              <input type="email" v-model="user.email" placeholder="Email" readonly />
            </div>
          </div>
        </div>
        <div class="form-group">
          <label for="email">ID</label>
          <input type="text" v-model="user.userId" id="name" placeholder="ex.HiFor" required />
        </div>

        <div class="form-group">
          <div class="row half-input-row">
            <div class="col-6">
              <label for="email">Date of Birth</label>
              <input type="date" id="date" v-model="user.dob" required />
            </div>
            <div class="col-6">
              <label for="email">Gender</label>
              <select id="gender" v-model="user.gender" required>
                <option disabled hidden selected>Gender</option>
                <option value="male">Male</option>
                <option value="Female">Female</option>
              </select>
            </div>
          </div>
        </div>

        <div>
          <!-- 통합 검색 입력 필드 -->
          <div class="form-group">
            <label for="">Nationality</label>
            <input type="text" v-model="searchQuery" @focus="showDropdown = true" @blur="hideDropdown"
              @input="filterCountries" placeholder="Search for a country..." class="search-input" required />
            <!-- 드롭다운 -->
            <ul v-if="showDropdown" class="dropdown-list">
              <li v-for="country in filteredCountries.slice(0, 5)" :key="country.code"
                @mousedown="selectCountry(country)" class="dropdown-item">
                {{ country.name }}
              </li>
            </ul>
          </div>
        </div>


        <!-- 체크박스 동의 영역 -->
        <div class="row agree-box">
          <div class="col-12">
            <button type="button" class="agree-all" @click="toggleAllCheckboxes">Accept All</button>
          </div>

          <div v-for="(checkbox, index) in checkboxes" :key="index" class="checkbox-item">
            <label>
              <span v-if="index === 0">
                I accept and agree to the <span class="popup-link" @click="openPopup(0)">Terms of use</span> (Required)
              </span>
              <span v-else-if="index === 1">
                I accept and agree to the <span class="popup-link" @click="openPopup(1)">Privacy policy.</span>
                (Required)
              </span>
              <span v-else-if="index === 2">
                I agree <span class="popup-link" @click="openPopup(2)">to collect and use personal information for the
                  purpose of receiving and promoting marketing.</span> (Optional)
              </span>
            </label>
            <input type="checkbox" v-model="checkbox.checked" />
          </div>
        </div>
        <button type="button" class="btn-primary handel-register-btn" :disabled="!requiredChecked"
          @click="handleRegister">Sign up</button>

      </form>
    </div>

  </div>
</template>

<script setup>
import { jwtDecode } from 'jwt-decode';
import axios from 'axios';
import { ref, reactive, onMounted, computed } from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';

const user = reactive({
  email: '',
  userId: '',
  dob: '',
  gender: '',
  nationality: '',
});
const name = ref('');

const searchQuery = ref('');
const selectedCountry = ref({});
const showDropdown = ref(false);
const countries = ref([
  { code: 'AF', name: 'Afghanistan' },
  { code: 'AL', name: 'Albania' },
  { code: 'DZ', name: 'Algeria' },
  { code: 'AS', name: 'American Samoa' },
  { code: 'AD', name: 'Andorra' },
  { code: 'AO', name: 'Angola' },
  { code: 'AG', name: 'Antigua and Barbuda' },
  { code: 'AR', name: 'Argentina' },
  { code: 'AM', name: 'Armenia' },
  { code: 'AU', name: 'Australia' },
  { code: 'AT', name: 'Austria' },
  { code: 'AZ', name: 'Azerbaijan' },
  { code: 'BS', name: 'Bahamas' },
  { code: 'BH', name: 'Bahrain' },
  { code: 'BD', name: 'Bangladesh' },
  { code: 'BB', name: 'Barbados' },
  { code: 'BY', name: 'Belarus' },
  { code: 'BE', name: 'Belgium' },
  { code: 'BZ', name: 'Belize' },
  { code: 'BJ', name: 'Benin' },
  { code: 'BT', name: 'Bhutan' },
  { code: 'BO', name: 'Bolivia' },
  { code: 'BA', name: 'Bosnia and Herzegovina' },
  { code: 'BW', name: 'Botswana' },
  { code: 'BR', name: 'Brazil' },
  { code: 'BN', name: 'Brunei' },
  { code: 'BG', name: 'Bulgaria' },
  { code: 'BF', name: 'Burkina Faso' },
  { code: 'BI', name: 'Burundi' },
  { code: 'CV', name: 'Cabo Verde' },
  { code: 'KH', name: 'Cambodia' },
  { code: 'CM', name: 'Cameroon' },
  { code: 'CA', name: 'Canada' },
  { code: 'CF', name: 'Central African Republic' },
  { code: 'TD', name: 'Chad' },
  { code: 'CL', name: 'Chile' },
  { code: 'CN', name: 'China' },
  { code: 'CO', name: 'Colombia' },
  { code: 'KM', name: 'Comoros' },
  { code: 'CG', name: 'Congo (Republic)' },
  { code: 'CD', name: 'Congo (Democratic Republic)' },
  { code: 'CR', name: 'Costa Rica' },
  { code: 'CI', name: "Côte d'Ivoire" },
  { code: 'HR', name: 'Croatia' },
  { code: 'CU', name: 'Cuba' },
  { code: 'CY', name: 'Cyprus' },
  { code: 'CZ', name: 'Czech Republic' },
  { code: 'DK', name: 'Denmark' },
  { code: 'DJ', name: 'Djibouti' },
  { code: 'DM', name: 'Dominica' },
  { code: 'DO', name: 'Dominican Republic' },
  { code: 'EC', name: 'Ecuador' },
  { code: 'EG', name: 'Egypt' },
  { code: 'SV', name: 'El Salvador' },
  { code: 'GQ', name: 'Equatorial Guinea' },
  { code: 'ER', name: 'Eritrea' },
  { code: 'EE', name: 'Estonia' },
  { code: 'SZ', name: 'Eswatini' },
  { code: 'ET', name: 'Ethiopia' },
  { code: 'FJ', name: 'Fiji' },
  { code: 'FI', name: 'Finland' },
  { code: 'FR', name: 'France' },
  { code: 'GA', name: 'Gabon' },
  { code: 'GM', name: 'Gambia' },
  { code: 'GE', name: 'Georgia' },
  { code: 'DE', name: 'Germany' },
  { code: 'GH', name: 'Ghana' },
  { code: 'GR', name: 'Greece' },
  { code: 'GD', name: 'Grenada' },
  { code: 'GT', name: 'Guatemala' },
  { code: 'GN', name: 'Guinea' },
  { code: 'GW', name: 'Guinea-Bissau' },
  { code: 'GY', name: 'Guyana' },
  { code: 'HT', name: 'Haiti' },
  { code: 'HN', name: 'Honduras' },
  { code: 'HU', name: 'Hungary' },
  { code: 'IS', name: 'Iceland' },
  { code: 'IN', name: 'India' },
  { code: 'ID', name: 'Indonesia' },
  { code: 'IR', name: 'Iran' },
  { code: 'IQ', name: 'Iraq' },
  { code: 'IE', name: 'Ireland' },
  { code: 'IL', name: 'Israel' },
  { code: 'IT', name: 'Italy' },
  { code: 'JM', name: 'Jamaica' },
  { code: 'JP', name: 'Japan' },
  { code: 'JO', name: 'Jordan' },
  { code: 'KZ', name: 'Kazakhstan' },
  { code: 'KE', name: 'Kenya' },
  { code: 'KI', name: 'Kiribati' },
  { code: 'KP', name: 'North Korea' },
  { code: 'KR', name: 'South Korea' },
  { code: 'KW', name: 'Kuwait' },
  { code: 'KG', name: 'Kyrgyzstan' },
  { code: 'LA', name: 'Laos' },
  { code: 'LV', name: 'Latvia' },
  { code: 'LB', name: 'Lebanon' },
  { code: 'LS', name: 'Lesotho' },
  { code: 'LR', name: 'Liberia' },
  { code: 'LY', name: 'Libya' },
  { code: 'LI', name: 'Liechtenstein' },
  { code: 'LT', name: 'Lithuania' },
  { code: 'LU', name: 'Luxembourg' },
  { code: "MG", name: "Madagascar" },
  { code: "MW", name: "Malawi" },
  { code: "MY", name: "Malaysia" },
  { code: "MV", name: "Maldives" },
  { code: "ML", name: "Mali" },
  { code: "MT", name: "Malta" },
  { code: "MH", name: "Marshall Islands" },
  { code: "MR", name: "Mauritania" },
  { code: "MU", name: "Mauritius" },
  { code: "MX", name: "Mexico" },
  { code: "FM", name: "Micronesia" },
  { code: "MD", name: "Moldova" },
  { code: "MC", name: "Monaco" },
  { code: "MN", name: "Mongolia" },
  { code: "ME", name: "Montenegro" },
  { code: "MA", name: "Morocco" },
  { code: "MZ", name: "Mozambique" },
  { code: "MM", name: "Myanmar" },
  { code: "NA", name: "Namibia" },
  { code: "NR", name: "Nauru" },
  { code: "NP", name: "Nepal" },
  { code: "NL", name: "Netherlands" },
  { code: "NZ", name: "New Zealand" },
  { code: "NI", name: "Nicaragua" },
  { code: "NE", name: "Niger" },
  { code: "NG", name: "Nigeria" },
  { code: "MK", name: "North Macedonia" },
  { code: "NO", name: "Norway" },
  { code: "OM", name: "Oman" },
  { code: "PK", name: "Pakistan" },
  { code: "PW", name: "Palau" },
  { code: "PA", name: "Panama" },
  { code: "PG", name: "Papua New Guinea" },
  { code: "PY", name: "Paraguay" },
  { code: "PE", name: "Peru" },
  { code: "PH", name: "Philippines" },
  { code: "PL", name: "Poland" },
  { code: "PT", name: "Portugal" },
  { code: "QA", name: "Qatar" },
  { code: "RO", name: "Romania" },
  { code: "RU", name: "Russia" },
  { code: "RW", name: "Rwanda" },
  { code: "KN", name: "Saint Kitts and Nevis" },
  { code: "LC", name: "Saint Lucia" },
  { code: "VC", name: "Saint Vincent and the Grenadines" },
  { code: "WS", name: "Samoa" },
  { code: "SM", name: "San Marino" },
  { code: "ST", name: "Sao Tome and Principe" },
  { code: "SA", name: "Saudi Arabia" },
  { code: "SN", name: "Senegal" },
  { code: "RS", name: "Serbia" },
  { code: "SC", name: "Seychelles" },
  { code: "SL", name: "Sierra Leone" },
  { code: "SG", name: "Singapore" },
  { code: "SK", name: "Slovakia" },
  { code: "SI", name: "Slovenia" },
  { code: "SB", name: "Solomon Islands" },
  { code: "SO", name: "Somalia" },
  { code: "ZA", name: "South Africa" },
  { code: "SS", name: "South Sudan" },
  { code: "ES", name: "Spain" },
  { code: "LK", name: "Sri Lanka" },
  { code: "SD", name: "Sudan" },
  { code: "SR", name: "Suriname" },
  { code: "SE", name: "Sweden" },
  { code: "CH", name: "Switzerland" },
  { code: "SY", name: "Syria" },
  { code: "TW", name: "Taiwan" },
  { code: "TJ", name: "Tajikistan" },
  { code: "TZ", name: "Tanzania" },
  { code: "TH", name: "Thailand" },
  { code: "TL", name: "Timor-Leste" },
  { code: "TG", name: "Togo" },
  { code: "TO", name: "Tonga" },
  { code: "TT", name: "Trinidad and Tobago" },
  { code: "TN", name: "Tunisia" },
  { code: "TR", name: "Turkey" },
  { code: "TM", name: "Turkmenistan" },
  { code: "TV", name: "Tuvalu" },
  { code: "UG", name: "Uganda" },
  { code: "UA", name: "Ukraine" },
  { code: "AE", name: "United Arab Emirates" },
  { code: "GB", name: "United Kingdom" },
  { code: "US", name: "United States" },
  { code: "UY", name: "Uruguay" },
  { code: "UZ", name: "Uzbekistan" },
  { code: "VU", name: "Vanuatu" },
  { code: "VE", name: "Venezuela" },
  { code: "VN", name: "Vietnam" },
  { code: "YE", name: "Yemen" },
  { code: "ZM", name: "Zambia" },
  { code: "ZW", name: "Zimbabwe" },
  // 추가 국가 리스트
]);
const store = useStore(); // Vuex store에 접근
const router = useRouter(); // Vue Router 사용

const checkboxes = ref([
  {
    label: "I accept and agree to the Terms of use(Required)",
    checked: false,
  },
  {
    label: "I accept and agree to the Privacy policy(Required)",
    checked: false,
  },
  {
    label:
      "I agree to collect and use personal information for the purpose of receiving and promoting marketing. (Optional)",
    checked: false,
  },
]);
const selectCountry = (country) => {
  selectedCountry.value = country;
  searchQuery.value = country.name;
  user.nationality = country.name; // 선택된 국가의 이름을 user.nationality에 저장
  showDropdown.value = false;
}
const hideDropdown = () => {
  setTimeout(() => {
    showDropdown.value = false;
  }, 100); // 클릭 이벤트와 blur가 겹치지 않도록 약간의 지연
}

const filteredCountries = computed(() => {
  return countries.value.filter(country =>
    country.name.toLowerCase().includes(searchQuery.value.toLowerCase()))

})
// JWT 토큰 추출 및 디코딩
const decodeJwtFromUrl = () => {
  const urlParams = new URLSearchParams(window.location.search);
  const token = urlParams.get('token');
  if (token) {
    try {
      const decodedToken = jwtDecode(token);
      user.username = decodedToken.name || '';
      user.email = decodedToken.email || '';
    } catch (error) {
      console.error('Invalid token:', error);
    }
  }
};

// 필수 체크박스(첫 번째 & 두 번째)가 선택되었는지 확인하는 computed property (버튼 활성화 조건)
const requiredChecked = computed(() => {
  const result = checkboxes.value.slice(0, 2).every(cb => cb.checked);
  console.log('requiredChecked 값:', result); // ✅ 값이 변경되는지 확인
  return result;
});


// 회원가입 처리 함수
const handleRegister = async () => {

  console.log(requiredChecked)
  if (!requiredChecked) {
    alert('You must agree to the required terms to sign up.');
    console.log('hihiS')
    return; // 제출 중단
  }
  console.log('핸들레지스터의 유저:', user)
  try {
    const response = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/user/googleSignUp`, user);
    console.log('회원가입 응답:', response.data);
    alert('Sign-up completed!');

    // JWT 토큰 저장
    store.commit('setToken', response.data.access_token); // Vuex 상태에 저장
    store.commit('setUserId', user.userId);
    sessionStorage.setItem('token', response.data.access_token);

    router.push('/');
  } catch (error) {
    console.error('회원가입 오류:', error);
    alert('An error occurred during sign-up. Please try again.');
  }
};

// 체크박스 전체 선택/해제
const toggleAllCheckboxes = () => {
  const allChecked = checkboxes.value.every((cb) => cb.checked); // 모든 체크박스가 체크 상태인지 확인
  checkboxes.value.forEach((cb) => {
    cb.checked = !allChecked; // 모두 체크/해제 상태로 변경
  });
};

// 컴포넌트가 마운트될 때 실행
onMounted(() => {
  decodeJwtFromUrl();
  const urlParams = new URLSearchParams(window.location.search);
  user.email = urlParams.get('email') || ''; // 값이 없으면 빈 문자열
  name.value = urlParams.get('name') || '';   // 값이 없으면 빈 문자열
});

</script>

<!-- css -->
<style scoped>
/* 반응형 모바일 css */
@media screen and (max-width:768px) {
  .create-image {
    display: none;
  }

  .login-container {
    padding: 15px;
    padding-top: 30px;
    margin-top: 50px;
    justify-items: center;
  }

  .create-form h1 {
    color: #58C3FF;
    text-align: center;
  }

  .create-form p {
    color: #555;
    text-align: center;
    padding: 5px 50px;
  }

  .create-form label {
    font-size: 14px;
    color: #555;
    width: 100%;
  }

  .create-form input {
    width: 100%;
    font-size: 14px;
    border: 1px solid #ccc;
    border-radius: 12px;
    padding: 10px;
  }

  .create-form select {
    width: 100%;
    font-size: 14px;
    border: 1px solid #ccc;
    border-radius: 12px;
    padding: 10px;
  }

  .email-box {
    width: 60%;
  }

  .code-btn-box {
    align-content: end;
    width: 40%;
  }

  .code-btn {
    background-color: #58C3FF;
    border: none;
    color: #FFFFFF;
    padding: 10px 8px;
    border-radius: 12px;
    font-size: 14px;
  }

  .agree-box {
    margin-top: 30px;
  }

  .agree-all {
    background-color: #58C3FF;
    border: none;
    border-radius: 16px;
    font-size: 15px;
    color: #fff;
    padding: 3px;
    padding-left: 9px;
    padding-right: 9px;
    margin-bottom: 16px;
  }

  .agree-text1 {
    background: none;
    border: none;
    font-size: 14px;
    color: #5F687A;
    text-align: left;
    text-decoration: underline;
  }

  .agree-cb-box {
    padding: 0px;
    align-content: center;
  }

  .agree-cb {
    width: 12px;
    height: 12px;
  }

  .btn-primary {
    background-color: #58C3FF;
    color: #fff;
    border: none;
    padding: 10px;
    width: 100%;
    height: 50px;
    font-size: 16px;
    border-radius: 12px;
    cursor: pointer;
    margin: 20px 0px;
    transition: all 0.3s ease;
  }

  .popup-link {
    text-decoration: underline;
  }

  .checkbox-item {
    align-items: center;
  }

  .checkbox-item label {
    width: 90%;
  }

  .checkbox-item input {
    width: 14px;
  }
}

/* 웹 */
@media screen and (min-width:769px) {
  .checkbox-item label {
    width: min-content;
    min-width: 420px;
  }

  .checkbox-item input {
    width: 15px;
    height: 100%;
  }

  .login-container {
    display: flex;
    background: #fff;
    border-radius: 10px;
    overflow: hidden;
    width: 100%;
    min-height: 680px;
    padding: 30px 150px;
    max-width: 1470px;
    justify-self: center;

  }

  .create-form {
    flex: 1;
    padding: 40px;
    max-width: 720px;
    align-content: center;
  }

  .login-form h1 {
    font-size: 36px;
    font-weight: bold;
    margin-bottom: 10px;
  }

  .login-form p {
    color: #777;
    margin-bottom: 20px;
  }

  .form-group {
    margin-bottom: 20px;
  }

  .form-group label {
    display: block;
    font-size: 14px;
    margin-bottom: 5px;
    color: #333;
  }

  .form-group input {
    width: 100%;
    height: 50px;
    padding: 10px;
    font-size: 16px;
    border: 1px solid #ccc;
    border-radius: 12px;
    box-sizing: border-box;
  }

  .form-group select {
    width: 100%;
    height: 50px;
    padding: 10px;
    font-size: 16px;
    border: 1px solid #ccc;
    border-radius: 12px;
    box-sizing: border-box;
  }

  .password-group {
    position: relative;
  }

  .toggle-password {
    position: absolute;
    right: 10px;
    top: 50%;
    transform: translateY(-50%);
    cursor: pointer;
  }

  .form-options {
    display: flex;
    align-items: center;
    margin-bottom: 20px;
  }

  .form-options label {
    font-size: 16px;
    color: #555;
  }

  .btn-primary {
    background-color: #58C3FF;
    color: #fff;
    border: none;
    padding: 10px;
    width: 100%;
    height: 50px;
    font-size: 16px;
    border-radius: 12px;
    cursor: pointer;
    margin-bottom: 20px;
    transition: all 0.3s ease;
  }

  .btn-primary:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  }

  .divider {
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 20px 0;
    color: #aaa;
  }

  .divider span {
    background: #fff;
    padding: 0 10px;
  }

  .create-image {
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    background-image: url('/assets/img/img_LogInBanner2.png');
    width: 100%;
    background-repeat: no-repeat;
    background-size: cover;
    background-position: bottom;
    border-radius: 24px;
    margin: 10px;
  }

  .banner-title {
    width: 100%;
    height: 100%;
    padding: 45px;
    font-size: 48px;
    font-weight: bold;
    color: #FFFFFF;
  }

  .code-btn-box {
    align-content: end;
  }

  .code-btn {
    background-color: #58C3FF;
    border: none;
    color: #FFFFFF;
    padding: 13px 26px;
    border-radius: 12px;
  }


  .agree-box {
    margin-top: 64px;
    margin-bottom: 48px;
  }

  .agree-all {
    background-color: #58C3FF;
    border: none;
    border-radius: 16px;
    font-size: 15px;
    color: #fff;
    padding: 3px;
    padding-left: 9px;
    padding-right: 9px;
    margin-bottom: 16px;
  }

  .agree-text1 {
    background: none;
    border: none;
    color: #5F687A;
    text-align: left;
    text-decoration: underline;
  }

  .agree-cb-box {
    align-content: center;
  }

  .agree-cb {
    accent-color: #58C3FF;
  }

  .ca-btn-box {
    text-align: center;
    margin-top: 90px;
    margin-bottom: 120px;
  }

  .ca-btn {
    font-size: 20px;
    border: none;
    background-color: #58C3FF;
    border-radius: 16px;
    padding: 12px;
    padding-left: 48px;
    padding-right: 48px;
    color: #fff;
  }

  .dropdown-list {
    position: absolute;
    background-color: #fff;
  }

  .popup-link {
    text-decoration: underline;
    cursor: pointer;
  }

  .handel-register-btn:disabled {
    background-color: #ccc;
    /* 비활성화 시 배경 회색 */
    cursor: not-allowed;
    /* 마우스 커서 비활성화 */
    opacity: 0.6;
    /* 흐리게 */
  }
}
</style>