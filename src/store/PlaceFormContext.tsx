import React, {useState, createContext, ReactNode} from 'react';
import {PlaceFormContextType, PlaceFormProps, SightState} from '../types.ts';

const PlaceFormContext = createContext<PlaceFormContextType | null>(null)


export const PlaceFormProvider: React.FC<{ children:ReactNode }> = ({ children }) => {
    const [placeForm, setPlaceForm] = useState<PlaceFormProps>({
        id: '',
        title: '',
        imageUrl: '',
        type: '',
        date: '',
        country: '',
        continent: '',
        budget: 0,
        description: '',
        specialRequirements: undefined,
        sights: undefined,
        location: {
            lat: 50.073658,
            lng: 14.418540,
        },
    });

    const [sight, setSight] = useState<SightState>({
        sightName: '',
        sightDescription: '',
    });

    const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setPlaceForm({
            ...placeForm,
            [event.target.name]: event.target.value,
        });
    };

    const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = () => {
            setPlaceForm({...placeForm, imageUrl: reader.result as string});
        };
        reader.readAsDataURL(file);
    }

    const handleImageDrop = (event: React.DragEvent<HTMLLabelElement>) => {
        event.preventDefault();
        const file = event.dataTransfer.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = () => {
            setPlaceForm({...placeForm, imageUrl: reader.result as string});
        };
        reader.readAsDataURL(file);
    }

    const handleRemoveImage = () => {
        setPlaceForm({...placeForm, imageUrl: ''});
    }

    const handleSightChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSight({
            ...sight,
            [event.target.name]: event.target.value,
        });
    }

    const addSight = (sightName: string, sightDescription: string) => {
        if (!placeForm.sights) {
            setPlaceForm(prevPlaceForm => ({
                ...prevPlaceForm,
                sights: [{sightName: sightName, sightDescription: sightDescription}]
            }));
        } else {
            setPlaceForm(prevPlaceForm => ({
                ...prevPlaceForm,
                sights: [...prevPlaceForm.sights!, {sightName: sightName, sightDescription: sightDescription}]
            }));
        }

    };

    const handleRemoveSight = (sightName: string) => {
        setPlaceForm(prevPlaceForm => {
            return {
                ...prevPlaceForm,
                sights: prevPlaceForm.sights!.filter(sight => sight.sightName !== sightName)
            };
        });
    }

    const handleAddSight = (sightName: string, sightDescription: string) => {
        if (sightName.trim() === '' || sightDescription.trim() === '') return;
        addSight(sightName, sightDescription);
        setSight({
            sightName: '',
            sightDescription: '',
        });
    }

    const handleLocationChange = (newLocation: {lat: number, lng: number}) => {
        setPlaceForm(prevPlaceForm => {
            return {
                ...prevPlaceForm,
                location: newLocation,
            };
        });
    }

    const handleReset = () => {
        setPlaceForm({
            id: '',
            title: '',
            imageUrl: '',
            type: '',
            date: '',
            country: '',
            continent: '',
            budget: 0,
            description: '',
            specialRequirements: undefined,
            sights: undefined,
            location: {
                lat: 50.073658,
                lng: 14.418540,
            },
        });
        setSight({
            sightName: '',
            sightDescription: '',
        });
    }

    const PlaceFormContextValue:{
placeForm: PlaceFormProps,
        setPlaceForm: React.Dispatch<React.SetStateAction<PlaceFormProps>>,
        sight: SightState,
        setSight: React.Dispatch<React.SetStateAction<SightState>>,
        handleAddSight: (sightName: string, sightDescription: string) => void,
        handleChange: (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void,
        handleRemoveSight: (sightName: string) => void,
        handleSightChange: (event: React.ChangeEvent<HTMLInputElement>) => void,
        handleImageChange: (event: React.ChangeEvent<HTMLInputElement>) => void,
        handleImageDrop: (event: React.DragEvent<HTMLLabelElement>) => void,
        handleRemoveImage: () => void,
        handleLocationChange: (newLocation: {lat: number, lng: number}) => void,
        handleReset: () => void,
    } = {
        placeForm,
        setPlaceForm,
        sight,
        setSight,
        handleAddSight,
        handleChange,
        handleRemoveSight,
        handleSightChange,
        handleImageChange,
        handleRemoveImage,
        handleImageDrop,
        handleLocationChange,
        handleReset,
    };

    return (
        <PlaceFormContext.Provider value={PlaceFormContextValue}>
            {children}
        </PlaceFormContext.Provider>
    );
};

export default PlaceFormContext;