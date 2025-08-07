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

interface MakeReviewProps {
  hotelId: number;
}

function MakeReview({ hotelId }: MakeReviewProps) {
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
      icon: <SentimentVeryDissatisfiedIcon color="error" sx={{ fontSize: '60px' }} />,
      label: 'Very Dissatisfied',
    },
    2: {
      icon: <SentimentDissatisfiedIcon color="error" sx={{ fontSize: '60px' }} />,
      label: 'Dissatisfied',
    },
    3: {
      icon: <SentimentSatisfiedIcon color="warning" sx={{ fontSize: '60px' }} />,
      label: 'Neutral',
    },
    4: {
      icon: <SentimentSatisfiedAltIcon color="success" sx={{ fontSize: '60px' }} />,
      label: 'Satisfied',
    },
    5: {
      icon: <SentimentVerySatisfiedIcon color="success" sx={{ fontSize: '60px' }} />,
      label: 'Very Satisfied',
    },
  };

  function IconContainer(props: IconContainerProps) {
    const { value, ...other } = props;
    return <span {...other}>{customIcons[value].icon}</span>;
  }

  const [rating, setRating] = React.useState<number | null>(2);
  const [feedback, setFeedback] = React.useState('');
  const [loading, setLoading] = React.useState(false);
  const [message, setMessage] = React.useState<string | null>(null);

  const { user } = useAuth();

  const handleSubmit = async () => {
    if (!rating) {
      setMessage('Por favor, selecione uma avaliação.');
      return;
    }
    setLoading(true);
    setMessage(null);
    try {
      const reviewData = {
        hotelId: hotelId,
        userId: user?.id || 0,
        rating,
        comment: feedback,
      };
      
      console.log('Enviando dados da review:', reviewData);
      console.log('User:', user);
      
      // chama o serviço de review com hotelId e dados da review
      await createReview(hotelId, reviewData);
      setMessage('Avaliação enviada com sucesso! Obrigado pelo feedback.');
      setRating(2);
      setFeedback('');
    } catch (error: unknown) {
      console.error('Erro ao enviar avaliação:', error);
      
      // Type guard para AxiosError
      const axiosError = error as { response?: { data?: { message?: string; title?: string } } };
      console.error('Resposta do servidor:', axiosError?.response?.data);
      
      const errorMessage = axiosError?.response?.data?.message || 
                          axiosError?.response?.data?.title || 
                          'Erro ao enviar avaliação. Tente novamente mais tarde.';
      
      setMessage(errorMessage);
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

      {message && (
        <div className={`mt-3 alert ${message.includes('sucesso') ? 'alert-success' : 'alert-danger'}`} role="alert">
          {message}
        </div>
      )}
    </div>
  );
}

export default MakeReview;
