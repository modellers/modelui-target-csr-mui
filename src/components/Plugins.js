
// Managers and factories
import ComponentManager from './Layout/Manager'

export default function registerPluginComponents(component_manager) {

    if (!component_manager) {
        component_manager = ComponentManager.getInstance();
    }

    if (component_manager.constructor.name !== 'ComponentManager') {
        throw "Constructor must be component manager";
    }

}