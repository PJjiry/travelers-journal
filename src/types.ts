import React from 'react';

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
    budget: number,
    currency: string,
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
    setPlaces: (places: Place[]) => void;
    addNewPlace: (newPlace: PlaceFormItems) => void;
    updatePlace: (updatedPlace: Place) => void;
    deletePlace: (placeId: string) => void;
}

export interface CurrentPlaceContextProps {
    currentPlace: Place | null;
    setCurrentPlace: (place: Place | null) => void;
}

export interface PlaceFormItems {
    id: string;
    title: string;
    imageUrl: string;
    type: string;
    date: string;
    country: string;
    continent: string;
    budget: number;
    currency: string;
    description: string;
    specialRequirements?: string | undefined;
    sights?: Sight[] | undefined;
    location: {
        lat: number,
        lng: number
    }
}

export type MapLocationProps = {
    mapContainerStyle?: { width: string, height: string, borderRadius: string },
    onLocationChange?: (location: { lat: number, lng: number }) => void,
    lat: number;
    lng: number;
};

export type SightState = {
    sightName: string;
    sightDescription: string;
}


export type PlaceFormContextType = {
    placeForm: PlaceFormItems;
    setPlaceForm: React.Dispatch<React.SetStateAction<PlaceFormItems | Place>>;
    sight: SightState;
    setSight: React.Dispatch<React.SetStateAction<SightState>>;
    handleAddSight: (sightName: string, sightDescription: string) => void;
    handleRemoveSight: (sightName: string) => void;
    handleSightChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    handleImageChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    handleImageDrop: (event: React.DragEvent<HTMLLabelElement>) => void;
    handleChange: (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void,
    handleRemoveImage: () => void;
    handleLocationChange: (newLocation: { lat: number, lng: number }) => void;
    handleReset: () => void;
};

export type InputProps = {
    name: string,
    title: string,
    tooltip?: string,
    isTextarea?: boolean,
    value: string | number | undefined,
    onInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void,
    type?: string,
    min?: number,
    hasNoIcon?: boolean
}

export type ImageInputProps = {
    name: string,
    title: string,
    tooltip: string,
    onImageChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
    onImageDrop: (e: React.DragEvent<HTMLLabelElement>) => void,
    imageUrl: string | undefined,
    onRemoveImage: () => void;
}

export type SelectProps = {
    name: string,
    title: string,
    tooltip: string,
    value: string,
    onSelectChange: (e: React.ChangeEvent<HTMLSelectElement>) => void,
    children: React.ReactNode;
}

export type SightFormProps = {
    sightName: string,
    sightDescription: string,
    sights: Sight[] | undefined,
    onSightChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
    onAddSight: () => void,
    onRemoveSight: (sightName: string) => void,
}

export type LocationFormProps = {
    location: {
        lat: number,
        lng: number
    },
    onLocationChange: (newLocation: { lat: number, lng: number }) => void
}

export type PlaceFormProps = {
    title: string,
    place?: Place,
    isEditing?: boolean
    stopEditing?: () => void
}

export type ModalProps = {
    title: string,
    message: string,
    open: boolean,
    children: React.ReactNode
}