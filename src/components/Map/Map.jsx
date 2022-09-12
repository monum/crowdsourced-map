// imports from installed modules
import "mapbox-gl/dist/mapbox-gl.css";
import Map, { Marker, useMap } from "react-map-gl";
import { useRef, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

// imports from local files
import { useDeterminePageSize, useWindowSize } from "../../hooks";
import config from "../../app-config.json";

import { ProjectMarker } from "../";
import { locationSelected } from "../../features/locations/locationsSlice";
import { useLazyGetAddressQuery } from "../../features/suggestProject/addressApi";
import { setProjectDetails } from "../../features/suggestProject/newProjectSlice";

function MapRoot() {
  const mapRef = useRef(null);
  const dispatch = useDispatch();
  const { breakPoint } = useWindowSize();
  const { renderFullMap } = useDeterminePageSize();

  const { isActive: isSuggestingProject } = useSelector(
    (store) => store.newProject
  );
  const { selectedLocation } = useSelector((store) => store.location);
  const { data, filteredData } = useSelector((store) => store.projects);

  const { lng, lat, zoom, style } = config["MAP_DETAILS"];
  const [viewState, setViewState] = useState({
    longitude: lng || -71.085,
    latitude: lat || 42.35,
    zoom: zoom || 10.1,
  });

  useEffect(() => {
    // set the map center to the selected location
    if (!selectedLocation || !mapRef.current) return;
    const { lng, lat } = selectedLocation;

    let offset = [0, 0];
    if (!renderFullMap && breakPoint === "lg") offset = [-280, 0];

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
      onResize={() => setViewState(viewState)}
      reuseMaps
      attributionControl={false}
      style={{ width: "100%", height: "100%", overflow: "hidden" }}
      mapStyle={style}
      mapboxAccessToken={process.env.REACT_APP_MAPBOX_ACESS_TOKEN}
    >
      {filteredData.length > 0 &&
        filteredData.map((record) => (
          <ProjectMarker
            key={record.id}
            fields={record.fields}
            id={record.id}
            coords={{ lat: record.fields.Lat, lng: record.fields.Lng }}
          />
        ))}

      {!(filteredData.length > 0) &&
        data?.map((record) => (
          <ProjectMarker
            key={record.id}
            fields={record.fields}
            id={record.id}
            coords={{ lat: record.fields.Lat, lng: record.fields.Lng }}
          />
        ))}
      {isSuggestingProject && <NewProjectMarker />}
    </Map>
  );
}

const NewProjectMarker = () => {
  const dispatch = useDispatch();
  const { current: map } = useMap();
  const { breakPoint } = useWindowSize();
  const { renderFullMap } = useDeterminePageSize();
  const [getAddressTrigger, addressData] = useLazyGetAddressQuery();
  const { coords, isActive } = useSelector((store) => store.newProject);

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
    // update the coords and address data on the suggest project page
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
      style={{ zIndex: 10 }}
      offset={
        renderFullMap === false && breakPoint === "lg" ? [-280, 0] : [0, 0]
      }
      onDrag={(e) => handleNewProjectUpdate("coords", e.lngLat)}
      onDragEnd={(e) => handleNewProjectUpdate("address", e.lngLat)}
    ></Marker>
  );
};

export default MapRoot;
