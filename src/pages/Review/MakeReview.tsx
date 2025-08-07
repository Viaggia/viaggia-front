import * as React from 'react';
import { styled } from '@mui/material/styles';
import Rating, { IconContainerProps } from '@mui/material/Rating';
import SentimentVeryDissatisfiedIcon from '@mui/icons-material/SentimentVeryDissatisfied';
import SentimentDissatisfiedIcon from '@mui/icons-material/SentimentDissatisfied';
import SentimentSatisfiedIcon from '@mui/icons-material/SentimentSatisfied';
import SentimentSatisfiedAltIcon from '@mui/icons-material/SentimentSatisfiedAltOutlined';
import SentimentVerySatisfiedIcon from '@mui/icons-material/SentimentVerySatisfied';

function MakeReview() {
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

  return (
    <div className="d-flex flex-column align-items-center justify-content-center p-4">
      <h4>Ajude-nos a melhorar: deixe sua avaliação abaixo.</h4>
      <StyledRating
        name="highlight-selected-only"
        defaultValue={2}
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
      />

      <div className="d-grid gap-2 mt-3">
              <button type="submit" className="btn btn-primary" >Enviar</button>
      </div>
    </div>
  );
}

export default MakeReview;