import { useState } from 'react';
import { styled } from '@mui/material/styles';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import UploadIcon from '@mui/icons-material/Upload';
import DescriptionIcon from '@mui/icons-material/Description';
import DoneIcon from '@mui/icons-material/Done';
import StepConnector, { stepConnectorClasses } from '@mui/material/StepConnector';
import { StepIconProps } from '@mui/material/StepIcon';
import { Box, Typography } from '@mui/material';
import { styles } from './style';
import MediaUpload from './MediaUpload';
import DescriptionForm from './DescriptionForm';
import FinishForm from './FinishForm';
import { useTranslation } from 'react-i18next';

const ColorlibConnector = styled(StepConnector)(({ theme }) => ({
  [`&.${stepConnectorClasses.alternativeLabel}`]: {
    top: 22,
  },
  [`&.${stepConnectorClasses.active}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      backgroundImage:
        'linear-gradient( 95deg, #4293f5 0%, #256bc2 50%, #0c56b0 100%)',
    },
  },
  [`&.${stepConnectorClasses.completed}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      backgroundImage:
        'linear-gradient( 95deg, #4293f5 0%, #256bc2 50%, #0c56b0 100%)',
    },
  },
  [`& .${stepConnectorClasses.line}`]: {
    height: 3,
    border: 0,
    backgroundColor: '#eaeaf0',
    borderRadius: 1,
    ...theme.applyStyles('dark', {
      backgroundColor: theme.palette.grey[800],
    }),
  },
}));

const ColorlibStepIconRoot = styled('div')<{
  ownerState: { completed?: boolean; active?: boolean };
}>(({ theme }) => ({
  backgroundColor: '#ccc',
  zIndex: 1,
  color: '#fff',
  width: 50,
  height: 50,
  display: 'flex',
  borderRadius: '50%',
  justifyContent: 'center',
  alignItems: 'center',
  ...theme.applyStyles('dark', {
    backgroundColor: theme.palette.grey[700],
  }),
  variants: [
    {
      props: ({ ownerState }) => ownerState.active,
      style: {
        backgroundImage:
          'linear-gradient( 95deg, #4293f5 0%, #256bc2 50%, #0c56b0 100%)',
        boxShadow: '0 4px 10px 0 rgba(0,0,0,.25)',
        border: '2px solid white',
      },
    },
    {
      props: ({ ownerState }) => ownerState.completed,
      style: {
        backgroundImage:
          'linear-gradient( 95deg, #4293f5 0%, #256bc2 50%, #0c56b0 100%)',
      },
    },
    {
      props: ({ ownerState }) => !ownerState.completed && !ownerState.active,
      style: {
        backgroundColor: theme.palette.grey[400],
        color: 'black',
        boxShadow: '0 4px 10px 0 rgba(0,0,0,.25)',
      },
    },
  ],
}));

function ColorlibStepIcon(props: StepIconProps) {
  const { active, completed, className } = props;

  const icons: { [index: string]: React.ReactElement<unknown> } = {
    1: <UploadIcon />,
    2: <DescriptionIcon />,
    3: <DoneIcon />,
  };

  return (
    <ColorlibStepIconRoot ownerState={{ completed, active }} className={className}>
      {icons[String(props.icon)]}
    </ColorlibStepIconRoot>
  );
}

const steps = ['txt-upload-media', 'txt-add-description', 'txt-finish'];

export default function UploadForm() {
  const [step, setStep] = useState<number>(0);

  const [media, setMedia] = useState<File | null>(null);
  const [thumbnail, setThumbnail] = useState<File | null>(null);
  const [title, setTitle] = useState<string>('');
  const [description, setDescription] = useState<string>('');

  const { t } = useTranslation();

  function StepComponent() {
    switch (step) {
      case 0: {
        return <MediaUpload media={media} callback={setMedia} setStep={setStep} />;
      }
      case 1: {
        return (
          <DescriptionForm
            titleCallback={setTitle}
            descriptionCallback={setDescription}
            setStep={setStep}
          />
        );
      }
      default:
        return (
          <FinishForm
            title={title}
            description={description}
            media={media}
            thumbnail={thumbnail}
            callback={setThumbnail}
          />
        );
    }
  }

  return (
    <Box sx={styles.container}>
      <Stepper alternativeLabel activeStep={step} connector={<ColorlibConnector />}>
        {steps.map((label, index) => (
          <Step key={index}>
            <StepLabel slots={{ stepIcon: ColorlibStepIcon }}>
              <Typography
                sx={{
                  color: step >= index ? 'text.primary' : 'gray',
                  fontSize: '16px',
                }}
              >
                {t(label)}
              </Typography>
            </StepLabel>
          </Step>
        ))}
      </Stepper>
      <Box sx={{ flex: 1 }}>
        <StepComponent />
      </Box>
    </Box>
  );
}
