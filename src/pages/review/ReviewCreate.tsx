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
  Alert,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Grid,
  Card,
  CardContent,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Autocomplete,
  Chip
} from '@mui/material';
import {
  AddPhotoAlternate,
  Delete as DeleteIcon,
  LocationOn,
  Save as SaveIcon,
  ArrowBack as ArrowBackIcon
} from '@mui/icons-material';
import { useForm, Controller } from 'react-hook-form';
import PageContainer from '../../components/common/PageContainer';
import { reviewApi, planApi, PlanResponse } from '../../api';
import { useSnackbar } from 'notistack';
import { useAuth } from '../../hooks/useAuth';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import ErrorMessage from '../../components/common/ErrorMessage';

interface ReviewFormData {
  title: string;
  content: string;
  planId: string;
  location: string;
  tags: string[];
}

const ReviewCreate: React.FC = () => {
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const { auth } = useAuth();
  const [images, setImages] = useState<File[]>([]);
  const [imageUrls, setImageUrls] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [plans, setPlans] = useState<PlanResponse[]>([]);
  const [isFetchingPlans, setIsFetchingPlans] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [previewOpen, setPreviewOpen] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const availableTags = ["가족여행", "혼자여행", "친구여행", "힐링", "맛집탐방", "쇼핑", "자연", "문화", "역사"];

  const { control, handleSubmit, watch, formState: { errors } } = useForm<ReviewFormData>({
    defaultValues: {
      title: '',
      content: '',
      planId: '',
      location: '',
      tags: []
    }
  });

  const planIdValue = watch('planId');

  // 사용자의 여행 플랜 불러오기
  React.useEffect(() => {
    const fetchUserPlans = async () => {
      if (!auth.userId) {
        setError('로그인이 필요합니다.');
        setIsFetchingPlans(false);
        return;
      }
      
      try {
        const response = await planApi.getMyPlans(auth.userId);
        const responseData = response.data.data;
        
        // Page 객체인 경우 (content 필드가 있는지 확인)
        if (responseData.content) {
          setPlans(responseData.content);
        } else if (Array.isArray(responseData)) {
          // 단순 배열인 경우
          setPlans(responseData);
        } else {
          // 기타 경우는 빈 배열로 초기화
          setPlans([]);
        }
      } catch (error) {
        console.error('Error fetching plans:', error);
        setError('여행 플랜을 불러오는데 실패했습니다.');
      } finally {
        setIsFetchingPlans(false);
      }
    };

    fetchUserPlans();
  }, [auth.userId]);

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
        enqueueSnackbar('이미지가 업로드되었습니다.', { variant: 'success' });
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
      const userId = auth.userId;
      if (!userId) {
        enqueueSnackbar('로그인이 필요합니다.', { variant: 'warning' });
        navigate('/login');
        return;
      }
      
      // 위치 정보 객체 생성
      const locationInfo: Record<string, string> = {
        name: data.location
      };
      
      // 태그 정보가 있으면 위치 객체에 추가
      if (data.tags && data.tags.length > 0) {
        locationInfo.tags = data.tags.join(',');
      }
      
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

  const handlePreview = () => {
    setPreviewOpen(true);
  };

  if (isFetchingPlans) return <LoadingSpinner message="여행 플랜 불러오는 중..." />;
  if (error) return <ErrorMessage message={error} />;

  const formValues = watch();

  return (
    <PageContainer>
      <Typography variant="h5" gutterBottom sx={{ mb: 3 }}>새 여행 후기 작성</Typography>
      
      <Box component="form" onSubmit={handleSubmit(onSubmit)}>
        <Paper elevation={2} sx={{ p: 3, mb: 3 }}>
          <Typography variant="subtitle1" gutterBottom sx={{ mb: 2, fontWeight: 'bold' }}>
            기본 정보
          </Typography>
          
          <Controller
            name="title"
            control={control}
            rules={{ required: '제목을 입력해주세요' }}
            render={({ field }) => (
              <TextField
                {...field}
                fullWidth
                label="제목"
                variant="outlined"
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
              <FormControl fullWidth sx={{ mb: 3 }}>
                <InputLabel id="plan-select-label">여행 플랜</InputLabel>
                <Select
                  {...field}
                  labelId="plan-select-label"
                  label="여행 플랜"
                  error={!!errors.planId}
                >
                  {plans.length > 0 ? (
                    plans.map((plan) => (
                      <MenuItem key={plan.planId} value={plan.planId}>
                        {plan.title}
                      </MenuItem>
                    ))
                  ) : (
                    <MenuItem disabled value="">
                      여행 플랜이 없습니다. 먼저 여행 플랜을 작성해주세요.
                    </MenuItem>
                  )}
                </Select>
                {errors.planId && (
                  <Typography variant="caption" color="error">
                    {errors.planId.message}
                  </Typography>
                )}
              </FormControl>
            )}
          />
        </Paper>
        
        <Paper elevation={2} sx={{ p: 3, mb: 3 }}>
          <Typography variant="subtitle1" gutterBottom sx={{ mb: 2, fontWeight: 'bold' }}>
            위치 정보
          </Typography>
          
          <Controller
            name="location"
            control={control}
            rules={{ required: '방문 장소를 입력해주세요' }}
            render={({ field }) => (
              <TextField
                {...field}
                fullWidth
                label="주요 방문 장소"
                variant="outlined"
                placeholder="예: 제주도 서귀포시, 부산 해운대"
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
            name="tags"
            control={control}
            render={({ field }) => (
              <Autocomplete
                {...field}
                multiple
                options={availableTags}
                value={field.value || []}
                onChange={(e, newValue) => field.onChange(newValue)}
                renderTags={(value, getTagProps) =>
                  value.map((option, index) => (
                    <Chip
                      variant="outlined"
                      label={option}
                      {...getTagProps({ index })}
                    />
                  ))
                }
                renderInput={(params) => (
                  <TextField
                    {...params}
                    variant="outlined"
                    label="태그"
                    placeholder="여행 테마를 선택하세요"
                  />
                )}
              />
            )}
          />
        </Paper>
        
        <Paper elevation={2} sx={{ p: 3, mb: 3 }}>
          <Typography variant="subtitle1" gutterBottom sx={{ mb: 2, fontWeight: 'bold' }}>
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
                    style={{ borderRadius: 4, height: 120, objectFit: 'cover' }}
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
          
          {images.length === 0 && (
            <Alert severity="info" sx={{ mb: 2 }}>
              사진을 추가하면 더 풍부한 여행 후기를 남길 수 있습니다.
            </Alert>
          )}
        </Paper>
        
        <Paper elevation={2} sx={{ p: 3, mb: 3 }}>
          <Typography variant="subtitle1" gutterBottom sx={{ mb: 2, fontWeight: 'bold' }}>
            후기 내용
          </Typography>
          
          <Controller
            name="content"
            control={control}
            rules={{ required: '내용을 입력해주세요' }}
            render={({ field }) => (
              <TextField
                {...field}
                fullWidth
                multiline
                rows={8}
                label="여행 후기"
                variant="outlined"
                placeholder="여행에서 느낀 점, 추천하고 싶은 장소, 음식 등을 자유롭게 작성해주세요."
                error={!!errors.content}
                helperText={errors.content?.message}
                sx={{ mb: 1 }}
              />
            )}
          />
        </Paper>

        <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center' }}>
          <Button
            variant="outlined"
            startIcon={<ArrowBackIcon />}
            onClick={() => navigate('/reviews')}
          >
            취소
          </Button>
          
          <Button
            variant="outlined"
            onClick={handlePreview}
          >
            미리보기
          </Button>
          
          <Button
            type="submit"
            variant="contained"
            disabled={isLoading}
            startIcon={isLoading ? <CircularProgress size={20} /> : <SaveIcon />}
          >
            {isLoading ? '저장 중...' : '후기 등록'}
          </Button>
        </Box>
      </Box>
      
      {/* 미리보기 다이얼로그 */}
      <Dialog
        open={previewOpen}
        onClose={() => setPreviewOpen(false)}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>
          후기 미리보기
        </DialogTitle>
        <DialogContent>
          <Box sx={{ p: 2 }}>
            <Typography variant="h5" gutterBottom>
              {formValues.title || '(제목 없음)'}
            </Typography>
            
            {formValues.tags && formValues.tags.length > 0 && (
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 2 }}>
                {formValues.tags.map((tag) => (
                  <Chip key={tag} label={tag} size="small" />
                ))}
              </Box>
            )}
            
            {imageUrls.length > 0 && (
              <ImageList cols={2} gap={8} sx={{ mb: 3 }}>
                {imageUrls.map((url, index) => (
                  <ImageListItem key={index}>
                    <img
                      src={url}
                      alt={`여행 사진 ${index + 1}`}
                      loading="lazy"
                      style={{ borderRadius: 8, height: 200, objectFit: 'cover' }}
                    />
                  </ImageListItem>
                ))}
              </ImageList>
            )}
            
            {formValues.location && (
              <Box sx={{ mb: 3, display: 'flex', alignItems: 'center' }}>
                <LocationOn color="primary" />
                <Typography variant="body1" sx={{ ml: 1 }}>
                  {formValues.location}
                </Typography>
              </Box>
            )}
            
            <Typography variant="body1" sx={{ whiteSpace: 'pre-line', mb: 3 }}>
              {formValues.content || '(내용 없음)'}
            </Typography>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setPreviewOpen(false)}>
            닫기
          </Button>
        </DialogActions>
      </Dialog>
    </PageContainer>
  );
};

export default ReviewCreate;