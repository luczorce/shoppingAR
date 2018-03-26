import locations from '@/components/locations';

const LocationData = {
  locations: locations,
  checkin: checkin,
  find: findLocation,
  init: init
};

export default LocationData;

//////

function checkin(id) {
  this.locations.find((loc) => loc.id === id).checkedin = true;
}

function findLocation(id) {
  return this.locations.find((loc) => loc.id === id);
}

function init() {
  // TODO read LocalStorage data to update the data
}
