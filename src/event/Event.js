/***
https://stackoverflow.com/questions/44719103/singleton-object-in-react-native 

import EventManager from './EventManager';

// When storing data.
let commonData = EventManager.getInstance();
commonData.setUserID("User1");

// When retrieving stored data.
let commonData = EventManager.getInstance();
let userId = commonData.getUserID();
console.log(userId);

*/
export default class EventManager {

    static _instance = null;

    _events = {};
    _watching = {};
    _actions = {};
    _components = {};
    _component_instance_type = {};

    /**
     * @returns {EventManager}
     */
    static getInstance() {
        if (EventManager._instance === null) {
            EventManager._instance = new EventManager();
        }

        return this._instance;
    }

    /////////////////////////////////////////////////
    /// Utility functions
    /////////////////////////////////////////////////

    getType(oObj) {
        let res = false;
        if (typeof oObj === "object") {
            res = (oObj === null) ? 'null' :
                // Check if it is an alien object, for example created as {world:'hello'}
                (typeof oObj.constructor !== "function") ? 'object' :
                    // else return object name (string)
                    oObj.constructor.name;
        } else {

            // Test simple types (not constructed types)
            res = (typeof oObj === "boolean") ? 'boolean' :
                (typeof oObj === "number") ? 'number' :
                    (typeof oObj === "string") ? 'string' :
                        (typeof oObj === "function") ? 'function' : false;
        }
        return (res + '').toLowerCase();
    }

    clearAll() {
        this._events = {};
        this._watching = {};
        this._actions = {};
        this._component_instance_type = {};
    }

    warnRegistration(input_type, component_id, event_name, msg) {
        console.warn('Update registration for ' + input_type + ' ' + component_id + '.' + event_name + ' : ' + msg);
        // TODO: should notify the UI
    }

    warnInfoRegistration(component_id, msg) {
        console.warn('Update registration for ' + component_id + ': ' + msg);
        // TODO: should notify the UI
    }

    valid(obj, attr, type, default_value, component_id, key, input_type) {
        if (!obj.hasOwnProperty(attr)) { obj[attr] = default_value; this.warnRegistration(input_type, component_id, key, 'Attribute ' + attr + ' missing. Using default value.'); }
        if (this.getType(obj[attr]) !== type) { this.warnRegistration(input_type, component_id, key, 'Attribute ' + attr + ' should be of type ' + type + ' but is ' + this.getType(obj[attr]) + ' using default values.'); }
    }
    validInputsForUI(obj, input_type, component_id, key) {
        // check if schema is specified. Used by UI and validating inputs during runtime
        this.valid(obj, 'schema', 'object', { type: 'object', title: component_id + '-' + key, description: 'Auto generated' }, component_id, key, input_type);
    }
    capitalize(str) {
        return str.charAt(0).toUpperCase() + str.slice(1);
    }

    /////////////////////////////////////////////////
    /// Component self registering (is called in component)
    /////////////////////////////////////////////////

    register(component_id, actions, events, component_info) {
        // TODO: validate input action
        if (!component_info) {
            console.warn("Component info is missing for " + component_id); //throw "Component info is missing";
        } else {
            this._components[component_info.type] = component_info;
            this._components[component_info.type].actions = actions;
            this._components[component_info.type].events = events;
            this._component_instance_type[component_id] = component_info.type;
        }

        this._actions[component_id] = {};
        this._events[component_id] = events || {};
        // lets save our actions
        Object.keys(actions).forEach((key) => {
            // validate the action registration
            let action = actions[key];
            // if we only specify function, lets refactor
            if (typeof (action) === 'function') { action = { handler: action }; this.warnRegistration(component_id, key, 'Function handler should be defined as handler in an object. Auto refactoring done.'); }
            this.validInputsForUI(action, 'action', component_id, key);
            this._actions[component_id][key] = action;
        });

        const event_map = {}; // used to return the event mapping id

        // lets assign ids to the events
        Object.keys(this._events[component_id]).forEach((key) => {
            const key_id = key; // TODO: should be random
            if (!this._events[component_id][key].id) { // if undefined, null or 0
                this._events[component_id][key].id = key_id;
                event_map[key] = { id: key_id }; // REMOVE ME when refactoring this
            } else {
                event_map[key] = { id: this._events[component_id][key].id }; // TODO: EVENT HAS CALLABLE HANDLER
            }
            this.validInputsForUI(this._events[component_id][key], 'event', component_id, key);
        });

        return event_map;
    }

    /////////////////////////////////////////////////
    /// Eventfull core functions 
    /////////////////////////////////////////////////


    addToWatchList(cid, evt, trigger_id, trigger_action, transform) {
        if (!this._watching[cid]) {
            this._watching[cid] = {};
        }
        if (this._watching[cid][evt] === undefined) {
            this._watching[cid][evt] = []; // add a trigger array for component
        }

        // add to trigger array an action to perform
        this._watching[cid][evt].push({
            'tid': trigger_id, // trigger id
            'act': trigger_action, // trigger event
            'transf': transform // transformation function (TODO: if not set find one!!!)
        });
    }

    watch(W) {
        // TODO: validate W against registered
        if (Array.isArray(W) === false) {
            W = [W];
        }

        for (let i = 0; i < W.length; i++) {
            let w = W[i];
            let cid = w['component']['id'];
            let evt = w['component']['event'];
            if (w['component'].filter) { // if this is a filtered watch
                if (!w['component']['regex']) { // only compile expression if missing
                    w['component']['regex'] = new RegExp(w['component']['filter']);
                }
                Object.entries(this._actions).forEach(([cid_key, value]) => {
                    if (w['component']['regex'].exec(cid_key)) {
                        this.addToWatchList(cid_key, evt, w.trigger.id, w.trigger.action, w.transform);
                    }
                });
            } else { // lets add the id to watch list instead
                if (cid) {
                    this.addToWatchList(cid, evt, w.trigger.id, w.trigger.action, w.transform);
                }
            }
        }
    }

    addEvent(cid, event_name, data, evt) {
        // are we watching this component
        if (this._watching[cid]) {
            console.info("--> event " + cid + " :" + event_name)
            // are we watching this component event
            let actions = this._watching[cid][event_name] || [];
            for (let a in actions) {
                let act = actions[a];
                this.addAction(act.tid, act.act, data, act.transf, evt);
            }
        }
    }

    addAction(component_id, action_name, data, transform, evt) {
        if (this._actions[component_id]) {
            console.info("--> action " + component_id + " :" + action_name)
            if (this._actions[component_id][action_name]) {
                console.info("--> xx ")
                let transformed_data = data;
                if (transform) {
                    try {
                        transformed_data = transform(data);
                    } catch (e) {
                        console.error("Transform failed", e)
                    }
                }
                if (transformed_data) { // only apply action if data is available
                    this._actions[component_id][action_name].handler(transformed_data, evt);
                }
            }
        }
    }

    /////////////////////////////////////////////////
    /// Debugging
    /////////////////////////////////////////////////


    getCopyOfEvents() {
        return Object.assign({}, this._events);
    }

    getCopyOfWatchers() {
        return Object.assign({}, this._watching);
    }

    getCopyOfActions() {
        return Object.assign({}, this._actions);
    }

    /////////////////////////////////////////////////
    /// Modeller UI related functions
    /////////////////////////////////////////////////

    collectComponentInventory() {
        const store = {}

        for (const [key, comp] of Object.entries(this._components)) {
            let parents = "";
            if (comp.relation) { parents = comp.relation.within; }
            store[key] = {
                id: comp.type,
                title: comp.name,
                type: comp.type,
                parent: parents
            }
        }
        return store;
    }

    getComponentSchema(type) {
        return this._components[type].options;
    }

    getComponentByType(type) {
        return this._components[type];
    }

    getComponentsRegistered() {
        return Object.keys(this._component_instance_type);
    }

    getComponentType(component_id) {
        return this._component_instance_type[component_id];
    }

}

export const getTransformFunction = (evt) => {
    // the event has .transform as attribute
    if (typeof (evt.transform || evt.code) !== 'string') {
        return 'Event code attribute is missing';
    }
    try {
        // TODO: support more params
        // eslint-disable-next-line no-new-func
        const fn = Function('data', evt.transform || evt.code)
        return fn;
    } catch (e) {
        return e + "";
    }
}