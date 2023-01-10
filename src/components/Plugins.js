

// Managers and factories
import ComponentManager from './Layout/Manager'

// Components
import { registerComponents as register_modelui_wrap_ace } from 'modelui-wrap-ace';
import { registerComponents as register_modelui_wrap_bigcalendar } from 'modelui-wrap-bigcalendar';
import { registerComponents as register_modelui_wrap_form } from 'modelui-wrap-form';
import { registerComponents as register_modelui_wrap_complextree } from 'modelui-wrap-complextree';
import { registerComponents as register_modelui_wrap_alicecarousel } from 'modelui-wrap-alicecarousel';


export default function registerPluginComponents(component_manager) {

    if (!component_manager) {
        component_manager = ComponentManager.getInstance();
    }
    /*
    if (component_manager.constructor.name !== 'ComponentManager') {
        throw "Constructor must be component manager";
    }
    */
    register_modelui_wrap_ace(component_manager);
    register_modelui_wrap_bigcalendar(component_manager);
    register_modelui_wrap_form(component_manager);
    register_modelui_wrap_complextree(component_manager);
    register_modelui_wrap_alicecarousel(component_manager);

}

