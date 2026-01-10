import { useEffect, useState, useRef, useCallback } from 'react';
import mapboxgl, { Map } from 'mapbox-gl';
import { GpsLocation } from '@common';
import { UseLocationPickerProps } from './types';
import { locationPickerDefaults } from './constants';

export const useLocationPicker = ({
  value,
  onChange,
  initialThumbZoom,
  onMapChange,
  styles = 'mapbox://styles/mapbox/streets-v11',
}: UseLocationPickerProps) => {
  const [dialogOpen, setDialogOpen] = useState<boolean>(false);
  const [center, setCenter] = useState<GpsLocation>(
    locationPickerDefaults.center.empty
  );
  const [selectedCenter, setSelectedCenter] = useState<GpsLocation>(
    locationPickerDefaults.center.empty
  );
  const [markerCenter, setMarkerCenter] = useState<GpsLocation>(
    locationPickerDefaults.center.empty
  );
  const [zoom, setZoom] = useState<number>(locationPickerDefaults.zoom.default);
  const [thumbZoom] = useState<number>(
    initialThumbZoom ?? locationPickerDefaults.zoom.thumbnail
  );

  const mainMapRef = useRef<Map | null>(null);
  const mainMapContainerRef = useRef<HTMLDivElement | null>(null);
  const thumbMapRef = useRef<Map | null>(null);
  const thumbMapContainerRef = useRef<HTMLDivElement | null>(null);

  const mainSelectedMarker = new mapboxgl.Marker();
  const thumbSelectedMarker = new mapboxgl.Marker();

  const mainMapLoadHandler = useCallback(() => {
    mainMapRef.current = new mapboxgl.Map({
      container: mainMapContainerRef.current as HTMLElement,
      center: selectedCenter,
      zoom,
      style: styles,
      attributionControl: false,
      trackResize: true,
    });

    mainMapRef.current.on('load', (event) => {
      if (mainMapRef.current)
        mainSelectedMarker.setLngLat(selectedCenter).addTo(mainMapRef.current);
    });

    mainMapRef.current.on('move', () => {
      const mapCenter = mainMapRef.current?.getCenter() ?? { lat: 0, lng: 0 };
      const mapZoom = mainMapRef.current?.getZoom() ?? 1;

      setCenter([mapCenter.lng, mapCenter.lat]);
      setZoom(mapZoom);

      onMapChange?.([mapCenter?.lng, mapCenter?.lat], mapZoom);
    });

    mainMapRef.current.on('click', (event) => {
      const newLocation: GpsLocation = [event.lngLat.lng, event.lngLat.lat];

      setMarkerCenter(newLocation);

      if (!mainMapRef.current) return;

      mainSelectedMarker.setLngLat(newLocation).addTo(mainMapRef.current);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedCenter, zoom]);

  const thumbMapLoadHandler = useCallback(() => {
    thumbMapRef.current = new mapboxgl.Map({
      container: thumbMapContainerRef.current as HTMLElement,
      center: selectedCenter,
      zoom: thumbZoom,
      style: styles,
    });

    thumbMapRef.current.on('load', (event) => {
      if (thumbMapRef.current) {
        thumbSelectedMarker
          .setLngLat(selectedCenter)
          .addTo(thumbMapRef.current);
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedCenter, thumbZoom]);

  const resetHandler = () => {
    mainSelectedMarker.remove();
    thumbSelectedMarker.remove();

    setMarkerCenter(locationPickerDefaults.center.empty);

    mainMapLoadHandler();
  };

  const openHandler = () => setDialogOpen(true);

  const closeHandler = () => {
    setMarkerCenter(locationPickerDefaults.center.empty);
    setDialogOpen(false);
  };

  const saveHandler = () => {
    closeHandler();

    setSelectedCenter(markerCenter);

    onChange?.(markerCenter);
  };

  useEffect(() => {
    if (!dialogOpen || !mainMapContainerRef.current) return;

    mainMapLoadHandler();

    return () => mainMapRef?.current?.remove();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dialogOpen]);

  useEffect(() => {
    if (!thumbMapContainerRef.current) return;

    thumbMapLoadHandler();

    return () => thumbMapRef?.current?.remove();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedCenter]);

  useEffect(() => {
    if (value) {
      setCenter(value);
      setSelectedCenter(value);
      setMarkerCenter(value);
    }
  }, [value]);

  return {
    center: {
      current: center,
      marker: markerCenter,
      selected: selectedCenter,
    },
    zoom: {
      main: zoom,
      thumbnail: zoom,
    },
    refs: {
      main: mainMapContainerRef,
      thumb: thumbMapContainerRef,
    },
    open: dialogOpen,
    onOpen: openHandler,
    onClose: closeHandler,
    onReset: resetHandler,
    onSave: saveHandler,
  };
};
