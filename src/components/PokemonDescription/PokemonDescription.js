import { texts } from "../../static/texts/texts";

export const PokemonDesciption = ({pokemonDescription}) => {
    return (
        <div className="pokemon-description">
            <p>{pokemonDescription.length > 0 ? pokemonDescription : texts.pokemonDescription.no_description_message}</p>
        </div>
    );
}