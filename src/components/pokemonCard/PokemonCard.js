import pokedexLogo from "../../static/images/Pokeball_icon.png"
import { texts } from "../../static/texts/texts";
import { useState, useEffect } from "react";
import { PokemonDesciption } from "../PokemonDescription/PokemonDescription";
import {PokemonTypeBadges} from "../pokemonTypeBadges/PokemonTypeBadges";

export const PokemonCard = ({pokemonInfo}) => {
    const pokemonDescriptionUrl = pokemonInfo && pokemonInfo.species && pokemonInfo.species.url ? pokemonInfo.species.url : null;
    const pokemonTypesUrlArray = pokemonInfo && pokemonInfo.types ? pokemonInfo.types : [];
    const [pokemonDescription, setPokemonDescription] = useState('');
    const [pokemonTypes, setPokemonTypes] = useState([]);

    useEffect(() => {
        if (pokemonDescriptionUrl) {
            fetch(pokemonDescriptionUrl)
                .then(response => response.json())
                .then((data) => {
                    setPokemonDescription(data.flavor_text_entries[4].flavor_text.replace('\f',''));
                }
            ).catch(error => console.log(error));
        }
    }, [pokemonDescriptionUrl]);

    useEffect(() => {
        let pokemonTypesSpritesArray=[];

        if (pokemonTypesUrlArray.length > 0) {
            for (let i = 0; i < pokemonTypesUrlArray.length; i++) {
                fetch(pokemonTypesUrlArray[i].type.url)
                    .then(response => response.json())
                    .then(data => pokemonTypesSpritesArray.push(data.sprites['generation-iii']['firered-leafgreen'].name_icon))
                    .catch(error => console.log(error));
            }
            console.log(pokemonTypesSpritesArray)
            setPokemonTypes(pokemonTypesSpritesArray);
        }
    }, [pokemonTypesUrlArray]);

    if (!pokemonInfo || typeof pokemonInfo === 'string') {
        return (
            <div className="no_pokemon-wrapper">
                <div className="no_pokemon-msg">
                    <p>{pokemonInfo ? texts.app.loading_message : texts.pokemonCard.no_pokemon_selected_message}</p>
                </div>
                <div className="no_pokemon-img">
                    <img src={pokedexLogo}></img>
                </div>
            </div>
        );
    }
    
    return (
        <div className="pokemon_card">
            <div className="pokemon_card-header">   
                <div className="pokemon_card-id">
                    <p>{texts.misc.numberSign}</p>
                    <p>{pokemonInfo.id}</p>
                </div>
                <div className="pokemon_card-name">
                    <p>{pokemonInfo.name}</p>
                </div>
            </div>
            <div className="pokemon_card-img">
                <img src={pokemonInfo.sprites.other["official-artwork"].front_default}></img>
            </div>
            <div className="pokemon_card-info_box">    
                <div className="pokemon_card-types_box">
                    <PokemonTypeBadges PokemonTypes={pokemonTypes}></PokemonTypeBadges>
                </div>
                <div className="pokemon_card-description_box">
                    <PokemonDesciption pokemonDescription = {pokemonDescription}></PokemonDesciption>
                </div>
            </div>
        </div>
    );
}
