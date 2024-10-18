const UPDATE_LIFETIMES = 'update-lifetimes'

class LifetimeStore extends EventTarget {
  constructor() {
    super();
    this.lifetimeTotals = {
      routeTotals: [],
      referrerTotals: []
    }
  }

  updateLifetimes(lifetimeTotals) {
    Object.assign(this.lifetimeTotals, lifetimeTotals);
    this.dispatchEvent(new CustomEvent(UPDATE_LIFETIMES));
  }

  onUpdateLifetimes(listenerFunc) {
    this.addEventListener(UPDATE_LIFETIMES, listenerFunc)
  }

  removeListener(listenerFunc) {
    this.removeEventListener(UPDATE_LIFETIMES, listenerFunc);
  }

  getLifetimeReferrerTotals() {
    return structuredClone(this.lifetimeTotals?.routeTotals);
  }

  getLifetimeReferrerTotals() {
    return structuredClone(this.lifetimeTotals?.referrerTotals);
  }
}

const lifetimeStore = new LifetimeStore();
export default lifetimeStore;