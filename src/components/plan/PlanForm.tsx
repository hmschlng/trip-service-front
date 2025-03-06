// src/components/plan/PlanForm.tsx
import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import {
  Box,
  TextField,
  Button,
  Autocomplete,
  Chip,
  Typography
} from '@mui/material';

interface PlanFormInputs {
  title: string;
  startDate: string;
  endDate: string;
  companions: string[];
  themes: string[];
  estimatedBudget: number;
}

const THEME_OPTIONS = [
  '관광', '휴양', '맛집', '쇼핑', '액티비티', '문화예술', '자연'
];

const PlanForm: React.FC = () => {
  const { control, handleSubmit, formState: { errors } } = useForm<PlanFormInputs>();

  const onSubmit = (data: PlanFormInputs) => {
    console.log(data);
  };

  return (
    <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ mt: 2 }}>
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
        <Button variant="outlined">임시저장</Button>
        <Button type="submit" variant="contained">저장</Button>
      </Box>
    </Box>
  );
};

export default PlanForm;