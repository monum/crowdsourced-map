import "mapbox-gl/dist/mapbox-gl.css";
import { useRef, useEffect, useState, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import Map, { Marker, useMap } from "react-map-gl";

import { useLocalStorage } from "../../hooks";
import { ProjectMarker } from "../../components";
import { useLazyGetAddressQuery } from "../../features/projects/addressApi";
import { useGetProjectsQuery } from "../../features/projects/projectsApi";
import { locationSelected } from "../../features/locations/locationsSlice";
import { setProjectDetails } from "../../features/projects/newProjectSlice";

function MapRoot() {
  const { getItem, setItem } = useLocalStorage("defaultMapOptions");
  const [zoom, setZoom] = useState(false);

  const mapRef = useRef(null);
  const [viewState, setViewState] = useState({
    longitude: getItem()?.lng ?? -70.9,
    latitude: getItem()?.lat ?? 42.35,
    zoom: getItem()?.zoom || 8,
  });

  const dispatch = useDispatch();
  const { selectedLocation } = useSelector((state) => state.location);
  const { isActive } = useSelector((state) => state.newProject);
  const { data, isFetching, isError } = useGetProjectsQuery();

  useEffect(() => {
    if (!selectedLocation || !mapRef.current) return;
    const { lng, lat } = selectedLocation.coords;
    mapRef.current?.easeTo({ center: [lng, lat], zoom: 13.5, duration: 1500 });

    dispatch(locationSelected(null));
  }, [selectedLocation]);

  return (
    <Map
      {...viewState}
      ref={mapRef}
      onMove={(e) => setViewState(e.viewState)}
      reuseMaps
      attributionControl={false}
      style={{ width: "100%", height: "100%" }}
      mapStyle="mapbox://styles/mapbox/streets-v9"
      mapboxAccessToken={process.env.REACT_APP_MAPBOX_ACESS_TOKEN}
    >
      {data?.records.map((record) => (
        <ProjectMarker
          key={record.id}
          coords={{ lat: record.fields.Lat, lng: record.fields.Lng }}
        />
      ))}
      {isActive && <NewProjectMarker isActive={isActive} />}
    </Map>
  );
}

const NewProjectMarker = ({ isActive }) => {
  const dispatch = useDispatch();
  const { current: map } = useMap();
  const [getAddressTrigger, addressData] = useLazyGetAddressQuery();

  const [newProjectCoords, setNewProjectCoords] = useState({
    lat: map.getCenter().lat,
    lng: map.getCenter().lng,
  });

  useEffect(() => {
    if (!addressData?.data || !isActive) return;

    return dispatch(
      setProjectDetails({
        address: {
          isFetching: addressData.isFetching,
          isError: addressData.isError,
          data: addressData.data.features[0]["place_name"],
        },
      })
    );
  }, [addressData]);

  useEffect(() => {
    if (!isActive) return;
    setNewProjectCoords();
    handleNewProjectUpdate("address", newProjectCoords);
    handleNewProjectUpdate("coords", newProjectCoords);
  }, [isActive]);

  const handleNewProjectUpdate = async (key, details) => {
    setNewProjectCoords(details);
    if (key === "coords") {
      dispatch(
        setProjectDetails({
          coords: {
            lat: parseFloat(details.lat),
            lng: parseFloat(details.lng),
          },
        })
      );
    } else if (key === "address") {
      getAddressTrigger({
        lat: parseFloat(details.lat),
        lng: parseFloat(details.lng),
      });
    }
  };

  return (
    <Marker
      longitude={newProjectCoords.lng}
      latitude={newProjectCoords.lat}
      draggable
      onDrag={(e) => handleNewProjectUpdate("coords", e.lngLat)}
      onDragEnd={(e) => handleNewProjectUpdate("address", e.lngLat)}
    ></Marker>
  );
};

export default MapRoot;
