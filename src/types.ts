export type Sight = {
    sightName: string,
    sightDescription: string,
}

export type Place = {
    id: string,
    title: string,
    date: string,
    type: string,
    imageUrl: string,
    country: string,
    continent: string,
    budget?: number,
    description: string,
    specialRequirements?: string,
    sights?: Sight[],
    location: {
        lat: number,
        lng: number
    }
}

export type PlacesContextProps = {
    places: Place[],
    setPlaces: (places: Place[]) => void
}

export interface CurrentPlaceContextProps {
    currentPlace: Place | null;
    setCurrentPlace: (place: Place | null) => void;
}