import { Stack, Typography } from '@mui/material';
import AcUnitIcon from '@mui/icons-material/AcUnit';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import {
  Button,
  PrimaryButton,
  SecondaryButton,
  LinkButton,
  IconButtonPlus,
} from '../../../components';

const DemoUi = () => {
  return (
    <Stack gap={2}>
      <Stack gap={2}>
        <Typography variant="h1">
          H1 _ Risus integer purus tortor pulvinar justo ut sem facilisis
          sagittis
        </Typography>
        <Typography variant="h2">
          H2 _ Risus integer purus tortor pulvinar justo ut sem facilisis
          sagittis
        </Typography>
        <Typography variant="h3">
          H3 _ Risus integer purus tortor pulvinar justo ut sem facilisis
          sagittis
        </Typography>
        <Typography variant="h4">
          H4 _ Risus integer purus tortor pulvinar justo ut sem facilisis
          sagittis
        </Typography>
        <Typography variant="h5">
          H5 _ Risus integer purus tortor pulvinar justo ut sem facilisis
          sagittis
        </Typography>
        <Typography variant="h6">
          H6 _ Risus integer purus tortor pulvinar justo ut sem facilisis
          sagittis
        </Typography>
      </Stack>

      <Stack gap={2}>
        <Typography>
          Libero pharetra justo id libero tellus mauris magna euismod elit
          viverra tincidunt tellus molestie libero. Purus pulvinar viverra
          sollicitudin ut tincidunt tortor sagittis massa integer a nec diam
          vestibulum tristique. Blandit a congue quam sem vel pharetra quis
          praesent congue nisi sem quis id sagittis. Eget orci sollicitudin
          neque placerat eleifend hendrerit orci ultrices purus neque diam fusce
          eleifend tortor. Hendrerit at risus sit neque suspendisse placerat
          viverra ex dapibus neque integer ultricies ultrices amet.
          <br />
          Risus integer purus tortor pulvinar justo ut sem facilisis sagittis
          aliquam diam dignissim sagittis blandit. Pharetra tristique massa ex
          nec justo faucibus dignissim magna sagittis pulvinar hendrerit a
          vestibulum ultrices. Ac nunc diam viverra faucibus purus faucibus at
          metus metus faucibus vitae integer malesuada mi. Eget amet dignissim
          commodo efficitur viverra elit metus dapibus dignissim id diam metus
          ultricies sapien. Pellentesque praesent tincidunt vitae molestie
          placerat sagittis commodo id a eget mauris ex purus aliquam.
        </Typography>
        <Typography variant="subtitle1">
          Euismod molestie sit ex amet ac nunc donec vehicula blandit eleifend
          diam metus tellus diam. Amet vestibulum integer tortor blandit dapibus
          placerat a congue blandit metus efficitur sapien non sapien. Dolor
          vehicula facilisis ac tellus elit nec sollicitudin euismod aliquam mi
          facilisis tellus adipiscing viverra. Praesent dolor curabitur massa
          non dignissim ut tortor consectetur pellentesque bibendum nibh integer
          eleifend molestie. Ac libero sit sed praesent at euismod facilisis
          molestie sem eleifend malesuada blandit quis cursus. Vehicula
          vestibulum facilisis facilisis fusce vitae ut neque ac justo tortor
          praesent donec facilisis ultricies.
        </Typography>
        <Typography variant="subtitle2">
          Adipiscing blandit dignissim curabitur purus sed sapien pharetra risus
          malesuada tincidunt aliquam integer facilisis pellentesque. Malesuada
          bibendum pharetra justo nunc libero sagittis nunc molestie tristique
          nisi vehicula tellus nec viverra. Amet dignissim nec nunc curabitur
          molestie eget mi sapien praesent nunc nec ultricies nibh vel. A purus
          orci consectetur consectetur blandit quam viverra quam nibh orci
          congue massa eleifend id. Commodo sem hendrerit ex cursus nec molestie
          risus ipsum at bibendum molestie congue vel sed. Vehicula tellus
          dapibus pulvinar quis congue lacus adipiscing ultricies donec
          adipiscing ac cursus tortor mauris.
        </Typography>
        <Typography variant="caption">
          Sit sagittis efficitur hendrerit sem vestibulum quis tincidunt
          facilisis ultricies integer tortor a nec ac. Risus sed dapibus lorem
          pulvinar integer sed a pellentesque ac mauris molestie sapien nisi
          magna. Sapien dapibus viverra ipsum fusce elit massa tellus placerat
          vel dignissim blandit at mi tincidunt.
        </Typography>
      </Stack>

      <Stack
        direction="row"
        alignItems="flex-start"
        justifyContent="center"
        gap={2}
      >
        <Button>Button</Button>
        <PrimaryButton>PrimaryButton</PrimaryButton>
        <SecondaryButton>SecondaryButton</SecondaryButton>
        <LinkButton to={'/'}>LinkButton</LinkButton>
        <IconButtonPlus>
          <AcUnitIcon color="inherit" />
        </IconButtonPlus>
        <IconButtonPlus tooltip="Tooltip text">
          <AddCircleIcon color="inherit" />
        </IconButtonPlus>
      </Stack>
    </Stack>
  );
};

export default DemoUi;
