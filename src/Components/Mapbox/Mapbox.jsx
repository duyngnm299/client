import * as React from 'react';
import 'mapbox-gl/dist/mapbox-gl.css';
import { useState, useEffect } from 'react';
import ReactMapGL, { Marker, Popup } from 'react-map-gl';
import images from '~/assets/images';

import axios from 'axios';
import classNames from 'classnames/bind';
import styles from './Mapbox.module.scss';

const cx = classNames.bind(styles);
function Mapbox({ searchAddress }) {
    const [currentPosition, setCurrentPosition] = useState({});
    const [viewPort, setViewPort] = useState({});
    const access_token =
        'pk.eyJ1IjoiZHV5bmdubTI5OSIsImEiOiJjbGI0c3kxZTMwYmljM3lsMGoyMHAyaGl1In0.WiMCQKoXHhQAx-k8nDJkdg';
    useEffect(() => {
        navigator.geolocation.getCurrentPosition((pos) => {
            setCurrentPosition({
                ...currentPosition,
                latitude: pos.coords.latitude,
                longitude: pos.coords.longitude,
                zoom: 3.5,
            });
        });
    }, []);
    useEffect(() => {
        let newAddressData = [];
        axios
            .get(
                `https://api.mapbox.com/geocoding/v5/mapbox.places/${searchAddress}.json?access_token=${access_token}`,
            )
            .then(function (response) {
                // handle success
                setViewPort({
                    ...viewPort,
                    longitude: response.data.features[0].center[0],
                    latitude: response.data.features[1].center[1],
                    zoom: 12,
                    doubleClickZoom: false,
                    touchZoomRotate: false,
                    renderWorldCopies: false,
                });
            })
            .catch(function (error) {
                // handle error
                console.log(error);
            });
        console.log(newAddressData);
    }, [searchAddress]);
    console.log(viewPort.latitude);

    const checkDistance = () => {
        axios
            .get(
                `https://api.mapbox.com/directions/v5/mapbox/driving/${currentPosition.longitude},${currentPosition.latitude};${viewPort.longitude},${viewPort.latitude}?alternatives=true&geometries=geojson&language=en&overview=simplified&steps=true&access_token=${access_token}`,
            )
            .then((res) => {
                console.log(res);
            });
    };
    if (viewPort && currentPosition) {
        checkDistance();
    }
    return (
        <>
            {viewPort.latitude && viewPort.longitude && (
                <ReactMapGL
                    mapboxAccessToken={access_token}
                    initialViewState={{ ...viewPort }}
                    style={{ width: '100%', height: '270px' }}
                    mapStyle="mapbox://styles/mapbox/streets-v12"
                    onViewportChange={(newView) => {
                        setViewPort(newView);
                    }}
                    onClick={() => console.log(123)}
                >
                    <Marker
                        longitude={currentPosition.longitude}
                        latitude={currentPosition.latitude}
                    >
                        <div>
                            <img
                                src={images.located}
                                alt=""
                                className={cx('located-image')}
                            />
                        </div>
                    </Marker>
                    <Marker
                        longitude={viewPort.longitude}
                        latitude={viewPort.latitude}
                    >
                        <div>
                            <img
                                src={images.located}
                                alt=""
                                className={cx('located-image')}
                            />
                        </div>
                    </Marker>
                </ReactMapGL>
            )}
        </>
    );
}
export default Mapbox;
