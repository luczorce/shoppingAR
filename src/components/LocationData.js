import locations from '@/components/locations';

const LocationData = {
  locations: locations,
  checkin: checkin,
  find: findLocation,
  init: init,
  update: updateStorage
};

export default LocationData;

//////

function checkin(id) {
  const alreadyCheckedIn = this.locations.find((loc) => loc.id === id).checkedin;

  if (alreadyCheckedIn) {
    return false;
  } else {
    this.locations.find((loc) => loc.id === id).checkedin = true;
    // TODO make this work
    // this.update();
    return true;
  }
}

function findLocation(id) {
  return this.locations.find((loc) => loc.id === id);
}

function init() {
  // TODO read LocalStorage data to update the data
}

function updateStorage() {
  // TODO call after each checkin to ensure updating the location
}
