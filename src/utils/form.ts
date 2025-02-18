// src/utils/form.ts
export const validateForm = {
  required: (value: any) => {
    if (value === null || value === undefined || value === '') {
      return '필수 입력 항목입니다.';
    }
    return '';
  },

  email: (value: string) => {
    const regex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    if (!regex.test(value)) {
      return '유효한 이메일 주소를 입력해주세요.';
    }
    return '';
  },

  password: (value: string) => {
    const regex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
    if (!regex.test(value)) {
      return '비밀번호는 영문, 숫자, 특수문자를 포함하여 8자 이상이어야 합니다.';
    }
    return '';
  },

  maxLength: (value: string, max: number) => {
    if (value.length > max) {
      return `${max}자 이하로 입력해주세요.`;
    }
    return '';
  },

  minLength: (value: string, min: number) => {
    if (value.length < min) {
      return `${min}자 이상 입력해주세요.`;
    }
    return '';
  },

  number: (value: string) => {
    if (isNaN(Number(value))) {
      return '숫자만 입력해주세요.';
    }
    return '';
  }
};