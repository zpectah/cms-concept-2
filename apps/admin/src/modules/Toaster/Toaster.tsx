import { Container } from '@chakra-ui/react';
import { useAppStore } from '../../store';
import { Alert } from '../../components';

import './toaster.scss';

const Toaster = () => {
  const { toasts, removeToast } = useAppStore();

  return (
    <div id="Toaster">
      <Container maxW="2xl">
        <ul>
          {toasts.map(({ id, title, description, severity }) => (
            <li key={id}>
              <Alert
                onClose={() => removeToast(id)}
                title={title}
                description={description}
                severity={severity}
              />
            </li>
          ))}
        </ul>
      </Container>
    </div>
  );
};

export default Toaster;
