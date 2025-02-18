// src/components/member/ProfileInfo.tsx
import React from 'react';
import {
  Box,
  Typography,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField
} from '@mui/material';
import { useForm } from 'react-hook-form';

interface ProfileInfoProps {
  email: string;
  name: string;
  onWithdraw: (reason: string) => void;
}

interface WithdrawalFormInputs {
  reason: string;
}

const ProfileInfo: React.FC<ProfileInfoProps> = ({ email, name, onWithdraw }) => {
  const [open, setOpen] = React.useState(false);
  const { register, handleSubmit, formState: { errors } } = useForm<WithdrawalFormInputs>();

  const handleWithdraw = (data: WithdrawalFormInputs) => {
    onWithdraw(data.reason);
    setOpen(false);
  };

  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h6" gutterBottom>
        회원 정보
      </Typography>
      <Box sx={{ mb: 2 }}>
        <Typography variant="body1">
          이메일: {email}
        </Typography>
        <Typography variant="body1">
          이름: {name}
        </Typography>
      </Box>
      <Button
        variant="outlined"
        color="error"
        onClick={() => setOpen(true)}
      >
        회원 탈퇴
      </Button>

      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>회원 탈퇴</DialogTitle>
        <DialogContent>
          <Typography variant="body2" sx={{ mb: 2 }}>
            탈퇴하시면 모든 데이터가 삭제되며 복구할 수 없습니다.
            탈퇴 사유를 입력해 주세요.
          </Typography>
          <TextField
            fullWidth
            multiline
            rows={4}
            {...register('reason', {
              required: '탈퇴 사유를 입력해주세요'
            })}
            error={!!errors.reason}
            helperText={errors.reason?.message}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>
            취소
          </Button>
          <Button 
            onClick={handleSubmit(handleWithdraw)} 
            color="error"
          >
            탈퇴하기
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default ProfileInfo;