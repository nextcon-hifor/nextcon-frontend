<template>
    <!-- banner -->
    <div class="banner">
        <p class="banner-text1">New EVENT!</p>
        <p class="banner-title">Post your event</p>
        <p class="banner-text2">
            It is the first step in your new life in Korea. Enjoy!
        </p>
    </div>

    <!-- 방생성 -->
    <div class="login-container">
        <div class="row create-image">
            <div class="col-2 sub-icon">
                <img
                    src="../../../public/assets/img/icon_CreateEvent.png"
                    alt=""
                />
            </div>
            <div class="col sub-icon-text">
                <p class="sub-title">Event information</p>
                <p class="sub-text">
                    Please enter the necessary information for the successful
                    hosting of your event!
                </p>
            </div>
        </div>

        <div class="create-form">
            <form @submit.prevent="postEvent">
                <div class="form-group">
                    <div class="row half-input-row">
                        <div class="col-6">
                            <label for="EventCategory">Event Category</label>
                            <select v-model="form.category">
                                <option disabled hidden selected></option>
                                <option value="Social">Social</option>
                                <option value="Learning">Learning</option>
                                <option value="Food">Food</option>
                                <option value="Activities">Activities</option>
                                <option value="Trip">Trip</option>
                                <option value="Games">Games</option>
                                <option value="Art/Fashion">Art/Fashion</option>
                                <option value="Others">Etc..</option>
                            </select>
                        </div>
                        <div class="col-6">
                            <label for="EventType">Event type</label>
                            <select v-model="form.type">
                                <option disabled hidden selected></option>
                                <option value="FirstCome">First come</option>
                                <option value="Register">Register</option>
                            </select>
                        </div>
                    </div>
                </div>
                <div class="form-group">
                    <label for="">Event name</label>
                    <input
                        type="text"
                        v-model="form.name"
                        placeholder="ex. HiFor party"
                        required
                    />
                </div>

                <div class="form-group">
                    <div class="row half-input-row">
                        <div class="col-6">
                            <label for="">Event location</label>
                            <select v-model="form.location">
                                <option disabled hidden selected></option>
                                <option value="Jongno-gu">Jongno-gu</option>
                                <option value="Jung-gu">Jung-gu</option>
                                <option value="Yongsan-gu">Yongsan-gu</option>
                                <option value="Seongdong-gu">
                                    Seongdong-gu
                                </option>
                                <option value="Gwangjin-gu">Gwangjin-gu</option>
                                <option value="Dongdaemun-gu">
                                    Dongdaemun-gu
                                </option>
                                <option value="Jungnang-gu">Jungnang-gu</option>
                                <option value="Seongbuk-gu">Seongbuk-gu</option>
                                <option value="Gangbuk-gu">Gangbuk-gu</option>
                                <option value="Dobong-gu">Dobong-gu</option>
                                <option value="Nowon-gu">Nowon-gu</option>
                                <option value="Eunpyeong-gu">
                                    Eunpyeong-gu
                                </option>
                                <option value="Seodaemun-gu">
                                    Seodaemun-gu
                                </option>
                                <option value="Mapo-gu">Mapo-gu</option>
                                <option value="Yangcheon-gu">
                                    Yangcheon-gu
                                </option>
                                <option value="Gangseo-gu">Gangseo-gu</option>
                                <option value="Guro-gu">Guro-gu</option>
                                <option value="Geumcheon-gu">
                                    Geumcheon-gu
                                </option>
                                <option value="Yeongdeungpo-gu">
                                    Yeongdeungpo-gu
                                </option>
                                <option value="Dongjak-gu">Dongjak-gu</option>
                                <option value="Gwanak-gu">Gwanak-gu</option>
                                <option value="Seocho-gu">Seocho-gu</option>
                                <option value="Gangnam-gu">Gangnam-gu</option>
                                <option value="Songpa-gu">Songpa-gu</option>
                                <option value="Gangdong-gu">Gangdong-gu</option>
                                <option value="etc">etc</option>
                            </select>
                        </div>
                        <div class="col-6">
                            <label for="EventType">The Exact Address</label>
                            <input
                                type="text"
                                v-model="form.locationDetail"
                                placeholder=""
                                required
                            />
                        </div>
                    </div>
                </div>

                <div class="form-group">
                    <div class="row half-input-row">
                        <div class="col-6">
                            <label for="">Event Date</label>
                            <input type="date" v-model="form.date" required />
                        </div>
                        <div class="col-6">
                            <label for="">Event Time</label>
                            <input type="time" v-model="form.time" required />
                        </div>
                    </div>
                </div>

                <div class="form-group">
                    <label for="details">Event details</label>
                    <EditorContent
                        v-if="editor"
                        :editor="editor"
                        class="editor"
                    />
                </div>

                <!-- Dropzone 수정된 부분 -->
                <div class="form-group">
                    <label for="file-upload">Event Images</label>
                    <p>
                        The first image will be the main image of the event. (Up
                        to 5 photos)
                    </p>

                    <!-- 파일 입력 -->
                    <input
                        type="file"
                        id="file-upload"
                        multiple
                        accept="image/*"
                        @change="handleFileUpload"
                        style="display: none"
                    />

                    <!-- 클릭 가능한 업로드 박스 -->
                    <div
                        id="upload-box"
                        @click="triggerFileInput"
                        @dragover.prevent
                        @drop.prevent="handleDrop"
                        :class="[
                            'upload-box',
                            {
                                'upload-box-has-files':
                                    uploadedFiles.length > 0,
                            },
                        ]"
                    >
                        <div v-if="uploadedFiles.length === 0">
                            <i class="upload-icon"></i>
                            <span
                                >Click to upload or drag and drop files
                                here</span
                            >
                        </div>

                        <div v-else class="preview-container">
                            <!-- 메인 이미지 미리보기 (첫 번째 이미지) -->
                            <div
                                v-if="uploadedFiles.length > 0"
                                class="main-image-preview"
                            >
                                <img
                                    :src="uploadedFiles[0].preview"
                                    alt="Main Preview"
                                />
                                <div class="main-image-label">Main Image</div>
                            </div>
                            <!-- 나머지 이미지 미리보기 -->
                            <div class="additional-images-preview">
                                <div
                                    v-for="(file, index) in uploadedFiles.slice(
                                        1
                                    )"
                                    :key="index"
                                    class="additional-image"
                                >
                                    <img
                                        :src="file.preview"
                                        alt="Additional Preview"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                    <!-- 업로드된 파일 미리보기 및 제거 -->
                    <div class="file-list-container">
                        <div
                            v-for="(file, index) in uploadedFiles"
                            :key="index"
                            class="file-item"
                        >
                            <span class="file-name">
                                {{ index === 0 ? "(Main) " : ""
                                }}{{ file.name }}
                            </span>
                            <button
                                @click="removeFile(index)"
                                class="remove-file-btn"
                            >
                                Remove
                            </button>
                        </div>
                    </div>
                    <div v-if="uploadedFiles.length > 0" class="file-count">
                        {{ uploadedFiles.length }} of 5 images uploaded
                    </div>
                </div>
                <!-- 파일 업로드 부분 끝 -->

                <div class="form-group">
                    <div class="row half-input-row">
                        <div class="col-6">
                            <label for=""
                                >Number of participants (Minimun)</label
                            >
                            <input
                                type="number"
                                v-model="form.minParticipants"
                                placeholder="Minimum"
                                required
                            />
                        </div>
                        <div class="col-6">
                            <label for=""
                                >Number of participants (Maximum)</label
                            >
                            <input
                                type="number"
                                v-model="form.maxParticipants"
                                placeholder="Maximum"
                                required
                            />
                        </div>
                    </div>
                </div>

                <div class="form-group">
                    <label for="details">Question for Selection</label>
                    <textarea
                        class="ipnut-question"
                        id="editorTxt"
                        placeholder="Where are you from?"
                        v-model="form.question"
                    ></textarea>
                </div>

                <div class="form-group">
                    <label for="details">Price</label>
                    <input
                        type="number"
                        v-model="form.price"
                        placeholder="ex) 20,000KRW / All events must be approved on-site!"
                        required
                    />
                </div>

                <!-- 방생성 버튼 -->
                <div class="login-container-op2">
                    <div class="create-form-op2">
                        <div class="agreement-container">
                            <!-- 체크박스와 텍스트 -->
                            <label class="agreement-label">
                                Notice: Once an event post is published, it
                                cannot be edited
                            </label>
                            <label class="agreement-label">
                                I agree to include all additional fees in the
                                event details and understand that failing to do
                                so may result in penalties
                            </label>
                            <label class="agreement-label">
                                I have read the basic
                                <span
                                    @click="openPopup"
                                    class="usage-rules-link"
                                    >usage rules</span
                                >
                                of HiFor, and I agree with that.
                                <input
                                    type="checkbox"
                                    v-model="isChecked"
                                    class="agreement-checkbox"
                                />
                                <span class="checkbox-custom"></span>
                            </label>
                            <!-- Join Now 버튼 -->
                            <button
                                type="submit"
                                class="join-now-button-op2"
                                :disabled="!isChecked"
                            >
                                Submit event
                            </button>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    </div>
</template>

<script setup>
import { onBeforeUnmount, onMounted, ref, toRaw } from "vue";
import axios from "axios";
import { useRouter } from "vue-router";
import { Editor, EditorContent } from "@tiptap/vue-3";
import StarterKit from "@tiptap/starter-kit";
import { watch } from "vue";
// 폼 데이터 및 상태 관리
const form = ref({
    category: "",
    type: "",
    name: "",
    location: "",
    locationDetail: "",
    date: "",
    time: "",
    description: "",
    minParticipants: 0,
    maxParticipants: 0,
    question: "",
    price: 0,
    mainImage: "", // 첫 번째 이미지 URL
    images: [], // 나머지 이미지 URL 배열
});
const editor = ref(null); // 초기값을 null로 설정
onMounted(() => {
    editor.value = new Editor({
        extensions: [StarterKit],
        content: form.value.description,
        onUpdate: ({ editor }) => {
            form.value.description = editor.getHTML();
        },
    });
    console.log("Editor instance:", editor.value);
});
onBeforeUnmount(() => {
    if (editor.value) {
        editor.value.destroy();
    }
});

watch(
    () => form.value.description,
    (newVal) => {
        if (editor.value && editor.value.getHTML() !== newVal) {
            editor.value.commands.setContent(newVal);
        }
    }
);
const uploadedFiles = ref([]);
const maxFiles = 5;

const handleFileUpload = (event) => {
    const files = Array.from(event.target.files);
    processFiles(files);
};

const handleDrop = (event) => {
    const files = Array.from(event.dataTransfer.files);
    processFiles(files);
};

const processFiles = (files) => {
    // 파일 수 체크
    if (uploadedFiles.value.length + files.length > maxFiles) {
        alert(`You can upload up to ${maxFiles} files.`);
        return;
    }

    // 이미지 파일만 허용 (새로 추가)
    const imageFiles = files.filter((file) => file.type.startsWith("image/"));
    if (imageFiles.length !== files.length) {
        alert("Only image files are allowed.");
        return;
    }

    // 파일 처리
    imageFiles.forEach((file) => {
        if (file.size > 5 * 1024 * 1024) {
            // 5MB 제한 (새로 추가)
            alert(`File ${file.name} is too large. Max size is 5MB.`);
            return;
        }

        const reader = new FileReader();
        reader.onload = (e) => {
            uploadedFiles.value.push({
                file: file,
                name: file.name,
                preview: e.target.result,
            });
        };
        reader.readAsDataURL(file);
    });
};

const removeFile = (index) => {
    uploadedFiles.value.splice(index, 1);
};

const triggerFileInput = () => {
    document.getElementById("file-upload").click();
};

const router = useRouter(); // Vue Router에 접근
const userId = sessionStorage.getItem("userId");
const postEvent = async () => {
    try {
        if (form.value.maxParticipants <= form.value.minParticipants) {
            alert(
                "The maximum number of participants must be greater than the minimum number."
            );
            return;
        }
        if (form.value.minParticipants <= 0) {
            alert("Minumum participants can't be 0");
            return;
        }

        // 현재 날짜와 시간 가져오기
        const now = new Date();
        const eventDateTime = new Date(`${form.value.date}T${form.value.time}`);

        // 날짜와 시간이 현재보다 과거인지 확인
        if (eventDateTime < now) {
            alert("The event date and time must be in the future.");
            return;
        }

        // 이미지가 없는 경우 경고
        if (uploadedFiles.value.length === 0) {
            alert("Please upload at least one image for the event.");
            return;
        }

        // 이미지 업로드 처리
        const uploadedImageUrls = [];
        const loadingMessage = document.createElement("div");
        loadingMessage.className = "loading-message";
        loadingMessage.textContent = "Uploading images... Please wait.";
        document.body.appendChild(loadingMessage);

        try {
            for (const fileObj of uploadedFiles.value) {
                const rawFile = toRaw(fileObj.file);
                const formData = new FormData();
                formData.append("file", rawFile);
                const uploadResponse = await axios.post(
                    `${
                        import.meta.env.VITE_API_BASE_URL
                    }/events/upload-image-postEvent`,
                    formData,
                    {
                        headers: { "Content-Type": "multipart/form-data" },
                        withCredentials: true,
                    }
                );
                uploadedImageUrls.push(uploadResponse.data.imageUrl);
                loadingMessage.textContent = `Uploading images... (${uploadedImageUrls.length}/${uploadedFiles.value.length})`;
            }
        } finally {
            document.body.removeChild(loadingMessage);
        }

        // 이미지 URL 분리
        const mainImage =
            uploadedImageUrls.length > 0 ? uploadedImageUrls[0] : null;
        const images =
            uploadedImageUrls.length > 1 ? uploadedImageUrls.slice(1) : [];

        // 이벤트 데이터 구성
        const eventData = {
            category: form.value.category,
            type: form.value.type,
            name: form.value.name,
            location: form.value.location,
            locationDetail: form.value.locationDetail,
            date: form.value.date,
            time: form.value.time,
            description: form.value.description,
            minParticipants: form.value.minParticipants,
            maxParticipants: form.value.maxParticipants,
            question: form.value.question,
            price: form.value.price,
            mainImage: mainImage,
            images: images,
        };

        // 최종 데이터 구성
        const enrichedFormData = {
            ...toRaw(eventData),
            userId: userId,
        };

        console.log(
            "🔹 [DEBUG] enrichedFormData before request:",
            JSON.stringify(enrichedFormData, null, 2)
        );

        // 이벤트 생성 요청
        const response = await axios.post(
            `${import.meta.env.VITE_API_BASE_URL}/events/submit`,
            enrichedFormData,
            { withCredentials: true }
        );

        console.log("✅ [SUCCESS] Event created:", response.data);

        await router.push(`/events/${response.data.event.id}`);
    } catch (error) {
        console.error("❌ [ERROR] Failed to create event");

        if (error.response) {
            console.error("📌 [ERROR RESPONSE] Status:", error.response.status);
            console.error("📌 [ERROR RESPONSE] Data:", error.response.data);
            console.error(
                "📌 [ERROR RESPONSE] Headers:",
                error.response.headers
            );

            if (error.response.status === 401) {
                alert("Login is required.");
                window.location.href = `${
                    import.meta.env.VITE_BASE_URL
                }/logIn/`;
            } else if (error.response.status === 413) {
                alert("The image data is too big to upload");
                return;
            }
        } else if (error.request) {
            console.error(
                "📌 [ERROR REQUEST] No response received:",
                error.request
            );
        } else {
            console.error(
                "📌 [ERROR MESSAGE] Request setup issue:",
                error.message
            );
        }
    }
};

// 체크박스 상태
const isChecked = ref(false);

// 팝업 창 열기 함수
const openPopup = () => {
    const popupContent = `
      <html>
        <head>
          <title>Usage Rules</title>
          <style>
            body {
              font-family: Arial, sans-serif;
              line-height: 1.6;
              padding: 20px;
            }
            h3 {
              color: #333;
            }
            ul {
              padding-left: 20px;
            }
            li {
              margin-bottom: 10px;
            }
            p {
              margin-bottom: 10px;
            }
            .close-btn {
              margin-top: 20px;
              padding: 10px 20px;
              border: none;
              background-color: #007bff;
              color: white;
              border-radius: 5px;
              cursor: pointer;
            }
            .close-btn:hover {
              background-color: #0056b3;
            }
          </style>
        </head>
        <body>
          <h2>Usage Rules</h2>
  
          <h3>1. Platform Usage Rules</h3>
          <ul>
              <li>General Rules</li>
              <p>Event content and participation activities must comply with all legal and ethical standards.</p>
              <p>Users must communicate with respect and consideration for each other; discriminatory or violent behavior is strictly prohibited.</p>
              <p>HiFor relies on mutual trust between hosts and guests to ensure the smooth running of events and gatherings.</p>
          </ul>
  
          <h3>2. Event Rules</h3>
          <ul>
              <li>Host Responsibilities</li>
              <p>Event hosts must provide accurate information (schedule, location, participation conditions, etc.) and are responsible for any issues caused by incorrect information.</p>
              <li>Participant Responsibilities</li>
              <p>Event participants must maintain the reliability of their registered information and should avoid canceling without notice.</p>
              <li>Prohibited Activities</li>
              <p>Illegal activities or commercial promotions during events are strictly prohibited.</p>
          </ul>
  
          <h3>3. Privacy Protection</h3>
          <ul>
              <li>Personal Data Security</li>
              <p>The platform securely manages users' personal information and does not share it with third parties without consent.</p>
              <li>User Responsibility</li>
              <p>Users must handle their information carefully and must not infringe on the privacy of others.</p>
          </ul>
  
          <h3>4. Limitation of Liability</h3>
          <ul>
              <li>Event Responsibility</li>
              <p>The platform is not legally responsible for accidents or issues occurring within events hosted or attended by users.</p>
              <li>Voluntary Participation</li>
              <p>Participation in events is entirely voluntary, and the host and participants bear direct responsibility.</p>
          </ul>
  
          <h3>5. Participation Fees and Refund Policy</h3>
          <ul>
              <li>Refund Policy</li>
              <p>For events with participation fees, refunds may not be guaranteed due to the lack of a formal refund policy.</p>
              <p>In the absence of a clear refund policy, hosts are encouraged to communicate refund terms directly to participants before confirming their participation.</p>
              <li>Platform Role</li>
              <p>The platform will provide support for communication between hosts and participants regarding refunds but does not bear any responsibility for refund disputes.</p>
          </ul>
  
          <h3>6. Dispute Resolution</h3>
          <ul>
              <li>User Conflict Mediation</li>
              <p>In the event of conflicts between users, the platform may mediate from a neutral standpoint but does not bear ultimate responsibility.</p>
              <li>Legal Compliance</li>
              <p>Legal issues will be resolved according to the applicable local laws.</p>
              <li>Trust & Safety</li>
              <p>These rules aim to minimize foreseeable problems during platform usage and to establish a trustworthy environment for all users.</p>
          </ul>
  
          <button class="close-btn" onclick="window.close()">Close</button>
      </body>
  
      </html>
    `;

    const popupWindow = window.open(
        "",
        "Usage Rules",
        "width=600,height=700,scrollbars=yes,resizable=yes"
    );

    popupWindow.document.write(popupContent);
    popupWindow.document.close();
};
</script>

<!-- css -->
<style scoped>
/* 반응형 모바일 css */
@media screen and (max-width: 768px) {
    /* 기본 컨테이너 조정 */
    .login-container {
        flex-direction: column;
        padding: 20px;
        margin-top: 50px;
    }

    .create-image {
        width: 100%;
        height: auto;
        padding: 20px 0;
        text-align: center;
    }

    .create-form {
        width: 100%;
        padding: 20px;
        border-radius: 12px;
    }

    /* 배너 */
    .banner {
        text-align: center;
        padding: 20px 5px;
        margin-top: 50px;
    }
    .banner-text1 {
        font-size: 14px;
        color: #4457ff;
        margin: 0px;
    }
    .banner-title {
        font-size: 36px;
        font-weight: bold;
        color: #333;
        margin: 10px 0;
    }
    .banner-text2 {
        font-size: 14px;
        color: #5f687a;
        line-height: 1.5;
    }
    .sub-icon {
        display: none;
    }
    .sub-title {
        font-size: 24px;
        font-weight: 600;
    }

    /* 폼 그룹 */
    .form-group {
        margin-bottom: 15px;
    }
    .form-group label {
        font-size: 14px;
    }
    .form-group p {
        font-size: 12px;
    }
    .form-group input,
    .form-group select,
    .form-group textarea {
        width: 100%;
        font-size: 14px;
        border: 1px solid #ccc;
        border-radius: 12px;
        padding: 10px;
    }

    .form-group textarea {
        height: 150px;
    }

    .form-group input[type="file"] {
        padding: 5px;
        font-size: 14px;
    }
    /* 파일 업로드 관련 모바일 스타일 */
    .additional-image {
        width: calc(33.33% - 7px) !important;
    }
    main-image-preview {
        height: 150px !important;
    }

    .file-item {
        flex-direction: column !important;
        align-items: flex-start !important;
    }

    .file-name {
        max-width: 100% !important;
        margin-bottom: 5px !important;
    }

    .remove-file-btn {
        align-self: flex-end !important;
    }

    /* Dropzone 스타일 조정 */
    #upload-box {
        border: 2px dashed #ccc;
        padding: 15px;
        text-align: center;
        font-size: 14px;
    }

    #file-list img {
        width: 40px;
        height: 40px;
        object-fit: cover;
    }

    /* 버튼 */
    .join-now-button {
        width: 100%;
        padding: 12px;
        font-size: 16px;
        border-radius: 24px;
        margin-top: 10px;
        background-color: #4457ff;
        border: 1px solid #4457ff;
        color: #ffffff;
    }

    /* 하단 텍스트 */
    .agreement-label {
        width: 100%;
        font-size: 14px;
        text-align: center;
        margin-top: 10px;
    }

    /* 체크박스 스타일 */
    .agreement-container {
        display: flex;
        flex-direction: column;
        align-items: center;
        text-align: center;
    }

    .usage-rules-link {
        color: #4457ff;
        text-decoration: underline;
        cursor: pointer;
    }

    /* 제출 버튼 */

    .join-now-button-op2 {
        background-color: #4a68ff;
        color: white;
        border: none;
        border-radius: 50px;
        padding: 15px 40px;
        margin-top: 15px;
        margin-bottom: 15px;
        font-size: 18px;
        font-weight: bold;
        cursor: pointer;
        transition: all 0.3s ease;
    }

    .join-now-button-op2:disabled {
        background-color: #d6d6d6;
        cursor: not-allowed;
    }

    .join-now-button-op2:hover:not(:disabled) {
        background-color: #4457ff;
    }

    /* 참가자 수 입력 필드 크기 조정 */
    .form-group .half-input-row {
        flex-direction: column;
    }
    .form-group .half-input-row .col-6 {
        width: 100%;
    }
}

/* 웹 */
@media screen and (min-width: 769px) {
    /* header */
    .header-space {
        padding: 15px;
        max-width: 100%;
        width: 100%;
        justify-self: center;
    }
    .header-logo {
        max-width: 50%;
        font-size: 28px;
        font-weight: bold;
        color: #58c3ff;
    }
    .logo-hifor {
        width: 100px;
        margin-top: -20px;
    }
    .header-nav {
        max-width: 50%;
        text-align: right;
    }
    .header-nav-text {
        font-size: 18px;
        color: #58c3ff;
        padding: 15px;
        text-decoration: none;
        opacity: 1;
        transition: all 0.3s ease;
    }
    .header-nav-text:hover {
        font-size: 18px;
        color: #58c3ff;
        padding: 15px;
        text-decoration: none;
        opacity: 1;
        font-weight: 700;
    }
    .header-nav-btn {
        font-size: 18px;
        color: #58c3ff;
        text-decoration: none;
        padding: 10px 15px;
        margin: 0px 5px;
        text-decoration: none;
        border: 1px solid #58c3ff;
        border-radius: 32px;
        opacity: 1;
        transition: all 0.3s ease;
    }
    .header-nav-btn:hover {
        font-size: 18px;
        color: #58c3ff;
        text-decoration: none;
        padding: 10px 15px;
        margin: 0px 5px;
        text-decoration: none;
        border: 1px solid #58c3ff;
        border-radius: 32px;
        opacity: 1;
        font-weight: 700;
    }

    /* banner */
    .banner {
        padding: 25px 150px;
        padding-top: 105px;
    }
    .banner-text1 {
        color: #4457ff;
        font-size: 16px;
        font-weight: 400;
        text-align: center;
        margin: 0px;
    }
    .banner-text2 {
        color: #5f687a;
        font-size: 16px;
        font-weight: 400;
        text-align: center;
    }
    .banner-title {
        color: #333;
        font-size: 54px;
        font-weight: bold;
        text-align: center;
    }

    /* 방생성 */
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
        padding-top: 20px;
        padding-bottom: 0px;
        max-width: 720px;
        align-content: center;
        margin-top: 40px;
        border: 1px solid #e5ecf8;
        border-radius: 24px;
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

    .form-group p {
        font-size: 12px;
        color: #333;
    }

    .form-group input {
        width: 100%;
        height: 50px;
        padding: 10px;
        font-size: 16px;
        border: 1px solid #ccc;
        border-radius: 24px;
        box-sizing: border-box;
    }

    .form-group textarea {
        width: 100%;
        height: 50px;
        padding: 20px;
        font-size: 16px;
        border: 1px solid #ccc;
        border-radius: 24px;
        box-sizing: border-box;
    }

    .form-group form {
        width: 100%;
        padding: 20px;
        font-size: 16px;
        border: 1px solid #ccc;
        border-radius: 24px;
        box-sizing: border-box;
    }

    .form-group select {
        width: 100%;
        height: 50px;
        padding: 10px;
        font-size: 16px;
        border: 1px solid #ccc;
        border-radius: 24px;
        box-sizing: border-box;
    }

    .form-group .text {
        font-size: 16px;
        color: #555;
    }

    .form-group .plus {
        font-size: 14px;
        color: #555;
    }

    .password-group {
        position: relative;
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
        background-color: #4457ff;
        color: #fff;
        border: none;
        padding: 10px;
        width: 100%;
        height: 50px;
        font-size: 16px;
        border-radius: 24px;
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
        width: 100%;
        height: 150px;
        background-repeat: no-repeat;
        background-size: cover;
        background-position: bottom;
        border-radius: 24px;
        padding: 40px;
    }

    .code-btn-box {
        align-content: end;
    }
    .code-btn {
        background-color: #58c3ff;
        border: none;
        color: #ffffff;
        padding: 13px 26px;
        border-radius: 12px;
    }
    .sub-icon {
        text-align: center;
    }
    .sub-title {
        font-size: 30px;
        font-weight: 600;
    }
    .sub-text {
        color: #5f687a;
    }
    .ipnut-detail {
        min-height: 360px;
    }
    .ipnut-question {
        height: 120px !important;
        padding: 15px !important;
    }

    /* 컨테이너 스타일 */
    .agreement-container {
        display: flex;
        flex-direction: column;
        align-items: center;
        text-align: center;
        margin-top: 20px;
        font-family: Arial, sans-serif;
        padding-top: 30px;
    }

    /* 약관 텍스트 스타일 */
    .agreement-label {
        display: flex;
        align-items: center;
        font-size: 16px;
        color: #6c757d;
        margin-bottom: 20px;
        position: relative;
    }

    /* usage rules 링크 스타일 */
    .usage-rules-link {
        color: #4457ff;
        text-decoration: none;
        margin: 0 5px;
    }

    .usage-rules-link:hover {
        text-decoration: underline;
    }

    /* 커스텀 체크박스 스타일 */
    .agreement-container {
        display: flex;
        flex-direction: column;
        align-items: center;
        text-align: center;
        margin-top: 20px;
        font-family: Arial, sans-serif;
    }

    .usage-rules-link {
        color: #007bff;
        text-decoration: underline;
        cursor: pointer;
    }

    /* Join Now 버튼 스타일 */

    .join-now-button {
        background-color: #4a68ff;
        width: 100%;
        color: white;
        border: none;
        border-radius: 50px;
        padding: 15px 40px;
        margin-bottom: 40px;
        font-size: 18px;
        font-weight: bold;
        cursor: pointer;
        transition: all 0.3s ease;
    }

    .join-now-button:disabled {
        background-color: #d6d6d6;
        cursor: not-allowed;
    }

    .join-now-button:hover:not(:disabled) {
        background-color: #4457ff;
    }

    .join-now-button-op2 {
        background-color: #4a68ff;
        color: white;
        width: 300px;
        border: none;
        border-radius: 50px;
        padding: 15px 40px;
        margin-bottom: 40px;
        font-size: 18px;
        font-weight: bold;
        cursor: pointer;
        transition: all 0.3s ease;
    }

    .join-now-button-op2:disabled {
        background-color: #d6d6d6;
        cursor: not-allowed;
    }

    .join-now-button-op2:hover:not(:disabled) {
        background-color: #4457ff;
    }
    .editor {
        border: 1px solid #ddd;
        padding: 10px;
        border-radius: 5px;
    }
    /* 파일 업로드 관련 스타일 추가 (새로 추가) */
    .upload-box {
        border: 2px dashed #ccc;
        padding: 20px;
        text-align: center;
        cursor: pointer;
        border-radius: 12px;
        transition: all 0.3s ease;
        background-color: #f9f9f9;
        min-height: 120px;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
    }

    .upload-box:hover {
        border-color: #4457ff;
        background-color: #f0f5ff;
    }

    .upload-box-has-files {
        padding: 15px;
        height: auto;
    }

    .upload-icon {
        display: inline-block;
        width: 40px;
        height: 40px;
        background: url("/assets/img/icon_Upload.png") no-repeat center center;
        background-size: contain;
        margin-bottom: 10px;
    }
    /* 이미지 미리보기 컨테이너 */
    .preview-container {
        width: 100%;
        display: flex;
        flex-direction: column;
        gap: 10px;
    }

    /* 메인 이미지 미리보기 */
    .main-image-preview {
        position: relative;
        width: 100%;
        height: 200px;
        border-radius: 8px;
        overflow: hidden;
    }

    .main-image-preview img {
        width: 100%;
        height: 100%;
        object-fit: cover;
    }

    .main-image-label {
        position: absolute;
        top: 10px;
        left: 10px;
        background-color: rgba(74, 104, 255, 0.8);
        color: white;
        padding: 5px 10px;
        border-radius: 4px;
        font-size: 12px;
        font-weight: bold;
    }

    /* 추가 이미지 미리보기 */
    .additional-images-preview {
        display: flex;
        flex-wrap: wrap;
        gap: 10px;
    }

    .additional-image {
        width: calc(25% - 8px);
        height: 80px;
        border-radius: 6px;
        overflow: hidden;
    }

    .additional-image img {
        width: 100%;
        height: 100%;
        object-fit: cover;
    }

    /* 파일 목록 컨테이너 */
    .file-list-container {
        margin-top: 15px;
    }

    .file-item {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 8px 12px;
        background-color: #f5f5f5;
        border-radius: 6px;
        margin-bottom: 8px;
    }

    .file-name {
        font-size: 14px;
        color: #333;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        max-width: 70%;
    }

    .remove-file-btn {
        background-color: #ff4557;
        color: white;
        border: none;
        padding: 4px 8px;
        border-radius: 4px;
        cursor: pointer;
        font-size: 12px;
        transition: background-color 0.2s;
    }

    .remove-file-btn:hover {
        background-color: #e03040;
    }

    .file-count {
        font-size: 14px;
        color: #666;
        margin-top: 8px;
        text-align: right;
    }

    /* 로딩 메시지 스타일 */
    .loading-message {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: rgba(0, 0, 0, 0.7);
        color: white;
        font-size: 18px;
        z-index: 9999;
    }
}
</style>
