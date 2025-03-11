// src/components/plan/PlanForm.tsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm, Controller } from 'react-hook-form';
import {
  Box,
  TextField,
  Button,
  Autocomplete,
  Chip,
  Typography,
  CircularProgress
} from '@mui/material';
import { planApi } from '../../api';
import { useSnackbar } from 'notistack';

interface PlanFormInputs {
  title: string;
  startDate: string;
  endDate: string;
  companions: string[];
  themes: string[];
  estimatedBudget: number;
}

interface PlanFormProps {
  initialData?: PlanFormInputs;
  onSubmit?: (data: PlanFormInputs) => Promise<void>;
  isEdit?: boolean;
}

const THEME_OPTIONS = [
  '관광', '휴양', '맛집', '쇼핑', '액티비티', '문화예술', '자연'
];

const PlanForm: React.FC<PlanFormProps> = ({ initialData, onSubmit, isEdit = false }) => {
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const [isLoading, setIsLoading] = useState(false);
  const { control, handleSubmit, formState: { errors } } = useForm<PlanFormInputs>({
    defaultValues: initialData || {
      title: '',
      startDate: '',
      endDate: '',
      companions: [],
      themes: [],
      estimatedBudget: 0
    }
  });

  const handleFormSubmit = async (data: PlanFormInputs) => {
    try {
      setIsLoading(true);
      const userId = localStorage.getItem('userId');
      if (!userId) {
        enqueueSnackbar('로그인이 필요합니다.', { variant: 'warning' });
        navigate('/login');
        return;
      }
      
      // 커스텀 onSubmit이 제공된 경우 사용
      if (onSubmit) {
        await onSubmit({
          ...data,
          estimatedBudget: Number(data.estimatedBudget)
        });
        return;
      }
      
      console.log("서버로 보내는 데이터:", {
        ...data,
        userId,
        startDate: data.startDate,
        endDate: data.endDate,
        estimatedBudget: Number(data.estimatedBudget)
      });

      const response = await planApi.createPlan({
        ...data,
        userId,
      startDate: data.startDate,
      endDate: data.endDate,
      estimatedBudget: Number(data.estimatedBudget)
      });
      
      enqueueSnackbar('여행 플랜이 성공적으로 생성되었습니다!', { variant: 'success' });
      navigate('/plans');
    } catch (error) {
      console.error('Plan creation error:', error);
      enqueueSnackbar('여행 플랜 생성에 실패했습니다.', { variant: 'error' });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSaveDraft = async (data: PlanFormInputs) => {
    try {
      setIsLoading(true);
      const userId = localStorage.getItem('userId');
      if (!userId) {
        enqueueSnackbar('로그인이 필요합니다.', { variant: 'warning' });
        navigate('/login');
        return;
      }
      
      const response = await planApi.createPlan({
        ...data,
        userId
      });
      
      enqueueSnackbar('여행 플랜이 임시저장되었습니다.', { variant: 'success' });
      navigate('/plans');
    } catch (error) {
      console.error('Draft save error:', error);
      enqueueSnackbar('임시저장에 실패했습니다.', { variant: 'error' });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit(handleFormSubmit)} sx={{ mt: 2 }}>
      <Controller
        name="title"
        control={control}
        rules={{ required: '여행 제목을 입력해주세요', maxLength: 50 }}
        render={({ field }) => (
          <TextField
            {...field}
            fullWidth
            label="여행 제목"
            error={!!errors.title}
            helperText={errors.title?.message}
            sx={{ mb: 2 }}
          />
        )}
      />

      <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
        <Controller
          name="startDate"
          control={control}
          rules={{ required: '시작일을 선택해주세요' }}
          render={({ field }) => (
            <TextField
              {...field}
              fullWidth
              label="시작일"
              type="date"
              InputLabelProps={{ shrink: true }}
              error={!!errors.startDate}
              helperText={errors.startDate?.message}
            />
          )}
        />

        <Controller
          name="endDate"
          control={control}
          rules={{ required: '종료일을 선택해주세요' }}
          render={({ field }) => (
            <TextField
              {...field}
              fullWidth
              label="종료일"
              type="date"
              InputLabelProps={{ shrink: true }}
              error={!!errors.endDate}
              helperText={errors.endDate?.message}
            />
          )}
        />
      </Box>

      <Controller
        name="companions"
        control={control}
        defaultValue={[]}
        render={({ field }) => (
          <Autocomplete
            multiple
            freeSolo
            options={[]}
            value={field.value}
            onChange={(_, newValue) => field.onChange(newValue)}
            renderTags={(value, getTagProps) =>
              value.map((option, index) => (
                <Chip
                  label={option}
                  {...getTagProps({ index })}
                />
              ))
            }
            renderInput={(params) => (
              <TextField
                {...params}
                label="동행자"
                placeholder="이메일 또는 닉네임 입력"
                sx={{ mb: 2 }}
              />
            )}
          />
        )}
      />

      <Controller
        name="themes"
        control={control}
        defaultValue={[]}
        rules={{ required: '여행 테마를 선택해주세요' }}
        render={({ field }) => (
          <Autocomplete
            multiple
            options={THEME_OPTIONS}
            value={field.value}
            onChange={(_, newValue) => field.onChange(newValue)}
            renderTags={(value, getTagProps) =>
              value.map((option, index) => (
                <Chip
                  label={option}
                  {...getTagProps({ index })}
                />
              ))
            }
            renderInput={(params) => (
              <TextField
                {...params}
                label="여행 테마"
                error={!!errors.themes}
                helperText={errors.themes?.message}
                sx={{ mb: 2 }}
              />
            )}
          />
        )}
      />

      <Controller
        name="estimatedBudget"
        control={control}
        rules={{ required: '예상 경비를 입력해주세요' }}
        render={({ field }) => (
          <TextField
            {...field}
            type="number"
            fullWidth
            label="예상 경비"
            InputProps={{
              endAdornment: <Typography variant="body2">원</Typography>
            }}
            error={!!errors.estimatedBudget}
            helperText={errors.estimatedBudget?.message}
            sx={{ mb: 2 }}
          />
        )}
      />

      <Box sx={{ display: 'flex', gap: 2, justifyContent: 'flex-end' }}>
        {/* 수정 모드일 때는 임시저장 버튼 숨김 */}
        {!isEdit && (
          <Button 
            variant="outlined" 
            onClick={handleSubmit(data => handleSaveDraft(data))}
            disabled={isLoading}
          >
            임시저장
          </Button>
        )}
        <Button 
          type="submit" 
          variant="contained"
          disabled={isLoading}
        >
          {isLoading ? <CircularProgress size={24} /> : isEdit ? '수정' : '저장'}
        </Button>
      </Box>
    </Box>
  );
};

export default PlanForm;