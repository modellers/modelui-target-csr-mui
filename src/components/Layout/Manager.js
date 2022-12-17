import EventManager from "../../event/Event";
import { StateManager } from '../../event/StateManager';

export default class ComponentManager {

    static _instance = null;

    _components = {};

    /**
     * @returns {ComponentManager}
     */
    static getInstance() {
        if (ComponentManager._instance === null) {
            ComponentManager._instance = new ComponentManager();
            ComponentManager._instance._event_manager = EventManager.getInstance();
            ComponentManager._instance._state_factory = StateManager.getInstance();
        }

        return this._instance;
    }

    getEventManager() { return this._event_manager; }

    getStateFactory() { return this._state_factory; }

    clearAll() {
        this._components = {};
    }

    registerComponent(component) {
        /**
         * Adds component to layout manager of any type.
         * Specific types in TYPES are specifically used when automatically generating the layout using AI.
         */

        // attach managers and factory
        component.manager = this;

        if (typeof (component.component) === "function") {
            this._components[component.type] = component;
        } else {
            console.error("Could not register " + component.type + " since it was not a function");
        }
    }

    getComponentTypes() {
        return Object.keys(this._components)
    }

    getComponents() {
        return this._components;
    }

    getComponent(component_type) {
        return this._components[component_type]
    }

    getComponentInstance(component_type, parameters) {
        // validate parameter inputs
        console.info(component_type, parameters)
        // paramters
        parameters.manager = this;
        // create component
        const c = this._components[component_type];
        if (c) { // if React component is of type class
            if (c.is_withclass) {
                return c.component;
            }
            else { // if React component is of type function
                return new c.component(parameters);
            }
        } else {
            console.warn("Component instance not registered of type: " + component_type);
        }
    }

    collectComponentInventory() {
        const store = {}
        for (const [key, comp] of Object.entries(this._components)) {
            const cfg = comp.config;
            if (cfg && key && cfg.type) {
                let parents = "";
                if (cfg.relation) { parents = cfg.relation.within; }
                store[cfg.type] = {
                    id: cfg.type,
                    title: cfg.name,
                    type: cfg.type,
                    events: comp.events,
                    actions: comp.triggers,
                    category: 'TBD',
                    parent: parents,
                    schema: cfg.options
                }
                // also add the children
                if (cfg.contains) {
                    for (const [key_itm, comp] of Object.entries(cfg.contains)) {
                        const itm = cfg.contains[key_itm];
                        store[key_itm] = {
                            id: key_itm,
                            title: itm.title || itm.id,
                            category: 'TBD',
                            type: key_itm,
                            parent: cfg.type,
                            schema: comp
                        }
                    }
                }
            }
        }
        return store;
    }
}


window.componentManager = ComponentManager;