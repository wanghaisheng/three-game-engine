import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import fileDataSlice, { getFile } from '../../Redux/FileDataSlice.js';
import currentModalSlice from '../../Redux/CurrentModalSlice.js';
import Models from './Models.jsx';
import Lights from './Lights.jsx';
import Physics from './Physics.jsx';
import PropertyList from './PropertyList.jsx';
import * as FileHelpers from '../../util/FileHelpers.js'

const GameObjectTypeProperties = ({ dirHandle, type }) => {
    const dispatch = useDispatch();

    const gameFile = useSelector(getFile('game.json'));

    const gameObjectTypeFilePath = gameFile?.data?.gameObjectTypes[type];
    const gameObjectTypeFile = useSelector(getFile(gameObjectTypeFilePath || null));

    useEffect(() => {
        FileHelpers.loadFile(dirHandle, gameObjectTypeFilePath, dispatch, { type: 'gameObjectTypeJSON' })
    }, [gameObjectTypeFilePath]);

    const changeProperty = (field, value) => {
        dispatch(fileDataSlice.actions.modifyFileData({
            path: gameObjectTypeFilePath,
            field,
            value
        }));

        window.postMessage({
            eventName: 'modifyGameObjectTypeInMainArea',
            gameObjectType: type
        });
    };

    const onAddLight = () => {
        const params = {
            gameObjectType: type
        };
        dispatch(currentModalSlice.actions.openModal({ type: 'AddLightModal', params }));
    };

    const addCollider = () => {
        const params = {
            gameObjectType: type
        };
        dispatch(currentModalSlice.actions.openModal({ type: 'AddColliderModal', params }));
    };

    if (!gameObjectTypeFile?.data) {
        return <div style={{ textAlign: 'center' }}>Loading...</div>;
    }

    return (
        <PropertyList>    
            <Models
                gameObjectType={type}
                models={gameObjectTypeFile.data.models || []}
                changeProperty={changeProperty}
            />
            <Lights
                lights={gameObjectTypeFile.data.lights || []}
                onChange={lights => changeProperty(['lights'], lights)}
                onAdd={onAddLight}
            />
            <Physics
                rigidBody={gameObjectTypeFile.data.rigidBody}
                changeProperty={changeProperty}
                addCollider={addCollider}
            />
        </PropertyList>
    );
};

export default GameObjectTypeProperties