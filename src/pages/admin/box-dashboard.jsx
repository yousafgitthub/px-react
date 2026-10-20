import { useEffect, useState } from "react";
import { MapContainer, GeoJSON, useMap } from "react-leaflet";
import { feature } from "topojson-client";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "../../css/dashboard.css";

function BoxDashboard() {
    const [searchTerm, setSearchTerm] = useState("");
    const [usStates, setUsStates] = useState(null);
    const [mapError, setMapError] = useState(false);

    const stats = [
        {
            label: "Clients",
            value: "58",
            icon: "fa-building",
            change: "+12%",
            trend: "up",
        },
        {
            label: "Active Boxes",
            value: "15,043",
            icon: "fa-cube",
            change: "+8%",
            trend: "up",
        },
        {
            label: "Boxes in Circulation",
            value: "14,636",
            icon: "fa-truck",
            change: "+6%",
            trend: "up",
        },
        {
            label: "Boxes Out of Service",
            value: "407",
            icon: "fa-exclamation-triangle",
            change: "-3%",
            trend: "down",
        },
    ];

    const clients = [
        { name: "Fila-Mar Transport", boxes: 0, color: "#a020f0" },
        { name: "Liberty Oil Field Services", boxes: 8025, color: "#202124" },
        { name: "Abraxas", boxes: 0, color: "#1683e8" },
        { name: "Explore Logistics", boxes: 454, color: "#ffbd24" },
        { name: "Randall Service Co", boxes: 5, color: "#e65353" },
        { name: "Fellowship O&G", boxes: 0, color: "#84909a" },
        { name: "DEATH STAR O&G", boxes: 41, color: "#a8dfe5" },
        { name: "A to B Co", boxes: 0, color: "#870087" },
    ];

    const filteredClients = clients.filter((client) =>
        client.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    useEffect(() => {
        fetch("/map/states-10m.json")
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Could not load USA map");
                }

                return response.json();
            })
            .then((topology) => {
                const states = feature(
                    topology,
                    topology.objects.states
                );

                states.features.forEach((state) => {
                    state.properties.BASENAME =
                        state.properties.name;
                });

                setUsStates(states);
                setMapError(false);
            })
            .catch((error) => {
                console.error("USA map error:", error);
                setMapError(true);
            });
    }, []);

    const stateStyle = () => ({
        fillColor: "#a6cf51",
        fillOpacity: 0.9,
        color: "#ffffff",
        weight: 1.5,
    });

    const onEachState = (feature, layer) => {
        const stateName =
            feature.properties?.BASENAME ||
            feature.properties?.NAME ||
            "Unknown state";

        layer.bindTooltip(stateName, {
            sticky: true,
            direction: "top",
            className: "box-state-tooltip",
        });

        layer.on({
            mouseover: (event) => {
                event.target.setStyle({
                    fillColor: "#799c31",
                    fillOpacity: 1,
                    color: "#ffffff",
                    weight: 2,
                });

                event.target.bringToFront();
            },
            mouseout: (event) => {
                event.target.setStyle(stateStyle());
            },
        });
    };

    return (
        <main className="admin-users-page">
            <div className="admin-users-header">
                <div>
                    <h2>Box Management Dashboard</h2>
                </div>
            </div>

            {/* Dashboard statistics */}
            <div className="stats-grid">
                {stats.map((stat) => (
                    <div className="box-card" key={stat.label}>
                        <div className="stat-card-top">
                            <div className="stat-icon">
                                <i className={`fa ${stat.icon}`}></i>
                            </div>

                            <div className="stat-label">{stat.label}</div>
                        </div>

                        <div className="stat-number">{stat.value}</div>

                        <div className="stat-footer">
                            <span className={`stat-status ${stat.trend}`}>
                                {stat.change}
                            </span>
                            <span>from last month</span>
                        </div>
                    </div>
                ))}
            </div>

            <section className="box-dashboard-panels">
                {/* USA state map */}
                <article className="box-dashboard-panel box-map-panel">
                    <div className="box-panel-header">
                        <div>
                            <h3>Box Distribution by Clients</h3>
                        </div>
                    </div>

                    <div className="box-map-area">
                        <div className="box-map-visual">
                            {mapError ? (
                                <div className="box-map-loading">
                                    <i className="fa fa-exclamation-circle"></i>
                                    <span>
                                        Unable to load the USA map.
                                        Check your internet connection and refresh.
                                    </span>
                                </div>
                            ) : usStates ? (
                                <MapContainer
                                    className="box-leaflet-map"
                                    center={[39, -98]}
                                    zoom={3}
                                    minZoom={2}
                                    maxZoom={8}
                                    scrollWheelZoom={true}
                                    zoomControl={true}
                                >
                                    <FitUSBounds/>

                                    <GeoJSON
                                        key={usStates.features.length}
                                        data={usStates}
                                        style={stateStyle}
                                        onEachFeature={onEachState}
                                    />
                                </MapContainer>
                            ) : (
                                <div className="box-map-loading">
                                    <i className="fa fa-spinner fa-spin"></i>
                                    <span>Loading USA map...</span>
                                </div>
                            )}

                            <div className="box-map-legend">
                                <span className="box-legend-dot"></span>
                                US states
                            </div>
                        </div>
                    </div>
                </article>

                {/* Client box summary */}
                <article className="box-dashboard-panel box-clients-panel">
                    <div className="box-panel-header">
                        <div>
                            <h3>Clients No. of Boxes</h3>
                        </div>

                        <span className="box-client-count">
                            {filteredClients.length}
                        </span>
                    </div>

                    <div className="box-client-search">
                        <i className="fa fa-search"></i>

                        <input
                            type="text"
                            placeholder="Search by client name..."
                            value={searchTerm}
                            onChange={(event) =>
                                setSearchTerm(event.target.value)
                            }
                        />

                        {searchTerm && (
                            <button
                                type="button"
                                className="box-search-clear"
                                onClick={() => setSearchTerm("")}
                                aria-label="Clear search"
                            >
                                <i className="fa fa-times"></i>
                            </button>
                        )}
                    </div>

                    <div className="box-client-list">
                        {/* <div className="box-client-list-heading">
                            <span>CLIENT</span>
                            <span>BOXES</span>
                        </div> */}

                        {filteredClients.length > 0 ? (
                            filteredClients.map((client) => (
                                <div
                                    className="box-client-row"
                                    key={client.name}
                                >
                                    <span
                                        className="box-client-color"
                                        style={{
                                            backgroundColor: client.color,
                                        }}
                                    />

                                    <span className="box-client-name">
                                        {client.name}
                                    </span>

                                    <strong>
                                        {client.boxes.toLocaleString()}
                                    </strong>
                                </div>
                            ))
                        ) : (
                            <div className="box-client-empty">
                                <i className="fa fa-search"></i>
                                <p>No clients found</p>
                                <span>Try another client name.</span>
                            </div>
                        )}
                    </div>

                    <div className="box-client-list-footer">
                        Showing {filteredClients.length} of {clients.length} clients
                    </div>
                </article>
            </section>
        </main>
    );
}


function FitUSBounds() {
    const map = useMap();

    useEffect(() => {
        const fitMap = () => {
            map.invalidateSize();

            // Geographic bounds of the contiguous United States
            const usaBounds = L.latLngBounds(
                [24.396308, -124.848974],
                [49.384358, -66.885444]
            );

            map.fitBounds(usaBounds, {
                padding: [20, 20],
                maxZoom: 4,
                animate: false,
            });
        };

        const frame = requestAnimationFrame(fitMap);

        return () => cancelAnimationFrame(frame);
    }, [map]);

    return null;
}


export default BoxDashboard;