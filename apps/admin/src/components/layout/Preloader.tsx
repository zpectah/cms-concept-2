import { styled, CircularProgress } from '@mui/material';

const Wrapper = styled('div')(() => ({
  width: '100%',
  height: 'auto',
  minHeight: '50dvh',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
}));

const Preloader = () => {
  return (
    <Wrapper>
      <CircularProgress />
    </Wrapper>
  );
};

export default Preloader;
