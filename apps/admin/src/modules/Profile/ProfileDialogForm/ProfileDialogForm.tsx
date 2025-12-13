import FullscreenIcon from '@mui/icons-material/Fullscreen';
import FullscreenExitIcon from '@mui/icons-material/FullscreenExit';
import { useAppStore } from '../../../store';
import { PROFILE_DRAWER_WIDTH_DEFAULT } from '../../../constants';
import { Button, Drawer } from '../../../components';

const ProfileDialogForm = () => {
  const { profileDialog, setProfileDialog } = useAppStore();

  // TODO

  return (
    <Drawer
      labelId="profile-dialog"
      anchor="right"
      open={profileDialog}
      onClose={() => setProfileDialog(false)}
      title="Profile drawer title"
      titleActions={[
        {
          children: <FullscreenIcon />,
          onClick: () => console.log('test'),
          disabled: true,
        },
        {
          children: <FullscreenExitIcon />,
          onClick: () => console.log('test'),
          tooltip: 'Tooltip text',
        },
      ]}
      actions={
        <>
          <Button>Button</Button>
          <Button variant="outlined">Button</Button>
          <Button variant="contained">Button</Button>
        </>
      }
      width={{
        xs: '100%',
        md: PROFILE_DRAWER_WIDTH_DEFAULT,
      }}
    >
      ...ProfileDialogForm...
      <div>
        Curabitur mauris cursus vehicula malesuada amet ac sem blandit tincidunt
        risus consectetur dignissim sit nibh. Ultrices sollicitudin donec quis
        tristique lacus at sit eleifend sagittis nunc vestibulum pharetra sem
        ultrices. Vitae amet ipsum sed libero sit mi mi suspendisse aliquam
        magna pulvinar adipiscing vitae id. Amet consectetur facilisis vehicula
        tincidunt placerat fusce viverra aliquam ut tristique praesent sapien
        orci purus. Hendrerit viverra adipiscing vehicula pharetra pharetra
        risus sem pulvinar libero integer nisi nunc cursus tellus.
        <br />
        Quam curabitur sem suspendisse molestie magna placerat nunc integer
        ultricies at massa amet ex tristique. Massa commodo amet ex ultricies
        eleifend non praesent mauris eget euismod placerat consectetur curabitur
        congue. Hendrerit tincidunt tellus sollicitudin cursus praesent praesent
        integer ultricies tellus praesent commodo sollicitudin a sit. Ultricies
        diam risus justo ex congue integer dapibus facilisis magna tellus
        faucibus sagittis donec consectetur. Euismod quam pulvinar ultricies
        tincidunt sapien vehicula orci vel aliquam a sem sit consectetur non.
      </div>
    </Drawer>
  );
};

export default ProfileDialogForm;
