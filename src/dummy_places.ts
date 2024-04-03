import {Place} from './types.ts';

export const DUMMY_PLACES: Place[] = [
    {
        id: 'p1',
        title: 'New York',
        date: '2021-05-12',
        type: 'City',
        imageUrl: 'https://s39023.pcdn.co/wp-content/uploads/2022/10/Where-Are-Those-Morgans-Empire-State-Building-728x546.jpg.optimal.jpg',
        country: 'United States',
        continent: 'North America',
        budget: 1000,
        description: 'One of the most famous sky scraper cities in the world!',
        specialRequirements: 'Need to have visa.',
        sights: [
            {
                sightName: 'Empire State Building',
                sightDescription: 'One of the most famous sky scraper cities in the world!',
            },
            {
                sightName: 'Statue of Liberty',
                sightDescription: 'Statue of Liberty is a colossal neoclassical sculpture on Liberty Island in New York Harbor in New York City, in the United States. The copper statue, a gift from the people of France to the people of the United States, was designed by French sculptor Frédéric Auguste Bartholdi and its metal framework was built by Gustave Eiffel. The statue was dedicated on October 28, 1886.'
            }
        ],
        location: {
            lat: 40.7484405,
            lng: -73.9878531
        }
    },
    {
        id: 'p2',
        title: 'Paris',
        date: '2021-08-11',
        type: 'City',
        imageUrl: 'https://www.planetware.com/photos-large/F/france-paris-eiffel-tower.jpg',
        country: 'France',
        continent: 'Europe',
        budget: 500,
        description: 'Unique experience in the city of love!',
        sights: [
            {
                sightName: 'Eiffel Tower',
                sightDescription: 'Eiffel Tower is a wrought-iron lattice tower on the Champ de Mars in Paris, France. It is named after the engineer Gustave Eiffel, whose company designed and built the tower.'
            },
            {
                sightName: 'Louvre Museum',
                sightDescription: 'Louvre Museum is the world\'s largest art museum and a historic monument in Paris, France. A central landmark of the city, it is located on the Right Bank of the Seine in the city\'s 1st arrondissement. Approximately 38,000 objects from prehistory to the 21st century are exhibited over an area of 72,735 square meters. In 2019, the Louvre received 9.6 million visitors.'
            }
        ],
        location: {
            lat: 48.8588443,
            lng: 2.2943506
        },
    },
    {
        id: 'p3',
        title: 'Angkor Wat',
        date: '2025-08-11',
        type: 'Nature',
        imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/d/d4/20171126_Angkor_Wat_4712_DxO.jpg',
        country: 'Cambodia',
        continent: 'Asia',
        description: 'Angkor wat is a temple complex in Cambodia and the largest religious monument in the world.',
        location: {
            lat: 13.411593,
            lng:103.867416
        },
    },
    {
        id: 'p4',
        title: 'Delhi',
        date: '2021-08-11',
        type: 'City',
        imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/b/bd/Taj_Mahal%2C_Agra%2C_India_edit3.jpg',
        country: 'India',
        continent: 'Asia',
        budget: 300,
        specialRequirements: 'Need to have visa.',
        description: 'Delhi is the capital of India and is known for its rich history and culture.',
        sights: [
            {
                sightName: 'Taj Mahal',
                sightDescription: 'Taj Mahal is famous Hindu temple in India. It is one of the seven wonders of the world.'
            }
        ],
        location: {
            lat: 28.644800,
            lng: 77.216721
        },
    },
    {
        id: 'p5',
        title: 'Great wall of China',
        date: '2023-08-11',
        type: 'Nature',
        imageUrl: 'https://images.nationalgeographic.org/image/upload/t_edhub_resource_key_image/v1638892506/EducationHub/photos/the-great-wall-of-china.jpg',
        country: 'China',
        continent: 'Asia',
        budget: 500,
        specialRequirements: 'Need to book tickets in advance.',
        description: 'Great wall of China is a series of fortifications made of stone, brick, tamped earth, wood, and other materials, generally built along an east-to-west line across the historical northern borders of China to protect the Chinese states and empires against the raids and invasions of the various nomadic groups of the Eurasian Steppe.',
        location: {
            lat:  40.431908,
            lng: 116.570374
        },
    },
]