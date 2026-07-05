import React from "react";

export const PokemonTypeBadges = ({PokemonTypes}) => {
    return(
        <div className="pokemon-types_wrapper">
            {PokemonTypes.map((pokeType)=>(
                <div className="pokemon-type">
                    <img src={pokeType}></img>
                </div>
            ))}
        </div>
    );
}