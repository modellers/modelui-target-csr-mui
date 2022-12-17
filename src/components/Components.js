
// Managers and factories
import ComponentManager from './Layout/Manager'

// Components
import { register as registerAvatar } from './Avatar/Avatar';
import { registerCard } from './Card/Card';
import { registerList, registerDropdown } from './List/List';
import { registerTable, registerDataGrid } from './Table/Table';
import { registerText } from './Text/Text';
import { registerImage } from './Image/Image';
import { registerCheckbox, registerTextfield } from './Input/Input';
import { registerDialog, registerPopup } from './Modal/Modal';
import { registerContainer, registerGrid, registerGridColumn, registerGridRow, registerView, registerAccordion, registerTabs, registerLayout } from './Grid/Grid';
import { registerButton } from './Button/Button';
import { registerTree } from './Tree/Tree';

export default function registerComponents(component_manager) {

    if (!component_manager) {
        component_manager = ComponentManager.getInstance();
    }

    if (component_manager.constructor.name !== 'ComponentManager') {
        throw "Constructor must be component manager";
    }

    registerView(component_manager);
    registerCard(component_manager);
    registerButton(component_manager);
    registerAvatar(component_manager);
    registerList(component_manager);
    registerTable(component_manager);
    registerDataGrid(component_manager);
    registerText(component_manager);
    registerImage(component_manager);
    registerDropdown(component_manager);
    registerContainer(component_manager);
    registerGrid(component_manager);
    registerGridColumn(component_manager);
    registerGridRow(component_manager);
    registerAccordion(component_manager);
    registerTabs(component_manager);
    registerLayout(component_manager)
    registerDialog(component_manager);
    registerPopup(component_manager);
    registerTree(component_manager);
    registerTextfield(component_manager);
    registerCheckbox(component_manager);
}