const UPDATE_VISITS = 'update-visits'

class VisitsStore extends EventTarget {
  constructor() {
    super();
    this.visits = [];
  }

  updateVisits(newVisits) {
    Object.assign(this.visits, newVisits);
    this.dispatchEvent(new CustomEvent(UPDATE_VISITS));
  }

  onUpdateVisits(listenerFunc) {
    this.addEventListener(UPDATE_VISITS, listenerFunc)
  }

  removeListener(listenerFunc) {
    this.removeEventListener(UPDATE_VISITS, listenerFunc);
  }

  getVisits = () => structuredClone(this.visits);

  getVisitsByRoute = (route) => {
    return this.getVisits().filter(visit => visit.route === route);
  }

  getVisitsByReferrer = (referrer) => {
    return this.getVisits().filter((visit) => visit.referrer === referrer);
  }
}

const visitsStore = new VisitsStore();
export default visitsStore;