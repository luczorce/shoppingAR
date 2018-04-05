import locations from '@/components/locations';
const LOCAL_STORAGE_KEY = 'shopping-ar-ignite';

const LocationData = {
  checkin: checkin,
  clear: clearLocalStorage,
  find: findLocation,
  init: init,
  locations: locations,
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
    this.update();
    return true;
  }
}

function clearLocalStorage() {
  if (testLocalStorage()) {
    localStorage.removeItem(LOCAL_STORAGE_KEY);
    return true;
  } else {
    return false;
  }
}

function findLocation(id) {
  return this.locations.find((loc) => loc.id === id);
}

function init() {
  if (!testLocalStorage()) return;
  console.log('initing locationData');
  let store = localStorage.getItem(LOCAL_STORAGE_KEY);

  if (store) {
    store = JSON.parse(store);
    this.locations.forEach(loc => loc.checkedin = store.find(str => str.id === loc.id).checkedin);
  } else {
    this.locations.forEach(loc => loc.checkedin = false);
  }
}

function updateStorage() {
  // TODO call after each checkin to ensure updating the location
  if (!testLocalStorage()) return;
  
  let store = [];
  
  this.locations.forEach(loc => {
    let clone = Object.assign({}, loc);
    delete clone.name;
    delete clone.description;
    delete clone.optional;

    store.push(clone);
  });

  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(store));
}

//////

function testLocalStorage() {
  const test = 'test';
  try {
      localStorage.setItem(test, test);
      localStorage.removeItem(test);
      return true;
  } catch(e) {
      return false;
  }
}
