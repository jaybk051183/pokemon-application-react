import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Pokemon from './components/Pokemon/Pokemon';
import Button from './components/Button/Button';
import logo from './assets/pokemon-logo.png';
import './App.css';

function App() {
    const [pokemon, setPokemon] = useState([]);
    const [endpoint, setEndpoint] = useState('https://pokeapi.co/api/v2/pokemon/');
    const [loading, toggleLoading] = useState(false);
    const [error, setError] = useState(false);

    useEffect(() => {
        async function fetchData() {
            toggleLoading(true);
            setError(false);

            try {
                const { data } = await axios.get(endpoint);
                setPokemon(data);
            } catch(e) {
                console.error(e);
                setError(true);
            }

            toggleLoading(false);
        }

        fetchData();
    }, [endpoint]);

    return (
        <div className="poke-deck">
            {pokemon &&
                <>
                    <img alt="logo" width="400px" src={logo} />
                    <section className="button-bar">
                        <Button
                            disabled={!pokemon.previous}
                            clickHandler={() => setEndpoint(pokemon.previous)}
                        >
                            Vorige
                        </Button>
                        <Button
                            disabled={!pokemon.next}
                            clickHandler={() => setEndpoint(pokemon.next)}
                        >
                            Volgende
                        </Button>
                    </section>

                    {pokemon.results && pokemon.results.map((poke) => {
                        return <Pokemon key={poke.name} endpoint={poke.url} />
                    })}
                </>
            }
            {loading && <p>Loading...</p>}
            {error && <p>Er ging iets mis bij het ophalen van de data...</p>}
        </div>
    );
}

export default App;
