import { useContext, useState, useEffect } from "react";
import {
  Map as ReactMap,
  Source,
  Layer,
  ViewStateChangeEvent,
  MapboxEvent,
  Popup,
  MapLayerMouseEvent,
} from "react-map-gl";
import maplibregl from "maplibre-gl";
import { TractPageContext } from "src/pages/Tract/TractPage";
import bbox from "@turf/bbox";
import "./tract-map.sass";
import "maplibre-gl/dist/maplibre-gl.css";
import {
  intersect,
  Polygon,
  MultiPolygon,
  BBox,
  featureCollection,
  centroid,
} from "@turf/turf";
import { getParcelsByIds } from "src/services/database/parcel";
import { getStreetsByIds } from "src/services/database/street";
import { PermitLayer } from "src/types/tractTypes";
import getAllAPILayers from "src/services/api/kingProstor/apiCaller";
import PermitSource from "../PermitSource/PermitSource";
import { Category } from "src/types/permitEnums";
import { calculateIntersectionPercentage } from "src/utils/intersection";

// React functional component of the Mp
const TractMap = () => {
  const tractContext = useContext(TractPageContext);

  const [maxBounds, setMaxBounds] = useState<null | number[][]>(null);

  // Function that fits the map view to the selected tract.
  const handleMapLoad = (event: MapboxEvent) => {
    const padding = 125; // fit bounds padding in pixels

    const bounds: BBox = bbox({
      type: "FeatureCollection",
      features: tractContext.tract.features,
    });

    event.target.fitBounds(bounds as [number, number, number, number], {
      padding: padding,
    });

    event.target.once("zoomend", function () {
      handleMaxBounds(bounds);
    });

    tractContext.setLoading(false);
  };

  // Function that updates the map once the user has moved.
  const handleMove = (event: ViewStateChangeEvent) => {
    tractContext.handleViewState(event.viewState);
  };

  const handleMaxBounds = (bounds: BBox) => {
    const ratio = 10; // ratio that represents max bounds size to the tract size

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
  useEffect(() => {
    let abort = false;

    const fetchData = async () => {
      if (abort) return;

      const tract = await getParcelsByIds(tractContext.ids!);

      tractContext.setTract(tract);

      const tractBounds: BBox = bbox(tract) as BBox;

      const permitLayers = await getAllAPILayers(tractBounds);

      const permits: Array<PermitLayer> = permitLayers
        .map(({ category, data }) => {
          const intersectingFeatures = data.features.filter((dataFeature) => {
            return tract.features.some((tractFeature) => {
              return (
                intersect(
                  tractFeature as GeoJSON.Feature<
                    GeoJSON.Polygon | GeoJSON.MultiPolygon
                  >,
                  dataFeature as GeoJSON.Feature<
                    GeoJSON.Polygon | GeoJSON.MultiPolygon
                  >
                ) !== null
              );
            });
          });

          if (intersectingFeatures.length > 0) {
            const difficulty = calculateIntersectionPercentage(tract, data);
            const visibility = true;
            return {
              category,
              difficulty,
              visibility,
              data: featureCollection(intersectingFeatures),
            };
          }
        })
        .filter((permit): permit is PermitLayer => permit !== undefined);

      // const permits: Array<PermitLayer> = permitLayers.map(
      //   ({ category, data }) => {
      //     const array = [];
      //     data;
      //     const difficulty = calculateIntersectionPercentage(tract, data);
      //     const visibility = true;
      //     return { category, difficulty, visibility, data };
      //   }
      // );

      tractContext.setPermitLayers(permits);

      const streets: Array<string> = await getStreetsByIds(tractContext.ids!);

      tractContext.setStreets(streets);
    };

    fetchData();

    return () => {
      abort = true;
    };
  }, []);

  const interactiveLayerIds = [
    "tract",
    "selectedFeature",
    ...Object.values(Category),
  ];

  const handleFeatureClick = (event: any) => {
    const features = tractContext.reactMapRef.current.queryRenderedFeatures(
      event.point
    );
    if (features.length > 0) {
    }
  };

  const permitSources = tractContext.permitLayers.map(
    ({ category, visibility, data }, index) => {
      return PermitSource({
        category: category,
        visibility: visibility,
        height: index + 1,
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
        onLoad={handleMapLoad}
        mapStyle="https://api.maptiler.com/maps/728b3d85-ec90-44fc-a523-4a82941afef2/style.json?key=NnjGcTCXK5QNqcvLXvVg"
        attributionControl={false}
        interactiveLayerIds={interactiveLayerIds}
        boxZoom={false}
        maxBounds={maxBounds}
        onClick={handleFeatureClick}
      >
        <Source type="geojson" data={tractContext.tract} tolerance={0}>
          <Layer
            id="tract"
            type="fill-extrusion"
            paint={{
              "fill-extrusion-color": "#0D99FF",
              "fill-extrusion-height": 5,
              "fill-extrusion-base": 0,
            }}
            filter={["any", ["in", ["id"], ["literal", tractContext.ids]]]}
            //beforeId="properties"
          />
        </Source>
        {permitSources}
      </ReactMap>
    </div>
  );
};

export default TractMap;
