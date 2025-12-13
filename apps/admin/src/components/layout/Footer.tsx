import { styled, Container, Typography } from '@mui/material';
import { getConfig } from '../../config';
import { useAppContext } from '../../contexts';
import { SPACING } from '../../constants';

const Wrapper = styled('footer')(({ theme }) => ({
  paddingTop: theme.spacing(SPACING.content),
  paddingBottom: theme.spacing(SPACING.content),
  width: '100%',
}));

const Content = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-evenly',
  gap: theme.spacing(SPACING.content),
}));

const Footer = () => {
  const {
    version,
    cms: { meta },
  } = getConfig();

  const { containerWidth } = useAppContext();

  return (
    <Wrapper id="footer">
      <Container maxWidth={containerWidth}>
        <Content>
          <Typography variant="caption" color="textDisabled">
            {meta.title} v{version} | {meta.description}
          </Typography>
        </Content>
      </Container>
    </Wrapper>
  );
};

export default Footer;
