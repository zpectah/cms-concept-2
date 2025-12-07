import { Spinner } from '@chakra-ui/react';

const Preloader = () => (
  <div className="layout-preloader">
    <Spinner size="xl" borderWidth=".25rem" />
  </div>
);

export default Preloader;
