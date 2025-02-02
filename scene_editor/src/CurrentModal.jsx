import React from 'react';
import { getCurrentModal } from './Redux/CurrentModalSlice';
import { useSelector } from 'react-redux';
import AddSceneModal from './Modals/AddSceneModal.jsx';
import DeleteSceneModal from './Modals/DeleteSceneModal.jsx';
import AddGameObjectModal from './Modals/AddGameObjectModal.jsx';
import CreateProjectModal from './Modals/CreateProjectModal.jsx';
import AddGameObjectTypeModal from './Modals/AddGameObjectTypeModal.jsx';
import AddModelModal from './Modals/AddModelModal.jsx';
import AddLightModal from './Modals/AddLightModal.jsx';
import AddColliderModal from './Modals/AddColliderModal.jsx';
import DeleteGameObjectTypeModal from './Modals/DeleteGameObjectTypeModal.jsx';
import SettingsModal from './Modals/SettingsModal/SettingsModal.jsx';

const modalClasses = {
    CreateProjectModal,
    AddSceneModal,
    AddGameObjectTypeModal,
    DeleteSceneModal,
    AddGameObjectModal,
    AddModelModal,
    AddLightModal,
    AddColliderModal,
    DeleteGameObjectTypeModal,
    SettingsModal
};

const CurrentModal = ({ dirHandle, setDirHandle }) => {
    const currentModal = useSelector(getCurrentModal());

    if (!currentModal.type) {
        return null;
    }

    const ModalClass = modalClasses[currentModal.type];

    if (!ModalClass) {
        throw new Error(`No modal class defined for type: ${currentModal.type} see CurrentModal.jsx`);
    }

    return (
        <ModalClass {...currentModal.params} dirHandle={dirHandle} setDirHandle={setDirHandle} />
    );
};

export default CurrentModal;