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
  CircularProgress,
  Alert
} from '@mui/material';
import {
  AddPhotoAlternate,
  Delete as DeleteIcon,
  LocationOn
} from '@mui/icons-material';
import { useForm, Controller } from 'react-hook-form';
import PageContainer from '../../components/common/PageContainer';
import { useAuth } from '../../hooks/useAuth';
import reviewApi, { ReviewCreateRequest } from '../../api/reviewApi';

interface ReviewFormData {
  planId: string;
  title: string;
  content: string;
  locationName: string;
}

const ReviewCreate: React.FC = () => {
  const navigate = useNavigate();
  const { auth } = useAuth();
  const [images, setImages] = useState<File[]>([]);
  const [uploadedImageUrls, setUploadedImageUrls] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

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

  const uploadImages = async (): Promise<string[]> => {
    if (images.length === 0) return [];
    
    const formData = new FormData();
    images.forEach(file => {
      formData.append('files', file);
    });
    
    try {
      const urls = await reviewApi.uploadMultipleImages(formData);
      setUploadedImageUrls(urls);
      return urls;
    } catch (error) {
      console.error('Image upload failed:', error);
      throw new Error('이미지 업로드에 실패했습니다.');
    }
  };

  const onSubmit = async (data: ReviewFormData) => {
    if (!auth.userId) {
      setError('로그인이 필요합니다.');
      return;
    }
    
    try {
      setIsSubmitting(true);
      setError(null);
      
      // 이미지 업로드
      let imageUrls: string[] = [];
      if (images.length > 0) {
        imageUrls = await uploadImages();
      }
      
      // 후기 생성 요청 데이터 구성
      const reviewData: ReviewCreateRequest = {
        planId: data.planId,
        userId: auth.userId,
        title: data.title,
        content: data.content,
        imageUrls: imageUrls,
        locationInfo: {
          name: data.locationName
        }
      };
      
      await reviewApi.createReview(reviewData);
      navigate('/reviews');
    } catch (error: any) {
      console.error('Error creating review:', error);
      setError(error.response?.data?.message || '후기 등록에 실패했습니다.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <PageContainer>
      <Box component="form" onSubmit={handleSubmit(onSubmit)}>
        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}
        
        <Controller
          name="planId"
          control={control}
          rules={{ required: '여행 플랜을 선택해주세요' }}
          render={({ field }) => (
            <TextField
              {...field}
              fullWidth
              label="여행 플랜 ID"
              placeholder="여행 플랜 ID를 입력하세요"
              error={!!errors.planId}
              helperText={errors.planId?.message}
              sx={{ mb: 3 }}
            />
          )}
        />

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

        <Paper sx={{ p: 2, mb: 3, mt: 3 }}>
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
          name="locationName"
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
              error={!!errors.locationName}
              helperText={errors.locationName?.message}
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
            disabled={isSubmitting}
          >
            취소
          </Button>
          <Button
            type="submit"
            variant="contained"
            disabled={isSubmitting}
          >
            {isSubmitting ? <CircularProgress size={24} /> : '등록'}
          </Button>
        </Box>
      </Box>
    </PageContainer>
  );
};

export default ReviewCreate;