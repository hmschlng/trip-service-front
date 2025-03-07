// src/pages/review/ReviewUpdate.tsx
import React, { useState, useRef, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
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
import reviewApi, { ReviewUpdateRequest, ReviewDetailResponse } from '../../api/reviewApi';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import ErrorMessage from '../../components/common/ErrorMessage';

interface ReviewFormData {
  title: string;
  content: string;
  locationName: string;
}

const ReviewUpdate: React.FC = () => {
  const { reviewId } = useParams<{ reviewId: string }>();
  const navigate = useNavigate();
  const { auth } = useAuth();
  const [review, setReview] = useState<ReviewDetailResponse | null>(null);
  const [images, setImages] = useState<File[]>([]);
  const [existingImages, setExistingImages] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const { control, handleSubmit, formState: { errors }, setValue } = useForm<ReviewFormData>();

  useEffect(() => {
    const fetchReviewDetail = async () => {
      if (!reviewId) return;
      
      try {
        setIsLoading(true);
        setError(null);
        const response = await reviewApi.getReviewDetail(reviewId);
        setReview(response.data);
        setExistingImages(response.data.images || []);
        
        // 폼 초기값 설정
        setValue('title', response.data.title);
        setValue('content', response.data.content);
        setValue('locationName', response.data.location.name || Object.values(response.data.location)[0] || '');
      } catch (error: any) {
        console.error('Error fetching review detail:', error);
        setError(error.response?.data?.message || '후기 정보를 불러오는 데 실패했습니다.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchReviewDetail();
  }, [reviewId, setValue]);

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

  const handleRemoveExistingImage = (index: number) => {
    setExistingImages(prev => prev.filter((_, i) => i !== index));
  };

  const uploadImages = async (): Promise<string[]> => {
    if (images.length === 0) return [];
    
    const formData = new FormData();
    images.forEach(file => {
      formData.append('files', file);
    });
    
    try {
      const urls = await reviewApi.uploadMultipleImages(formData);
      return urls;
    } catch (error) {
      console.error('Image upload failed:', error);
      throw new Error('이미지 업로드에 실패했습니다.');
    }
  };

  const onSubmit = async (data: ReviewFormData) => {
    if (!auth.userId || !reviewId) {
      setError('요청 처리에 필요한 정보가 없습니다.');
      return;
    }
    
    try {
      setIsSubmitting(true);
      setError(null);
      
      // 이미지 업로드
      let uploadedImageUrls: string[] = [];
      if (images.length > 0) {
        uploadedImageUrls = await uploadImages();
      }
      
      // 리뷰 업데이트 요청 데이터 구성
      const reviewData: ReviewUpdateRequest = {
        userId: auth.userId,
        title: data.title,
        content: data.content,
        imageUrls: [...existingImages, ...uploadedImageUrls],
        locationInfo: {
          name: data.locationName
        }
      };
      
      await reviewApi.updateReview(reviewId, reviewData);
      navigate(`/reviews/${reviewId}`);
    } catch (error: any) {
      console.error('Error updating review:', error);
      setError(error.response?.data?.message || '후기 수정에 실패했습니다.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) return <LoadingSpinner />;
  if (error && !review) return <ErrorMessage message={error} />;

  return (
    <PageContainer>
      <Box component="form" onSubmit={handleSubmit(onSubmit)}>
        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}
        
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

        <Paper sx={{ p: 2, mb: 3 }}>
          <Typography variant="subtitle1" gutterBottom>
            사진 관리
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
              사진 추가
            </Button>
          </Box>
          
          {/* 기존 이미지 */}
          {existingImages.length > 0 && (
            <>
              <Typography variant="subtitle2" gutterBottom>
                기존 이미지
              </Typography>
              <ImageList cols={3} gap={8} sx={{ mb: 2 }}>
                {existingImages.map((image, index) => (
                  <ImageListItem key={`existing-${index}`}>
                    <img
                      src={image}
                      alt={`기존 이미지 ${index + 1}`}
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
                      onClick={() => handleRemoveExistingImage(index)}
                    >
                      <DeleteIcon sx={{ color: 'white' }} />
                    </IconButton>
                  </ImageListItem>
                ))}
              </ImageList>
            </>
          )}
          
          {/* 새로 추가된 이미지 */}
          {images.length > 0 && (
            <>
              <Typography variant="subtitle2" gutterBottom>
                새로 추가된 이미지
              </Typography>
              <ImageList cols={3} gap={8}>
                {images.map((image, index) => (
                  <ImageListItem key={`new-${index}`}>
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
            </>
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
            onClick={() => navigate(`/reviews/${reviewId}`)}
            disabled={isSubmitting}
          >
            취소
          </Button>
          <Button
            type="submit"
            variant="contained"
            disabled={isSubmitting}
          >
            {isSubmitting ? <CircularProgress size={24} /> : '수정완료'}
          </Button>
        </Box>
      </Box>
    </PageContainer>
  );
};

export default ReviewUpdate;