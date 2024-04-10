import React, {useState, createContext, ReactNode, useCallback} from 'react';
import {Place, PlaceFormContextProps, PlaceFormItem, Sight} from '../types.ts';

// Context for the place form items...it provides the place form items and functions to manage them
const PlaceFormContext = createContext<PlaceFormContextProps | null>(null)

// Provider for the place form context...it contains values and functions to manage the place form items
export const PlaceFormProvider: React.FC<{ children: ReactNode }> = ({children}) => {

    // using state to manage the place form items and set their initial value: id, title, imageUrl, type, date, country, continent, budget, currency, description, specialRequirements, sights, location, markerPosition
    const [placeForm, setPlaceForm] = useState<PlaceFormItem>({
        id: '',
        title: '',
        imageUrl: '',
        type: '',
        date: '',
        country: '',
        continent: '',
        budget: 0,
        currency: 'USD',
        description: '',
        specialRequirements: '',
        sights: [],
        location: {
            lat: 50.073658,
            lng: 14.418540,
        },
        markerPosition: {
            lat: 50.073658,
            lng: 14.418540,
        }
    });

    // using state to manage the sight items and set their initial value, the sight item contains sightName and sightDescription
    const [sight, setSight] = useState<Sight>({
        sightName: '',
        sightDescription: '',
    });

    // function to handle the change of the place form item inputs, text areas, and select elements
    const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setPlaceForm({
            ...placeForm,
            [event.target.name]: event.target.value,
        });
    };

    // function to handle the change of the image input
    const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0]; // Get the first file from the input

        if (!file) return;

        const reader = new FileReader();// Create a new FileReader object
        reader.onload = () => {
            setPlaceForm({...placeForm, imageUrl: reader.result as string}); // Set the image URL to the result of the reader
        };
        reader.readAsDataURL(file); // Read the file as a data URL
    }

    // function to handle the drop of the image
    const handleImageDrop = (event: React.DragEvent<HTMLLabelElement>) => {
        event.preventDefault();
        const file = event.dataTransfer.files[0]; // Get the first file from the data transfer

        if (!file) return;

        const reader = new FileReader();
        reader.onload = () => {
            setPlaceForm({...placeForm, imageUrl: reader.result as string});
        };
        reader.readAsDataURL(file);
    }

    // function to handle the removal of the image
    const handleRemoveImage = () => {
        setPlaceForm({...placeForm, imageUrl: ''});
    }

    // function to handle the change of the sight item inputs
    const handleSightChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSight({
            ...sight,
            [event.target.name]: event.target.value,
        });
    }

    // function to add a new sight to the place form
    const addSightToTheForm = useCallback((sightName: string, sightDescription: string) => {
        if (placeForm.sights?.length === 0) { // If there are no sights yet, add the first sight
            setPlaceForm(prevPlaceForm => ({
                ...prevPlaceForm,
                sights: [{sightName: sightName, sightDescription: sightDescription}]
            }));
        } else {
            setPlaceForm(prevPlaceForm => ({
                ...prevPlaceForm,
                sights: [...prevPlaceForm.sights!, {sightName: sightName, sightDescription: sightDescription}] // Add the new sight to the existing sights
            }));
        }
    }, [placeForm]);

    // function to remove a sight from the place form
    const handleRemoveSight = useCallback((sightName: string) => {
        setPlaceForm(prevPlaceForm => {
            return {
                ...prevPlaceForm,
                sights: prevPlaceForm.sights!.filter(sight => sight.sightName !== sightName) // Filter out the sight to remove
            };
        });
    }, []);

    // function to add new sight to the form if they are filled and reset the sight input fields
    const handleAddSight = (sightName: string, sightDescription: string) => {
        if (sightName.trim() === '' || sightDescription.trim() === '') return; // Check if the sight name and description are not empty

        addSightToTheForm(sightName, sightDescription); // Add the new sight to the place form

        setSight({ // Reset the sight input fields
            sightName: '',
            sightDescription: '',
        });
    }

    // function to handle the change of the location of the place by moving on the map
    const handleLocationChange = (newLocation: { lat: number, lng: number }) => {
        setPlaceForm(prevPlaceForm => {
            return {
                ...prevPlaceForm,
                location: newLocation,
            };
        });
    }

    // function to handle the change of the marker position on the map by clicking on the map
    const handleMarkerPositionChange = (newMarkerPosition: { lat: number, lng: number }) => {
        setPlaceForm(prevPlaceForm => {
            return {
                ...prevPlaceForm,
                markerPosition: newMarkerPosition,
            };
        });
    }

    // function to reset the place form and sight input fields
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
            currency: 'USD',
            description: '',
            specialRequirements: '',
            sights: [],
            location: {
                lat: 50.073658,
                lng: 14.418540,
            },
            markerPosition: {
                lat: 50.073658,
                lng: 14.418540,
            }
        });
        setSight({
            sightName: '',
            sightDescription: '',
        });
    }

    // values and functions to be provided by the context
    const PlaceFormContextValue: {
        placeForm: PlaceFormItem,
        setPlaceForm: React.Dispatch<React.SetStateAction<PlaceFormItem | Place>>,
        sight: Sight,
        setSight: React.Dispatch<React.SetStateAction<Sight>>,
        handleAddSight: (sightName: string, sightDescription: string) => void,
        handleChange: (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void,
        handleRemoveSight: (sightName: string) => void,
        handleSightChange: (event: React.ChangeEvent<HTMLInputElement>) => void,
        handleImageChange: (event: React.ChangeEvent<HTMLInputElement>) => void,
        handleImageDrop: (event: React.DragEvent<HTMLLabelElement>) => void,
        handleRemoveImage: () => void,
        handleLocationChange: (newLocation: { lat: number, lng: number }) => void,
        handleReset: () => void,
        handleMarkerPositionChange: (newMarkerPosition: { lat: number, lng: number }) => void,
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
        handleMarkerPositionChange,
    };

    // return the provider with the context value
    return (
        <PlaceFormContext.Provider value={PlaceFormContextValue}>
            {children}
        </PlaceFormContext.Provider>
    );
};

export default PlaceFormContext;