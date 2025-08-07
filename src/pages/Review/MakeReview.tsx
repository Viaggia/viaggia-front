import * as React from 'react';
import { styled } from '@mui/material/styles';
import Rating, { IconContainerProps } from '@mui/material/Rating';
import SentimentVeryDissatisfiedIcon from '@mui/icons-material/SentimentVeryDissatisfied';
import SentimentDissatisfiedIcon from '@mui/icons-material/SentimentDissatisfied';
import SentimentSatisfiedIcon from '@mui/icons-material/SentimentSatisfied';
import SentimentSatisfiedAltIcon from '@mui/icons-material/SentimentSatisfiedAltOutlined';
import SentimentVerySatisfiedIcon from '@mui/icons-material/SentimentVerySatisfied';

import { createReview } from '../../services/reviewServices';
import { useAuth } from '../../context/AuthContext';
import ToastForm from '../../components/Toast/ToastForm';

interface MakeReviewProps {
  hotelId: number;
  onSuccess?: () => void;
}

function MakeReview({ hotelId, onSuccess }: MakeReviewProps) {
  const StyledRating = styled(Rating)(({ theme }) => ({
    '& .MuiRating-iconEmpty .MuiSvgIcon-root': {
      color: theme.palette.action.disabled,
    },
  }));

  const customIcons: {
    [index: string]: {
      icon: React.ReactElement;
      label: string;
    };
  } = {
    1: {
      icon: <SentimentVeryDissatisfiedIcon sx={{ color: '#d32f2f', fontSize: '60px' }} />,
      label: 'Muito insatisfeito',
    },
    2: {
      icon: <SentimentDissatisfiedIcon sx={{ color: '#f57c00', fontSize: '60px' }} />,
      label: 'Insatisfeito',
    },
    3: {
      icon: <SentimentSatisfiedIcon sx={{ color: '#FFD600', fontSize: '60px' }} />,
      label: 'Neutro',
    },
    4: {
      icon: <SentimentSatisfiedAltIcon sx={{ color: '#8BC34A', fontSize: '60px' }} />,
      label: 'Satisfeito',
    },
    5: {
      icon: <SentimentVerySatisfiedIcon sx={{ color: '#388e3c', fontSize: '60px' }} />,
      label: 'Muito satisfeito',
    },
  };

  function IconContainer(props: IconContainerProps) {
    const { value, ...other } = props;
    return <span {...other}>{customIcons[value].icon}</span>;
  }

  const [rating, setRating] = React.useState<number | null>(2);
  const [feedback, setFeedback] = React.useState('');
  const [loading, setLoading] = React.useState(false);

  // Toast state
  const [toast, setToast] = React.useState<{ show: boolean; message: string; type: 'success' | 'error' }>({
    show: false,
    message: '',
    type: 'success',
  });

  const { user } = useAuth();

  const handleSubmit = async () => {
    if (!rating) {
      setToast({ show: true, message: 'Por favor, selecione uma avaliação.', type: 'error' });
      return;
    }
    setLoading(true);
    try {
      const reviewData = {
        hotelId,
        userId: user?.id || 0,
        rating,
        comment: feedback,
        reviewType: "Hotel"
      };

      await createReview(reviewData);
      setToast({ show: true, message: 'Avaliação enviada com sucesso! Obrigado pelo feedback.', type: 'success' });
      setRating(2);
      setFeedback('');
      if (onSuccess) onSuccess();
    } catch (error: unknown) {
      let errorMessage = 'Erro ao enviar avaliação. Tente novamente mais tarde.';
      const axiosError = error as { response?: { data?: { message?: string; title?: string; errors?: Record<string, string[]> } } };
      if (axiosError?.response?.data?.errors) {
        const errors = axiosError.response.data.errors;
        const firstErrorKey = Object.keys(errors)[0];
        const firstErrorMessages = errors[firstErrorKey];
        if (Array.isArray(firstErrorMessages) && firstErrorMessages.length > 0) {
          errorMessage = firstErrorMessages[0];
        }
      } else if (axiosError?.response?.data?.message) {
        errorMessage = axiosError.response.data.message;
      } else if (axiosError?.response?.data?.title) {
        errorMessage = axiosError.response.data.title;
      }
      setToast({ show: true, message: errorMessage, type: 'error' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="d-flex flex-column align-items-center justify-content-center p-4">
      <h4>Ajude-nos a melhorar: deixe sua avaliação abaixo.</h4>
      <StyledRating
        name="highlight-selected-only"
        value={rating}
        onChange={(_, newValue) => setRating(newValue)}
        IconContainerComponent={IconContainer}
        getLabelText={(value: number) => customIcons[value].label}
        highlightSelectedOnly
      />

      <textarea
        id="feedback"
        name="feedback"
        className="form-control mt-4"
        placeholder="Deixe seu comentário..."
        style={{
          maxWidth: '500px',
          height: '200px',
          fontSize: '18px',
          padding: '12px 16px',
          resize: 'none',
          overflowY: 'auto',
          whiteSpace: 'pre-wrap',
        }}
        value={feedback}
        onChange={e => setFeedback(e.target.value)}
      />

      <div className="d-grid gap-2 mt-3" style={{ maxWidth: '500px' }}>
        <button
          type="button"
          className="btn btn-primary"
          onClick={handleSubmit}
          disabled={loading}
        >
          {loading ? 'Enviando...' : 'Enviar'}
        </button>
      </div>

      <ToastForm
        show={toast.show}
        message={toast.message}
        type={toast.type}
        onClose={() => setToast({ ...toast, show: false })}
      />
    </div>
  );
}

export default MakeReview;