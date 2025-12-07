import { modelKeys } from '@model';
import { DetailDrawer } from '../../../components';
import { useArticlesDetailForm } from './useArticlesDetailForm';

const FORM_NAME = 'ArticlesDetailForm';

const ArticlesDetailForm = () => {
  const { id, title, open, onClose, onReset } = useArticlesDetailForm();

  return (
    <DetailDrawer
      open={open}
      onClose={onClose}
      title={title}
      model={modelKeys.articles}
      actions={[
        {
          id: 'submit',
          label: 'Create/Update',
          type: 'submit',
          form: FORM_NAME,
        },
        {
          id: 'reset',
          label: 'Reset',
          onClick: onReset,
          variant: 'outline',
        },
        {
          id: 'cancel',
          label: 'Cancel',
          onClick: onClose,
          variant: 'outline',
        },
      ]}
    >
      <form id={FORM_NAME}>
        ...ArticlesDetailForm...{id}
        <br />
        <p>
          Tellus bibendum justo curabitur euismod vitae aliquam metus faucibus
          tincidunt orci consectetur congue cursus magna. Id mi bibendum
          curabitur consectetur dapibus tincidunt tellus pulvinar nec aliquam
          placerat commodo mi blandit. Facilisis massa consectetur risus integer
          adipiscing adipiscing dignissim mi vehicula justo congue mi magna
          pellentesque. Tincidunt faucibus pulvinar praesent dolor non bibendum
          vitae hendrerit ultrices consectetur diam adipiscing pulvinar euismod.
          Viverra hendrerit sit vitae ex ipsum tristique a eleifend nisi
          consectetur efficitur pellentesque sollicitudin purus. Id fusce
          malesuada eget ex amet metus ex pellentesque eleifend vitae faucibus
          massa ex neque. Mauris tincidunt neque amet sed tellus sagittis elit
          malesuada nunc mauris hendrerit cursus nisi molestie. Sapien vitae
          quis facilisis praesent tincidunt bibendum malesuada diam euismod
          placerat quam ut risus vehicula. Sagittis dapibus ac faucibus risus a
          molestie adipiscing ac elit tristique suspendisse massa ipsum
          adipiscing. Pulvinar aliquam id vehicula nibh ultricies nibh vel
          praesent sit sed placerat nisi fusce sagittis. Mi ut ultricies mauris
          a nisi curabitur euismod id tincidunt sit donec placerat quis sit.
          Cursus orci pulvinar donec euismod id risus efficitur viverra
          consectetur purus ultrices consectetur lacus sit. Hendrerit nunc
          tellus mauris risus vehicula ipsum a bibendum blandit id sollicitudin
          ex tincidunt ipsum. Viverra mauris neque malesuada cursus adipiscing
          donec viverra tellus tellus sit dapibus sollicitudin lacus lacus.
          Ultricies praesent commodo vestibulum praesent molestie lacus nisi
          pharetra dolor magna efficitur aliquam efficitur neque. Bibendum dolor
          ut ac hendrerit metus suspendisse malesuada lorem nec metus cursus
          placerat sapien elit. Placerat donec id quis ac congue sapien
          facilisis vestibulum mauris aliquam ut hendrerit molestie neque. Orci
          purus adipiscing nunc ex id consectetur eleifend sapien adipiscing nec
          efficitur pellentesque fusce tortor. Facilisis mauris ex vel ultricies
          placerat cursus facilisis viverra placerat aliquam commodo dolor
          praesent massa. Consectetur efficitur viverra praesent efficitur
          facilisis a ultricies integer non at vehicula eleifend hendrerit
          dolor. Dolor quis metus justo orci suspendisse eget tristique sit nibh
          pulvinar donec integer ipsum dapibus. Justo facilisis quis ex pharetra
          sollicitudin sagittis sem ac sapien euismod sit libero quam non.
          Tortor fusce quis sagittis nec sed dignissim elit eget viverra sed
          eget sagittis ultricies sed. Eget vel dolor pulvinar consectetur eget
          bibendum libero ultrices justo faucibus dapibus sem sagittis nec. Ut
          efficitur vitae a nibh pulvinar lacus sapien efficitur curabitur
          tristique molestie facilisis bibendum vestibulum.
        </p>
      </form>
    </DetailDrawer>
  );
};

export default ArticlesDetailForm;
