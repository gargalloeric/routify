export function isLatLngValid(coords: L.LatLng): boolean {
    const {lat, lng} = coords;
    if (lat < -90 || lat > 90) return false;

    if (lng < -180 || lng > 180) return false;

    return true;
}