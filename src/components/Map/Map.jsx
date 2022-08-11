import "mapbox-gl/dist/mapbox-gl.css";
import { useRef, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Map, { Marker, useMap } from "react-map-gl";

import { ProjectMarker } from "../";
import { useLocalStorage, useDeterminePageSize } from "../../hooks";
import { useLazyGetAddressQuery } from "../../features/projects/addressApi";
import { locationSelected } from "../../features/locations/locationsSlice";
import { setProjectDetails } from "../../features/projects/newProjectSlice";

function MapRoot() {
  const { getItem, setItem } = useLocalStorage("defaultMapOptions");
  const { renderFullMap } = useDeterminePageSize();

  const mapRef = useRef(null);
  const [viewState, setViewState] = useState({
    longitude: getItem()?.longitude ?? -70.9,
    latitude: getItem()?.latitude ?? 42.35,
    zoom: getItem()?.zoom || 10,
  });

  useEffect(() => {
    setItem(viewState);
  }, [viewState]);

  const dispatch = useDispatch();
  const { selectedLocation } = useSelector((store) => store.location);
  const { isActive } = useSelector((store) => store.newProject);
  const { data, filteredData } = useSelector((store) => store.projects);

  useEffect(() => {
    if (!selectedLocation || !mapRef.current) return;
    const { lng, lat } = selectedLocation;
    let offset = [0, 0];

    if (!renderFullMap) offset = [-280, 0];

    mapRef.current?.easeTo({
      center: [lng, lat],
      zoom: 13.5,
      duration: 1500,
      offset,
    });

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
      {filteredData.length > 0 &&
        filteredData.map((record) => (
          <ProjectMarker
            key={record.id}
            title={record.Title}
            id={record.id}
            coords={{ lat: record.fields.Lat, lng: record.fields.Lng }}
          />
        ))}

      {!filteredData.length > 0 &&
        data?.map((record) => (
          <ProjectMarker
            key={record.id}
            title={record.fields.Title}
            id={record.id}
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

  const { coords } = useSelector((store) => store.newProject);

  const [newProjectCoords, setNewProjectCoords] = useState({
    lat: coords.lat || map.getCenter().lat,
    lng: coords.lng || map.getCenter().lng,
  });

  useEffect(() => {
    if (!addressData?.data || !isActive) return;

    return dispatch(
      setProjectDetails({
        address: {
          isFetching: addressData.isFetching,
          isError: addressData.isError,
          data: addressData.data?.features[0]?.place_name,
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
