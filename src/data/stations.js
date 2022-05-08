let stations = [];

export function setStations(data) {
  stations = data;
}

export function getStationById(id) {
  return stations.find(station => station.id === id);
}

export function getStations() {
  return stations;
}
