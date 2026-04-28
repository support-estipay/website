import React, { useState } from 'react';
import {
    ComposableMap,
    Geographies,
    Geography,
    Marker,
} from 'react-simple-maps';

const GEO_URL = 'https://cdn.jsdelivr.net/npm/us-atlas@3/states-10m.json';

// FIPS codes (numeric) for highlighted states
const HIGHLIGHTED = new Set([6, 4, 48, 25]); // CA, AZ, TX, MA

const LOCATIONS = [
    { id: 'sf',  name: 'San Francisco', coords: [-122.4194, 37.7749] },
    { id: 'la',  name: 'Los Angeles',   coords: [-118.2437, 34.0522] },
    { id: 'sc',  name: 'Scottsdale',    coords: [-111.8910, 33.4942] },
    { id: 'au',  name: 'Austin',        coords: [-97.7431,  30.2672] },
    { id: 'bo',  name: 'Boston',        coords: [-71.0589,  42.3601] },
];

const PIN_PATH = 'M10 0C5.58 0 2 3.58 2 8C2 13.25 10 22 10 22C10 22 18 13.25 18 8C18 3.58 14.42 0 10 0Z';

const USMap = () => {
    const [tooltip, setTooltip] = useState(null); // { name, x, y }

    return (
        <div className="usmap-outer">
            <div className="usmap-map-wrap">
                <ComposableMap
                    projection="geoAlbersUsa"
                    projectionConfig={{ scale: 860 }}
                    style={{ width: '100%', height: 'auto' }}
                >
                    <Geographies geography={GEO_URL}>
                        {({ geographies }) =>
                            geographies.map(geo => {
                                const fips = parseInt(geo.id, 10);
                                const highlighted = HIGHLIGHTED.has(fips);
                                return (
                                    <Geography
                                        key={geo.rsmKey}
                                        geography={geo}
                                        fill={highlighted ? 'rgba(41,193,165,0.45)' : '#c9ede8'}
                                        stroke="#ffffff"
                                        strokeWidth={0.7}
                                        style={{
                                            default: { outline: 'none' },
                                            hover:   { outline: 'none', fill: highlighted ? 'rgba(41,193,165,0.65)' : '#aeddd6' },
                                            pressed: { outline: 'none' },
                                        }}
                                    />
                                );
                            })
                        }
                    </Geographies>

                    {LOCATIONS.map(loc => (
                        <Marker
                            key={loc.id}
                            coordinates={loc.coords}
                            onMouseEnter={(e) => setTooltip({ name: loc.name })}
                            onMouseLeave={() => setTooltip(null)}
                        >
                            <g
                                transform="translate(-10, -22)"
                                style={{ cursor: 'pointer', filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.22))' }}
                            >
                                <path
                                    d={PIN_PATH}
                                    fill="#F58220"
                                    stroke="#ffffff"
                                    strokeWidth="1.5"
                                />
                                <circle cx="10" cy="8" r="3.2" fill="white" opacity="0.9" />
                            </g>
                            {tooltip && tooltip.name === loc.name && (
                                <g>
                                    <rect
                                        x="-42" y="-52"
                                        width="84" height="24"
                                        rx="6"
                                        fill="#1a1a2e"
                                        opacity="0.9"
                                    />
                                    <text
                                        textAnchor="middle"
                                        y="-34"
                                        style={{
                                            fontSize: '10px',
                                            fontWeight: '600',
                                            fill: '#ffffff',
                                            fontFamily: 'inherit',
                                            pointerEvents: 'none',
                                        }}
                                    >
                                        {loc.name}
                                    </text>
                                </g>
                            )}
                        </Marker>
                    ))}
                </ComposableMap>
            </div>

            <div className="usmap-cities">
                {LOCATIONS.map((loc, i) => (
                    <React.Fragment key={loc.id}>
                        <span className="usmap-city">{loc.name}</span>
                        {i < LOCATIONS.length - 1 && (
                            <span className="usmap-dot" aria-hidden="true">·</span>
                        )}
                    </React.Fragment>
                ))}
            </div>
        </div>
    );
};

export default USMap;
