import { useEffect, useState } from 'react';
import axios from 'axios';
import Loading from './Loading';

function Listpkmn(){

    const [listpkmn, setListpkmn] = useState([]);
    const [compteur, setCompteur] = useState(0)
    const [currentHP, setCurrentHP] = useState(0)
    const [currentHPennemy, setCurrentHPennemy] = useState(100)


    useEffect( () => {
        async function fetchdata(){

            const pkmn = await axios.get('https://projet-pokemon-seven.vercel.app/aleatoire');
            // console.log(pkmn)

            if (compteur > 6){
                setCompteur(6)
            }

            if (listpkmn.length <6 && compteur != 0){
                
                let listProvi = [...listpkmn]

                listProvi.push(pkmn.data)                 

                setListpkmn(listProvi)

                
            }

            
        }
        fetchdata()
        

    }, [compteur]);


    function choisirElementRandom(liste) {
        const indexAleatoire = Math.floor(Math.random() * liste.length);
        return liste[indexAleatoire];
    }
    
    function pickAttacks(pkmnAttackList){
        // pkmnAttackList = pkmnAttackList.slice(1, -1);
        // console.log(pkmnAttackList);
        // const elements = pkmnAttackList.split(',');
        // pkmnAttackList = elements;

        if (pkmnAttackList.length >4) {
            let nouvellesAttaques = [];
            let nouvelleAttaque = '';
            let check = 0;
            for (let i = 0; i < 4; i++) {
                nouvelleAttaque = choisirElementRandom(pkmnAttackList)
                if (nouvellesAttaques.length > 1) {
                    check = 0
                    nouvellesAttaques.map( (newmove, index) => (
                        nouvelleAttaque == newmove ? (
                            check = 1
                        ) : (
                            null
                        )
                    ))
                }

                if (check == 0) {
                    nouvellesAttaques.push(nouvelleAttaque)
                }else{
                    i = i-1
                }
            }
            return nouvellesAttaques;
        }
    }

    function setMaxHP(pkmn){
        console.log(pkmn)
        if (typeof pkmn.MaxHP !== 'undefined' && pkmn.MaxHP !== null) {
            // maVariable est définie
        } else {
            pkmn.MaxHP = pkmn.HP
        }
    }

    function attaque(){
        setCurrentHPennemy(currentHPennemy - 0)
    }

    function attaqueEnnemie(){
        setCurrentHP(currentHP - 20);
    }

     function Switch(listpkmn, indexPkmn) {
        if (listpkmn[indexPkmn].HP >0) {
            let listTemp = [...listpkmn]

            let temp = listTemp[0];

            listTemp[0] = listTemp[indexPkmn];

            listTemp[indexPkmn] = temp;

            
            setListpkmn(listTemp);

            setCurrentHP(listpkmn[indexPkmn].HP)
        }
        // setCurrentHP(listpkmn[0].HP)
    }

    function showFirstPokemon(){
        // console.log("showfp:")
        if(listpkmn.length != 0){
            return (
                <>
                    {currentHP == 0 && listpkmn.length == 1? (
                        setCurrentHP(listpkmn[0].HP)
                    ) : (
                        null
                    )}
                    {/* {console.log("current", currentHP)} */}
                    {/* {console.log("inlist 1", listpkmn[0].HP)} */}
                    {listpkmn.length === 1 ? null : ( 
                        (() => {
                            // console.log("test 1", listpkmn[0].HP);
                            listpkmn[0].HP = currentHP;
                        })()
                    )}
                    {/* {console.log("inlist 2", listpkmn[0].HP)} */}
                    {currentHP != 0 ? (
                        <>
                            {/* {console.log("test 2", listpkmn[0].HP)} */}
                            <div>{listpkmn[0].HP = currentHP}/{listpkmn[0].MaxHP}</div>
                        </>
                    ) : (
                        <>
                            {/* {console.log("test 3", listpkmn[0].HP)} */}
                            <div>{listpkmn[0].HP}/{listpkmn[0].MaxHP}</div>
                        </>
                    )}
                    
                    {/* {console.log("inlist 3", listpkmn[0].HP)} */}

                    <ul>
                        <li>{listpkmn[0][" Name"]}</li>
                        <li>{listpkmn[0].Types}</li>
                        {/* <li>{listpkmn[0].Moves.length}</li> */}
                        <li>
                            {listpkmn[0].Moves.map( (move, index) => (
                                <div key={move}>
                                    <button onClick={() => {attaque()
                                    attaqueEnnemie()
                                    }}>{move}</button>
                                </div>
                            ))}
                        </li>
                    </ul>
                </>
                
            )
        }
    }

    function showFirstPokemoninfos(){
        if(listpkmn.length != 0){
            return (
                <>
                    <div>
                        {Object.entries(listpkmn[0]).map(([key, value]) => (
                            <p key={key}>
                                {key}: {value}
                            </p>
                        ))}
                    </div>
                </>
            )
        }
    }

    

    let testDead = 0;
    
    return (
        <>
            <div>
                {currentHPennemy <= 0 ? (
                    <div> VOUS AVEZ GAGNE </div>
                ) : (
                    <div>{currentHPennemy}</div>
                )}

                <button onClick={() =>{setCompteur(compteur + 1)}}>+</button>

                {compteur}

                {listpkmn.length > 0 && listpkmn[0].Moves.length > 4 ? (
                    listpkmn[0].Moves = pickAttacks(listpkmn[0].Moves)
                ) : (
                    null
                )}

                {listpkmn.length > 0 ? (
                    setMaxHP(listpkmn[0])
                ) : (
                    null
                )}

                {listpkmn.length > 0 ? (
                    listpkmn[0].HP > 0 ? (
                        showFirstPokemon()
                    ):(
                        <>
                            <div>{listpkmn[0][" Name"]} est K.O </div>
                            <div>Choisissez un nouveau pokemon</div>
                        </>
                    )
                ) : (
                    null
                )}

                {listpkmn.length > 0 ? (
                    listpkmn.map( (pkmn, index) => (
                        <div key={pkmn[" Name"]}>
                            {/* <button>{pkmn[" Name"]}</button> */}
                            <button onClick={() => {Switch(listpkmn, index)
                            
                            }}>{pkmn[" Name"]}</button>
                        </div>
                    ))
                ) : (
                    null
                )}
  
                
                {currentHP <= 0 && (
                    (() => {
                        testDead = 0;
                        listpkmn.forEach((pkmn, index) => {
                            if (pkmn.HP <= 0) {
                                testDead += 1;
                            }
                        });
                    })()
                )}

                {testDead >= 6 ? (
                    <div> VOUS AVEZ PERDU </div>
                ) : (
                    null
                )}

                {console.log("dead", testDead)}


                {/* {showFirstPokemoninfos()} */}
            </div>
            <Loading />
        </>
    );
}

export default Listpkmn;
