import { useContext, useState, useEffect, useCallback } from "react";
import { Marker, Map as ReactMap, ViewStateChangeEvent } from "react-map-gl";
import maplibregl, { GeoJSONFeature } from "maplibre-gl";
import { TractPageContext } from "src/pages/Tract/TractPage";
import bbox from "@turf/bbox";
import "./tract-map.sass";
import "maplibre-gl/dist/maplibre-gl.css";
import { BBox, intersect } from "@turf/turf";
import {
  getNeigboursById,
  getParcelsByIds,
} from "src/services/database/parcel";
import { getStreetsByIds } from "src/services/database/street";
import getAllAPILayers from "src/services/api/layers/apiCaller";
import MapLayer, { LayerProps } from "../MapLayer/MapLayer";
import { calculateIntersectionPercentage } from "src/utils/intersection";
import Popup from "../Popup/Popup";
import { useQuery } from "react-query";
import { calculateArea } from "src/utils/surfaceArea";
import { getLayerDataByName } from "src/types/permitEnums";
import { getApiParcels } from "src/services/api/parcels/parcel";

// React functional component of the Mp
const TractMap = () => {
  const tractContext = useContext(TractPageContext);

  const [maxBounds, setMaxBounds] = useState<null | number[][]>(null);

  // Function that fits the map view to the selected tract.
  const fitToTract = () => {
    const padding = 125; // fit bounds padding in pixels

    const bounds: BBox = bbox({
      type: "FeatureCollection",
      features: tractContext.tract.features,
    });

    tractContext.reactMapRef.current.fitBounds(
      bounds as [number, number, number, number],
      {
        padding: padding,
      }
    );

    tractContext.reactMapRef.current.once("zoomend", function () {
      updateMaxBounds(bounds);
    });
  };

  // Function that updates the map once the user has moved.
  const handleMove = (event: ViewStateChangeEvent) => {
    tractContext.handleViewState(event.viewState);
  };

  const updateMaxBounds = (bounds: BBox) => {
    const ratio = 15; // ratio that represents max bounds size to the tract size

    const lngDiff: number = bounds[2] - bounds[0]; // width
    const latDiff = bounds[3] - bounds[1]; // height

    const a: number = Math.max(lngDiff, latDiff) * ratio;

    const expandedBounds = [
      [bounds[0] - (a - lngDiff) / 2, bounds[1] - (a - latDiff) / 2],
      [bounds[2] + (a - lngDiff) / 2, bounds[3] + (a - latDiff) / 2],
    ];

    // Set the expanded bounds as the maxBounds property
    setMaxBounds(expandedBounds);
  };

  const fetchTractData = async () => {
    const tract = await getParcelsByIds(tractContext.ids!);
    const neighbours = await getNeigboursById(tractContext.ids!);
    const tractApi = await getApiParcels(tractContext.ids!);
    const neighbours_ids: string[] = neighbours.features.map(
      (feature: GeoJSON.Feature) => feature.properties!.parcel_id
    );
    const neighboursApi = await getApiParcels(neighbours_ids);
    console.log(neighboursApi);
    const tractBounds: BBox = bbox(tract) as BBox;
    const layers: LayerProps[] = await getAllAPILayers(tractBounds);

    const streets: Array<string> = await getStreetsByIds(tractContext.ids!);

    return { tract, neighbours, tractApi, neighboursApi, layers, streets };
  };

  const { data, isLoading, isError } = useQuery("tractMapData", fetchTractData);

  function getDifficulty(intersectionPercentage: number): number | null {
    if (!intersectionPercentage) return null;
    // Step 1: Logarithmic Transformation
    intersectionPercentage = Math.max(Math.min(intersectionPercentage, 100), 1);
    const logValue =
      25 * (Math.log(intersectionPercentage) / Math.log(100)) - 1;

    const normalizedValue = logValue / 2.5;
    // console.log(
    //   "intersection: " +
    //     intersectionPercentage +
    //     " normalized: " +
    //     normalizedValue
    // );

    return normalizedValue;
  }

  useEffect(() => {
    if (isLoading || isError || !data) {
      // tractContext.setTract({ type: "FeatureCollection", features: [] });
      // tractContext.setTractApi({ type: "FeatureCollection", features: [] });
      // tractContext.setLayers([]);
      // tractContext.setStreets([]);
      tractContext.setLoading(true); // Always call setLoading here
      return;
    }

    tractContext.setTract(data.tract);
    tractContext.setNeighbours(data.neighbours);
    tractContext.setTractApi(data.tractApi);
    tractContext.setNeighboursApi(data.neighboursApi);
    tractContext.setNeighboursApi(data.neighboursApi);
    const tractLayer: LayerProps = {
      name: "Parcela",
      opacity: 1,
      visibility: true,
      data: data.tract,
    };

    const neighboursLayer: LayerProps = {
      name: "Sosed",
      opacity: 0.4,
      visibility: true,
      data: data.neighbours,
    };
    const layersFromAPI = data.layers
      .map((layer: LayerProps) => {
        layer.data.features = layer.data.features
          .map((feature: GeoJSON.Feature) => {
            const intersectionPercent = calculateIntersectionPercentage(
              data.tract,
              {
                type: "FeatureCollection",
                features: [feature],
              }
            );

            if (intersectionPercent === 0 || Number.isNaN(intersectionPercent))
              return null;

            return feature;
          })
          .filter((feature): feature is GeoJSON.Feature => feature !== null);

        const surfaceArea = calculateArea(layer.data);
        const intersectionPercent = calculateIntersectionPercentage(
          data.tract,
          layer.data
        );

        if (intersectionPercent === 0 || Number.isNaN(intersectionPercent))
          return null;

        const difficulty = getDifficulty(intersectionPercent);
        return {
          name: layer.name,
          color: layer.color,
          difficulty: difficulty,
          visibility: true,
          data: layer.data,
          surfaceArea: surfaceArea, // Include surfaceArea in the returned object
        };
      })
      .filter((layer) => layer !== null)
      .sort((a: any, b: any) => a.surfaceArea - b.surfaceArea); // Order in ascending order

    tractContext.setLayers([tractLayer, neighboursLayer, ...layersFromAPI]);
    tractContext.setStreets(data.streets);
    tractContext.setLoading(false);
  }, [data, isLoading, isError]);

  useEffect(() => {
    if (tractContext.tract.features.length > 0) {
      fitToTract();
    }
  }, [tractContext.tract]);

  const interactiveLayerIds = tractContext.layers.map((layer) => layer.name);

  const handlePopupClose = (longitude: number, latitude: number) => {
    tractContext.setPopups((prevPopups: any) =>
      prevPopups.filter(
        (popup: any) =>
          !(popup.longitude === longitude && popup.latitude === latitude)
      )
    );
  };

  const handleFeatureClick = (event: any) => {
    const map = tractContext.reactMapRef.current;
    const features = map.queryRenderedFeatures(event.point);

    for (let i = 0; i < features.length; i++) {
      const feature = features[i];
      // Check if the layer is visible and not having opacity 0
      if (feature.layer?.paint?.["fill-extrusion-opacity"] > 0) {
        console.log("First visible feature:", feature);

        const newPopup = {
          name: feature.layer.id,
          layerData: getLayerDataByName(feature.layer.id),
          subtitle: "/",
          color: feature.layer.paint["fill-extrusion-color"],
          properties: feature.properties,
          feature: feature,
          longitude: event.lngLat.lng,
          latitude: event.lngLat.lat,
        };

        // If shift key was pressed, add to the existing popups. Otherwise, replace them.
        if (event.originalEvent.shiftKey) {
          if (tractContext.popups.length > 2) return;

          const existingPopup = tractContext.popups.find(
            (popup: any) =>
              JSON.stringify(popup.properties) ===
              JSON.stringify(newPopup.properties)
          );

          if (!existingPopup) {
            tractContext.setPopups((prevPopups: any) => [
              ...prevPopups,
              newPopup,
            ]);
          }
        } else {
          tractContext.setPopups([newPopup]);
        }

        break;
      }
    }
  };

  const visibilityArray = tractContext.layers
    .map(({ visibility }) => visibility)
    .reverse();
  const mapLayers = tractContext.layers.map(
    ({ name, color, opacity, visibility, data }, index) => {
      const height =
        5 *
        visibilityArray.slice(0, visibilityArray.length - index).filter(Boolean)
          .length;
      return MapLayer({
        name: name,
        color: color,
        opacity: opacity,
        visibility: visibility,
        height: height,
        data: data,
      });
    }
  );

  return (
    <div className="tract-map">
      <ReactMap
        {...tractContext.viewState}
        ref={tractContext.reactMapRef}
        mapLib={maplibregl}
        onMove={handleMove}
        // onLoad={handleMapLoad}
        mapStyle="https://api.maptiler.com/maps/728b3d85-ec90-44fc-a523-4a82941afef2/style.json?key=NnjGcTCXK5QNqcvLXvVg"
        attributionControl={false}
        interactiveLayerIds={interactiveLayerIds}
        boxZoom={false}
        maxBounds={maxBounds}
        onClick={handleFeatureClick}
      >
        {mapLayers}
        {tractContext.popups.map((popup: any, index: number) => (
          <Marker
            key={index}
            longitude={popup.longitude}
            latitude={popup.latitude}
          >
            <Popup
              name={popup.name}
              layerData={popup.layerData}
              feature={popup.feature}
              onClose={() => handlePopupClose(popup.longitude, popup.latitude)}
            />
          </Marker>
        ))}
      </ReactMap>
    </div>
  );
};

export default TractMap;
