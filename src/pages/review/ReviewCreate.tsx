// src/pages/review/ReviewCreate.tsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  TextField,
  Button,
  Typography,
  IconButton,
  ImageList,
  ImageListItem,
  Paper,
  Autocomplete,
  Chip
} from '@mui/material';
import {
  AddPhotoAlternate,
  Delete as DeleteIcon,
  LocationOn
} from '@mui/icons-material';
import { useForm, Controller } from 'react-hook-form';
import PageContainer from '../../components/common/PageContainer';

interface ReviewFormData {
  title: string;
  content: string;
  themes: string[];
  location: string;
}

const THEME_OPTIONS = ['관광', '맛집', '숙소', '쇼핑', '액티비티', '힐링'];

const ReviewCreate: React.FC = () => {
  const navigate = useNavigate();
  const [images, setImages] = React.useState<File[]>([]);
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const { control, handleSubmit, formState: { errors } } = useForm<ReviewFormData>();

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      const newImages = Array.from(files);
      setImages(prev => [...prev, ...newImages]);
    }
  };

  const handleRemoveImage = (index: number) => {
    setImages(prev => prev.filter((_, i) => i !== index));
  };

  const onSubmit = async (data: ReviewFormData) => {
    try {
      // TODO: API 연동
      console.log('Form data:', data);
      console.log('Images:', images);
      navigate('/reviews');
    } catch (error) {
      console.error('Submit error:', error);
    }
  };

  return (
    <PageContainer>
      <Box component="form" onSubmit={handleSubmit(onSubmit)}>
        <Controller
          name="title"
          control={control}
          rules={{ required: '제목을 입력해주세요' }}
          render={({ field }) => (
            <TextField
              {...field}
              fullWidth
              label="제목"
              error={!!errors.title}
              helperText={errors.title?.message}
              sx={{ mb: 3 }}
            />
          )}
        />

        <Controller
          name="themes"
          control={control}
          defaultValue={[]}
          rules={{ required: '테마를 선택해주세요' }}
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
                    key={option}
                  />
                ))
              }
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="여행 테마"
                  error={!!errors.themes}
                  helperText={errors.themes?.message}
                />
              )}
              sx={{ mb: 3 }}
            />
          )}
        />

        <Paper sx={{ p: 2, mb: 3 }}>
          <Typography variant="subtitle1" gutterBottom>
            사진 추가
          </Typography>
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleImageUpload}
            accept="image/*"
            multiple
            style={{ display: 'none' }}
          />
          <Box sx={{ mb: 2 }}>
            <Button
              variant="outlined"
              startIcon={<AddPhotoAlternate />}
              onClick={() => fileInputRef.current?.click()}
            >
              사진 선택
            </Button>
          </Box>
          {images.length > 0 && (
            <ImageList cols={3} gap={8}>
              {images.map((image, index) => (
                <ImageListItem key={index}>
                  <img
                    src={URL.createObjectURL(image)}
                    alt={`업로드 이미지 ${index + 1}`}
                    loading="lazy"
                    style={{ borderRadius: 4 }}
                  />
                  <IconButton
                    size="small"
                    sx={{
                      position: 'absolute',
                      top: 4,
                      right: 4,
                      backgroundColor: 'rgba(0, 0, 0, 0.5)',
                      '&:hover': {
                        backgroundColor: 'rgba(0, 0, 0, 0.7)',
                      },
                    }}
                    onClick={() => handleRemoveImage(index)}
                  >
                    <DeleteIcon sx={{ color: 'white' }} />
                  </IconButton>
                </ImageListItem>
              ))}
            </ImageList>
          )}
        </Paper>

        <Controller
          name="location"
          control={control}
          rules={{ required: '방문 장소를 입력해주세요' }}
          render={({ field }) => (
            <TextField
              {...field}
              fullWidth
              label="주요 방문 장소"
              InputProps={{
                startAdornment: <LocationOn color="action" sx={{ mr: 1 }} />
              }}
              error={!!errors.location}
              helperText={errors.location?.message}
              sx={{ mb: 3 }}
            />
          )}
        />

        <Controller
          name="content"
          control={control}
          rules={{ required: '내용을 입력해주세요' }}
          render={({ field }) => (
            <TextField
              {...field}
              fullWidth
              multiline
              rows={6}
              label="여행 후기"
              error={!!errors.content}
              helperText={errors.content?.message}
              sx={{ mb: 3 }}
            />
          )}
        />

        <Box sx={{ display: 'flex', gap: 2, justifyContent: 'flex-end' }}>
          <Button
            variant="outlined"
            onClick={() => navigate('/reviews')}
          >
            취소
          </Button>
          <Button
            type="submit"
            variant="contained"
          >
            등록
          </Button>
        </Box>
      </Box>
    </PageContainer>
  );
};

export default ReviewCreate;