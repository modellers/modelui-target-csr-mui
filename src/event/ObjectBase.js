// event handler
// TODO: create another version like this one -- https://github.com/dannyconnell/localbase 
import { StateInstance } from './StateBase';
import EventManager from './Event';
import { mergeDeep } from '../util/ObjUtil';
import { MemoryManager } from '../components/Data/MemoryManager';

export const triggers = {
    insert: {
        alias: [],
        info: {
            name: 'Insert',
            description: 'Insert object'
        },
        schema: {}
    },
    read: {
        alias: [],
        info: {
            name: 'Read',
            description: 'Read object'
        },
        schema: {}
    },
    update: {
        alias: [],
        info: {
            name: 'Update',
            description: 'Update object'
        },
        schema: {}
    },
    upsert: {
        alias: [],
        info: {
            name: 'Upsert',
            description: 'Upsert object'
        },
        schema: {}
    },
    delete: {
        alias: [],
        info: {
            name: 'Delete',
            description: 'Delete object'
        },
        schema: {}
    }
}

export const events = {
    invalid: {
        alias: [],
        info: {
            name: 'invalid',
            description: 'Insert was invalid'
        },
        schema: {}
    },
    failure: {
        alias: [],
        info: {
            name: 'failure',
            description: 'Insert was failed'
        },
        schema: {}
    },
    inserting: {
        alias: [],
        info: {
            name: 'inserting',
            description: 'Insterting item creates or replaces'
        },
        schema: {}
    },
    inserted: {
        alias: [],
        info: {
            name: 'inserted',
            description: 'Inserted item creates or replaces'
        },
        schema: {}
    },
    reading: {
        alias: [],
        info: {
            name: 'Reading',
            description: 'Reading identifer'
        },
        schema: {}
    },
    read: {
        alias: [],
        info: {
            name: 'Read',
            description: 'Read identifer'
        },
        schema: {}
    },
    upserting: {
        alias: [],
        info: {
            name: 'upserting',
            description: 'TBD'
        },
        schema: {}
    },
    upserted: {
        alias: [],
        info: {
            name: 'upserted',
            description: 'TBD'
        },
        schema: {}
    },
    updating: {
        alias: [],
        info: {
            name: 'updating',
            description: 'TBD'
        },
        schema: {}
    },
    updated: {
        alias: [],
        info: {
            name: 'updated',
            description: 'TBD'
        },
        schema: {}
    },
    deleting: {
        alias: [],
        info: {
            name: 'deleting',
            description: 'TBD'
        },
        schema: {}
    },
    deleted: {
        alias: [],
        info: {
            name: 'deleted',
            description: 'TBD'
        },
        schema: {}
    },
    missing: {
        alias: [],
        info: {
            name: 'Missing',
            description: 'Missing read identifer'
        },
        schema: {}
    }
}

export class StateObject extends StateInstance {

    /*
    docs = data || {};
    this.props.id = props.id;
    schema = props.schema;
    data = props.data;
    */
    // regiser so this is accessible to all transforms
    // TODO: do this in a nicer way

    constructor(props) {
        super(props);
        this.props = props;
        // apply initial values
        this.state = { data: { docs: props.data, schema: props.data.schema || props.schema }, schema: props.schema };
        // add to globally shared memory (allowing transforms to read data)
        MemoryManager.getInstance().registerMemory(props.id, this);
    }

    getData = () => {
        // Used by memory manager when allowing transformations to read data
        // Specifically implemented in ObjectCollection
        return this.getState().data;
    }

    deepMerge = (obj_target, obj_source) => {
        return mergeDeep(obj_target, obj_source) //{ ...obj_target, ...obj_source }
    }

    raiseSuccessEvent = (event_name, data, evt) => {
        EventManager.getInstance().addEvent(this.props.id, event_name, data, evt);
    };

    raiseFailureEvent = (event_name, data, evt) => {
        // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Using_promises
        EventManager.getInstance().addEvent(this.props.id, event_name, data, evt);
    };

    isValidDocumentSchema = (doc, schema) => {
        // returns true if doc validates against schema
        return true;
    }

    isValidDocumentId = (document_id) => {
        return document_id !== null && document_id !== undefined;
    }

    getValidDocumentId = (obj) => {
        if (typeof (obj) === 'string') { return obj; } // this is a string id
        const obj_id = obj.id || obj.identifier;
        if (this.isValidDocumentId(obj_id)) { return obj_id; }
        return null;
    }

    registerComponent = (actionHandlers, eventHandlers, component_info) => {
        actionHandlers = actionHandlers || {};
        eventHandlers = eventHandlers || {};
        // add our known handlers
        // register componenet overiding or adding new event handlers
        const dataActionHandlers = {
            insert: {
                schema: {},
                handler: (objs) => {
                    const self = this;
                    function insert_one(obj, docs, schema) {
                        // https://firebase.google.com/docs/firestore/manage-data/add-data
                        const schema_validation = self.isValidDocumentSchema(obj, schema);
                        if (schema_validation) {
                            // notify event: creating - Pending
                            self.raiseSuccessEvent('inserting', obj);
                            // create the id
                            const document_id = self.getValidDocumentId(obj);
                            docs[document_id] = obj;
                            self.raiseSuccessEvent('inserted', obj);
                            // TODO: Event: created - Success
                            // TODO: Event: exists - Failure
                            // TODO: Event: failure - Failure
                        } else {
                            // notify event: invalid - Failure validating against schema
                            self.raiseFailureEvent('invalid', obj, {
                                message: 'Document structure is invalid against schema',
                                code: 501,
                                data: { document: obj, schema: schema, reason: schema_validation }
                            });
                        }
                    }
                    if (Array.isArray(objs)) { objs.forEach((obj) => { insert_one(obj, self.state.data.docs, self.state.data.schema); }); } // many
                    else { insert_one(objs, self.state.data.docs); } // one
                }
            },
            read: {
                schema: {},
                handler: (document_ids) => {
                    // https://firebase.google.com/docs/firestore/query-data/get-data
                    // validate document id
                    const self = this;
                    function read_one(document_id, docs) {
                        document_id = self.getValidDocumentId(document_id);
                        if (!document_id) {
                            self.raiseFailureEvent('invalid', { id: document_id }, { message: 'Document identifier is invalid', code: 301, data: { id: document_id } });
                        } else {
                            // notify event: reading - Pending
                            self.raiseSuccessEvent('reading', { id: document_id });
                            const obj = docs[document_id];
                            if (obj) {
                                // notify event: read - Success
                                try {
                                    self.raiseSuccessEvent('read', obj);
                                } catch (e) { self.raiseFailureEvent('failure', { id: document_id }, e); }
                            } else {
                                // notify event: missing - Failure
                                self.raiseFailureEvent('missing', { id: document_id }, { message: 'Document identifier is invalid', code: 401, data: { id: document_id } });
                            }
                        }
                    }
                    if (Array.isArray(document_ids)) { document_ids.forEach((document_id) => { read_one(document_id, this.state.data.docs, this.state.data.schema); }); } // many
                    else { read_one(document_ids, this.state.data.docs); } // one
                }
            },
            update: {
                schema: {},
                handler: (objs) => {
                    const self = this;
                    function update_one(obj, docs, schema) {

                        // validate obj against schema
                        const schema_validation = self.isValidDocumentSchema(obj, schema);
                        if (schema_validation) {
                            // TODO: Event: invalidated - Failure validating against schema
                            // notify event: updating - Pending
                            let document_id = self.getValidDocumentId(obj);
                            self.raiseSuccessEvent('updating', obj);
                            if (document_id) {
                                const doc = docs[document_id];
                                if (doc) {
                                    try {
                                        docs[document_id] = mergeDeep(doc || {}, obj);
                                        self.raiseSuccessEvent('updated', docs[document_id]);
                                    } catch (e) {
                                        self.raiseFailureEvent('error', obj);
                                    }
                                } else {
                                    // notify event: missing - Failure
                                    self.raiseFailureEvent('missing', { id: document_id, data: docs }, {});
                                    // TODO: Event: failure - Failure
                                }
                            } else {
                                self.raiseFailureEvent('invalid', obj, { message: 'Document identifier is invalid', code: 301, data: document_id });
                            }
                        } else {

                        }
                    }
                    if (Array.isArray(objs)) { objs.forEach((obj) => { update_one(obj, this.state.data.docs, this.state.data.schema); }); } // many
                    else { update_one(objs, this.state.data.docs, this.state.data.schema); } // one
                }
            },
            upsert: {
                schema: {},
                handler: (objs) => {
                    const self = this;
                    function upsert_one(obj, docs, schema) {
                        // validate document id
                        const schema_validation = self.isValidDocumentSchema(obj, schema);
                        if (schema_validation) {
                            //Event: upserting - Pending
                            self.raiseSuccessEvent('upserting', obj);
                            const document_id = self.getValidDocumentId(obj);
                            if (document_id) {
                                const doc = docs[document_id];
                                try {
                                    docs[document_id] = self.deepMerge(doc || {}, obj);
                                    self.raiseSuccessEvent('upserted', docs[document_id]);
                                } catch (e) {

                                    self.raiseFailureEvent('failure', obj, e);
                                }
                            }
                        } else {
                            // notify event: invalid - Failure validating against schema
                            self.raiseFailureEvent('invalid', obj, {
                                message: 'Document structure is invalid against schema',
                                code: 501,
                                data: { document: obj, schema: schema, reason: schema_validation }
                            });
                        }
                    }
                    if (Array.isArray(objs)) { objs.forEach((obj) => { upsert_one(obj, this.state.data.docs, this.state.data.schema); }); } // many
                    else { upsert_one(objs, this.state.data.docs, this.state.data.schema); } // one
                }
            },
            delete: {
                schema: {},
                handler: (document_ids) => {
                    const self = this;
                    function delete_one(document_id, docs) {
                        // https://firebase.google.com/docs/firestore/manage-data/delete-data
                        // validate document id
                        document_id = self.getValidDocumentId(document_id);
                        if (document_id) {
                            // Event: deleting - Pending
                            self.raiseSuccessEvent('deleting', { id: document_id });
                            const doc = docs[document_id];
                            // Do the actuall deletion
                            if (doc) { // TODO: check if this exist
                                delete docs[document_id];
                                self.raiseSuccessEvent('deleted', { id: document_id });
                                // Event: deleted - Success
                                // raiseSuccessEvent('deleted', obj);
                            } else {
                                self.raiseFailureEvent('missing', { id: document_id });
                            }
                        } else {
                            self.raiseFailureEvent('invalid', { id: document_id }, { message: 'Document identifier is invalid', code: 301, data: { id: document_id } });
                        }
                    }
                    if (Array.isArray(document_ids)) { document_ids.forEach((document_id) => { delete_one(document_id, this.state.data.docs); }); } // many
                    else { delete_one(document_ids, this.state.data.docs); } // one
                }
            }
        }

        // register componenet overiding or adding new event handlers
        this.ddEvent = EventManager.getInstance().register(this.props.id, { ...dataActionHandlers, ...actionHandlers }, { ...events, ...eventHandlers }, component_info);
        return this.ddEvent;
    }

}
