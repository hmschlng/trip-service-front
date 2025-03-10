// src/pages/review/ReviewCreate.tsx
import React, { useState, useRef } from 'react';
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
  Chip,
  CircularProgress
} from '@mui/material';
import {
  AddPhotoAlternate,
  Delete as DeleteIcon,
  LocationOn
} from '@mui/icons-material';
import { useForm, Controller } from 'react-hook-form';
import PageContainer from '../../components/common/PageContainer';
import { reviewApi } from '../../api';
import { useSnackbar } from 'notistack';

interface ReviewFormData {
  title: string;
  content: string;
  planId: string;
  location: string;
}

const ReviewCreate: React.FC = () => {
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const [images, setImages] = useState<File[]>([]);
  const [imageUrls, setImageUrls] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const { control, handleSubmit, formState: { errors } } = useForm<ReviewFormData>();

  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      const newImages = Array.from(files);
      setImages(prev => [...prev, ...newImages]);
      
      // 이미지 업로드 API 호출
      try {
        const formData = new FormData();
        newImages.forEach(file => {
          formData.append('files', file);
        });
        
        const urls = await reviewApi.uploadMultipleImages(formData);
        setImageUrls(prev => [...prev, ...urls]);
      } catch (error) {
        console.error('Image upload error:', error);
        enqueueSnackbar('이미지 업로드에 실패했습니다.', { variant: 'error' });
      }
    }
  };

  const handleRemoveImage = (index: number) => {
    setImages(prev => prev.filter((_, i) => i !== index));
    setImageUrls(prev => prev.filter((_, i) => i !== index));
  };

  const onSubmit = async (data: ReviewFormData) => {
    try {
      setIsLoading(true);
      const userId = localStorage.getItem('userId');
      if (!userId) {
        enqueueSnackbar('로그인이 필요합니다.', { variant: 'warning' });
        navigate('/login');
        return;
      }
      
      // 위치 정보 객체 생성
      const locationInfo: Record<string, string> = {
        name: data.location
      };
      
      const reviewData = {
        planId: data.planId,
        userId,
        title: data.title,
        content: data.content,
        imageUrls: imageUrls,
        locationInfo
      };
      
      const response = await reviewApi.createReview(reviewData);
      enqueueSnackbar('여행 후기가 성공적으로 등록되었습니다!', { variant: 'success' });
      navigate('/reviews');
    } catch (error) {
      console.error('Review creation error:', error);
      enqueueSnackbar('여행 후기 등록에 실패했습니다.', { variant: 'error' });
    } finally {
      setIsLoading(false);
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
          name="planId"
          control={control}
          rules={{ required: '연결할 여행 플랜을 선택해주세요' }}
          render={({ field }) => (
            <TextField
              {...field}
              fullWidth
              label="여행 플랜 ID"
              error={!!errors.planId}
              helperText={errors.planId?.message}
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
            disabled={isLoading}
          >
            {isLoading ? <CircularProgress size={24} /> : '등록'}
          </Button>
        </Box>
      </Box>
    </PageContainer>
  );
};

export default ReviewCreate;