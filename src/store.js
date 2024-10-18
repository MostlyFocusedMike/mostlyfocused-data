const store = {
  visits: []
}

export const addVisits = (visits) => {
  visits.forEach(visit => store.visits.push(visit))
};

export const getVisits = () => {
  return structuredClone(store.visits);
};

export const getVisitByRoute = (route) => {
  const visits = structuredClone(store.visits);
  return visits.filter((visit) => visit.route === route)
};

export const getVisitByReferrer = (referrer) => {
  const visits = structuredClone(store.visits);
  return visits.filter((visit) => visit.referrer === referrer)
}