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

            let nouvellesAttaques = [];
            let nouvelleAttaque = '';
            let check = 0;

            if (listpkmn.length <6 && compteur != 0){
                const pkmn = await axios.get('https://projet-pokemon-seven.vercel.app/aleatoire');
                
                while (nouvellesAttaques.length < 4) {
                    nouvelleAttaque = choisirElementRandom(pkmn.data.Moves)
                    if (nouvellesAttaques.length >= 1) {
                        check = 0
                        nouvellesAttaques.map( (newmove, index) => {
                            if (nouvelleAttaque == newmove) {
                                check = 1; // Set check to 1 if they are equal
                            }
                        })
                    }else{
                        // console.log("premier passage")
                        check = 1
                        nouvellesAttaques.push(nouvelleAttaque)
                    }

                    if (check == 0) {
                        nouvellesAttaques.push(nouvelleAttaque)
                    }
                }

                pkmn.data.Moves = nouvellesAttaques

                await Promise.all(pkmn.data.Moves.map( async (oneAttaque, index) => {
                    return await axios.get('https://projet-pokemon-seven.vercel.app/attackById/' + oneAttaque)
                })).then(res => {
                    // console.log({res})
                    res.forEach((oneAttaque, index) => {
                        let nouvelleAttaque =  oneAttaque["data"]["Name"]
                        pkmn.data.Moves[index] =  nouvelleAttaque
                    })
                })

                await Promise.all(pkmn.data.Types.map( async (oneType, index) => {
                    return await axios.get('https://projet-pokemon-seven.vercel.app/typeById/' + oneType)
                })).then(res => {
                    // console.log({res})
                    res.forEach((oneType, index) => {
                        let nouveauType =  oneType["data"]["name"]
                        pkmn.data.Types[index] =  nouveauType
                    })
                })

                console.log("nouveau pokemon:", pkmn.data)

                let listProvi = [...listpkmn]
                listProvi.push(pkmn.data)
                setListpkmn(listProvi)
                // console.log(listpkmn)
            }
        }
        fetchdata()
    }, [compteur]);

    // useEffect( () => {
    //     console.log("la liste des poke a changé")
    // }, [listpkmn])

    function choisirElementRandom(liste) {
        const indexAleatoire = Math.floor(Math.random() * liste.length);
        return liste[indexAleatoire];
    }
    

    function setMaxHP(pkmn){
        // console.log("first poke", pkmn)
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

    function showFirstPokemon(firstPkmn){
        // console.log("showfp:")
        // console.log({listpkmn})
        return (
            <>
                {currentHP == 0 && listpkmn.length == 1? (
                    setCurrentHP(firstPkmn.HP)
                ) : (
                    null
                )}
                {/* {console.log("current", currentHP)} */}
                {/* {console.log("inlist 1", firstPkmn.HP)} */}
                {listpkmn.length === 1 ? null : ( 
                    (() => {
                        // console.log("test 1", firstPkmn.HP);
                        firstPkmn.HP = currentHP;
                    })()
                )}
                {/* {console.log("inlist 2", firstPkmn.HP)} */}
                {currentHP != 0 ? (
                    <>
                        {/* {console.log("test 2", firstPkmn.HP)} */}
                        <div>{firstPkmn.HP = currentHP}/{firstPkmn.MaxHP}</div>
                    </>
                ) : (
                    <>
                        {/* {console.log("test 3", firstPkmn.HP)} */}
                        <div>{firstPkmn.HP}/{firstPkmn.MaxHP}</div>
                    </>
                )}
                
                {/* {console.log("inlist 3", firstPkmn.HP)} */}

                <ul>
                    <li>{firstPkmn[" Name"]}</li>
                    <li>
                        {firstPkmn.Types.map( (Type, index) => (
                            <div key={Type}>
                                {Type}
                            </div>
                        ))}
                    </li>
                    {/* <li>{firstPkmn.Moves.length}</li> */}
                    <li>
                        {/* {console.log(firstPkmn.Moves)} */}
                        {firstPkmn.Moves.map( (move, index) => (
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

                <button onClick={() =>{
                    if(compteur < 6 && compteur == listpkmn.length){
                        setCompteur(compteur + 1)
                    }else if(compteur < 6 && compteur < listpkmn.length){
                        setCompteur(listpkmn.length + 1)
                    }
                }}>+</button>

                {compteur}

                {listpkmn.length > 0 ? (
                    setMaxHP(listpkmn[0])
                ) : (
                    null
                )}

                {listpkmn.length > 0 ? (
                    listpkmn[0].HP > 0 ? (
                        showFirstPokemon(listpkmn[0])
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

                {/* {console.log("dead", testDead)} */}


                {/* {showFirstPokemoninfos()} */}
            </div>
            <Loading />
        </>
    );
}

export default Listpkmn;















// function pickAttacks(pkmnAttackList){
//     if (pkmnAttackList.length >4) {
//         let nouvellesAttaques = [];
//         let nouvelleAttaque = '';
//         let check = 0;
//         for (let i = 0; i < 4; i++) {
//             nouvelleAttaque = choisirElementRandom(pkmnAttackList)
//             if (nouvellesAttaques.length > 1) {
//                 check = 0
//                 nouvellesAttaques.map( (newmove, index) => (
//                     nouvelleAttaque == newmove ? (
//                         check = 1
//                     ) : (
//                         null
//                     )
//                 ))
//             }
//             // console.log("attaque", nouvelleAttaque)
//             // console.log("attaque avant", nouvelleAttaque)
//             // let Attaque = await axios.get('https://projet-pokemon-seven.vercel.app/attackById/' + nouvelleAttaque)
//             // console.log("attaque apres", Attaque["data"]["Name"])
//             // console.log({Attaque})
//             // nouvelleAttaque = await Attaque["data"]["Name"]
//             // console.log("newattack", nouvelleAttaque)
//             if (check == 0) {
//                 nouvellesAttaques.push(nouvelleAttaque)
//             }else{
//                 i = i-1
//             }
//         }
//         // console.log("nouvelles attaques", nouvellesAttaques)
//         return nouvellesAttaques;
//     }
// }