import '@goongmaps/goong-js/dist/goong-js.css';
import '@goongmaps/goong-geocoder/dist/goong-geocoder.css';
import React, { Component } from 'react';
import MapGL from '@goongmaps/goong-map-react';
import Geocoder from '@goongmaps/goong-geocoder-react';

class App extends Component {
    state = {
        viewport: {
            latitude: 21.026975,
            longitude: 105.85346,
            zoom: 12,
        },
    };

    mapRef = React.createRef();

    handleViewportChange = (viewport) => {
        this.setState({
            viewport: { ...this.state.viewport, ...viewport },
        });
    };

    // if you are happy with Geocoder default settings, you can just use handleViewportChange directly
    handleGeocoderViewportChange = (viewport) => {
        const geocoderDefaultOverrides = { transitionDuration: 1000 };

        return this.handleViewportChange({
            ...viewport,
            ...geocoderDefaultOverrides,
        });
    };

    render() {
        return (
            <MapGL
                ref={this.mapRef}
                {...this.state.viewport}
                width="100vw"
                height="100vh"
                onViewportChange={this.handleViewportChange}
                goongApiAccessToken="4dAgWahZ3jW5LsZCiYikMTvVUOYpd2jcmxz3kyLA"
            >
                <Geocoder
                    mapRef={this.mapRef}
                    onViewportChange={this.handleGeocoderViewportChange}
                    goongApiAccessToken="oC8CNdh20xrH8Dpm0SIkZYQqBijW847QWVmBE0DB"
                />
            </MapGL>
        );
    }
}

export default App;
