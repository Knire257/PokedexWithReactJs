import "./App.scss"
import pokedexLogo from "./static/images/Pokeball_icon.png"
import { texts } from "./static/texts/texts";
import { useState, useEffect } from "react";
import { PokemonCard } from "./components/pokemonCard/PokemonCard";
import { NextPageBtn } from "./components/nextPageBtn/NextPageBtn";
import { PreviousPageBtn } from "./components/previousPageBtn/PreviousPageBtn";

function App() {
	const BASE_URL = 'https://pokeapi.co/api/v2/pokemon';
	const [pokedexPageData, setPokedexPageData] = useState();
	const [specificPokemonInfo, setSpecificPokemonInfo] = useState();
	let [pokedexPageUrl, setPokedexPageUrl] = useState(BASE_URL);

	const pokemonClickHandler = (url) => {
		if (!url) {
			setSpecificPokemonInfo(null);
		}

		setSpecificPokemonInfo('loading');

		fetch(url)
			.then(response =>  response.json())
			.then((data) => {
				setSpecificPokemonInfo(data);
			})
			.catch(error => console.log(error));
	}

	const showNextPage = (event) => {
		event.preventDefault();
		if (pokedexPageData && pokedexPageData.next) {
			setPokedexPageUrl(pokedexPageData.next);
		}
	}
	
	const showPreviousPage = (event) => {
		event.preventDefault();
		if (pokedexPageData && pokedexPageData.previous) {
			setPokedexPageUrl(pokedexPageData.previous)
		}
	}

	let isPokemonSelected = (pokemonName) => {
		return ((specificPokemonInfo && specificPokemonInfo.name) ? specificPokemonInfo.name === pokemonName : false)
	}

	useEffect(() => {
		fetch(pokedexPageUrl)
			.then(response => response.json())
			.then(data => setPokedexPageData(data))
			.catch(error => console.log(error));
	}, [pokedexPageUrl])

	return (
		<div className="app_wrapper">
			<div className="app_title">
				<h1 className='main-title'>
					{texts.app.main_title}
				</h1>
				<h3 className="main-subtitle">
					{texts.app.main_subtitle}
				</h3>
			</div>

			<div className="pokedex-wrapper">
				<div className="pokemon_card-wrapper">
					<PokemonCard pokemonInfo = {specificPokemonInfo}></PokemonCard>
				</div>

				<div className='pokemon_list-container_wrapper'>

					<PreviousPageBtn disabled = {!(pokedexPageData && pokedexPageData.previous)} onClick={showPreviousPage}></PreviousPageBtn>

					<div className="pokemon-list_wrapper">
						{ pokedexPageData && pokedexPageData.results ? pokedexPageData.results.map((pokemon, index) => (
							<div className={ 'pokemon-name_wrapper ' + (isPokemonSelected(pokemon.name) ? 'm-selected':'') } key={index} onClick={() => pokemonClickHandler(pokemon.url)}>
								<div data-url={pokemon.url} className='pokemon-name'>
									{pokemon.name}
								</div>
							</div>
						)) : 
						<div>
							<div className='error-msg'>
								<p>{texts.app.loading_message}</p>
							</div>
							<div className='error-img'>
								<img src={pokedexLogo}></img>
							</div>
						</div>
						}
					</div>

					<NextPageBtn disabled = {!(pokedexPageData && pokedexPageData.next)} onClick={showNextPage}></NextPageBtn>

				</div>
			</div>

		</div>
	);
}

export default App;
