import { useRef, useEffect, useState } from "react";
import mapboxgl from "mapbox-gl";
import { useSelector, useDispatch } from "react-redux";
import "mapbox-gl/dist/mapbox-gl.css";

import { useLocalStorage } from "../../hooks";
import { locationSelected } from "../../features/locations/locationsSlice";

mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_ACESS_TOKEN;

function Map() {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const dispatch = useDispatch();
  const { selectedLocation } = useSelector((state) => state.location);
  const { getItem, setItem } = useLocalStorage("defaultMapOptions");

  const [lng, setLng] = useState(getItem()?.lng || -70.9);
  const [lat, setLat] = useState(getItem()?.lat || 42.35);
  const [zoom, setZoom] = useState(getItem()?.zoom || 8);

  useEffect(() => {
    if (map.current) return;
    map.current = new mapboxgl.Map({
      container: mapContainer.current, // container ID
      style: "mapbox://styles/mapbox/streets-v11", // style
      bearingSnap: 7,
      center: [lng, lat], // starting position [lng, lat]
      zoom: zoom, // starting zoom
      testMode: true,
      maxPitch: 85,
    });
  }, []);

  useEffect(() => {
    if (!map.current) return;

    map.current.once("move", () => {
      const { lat, lng } = map.current.getCenter();
      const zoom = map.current.getZoom();

      setLng(lng.toFixed(4));
      setLat(lat.toFixed(4));
      setZoom(zoom.toFixed(4));
      setItem({ lat, lng, zoom });
    });
  });

  useEffect(() => {
    let isMounted = true;
    if (selectedLocation) {
      const { lng, lat } = selectedLocation.coords;
      map.current.panTo([lng, lat], { duration: 500 });

      setTimeout(() => {
        map.current?.zoomTo(13.5, { duration: 1000 });
      }, 1000);

      dispatch(locationSelected(null));
    }

    return () => {
      isMounted = false;
    };
  }, [selectedLocation]);

  return <div className="mapContainer" ref={mapContainer}></div>;
}

export default Map;
