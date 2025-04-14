'use client'

import Image from "next/image";
import styles from "./page.module.css";
import { useEffect, useRef, useState } from "react";
import apiService from "./apiService";

export interface TypeArray {
  slot: number,
  type: {
    name: string,
    url: string
  }
}

export default function Home() {
  let [pokemon, setPokemon] = useState('Charizard');
  let [pokemonData, setPokemonData] = useState({});
  let [pokemonName, setPokemonName] = useState('Charizard');
  let [pokemonHp, setPokemonHp] = useState('78');
  let [pokemonSpeed, setPokemonSpeed] = useState('Charizard');
  let [pokemonAttack, setPokemonAttack] = useState('Charizard');
  let [pokemonDefense, setPokemonDefense] = useState('Charizard');
  let [pokemonImage, setPokemonImage] = useState('https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/6.png');
  let [pokemonList, setPokemonList] = useState([]);
  const typeRefs = useRef<(HTMLDivElement | null)[]>([]);
  const typesArray = [
    {
      id: 0,
      url: "https://pokemon-go.name/wp-content/uploads/2020/12/strong-pokemons-bug-type-pokemon-go.png",
      type: "bug"
    },
    {
      id: 1,
      url: "https://gmatheus-spinardi.e.usp.br/pokemonbasics/images/dark.png",
      type: "dark"
    },
    {
      id: 2,
      url: "https://pokemon-go.name/wp-content/uploads/2020/12/strong-pokemons-dragon-type-pokemon-go.png",
      type: "dragon"
    },
    {
      id: 3,
      url: "https://pokemon-go.name/wp-content/uploads/2020/12/strong-pokemons-electric-type-pokemon-go.png",
      type: "electric"
    },
    {
      id: 4,
      url: "https://pixelmonmod.com/w/images/4/47/FairyType.png",
      type: "fairy"
    },
    {
      id: 5,
      url: "https://pokemon-go.name/wp-content/uploads/2020/12/strong-pokemons-fighting-type-pokemon-go.png",
      type: "fighting"
    },
    {
      id: 6,
      url: "https://tiermaker.com/images/templates/iniciais-tipo-fogo-15231297/152312971658696332.png",
      type: "fire"
    },
    {
      id: 7,
      url: "https://gmatheus-spinardi.e.usp.br/pokemonbasics/images/flying.png",
      type: "flying"
    },
    {
      id: 8,
      url: "https://pokemon-go.name/wp-content/uploads/2020/12/strong-pokemons-ghost-type-pokemon-go.png",
      type: "ghost"
    },
    {
      id: 9,
      url: "https://lh3.googleusercontent.com/HVx_oRlEL2RnpXJhexSohJhbTtRwo0JjNRMmFnlCGTkn85nH0XGEP_X9h7T0VBiVI0x-P68L0Xvv8TVoOW-WRwi8OZ2S7FQEWfSMn1zlMb_PWFw",
      type: "grass"
    },
    {
      id: 10,
      url: "https://pokemon-go.name/wp-content/uploads/2020/12/strong-pokemons-ground-type-pokemon-go.png",
      type: "ground"
    },
    {
      id: 11,
      url: "https://storage.googleapis.com/nianticweb-media/pokemongo/types/ice.png?cb=1",
      type: "ice"
    },
    {
      id: 12,
      url: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/aa/Pok%C3%A9mon_Normal_Type_Icon.svg/1200px-Pok%C3%A9mon_Normal_Type_Icon.svg.png",
      type: "normal"
    },
    {
      id: 13,
      url: "https://pokemon-go.name/wp-content/uploads/2020/12/strong-pokemons-poison-type-pokemon-go.png",
      type: "poison"
    },
    {
      id: 14,
      url: "https://lh3.googleusercontent.com/tMgrN99ae_YGToj6855RHffvGQXReRhW_HVJxx6e1Q6esDZDb1TqwjG2eiyikZAZMF4Ojzmc4k8AVjsVMhf2eSHUmq4g9agw-NzD6dzpdlUnfg",
      type: "psychic"
    },
    {
      id: 15,
      url: "https://lh3.googleusercontent.com/nnbB8e6m0hhXBo8bUcX9Eebuk9XLB-gRIpy9VRaXcn-gyIchUvjk1_xQOMssg77Lrwo9j4iM-RrKzwCF-0PFFx4VIgc-bQWxi5CqCyyz7_vv",
      type: "stone"
    },
    {
      id: 16,
      url: "https://pokemon-go.name/wp-content/uploads/2020/12/strong-pokemons-steel-type-pokemon-go.png",
      type: "steel"
    },
    {
      id: 17,
      url: "https://gmatheus-spinardi.e.usp.br/pokemonbasics/images/water.png",
      type: "water"
    }
  ];
  const spritesArray = [
    "front_default",
    "back_default",
    "front_shiny",
    "back_shiny",
  ]
  

  useEffect(() => {
    fetchPokemon();

    try {
      apiService.getAllPokemons().then((data) => {
        setPokemonList(data)
      })
      
    } catch (error) {
      window.alert('Pokemon nâo encontrado')
    }
  }, [])

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = event.target.value

    setPokemon(inputValue)
  }

  const setCurrentType = (types: Array<TypeArray>) => {
    let typesName: Array<string> = []
    types.forEach( obj => {
      typesName.push(obj.type.name.toLowerCase());
    });

    typeRefs.current.forEach( (div) => {
      if (div) {
        if(typesName.includes(div.id)) {
          div.classList.remove(styles.hide);
        } else {
          div.classList.add(styles.hide);
        }
      } 
    });
  }

  const fetchPokemon = () => {
    try {
      apiService.getPokemon(pokemon).then((data) => {
        console.log(data)
        setPokemonData(data)
        setCurrentType(data.types)
        //@ts-ignore
        setPokemonImage(data.sprites['front_default']);
        //@ts-ignore
        setPokemonHp(data.stats[0].base_stat)
        //@ts-ignore
        setPokemonSpeed(data.stats[5].base_stat)
        //@ts-ignore
        setPokemonAttack(data.stats[1].base_stat)
        //@ts-ignore
        setPokemonDefense(data.stats[2].base_stat)
        setPokemonName(data.name[0].toUpperCase() + data.name.substring(1))

        activeBall()
      })
      
    } catch (error) {
      window.alert('Pokemon nâo encontrado')
    }
  } 

  const rotateForwardPokemon = () => {
    let lastSpriteWasCurrent = false;

    spritesArray.forEach( sprite => {
      // @ts-ignore
      if ( lastSpriteWasCurrent && pokemonData.sprites[sprite]) {
        // @ts-ignore
        setPokemonImage(pokemonData.sprites[sprite])
        lastSpriteWasCurrent = false
      }
      
      // @ts-ignore
      if (pokemonImage == pokemonData.sprites[sprite]) {
        lastSpriteWasCurrent = true
      }
      
    });

    if ( lastSpriteWasCurrent ) {
      // @ts-ignore
      setPokemonImage(pokemonData.sprites["front_default"])
      lastSpriteWasCurrent = false
    }
  }

  const rotateBackwardPokemon = () => {
    let lastSpriteWasCurrent = false;
    
    for (let index = (spritesArray.length - 1); index >= 0; index--) {
      const sprite = spritesArray[index];
      // @ts-ignore
      if ( lastSpriteWasCurrent && pokemonData.sprites[sprite]) {
        
        // @ts-ignore
        setPokemonImage(pokemonData.sprites[sprite])
        lastSpriteWasCurrent = false
      }

      // @ts-ignore
      if (pokemonImage == pokemonData.sprites[sprite]) {
        lastSpriteWasCurrent = true
      }
    }

    if ( lastSpriteWasCurrent ) {
      // @ts-ignore
      setPokemonImage(pokemonData.sprites["back_shiny"])
    }

  }

  const activeBall = () => {
    const ballDiv = document.getElementById(`blueBall`)

    if( ballDiv ) {
      ballDiv.classList.add(styles.active);

      ballDiv.classList.remove(styles.active);
    }
  }

  return (
    <div className={styles.container}>
      <div className={styles.pokedexLeftSide}>
        <header>
          <div id="blueBall" className={styles.blueBall}></div>

          <div className={styles.search}>
            <input
              className={styles.input}
              type="text"
              value={pokemon}
              onChange={(e) => setPokemon(e.target.value)}
              list="pokemonSuggestions"
              placeholder="Digite um Pokémon..."
              onKeyDown={(e) => e.key === 'Enter' && fetchPokemon()}
            />
            
            <datalist id="pokemonSuggestions">
              {pokemonList
                .filter((name:string) => name.toLowerCase().includes(pokemon.toLowerCase()))
                .map((pokemon) => (
                  <option key={pokemon} value={pokemon} />
                ))
              }
            </datalist>
            <a 
              onClick={fetchPokemon}
              onKeyDown={(e) => e.key === 'Enter' && fetchPokemon()}
              role="button"
              tabIndex={0}
            >
              <img src="/searchIcon.svg" alt="" />
            </a>
          </div>
        </header>

        <div className={styles.imageSection}>
          <div className={styles.top}></div>
          <img className={styles.pokemonImage} src={pokemonImage} alt={pokemon} />
        </div>


        <div className={styles.footer}>
          <div className={styles.decoration}>
            <div className={styles.buttonsDiv}>
              <div className={styles.redButton}></div>
              <div className={styles.blueButton}></div>
            </div>
            <div className={styles.pokemonName}>{pokemonName}</div>
          </div>
          
          <div className={styles.buttons}>
            <a className={styles.actionTop}></a>

            <div className={styles.centerButtons}>
              <a className={styles.actionLeft} onClick={rotateBackwardPokemon}></a>
              <a className={styles.actionRight} onClick={rotateForwardPokemon}></a>
            </div>

            <a className={styles.actionBottom}></a>
          </div>
        </div>
      </div>
      <div className={styles.pokedexRightSide}>
        <div className={styles.typeSection }>
          {typesArray.map( (typeData, index) => {
            return<div 
              key={typeData.id}
              id={typeData.type}
              ref={(el) => {
                typeRefs.current[index] = el;
              }}
              className={`${styles.type} ${styles.hide}`}
            >
              <img 
                src={typeData.url} 
                alt={typeData.type}
              />
            </div>
          })}
        </div>

        <div className={styles.pokemonStatus}>
          <div>Hp: {pokemonHp}</div>
          <div>Spd: {pokemonSpeed}</div>
          <div>Atk: {pokemonAttack}</div>
          <div>Def: {pokemonDefense}</div>
        </div>
      </div>
    </div>
  );
}
