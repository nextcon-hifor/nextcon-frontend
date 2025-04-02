import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import axios from 'axios';

export default {
  name: 'PasswordChange',
  setup() {
    const router = useRouter();
    const userId = ref('');
    const currentPassword = ref('');
    const newPassword = ref('');
    const confirmPassword = ref('');
    const isCurrentPasswordValid = ref(false);
    const isCurrentPasswordVisible = ref(false); // Current password visibility state
    const isNewPasswordVisible = ref(false); // New password visibility state
    const isConfirmNewPasswordVisible = ref(false); // Confirm new password visibility state

    const checkCurrentPassword = async () => {
      try {
        const response = await axios.post(
            `${import.meta.env.VITE_API_BASE_URL}/user/checkCurrentPassword`,
            {
              userId: userId.value,
              password: currentPassword.value,
            },
            {
              withCredentials: true, // 인증 정보를 포함
            }
        );


        if (response.data.valid) {
          isCurrentPasswordValid.value = true;
        } else {
          alert('The current password is incorrect.');
        }
      } catch (error) {
        alert('An error occurred while verifying the password.');
      }
    };

    const handleSubmit = async () => {
      const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*]).{8,}$/;
      if (!passwordRegex.test(newPassword.value)) {
        alert('The new password must include uppercase, lowercase, numbers, and special characters, and be at least 8 characters long.');
        return;
      }

      if (newPassword.value !== confirmPassword.value) {
        alert('The new password does not match.');
        return;
      }

      try {
        await axios.patch(
            `${import.meta.env.VITE_API_BASE_URL}/user/updatePassword`,
            {
              userId: userId.value,
              password: newPassword.value,
            },
            {
              withCredentials: true, // 인증 정보를 포함
            }
        );

        alert('The password has been successfully updated.');
      } catch {
        alert('An error occurred while changing the password.');
      }
    };

    const handleCancel = () => {
      alert('Password change has been canceled.');
    };

    onMounted(() => {
      // Retrieve user ID from session or local storage
      userId.value = sessionStorage.getItem('userId') || localStorage.getItem('userId');

      if (!userId.value) {
        alert('User information is missing. Please log in again.');
        router.push({ name: 'Login' }); // Redirect to login page
      }
    });

    const toggleCurrentPasswordVisibility = () => {
      
      console.log(isCurrentPasswordVisible.value)
      isCurrentPasswordVisible.value = !isCurrentPasswordVisible.value; // Toggle password field visibility
      console.log(isCurrentPasswordVisible.value)
    };
    const toggleNewPasswordVisibility = () => {
      isNewPasswordVisible.value = !isNewPasswordVisible.value; // Toggle new password field visibility
    };
    const toggleConfirmNewPasswordVisibility = () => {
      isConfirmNewPasswordVisible.value = !isConfirmNewPasswordVisible.value; // Toggle confirm new password field visibility
    };

    return {
      userId,
      currentPassword,
      newPassword,
      confirmPassword,
      isCurrentPasswordValid,
      isCurrentPasswordVisible,
      isNewPasswordVisible,
      isConfirmNewPasswordVisible,
      checkCurrentPassword,
      handleSubmit,
      handleCancel,
      toggleCurrentPasswordVisibility,
      toggleNewPasswordVisibility,
      toggleConfirmNewPasswordVisibility,
    };
  },
};
