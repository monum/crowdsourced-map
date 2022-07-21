import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { useRef, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Circle } from "@mui/icons-material";

import { useLocalStorage } from "../../hooks";
import { useLazyGetAddressQuery } from "../../features/projects/addressApi";
import { useGetProjectsQuery } from "../../features/projects/projectsApi";
import { locationSelected } from "../../features/locations/locationsSlice";
import { setProjectDetails } from "../../features/projects/newProjectSlice";

mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_ACESS_TOKEN;

function Map() {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const newProjectMarker = useRef(null);
  const dispatch = useDispatch();
  const { selectedLocation } = useSelector((state) => state.location);
  const { isActive } = useSelector((state) => state.newProject);
  const { getItem, setItem } = useLocalStorage("defaultMapOptions");
  const [getAddressTrigger, addressData] = useLazyGetAddressQuery();
  const { data, isFetching, isError } = useGetProjectsQuery();
  const marker = useRef(null);

  const [lng, setLng] = useState(getItem()?.lng ?? -70.9);
  const [lat, setLat] = useState(getItem()?.lat ?? 42.35);
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
    if (!isActive && newProjectMarker.current) {
      newProjectMarker.current.remove();
      setProjectDetails({ coords: "" });
    }
    if (!isActive) return;

    newProjectMarker.current = new mapboxgl.Marker({ draggable: true })
      .setLngLat([lng, lat])
      .addTo(map.current);

    const markerCoords = {
      lat: parseFloat(lat),
      lng: parseFloat(lng),
    };

    getAddressTrigger(markerCoords);
    dispatch(
      setProjectDetails({
        coords: markerCoords,
      })
    );
  }, [isActive]);

  // useEffect(() => {
  //   if (!data || !map.current) return;
  //   data.records.forEach(({ Lat, Lng }) => {
  //     const newMarker = new mapboxgl.Marker(<Circle />)
  //       .setLngLat([lng, lat])
  //       .addTo(map.current);
  //   });
  // }, [data]);

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
    if (!addressData?.data || !isActive) return;

    return dispatch(
      setProjectDetails({
        address: {
          isFetching: addressData.isFetching,
          status: addressData.isSuccess,
          data: addressData.data.features[0]["place_name"],
        },
      })
    );
  }, [addressData]);

  useEffect(() => {
    if (!newProjectMarker.current || !isActive) return;

    const resetCoords = () => {
      const { lat, lng } = newProjectMarker.current.getLngLat();

      dispatch(
        setProjectDetails({
          coords: { lat, lng },
        })
      );
      newProjectMarker.current.setLngLat([lng, lat]);
    };

    const resetAddress = () => {
      const { lat, lng } = newProjectMarker.current.getLngLat();

      const markerCoords = {
        lat: parseFloat(lat).toFixed(4),
        lng: parseFloat(lng).toFixed(4),
      };

      getAddressTrigger(markerCoords);
    };

    newProjectMarker.current.on("drag", resetCoords);
    newProjectMarker.current.on("dragend", resetAddress);

    return () => {
      newProjectMarker.current.off("drag", resetCoords);
      newProjectMarker.current.off("dragend", resetAddress);
    };
  });

  useEffect(() => {
    let isMounted = true;
    if (!selectedLocation) return;

    const { lng, lat } = selectedLocation.coords;
    map.current.panTo([lng, lat], { duration: 500 });

    const timeout = setTimeout(() => {
      map.current?.zoomTo(13.5, { duration: 1000 });
    }, 1000);

    dispatch(locationSelected(null));

    return () => {
      clearTimeout(timeout);
    };
  }, [selectedLocation]);

  return <div className="mapContainer" ref={mapContainer}></div>;
}

export default Map;
