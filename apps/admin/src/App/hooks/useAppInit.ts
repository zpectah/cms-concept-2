import mapboxgl from 'mapbox-gl';
import { getConfig } from '../../config';
import { useEffect } from 'react';

interface UseAppInitProps {
  callback?: () => void;
}

export const useAppInit = ({ callback }: UseAppInitProps) => {
  const {
    cms: {
      apps: { mapbox },
    },
  } = getConfig();

  const initHandler = () => {
    mapboxgl.accessToken = mapbox.token;
    callback?.();
  };

  useEffect(initHandler, [callback, mapbox.token]);
};
