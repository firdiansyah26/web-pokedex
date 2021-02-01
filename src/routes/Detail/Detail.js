import React, { useEffect, useCallback, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useHistory } from "react-router-dom";

import gql from 'graphql-tag'
import { Query } from "react-apollo"

import BlockUi from 'react-block-ui';

import { Image, Typography, Button, Card, Row, Col, Input, Modal, notification } from 'antd';
import { getDetailData } from "../../redux/detailReducer/actions";

const { Title, Text } = Typography;

const Detail = () => {
    let history = useHistory();
    let detailState = useSelector(state => state.DetailReducer);
    let { idPokemon } = useParams();
    let dispatch = useDispatch();
    let [success, setSuccess] = useState(undefined)
    let [name, setName] = useState()
    let qString = window.location.search.replace('?', '').split('&')
    let _name = qString[0].replace('name=', '')
    let _catch = qString[1].replace('catch=', '')
    let _index = qString.length > 2 ? qString[2].replace('idx=', '') : null

    let QUERY_LIST = gql`
    query pokemon($name: String!) {
        pokemon(name: $name) {
          id
          name
          sprites {
            front_default
          }
          moves {
            move {
              name
            }
          }
          types {
            type {
              name
            }
          }
        }
      }
    `;

    useEffect(() => {
        dispatch(getDetailData(idPokemon))
    }, [dispatch, idPokemon])

    const onClickBack = useCallback(() => {
        history.goBack()
    }, [history])

    const onClickCatch = useCallback(() => {
        var chance = Math.random();
        if (chance < 0.5) {
            setSuccess(false)
        }
        else {
            setSuccess(true)
        }
    })

    const onSaveCatch = useCallback(() => {
        let _arr = detailState.myPokemon
        _arr.push({
            name: name,
            pokemonDetail: detailState.detail
        })

        notification['success']({
            message: 'Yeay, success catch a pokemon ' + detailState.detail.name + ' with name ' + name + ' !',
        });

        setSuccess(undefined)
        setName(undefined)
    }, [detailState, name, setName, setSuccess])

    return (
        <React.Fragment>
            <Modal
                title="Give me a name!"
                visible={success}
                onOk={onSaveCatch}
                onCancel={() => {
                    setSuccess(undefined)
                    setName(undefined)
                }}
            >
                <Input value={name} onChange={(e) => setName(e.target.value)} />
            </Modal>

            <Query query={QUERY_LIST} variables={{ "name": _name }}>
                {({ loading, error, data }) => {
                    if (!error && data !== undefined && detailState.detail) {
                        return (
                            <div>
                                <BlockUi tag="div" blocking={loading}>
                                    <Row>
                                        <div style={{ padding: '5%', width: '100%' }}>
                                            <Typography>
                                                <Button type="default" size={'large'} onClick={onClickBack}>Back</Button>
                                                <Title style={{ textAlign: 'center' }}>{detailState.detail.name}</Title><br />
                                                {_catch === 'false' && detailState.myPokemon[_index] ? <h5 style={{ textAlign: 'center' }}>The Name is '{_index !== null ? detailState.myPokemon[_index].name : ''}'</h5> : ''}
                                                <Card
                                                    hoverable
                                                    style={{ width: '100%' }}
                                                    cover={<img alt="pokemon-image" src={detailState.detail.sprites.other.dream_world.front_default} />}
                                                >
                                                    {
                                                        success === undefined || success === false ?
                                                            _catch === 'true' ?
                                                                <Button type="default" shape="round" size={'large'} onClick={onClickCatch}>
                                                                    Catch Me!
                                                                </Button>
                                                                : null
                                                            : null
                                                    }
                                                    {
                                                        success === false ? <h4 style={{ color: 'red' }}>Oops, you can't catch me :p</h4> : null
                                                    }

                                                </Card>
                                            </Typography>
                                        </div>
                                    </Row>
                                    <Row>
                                        <div className="content-detail">
                                            <Col span={6}>
                                                <Image.PreviewGroup>
                                                    {
                                                        detailState.detail.sprites.front_default ?
                                                            <Image
                                                                width={100}
                                                                src={detailState.detail.sprites.front_default}
                                                            /> : ''
                                                    }
                                                </Image.PreviewGroup>
                                            </Col>
                                            <Col span={6}>
                                                <Image.PreviewGroup>
                                                    {
                                                        detailState.detail.sprites.front_shiny ?
                                                            <Image
                                                                width={100}
                                                                src={detailState.detail.sprites.front_shiny}
                                                            /> : ''
                                                    }
                                                </Image.PreviewGroup>
                                            </Col>
                                            <Col span={6}>
                                                <Image.PreviewGroup>
                                                    {
                                                        detailState.detail.sprites.back_default ?
                                                            <Image
                                                                width={100}
                                                                src={detailState.detail.sprites.back_default}
                                                            /> : ''
                                                    }
                                                </Image.PreviewGroup>
                                            </Col>
                                            <Col span={6}>
                                                <Image.PreviewGroup>
                                                    {
                                                        detailState.detail.sprites.back_shiny ?
                                                            <Image
                                                                width={100}
                                                                src={detailState.detail.sprites.back_shiny}
                                                            /> : ''
                                                    }
                                                </Image.PreviewGroup>
                                            </Col>
                                        </div>
                                    </Row>
                                    <Title style={{ textAlign: 'center' }}>Types</Title>
                                    <Row style={{ paddingBottom: '10%' }}>
                                        <div className="content-detail">
                                            <Col span={24}>
                                                {
                                                    detailState.detail.types.map((obj, idx) => {
                                                        return (
                                                            <Text key={idx} keyboard>{obj.type.name}</Text>
                                                        )
                                                    })
                                                }
                                            </Col>
                                        </div>
                                    </Row>
                                </BlockUi>
                            </div>
                        )
                    } else return <div></div>
                }}
            </Query>
        </React.Fragment >
    )
}

export default Detail