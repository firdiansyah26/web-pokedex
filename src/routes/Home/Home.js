import React from 'react'

import { useCallback } from 'react'
import { useHistory } from "react-router-dom";
import gql from 'graphql-tag'
import { Query } from "react-apollo"
import BlockUi from 'react-block-ui';
import { Card, Tag, Button, Tooltip } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import { DeleteOutlined } from '@ant-design/icons';
import { handleState } from "../../redux/detailReducer/actions";

const { Meta } = Card;

const Home = () => {
    let history = useHistory();
    let dispatch = useDispatch();

    let detailState = useSelector(state => state.DetailReducer);
    let _isMyPokemon = window.location.pathname.includes('listPokemon')

    let QUERY_LIST = gql`
    query pokemons($limit: Int, $offset: Int) {
        pokemons(limit: $limit, offset: $offset) {
          count
          next
          previous
          status
          message
          results {
            url
            id
            name
            image
          }
        }
      }
    `;

    let onClickDetail = useCallback((param, idx) => {
        let _idx = ''
        if (_isMyPokemon) _idx = `&idx=${idx}`
        history.push(`/detailPokemon/${param.id}?name=${param.name}&catch=${!_isMyPokemon}${_idx}`)
    }, [history])

    let onRemove = useCallback((idx) => {
        let _arr = detailState.myPokemon
        let _dum = _arr.filter((obj1, idx1) => idx1 !== idx)
        dispatch(handleState('myPokemon', _dum))

    }, [detailState, dispatch])

    return (
        <React.Fragment>
            <div>
                <Query query={QUERY_LIST} variables={{ "limit": 150 }}>
                    {({ loading, error, data }) => {
                        if (!error && data !== undefined) {
                            let _data

                            if (_isMyPokemon) _data = detailState.myPokemon
                            else _data = data.pokemons.results

                            return (
                                <div>
                                    <BlockUi tag="div" blocking={loading}>
                                        {
                                            detailState.myPokemon.length !== 0 ? (<h3 style={{ textAlign: 'center' }}> <Tag color="#87d068" style={{ fontSize: '15px' }}>I have {detailState.myPokemon.length} pokemon(s)</Tag></h3>) : ''
                                        }
                                        <main>
                                            <div data-test-id="content-test-id" className="content">
                                                {
                                                    _data.map((obj, idx) => {
                                                        return (
                                                            <div key={idx}>
                                                                <Card
                                                                    onClick={() => onClickDetail(_isMyPokemon ? obj.pokemonDetail : obj, idx)}
                                                                    hoverable
                                                                    style={{ width: 150, margin: '10px', height: '230px' }}
                                                                    cover={<img alt="pokemon-image" src={_isMyPokemon ? obj.pokemonDetail.sprites.front_default : obj.image} />}
                                                                >
                                                                    <Meta title={obj.name} />
                                                                </Card>
                                                                {
                                                                    _isMyPokemon ?
                                                                        <Tooltip placement="topLeft" title="Remove Pokemon">
                                                                            <Button type="primary" shape="round" danger size={'small'} icon={<DeleteOutlined />} onClick={() => onRemove(idx)}></Button>
                                                                        </Tooltip>
                                                                        : ''
                                                                }
                                                            </div>
                                                        )
                                                    })
                                                }
                                            </div>
                                        </main>
                                    </BlockUi>
                                </div>
                            )
                        } else return <div></div>
                    }}
                </Query>
            </div>
        </React.Fragment >
    )
}

export default Home
