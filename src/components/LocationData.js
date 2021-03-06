import locations from '@/components/locations';
const LOCAL_STORAGE_KEY = 'shopping-ar-ignite';

const LocationData = {
  checkin: checkin,
  clear: clearLocalStorage,
  crossCheck: crossCheckOptional,
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

function crossCheckOptional(optionalData) {
  const situation = optionalData.condition;
  const THAT = this;
  let showOptional = false;

  if (!situation) return showOptional;

  situation.forEach(sit => {
    if (!showOptional && (THAT.find(sit.id).checkedin === sit.checkedin)) {
      showOptional = true;
    }
  });

  return showOptional;
}

function findLocation(id) {
  return this.locations.find((loc) => loc.id === id);
}

function init() {
  if (!testLocalStorage()) return;
  let store = localStorage.getItem(LOCAL_STORAGE_KEY);

  if (store) {
    store = JSON.parse(store);
    this.locations.forEach(loc => loc.checkedin = store.find(str => str.id === loc.id).checkedin);
    return true;
  } else {
    this.locations.forEach(loc => loc.checkedin = false);
    this.update();
    return false;
  }
}

function updateStorage() {
  if (!testLocalStorage()) return;
  
  let store = [];
  
  this.locations.forEach(loc => {
    let clone = Object.assign({}, loc);
    delete clone.name;
    delete clone.description;
    delete clone.optional;
    delete clone.secret;

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
