import { Spinner } from '@chakra-ui/react';

import './layout.scss';

const Preloader = () => (
  <div className="layout-preloader">
    <Spinner size="xl" borderWidth=".25rem" />
  </div>
);

export default Preloader;
