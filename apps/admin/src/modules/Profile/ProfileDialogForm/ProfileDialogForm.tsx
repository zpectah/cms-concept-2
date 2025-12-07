import { useAppStore } from '../../../store';
import { Drawer } from '../../../components';

const ProfileDialogForm = () => {
  const { profileDialog, setProfileDialog } = useAppStore();

  // TODO: data

  return (
    <Drawer
      open={profileDialog}
      onOpenChange={setProfileDialog}
      title="Profile drawer title ..."
      actions={[
        {
          id: 'submit',
          label: 'Submit',
          type: 'submit',
        },
        {
          id: 'close',
          label: 'Close',
          onClick: () => setProfileDialog(false),
          variant: 'outline',
        },
      ]}
      rootProps={{
        unmountOnExit: true,
      }}
    >
      <p>my content</p>
    </Drawer>
  );
};

export default ProfileDialogForm;
