<template>
  <div class="login-container">

    <div class="create-image">
      <p class="banner-title">
        Start real <br>
        Korean Life <br>
        from the <span style="color: #58C3FF;">HiFor.</span>
      </p>
    </div>

    <div class="create-form">
      <h1>Sign up</h1>
      <p>Your life in Korea becomes more enjoyable here!</p>

      <form @submit.prevent="handleRegister">
        <div class="form-group">
          <label for="email">User name</label>
          <input type="text" v-model="user.username" id="name" placeholder="ex.HiFor" required />
        </div>

        <div class="form-group">
          <div class="row half-input-row">
            <div class="col-6 email-box">
              <label for="email">Email</label>
              <input type="email" v-model="user.email" @input="checkEmailAvailability" placeholder="Email" required />
            </div>
            <div class="col-6 code-btn-box">
              <button class="code-btn" :disabled="isTimerRunning && buttonText !== 'Resend'" type="button"
                @click="sendEmailVerification">{{ buttonText }}</button>
            </div>
          </div>
        </div>
        <!-- 타이머 표시 -->
        <div v-if="isTimerRunning" class="timer">
          Resend available in {{ formattedTime }}
        </div>

        <div class="form-group" v-if="showVerificationInput">
          <div class="row half-input-row">
            <div class="col-6 email-box">
              <label for="code">Verification Code</label>
              <input type="text" v-model="verificationCodeInput" id="verificationCode" required />
            </div>
            <div class="col-6 code-btn-box">
              <button v-if="!isVerified" class="code-btn" type="button" @click="verifyCode">Verify</button>
              <button v-if="isVerified" class="code-btn" type="button">Verified</button>
            </div>
          </div>
        </div>


        <div class="form-group">
          <label for="id">ID</label>
          <input type="id" id="id" placeholder="Your ID" v-model="user.userId" @input="checkUserIdAvailability"
            required />
        </div>

        <div class="form-group password-group">
          <div class="row half-input-row">
            <div class="col-6">
              <label for="password">Password</label>
              <input type="password" v-model="user.password" id="password" placeholder="Password" required />
            </div>
            <div class="col-6">
              <label for="password">Comfirm Password</label>
              <input type="password" v-model="user.confirmPassword" id="password" placeholder="Password" required />
            </div>
          </div>
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
            <!-- 드롭다운 -->
            <multiselect class="dropdown-list" v-model="selectedCountry" :options="countries" label="name"
              track-by="code" placeholder="Search for a country..." :searchable="true" :allow-empty="false"
              @select="selectCountry" />
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
                I accept and agree to the <span class="popup-link" @click="openPopup(0)">Terms of
                  use</span> (Required)
              </span>
              <span v-else-if="index === 1">
                I accept and agree to the <span class="popup-link" @click="openPopup(1)">Privacy
                  policy.</span> (Required)
              </span>
              <span v-else-if="index === 2">
                I agree <span class="popup-link" @click="openPopup(2)">to collect and use personal
                  information for the purpose of receiving and promoting marketing.</span> (Optional)
              </span>
            </label>
            <input type="checkbox" v-model="checkbox.checked" />
          </div>
        </div>
        <button type="submit" class="btn-primary" :disabled="!requiredChecked">Sign up</button>

      </form>
    </div>

  </div>
</template>

<script setup>
import axios from 'axios';
import { reactive, ref, computed } from 'vue';
import debounce from 'lodash/debounce';
import { useRouter } from 'vue-router';
import Multiselect from "vue-multiselect";
import "vue-multiselect/dist/vue-multiselect.min.css";

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

const router = useRouter(); // Vue Router에 접근

const user = reactive({
  username: '',
  dob: '',
  gender: '',
  email: '',
  userId: '',
  password: '',
  confirmPassword: '',
  nationality: '',
});
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
const userIdAvailable = ref(true);
const emailAvailable = ref(true);
const showVerificationInput = ref(false);
const verificationCodeInput = ref('');
//const verificationCode = ref('');
const isVerified = ref(false);
const buttonText = ref('Send Code');
const isTimerRunning = ref(false);
const timeLeft = ref(300);
// 체크박스 리스트 (모든 체크박스를 "Accept All"에 포함)
const checkboxes = ref([
  { label: "Notice: Once an event post is published, it cannot be edited", checked: false },
  { label: "I agree to include all additional fees in the event details and understand that failing to do so may result in penalties", checked: false },
  { label: "I have read the basic usage rules of HiFor, and I agree with that.", checked: false },
]);

let timerInterval = null;



const formattedTime = computed(() => {
  const minutes = Math.floor(timeLeft.value / 60);
  const seconds = timeLeft.value % 60;
  return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
});

const startTimer = () => {
  isTimerRunning.value = true;

  if (timerInterval) clearInterval(timerInterval);

  timerInterval = setInterval(() => {
    if (timeLeft.value > 0) {
      timeLeft.value--;
    } else {
      clearInterval(timerInterval);
      isTimerRunning.value = false;
    }
  }, 1000);
};

const resetTimer = () => {
  timeLeft.value = 300;
  startTimer();
};


const checkUserIdAvailability = debounce(async () => {
  if (user.userId) {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/user/isUserId/${user.userId}`,
        { credentials: 'include' } // 인증 정보를 포함
      );

      const data = await response.json();
      userIdAvailable.value = data.available;
    } catch (error) {
      console.error('Error checking user ID availability:', error);
    }
  }
}, 500);

const checkEmailAvailability = debounce(async () => {
  if (user.email) {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/user/isEmail/${user.email}`,
        { credentials: 'include' } // 인증 정보를 포함
      );

      const data = await response.json();
      emailAvailable.value = data.available;
    } catch (error) {
      console.error('Error checking email availability:', error);
    }
  }
}, 500);

const sendEmailVerification = async () => {
  if (!emailAvailable.value) {
    alert('An account created with this email already exists');
    return;
  }
  try {
    const response = await axios.post(
      `${import.meta.env.VITE_API_BASE_URL}/mail/sendVerification`,
      {
        email: user.email,
      },
      {
        withCredentials: true, // 인증 정보를 포함
      }
    );

    if (response.status === 200 || response.status === 201) {
      showVerificationInput.value = true;
      buttonText.value = 'Resend';
      resetTimer();
      alert('The verification code has been sent to your email.');
    }
  } catch (error) {
    console.error('Error sending email verification:', error);
    alert('Failed to send the email.');
  }
};

const verifyCode = async () => {
  try {
    const response = await axios.post(
      `${import.meta.env.VITE_API_BASE_URL}/mail/verifyCode`,
      {
        email: user.email,
        code: verificationCodeInput.value,
      },
      {
        withCredentials: true, // 인증 정보를 포함
      }
    );

    if (response.status === 200 || response.status === 201) {
      isVerified.value = true;
      alert('Email verification has been completed.');
    }
  } catch (error) {
    console.error('Error verifying code:', error);
    alert('The verification code does not match.');
  }
};

const handleRegister = async () => {

  const idRegex = /^[a-zA-Z0-9]+$/;
  if (!idRegex.test(user.userId)) {
    alert('The username can only contain letters and numbers.');
    return;
  }

  if (user.password.length < 8) {
    alert('The password must be at least 8 characters long.');
    return;
  }

  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*]).{8,}$/;
  if (!passwordRegex.test(user.password)) {
    alert('The password must include uppercase and lowercase letters, numbers, and special characters');
    return;
  }

  if (!userIdAvailable.value) {
    alert('The userId is already in use.');
    return;
  }

  if (user.password !== user.confirmPassword) {
    alert('The passwords do not match.');
    return;
  }

  if (!isVerified.value) {
    alert('Email verification is required.');
    return;
  }

  try {
    await axios.post(
      `${import.meta.env.VITE_API_BASE_URL}/user/signUp`,
      user,
      {
        withCredentials: true, // 인증 정보를 포함
      }
    );

    alert('Sign-up completed!');
    router.push('/logIn'); // 로그인 후 메인 페이지로 이동
  } catch (error) {
    console.error('Error during sign-up:', error);
    alert('An error occurred during sign-up. Please try again.');
  }
};

// 필수 체크박스(첫 번째 & 두 번째)가 선택되었는지 확인하는 computed property (버튼 활성화 조건)
const requiredChecked = computed(() => checkboxes.value.slice(0, 2).every(cb => cb.checked));

// "Accept All" 버튼 클릭 시 모든 체크박스 선택/해제
const toggleAllCheckboxes = () => {
  const allChecked = checkboxes.value.every(cb => cb.checked);
  checkboxes.value.forEach(cb => cb.checked = !allChecked);
};

// 팝업 띄우기 기능 (index에 따라 다른 내용 표시)
const openPopup = (index) => {
  const popupContents = [
    `<h1>Terms of Service</h1>
      <h3>Article 1 (Purpose)</h3>
      <p>
        The purpose of these terms is to regulate the conditions, procedures, rights, obligations, and other necessary matters related to the use of the HiFor website (hereinafter referred to as the "Service").
      </p>
      <h3>Article 2 (Effect and Modification of Terms)</h3>
      <p>
        These terms apply to all users who wish to use the Service.<br>
        The Service may modify these terms, and any changes will be announced in advance through a notice. The modified terms will take effect after the notice.<br>
        If a user does not agree with the modified terms, they may discontinue the use of the Service and delete their account.<br>
      </p>
      <h3>Article 3 (Provision and Restriction of Service)</h3>
      <p>
        The Service operates without generating profit, and certain features (e.g., event participation, group <br>management, etc.) are only available to registered users.<br>
        The Service may restrict or suspend part of the Service due to technical defects, system maintenance, or other operational needs.<br>
      </p>
      <h3>Article 4 (User’s Obligations)</h3>
      <p>
        Users must not engage in the following actions:<br>
        •	Using or stealing another person’s information<br>
        •	Disrupting the operation of the Service or posting malicious content<br>
        •	Violating relevant laws or these terms and conditions<br>
        Users must comply with these terms and cooperate in the normal operation of the Service.<br>
      </p>
      <h3>Article 5 (User’s Content Responsibility and Copyright)</h3>
      <p>
        The copyright of the content posted by users on the Service belongs to the user. <br>
        Users guarantee that their content does not infringe the rights of others, and any violations will be the user’s responsibility.<br>
        The Service may modify or delete content without prior notice for operational reasons.<br>
      </p>
      <h3>Article 6 (Privacy Protection)</h3>
      <p>
        The Service will protect users' personal information in accordance with its privacy policy.<br>
        Users' personal information will only be used for the purpose of providing the Service, improving operations, and complying with legal obligations.<br>
      </p>
      <h3>Article 7 (Limitation of Liability)</h3>
      <p>
        The Service is not responsible for damages caused by technical defects, system errors, or data loss.<br>
        The Service does not directly intervene in communication or activities between users and is not responsible for any disputes arising from them.<br>
        The Service is not responsible for problems arising from third-party platforms or external links.<br>
      </p>
      <h3>Article 8 (Account Management and Withdrawal)</h3>
      <p>
        Users may delete their accounts at any time, and upon withdrawal, all user data will be deleted in accordance with the Service’s policies.<br>
        The Service may delete inactive accounts after prior notice.<br>
      </p>
      <h3>Article 9 (Governing Law and Jurisdiction)</h3>
      <p>
        All disputes related to these terms will be governed by the laws of the Republic of Korea.<br>
        In case of disputes, the Seoul Central District Court will have jurisdiction.<br>
      </p>
      <h3>Article 10 (Agreement Process)</h3>
      <p>
        By signing up as a member, users agree to these terms and the collection and use of personal information, thereby forming a service contract.<br>
        If a user withdraws consent to these terms during the use of the Service, they must delete their account.
      </p>
        `,

    `<h1>Supplementary Provisions</h1>
      <h3>These terms and conditions will be effective from Feb 16, 2025.</h3>
      <h3>Personal Information Agreement (Required)</h3>
      <p>
        Personal Information Collected <br>
        Required Information:<br>
        • Name, Date of Birth, Nationality, Email Address, Password<br>
        Optional Information:<br>
        • School, Interests in Groups/Events Categories, Profile Picture<br>
        Purpose of Collection<br>
        • Managing basic user information for platform use<br>
        • User identification and authentication<br>
        • Managing group/event registrations and participation<br>
        • Providing personalized services<br>
        • Managing groups and events<br>
        o Allowing hosts to view approved participants’ names and profile pictures<br>
        o Verifying eligibility for age-restricted events<br>
        o Recommending school-based groups and supporting interactions<br>
        • Service operation and improvement<br>
        o Analyzing user statistics and enhancing services for multinational users<br>
        o Providing group and event recommendations<br>
        • Compliance with legal obligations<br>
        o Preventing misuse, resolving disputes, and meeting legal requirements<br>
        Retention and Use Period of Personal Information<br>
        • Personal information will be destroyed immediately upon account deletion.<br>
        • However, if required by law, the following retention periods apply:<br>
        o Records of contracts or withdrawal of offers: 5 years<br>
        o Records of payment and supply of goods: 5 years<br>
        o Records of consumer complaints or dispute resolution: 3 years<br>
        Provision and Delegation of Personal Information<br>
        • In principle, personal information is not shared with external parties.<br>
        • However, with the user’s consent, it may be provided to third parties in the following cases:<br>
        o When event hosts request the names and profile pictures of approved participants<br>
        o Delegation to third parties for platform operations (e.g., email authentication services)<br>
        Consequences of Refusal to Consent<br>
        • Refusal to consent to required items may result in limitations on service usage.<br>
        • Refusal to consent to optional items will not affect service usage.<br>
      </p>
      `,

    `<h1>Consent to Receive Promotional Emails (Optional)</h1>
      <h3>Purpose of Collection and Use</h3>
      <p>
        • Providing recommendations for groups/events <br>
        • Announcing platform service updates and benefits<br>
        • Delivering promotions, discounts, and event information<br>
      </p>
      <h3>Retention and Use Period</h3>
      <p>
        • Promotional emails will cease immediately upon account deletion or upon request for unsubscribing.
      </p>
      <h3>Right to Opt-Out</h3>
      <p>
        • Users may opt out of receiving promotional emails at any time. <br>
        How to Opt-Out:<br>
        • Click the "Unsubscribe" button at the bottom of the email or contact Customer Support to request.<br>
      </p>
      <h3>References to Applicable Laws</h3>
      <p>
        • Referenced laws: Personal Information Protection Act, Articles 15 and 17, etc.
      </p>
      `,
  ];

  const popupWindow = window.open("", "Popup", "width=500,height=300,scrollbars=yes");
  popupWindow.document.write(`
      <html>
        <head>
          <title>Popup</title>
          <style>
            body { font-family: Arial, sans-serif; padding: 20px; line-height: 1.5; }
            h2 { color: #333; }
            p { margin-bottom: 10px; }
            button { margin-top: 20px; padding: 10px 20px; border: none; background-color: #007bff; color: white; border-radius: 5px; cursor: pointer; }
            button:hover { background-color: #0056b3; }
          </style>
        </head>
        <body>
          ${popupContents[index]}
          <button onclick="window.close()">Close</button>
        </body>
      </html>
    `);
  popupWindow.document.close();
};




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
    width: 20%;
  }

  .popup-link {
    text-decoration: underline;
    cursor: pointer;
  }
}
</style>