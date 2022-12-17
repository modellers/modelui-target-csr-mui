import React from 'react';
import EventHandler from '../../event/Event';
import { StateManager } from '../../event/StateManager';
import registerComponents from '../../components/Components';
import { action } from '@storybook/addon-actions';
import EventManager from '../../event/Event';
import ComponentManager from '../../components/Layout/Manager';

const print_config = {
    name: "StoryUtil",
    type: "storyutil",
    author: "Kjartan Jónsson",
    description: "StoryUtil component",
    version: 0.1,
    relation: {
        contains: [],
    },
    contains: {},
    options: {}
}

export const registerStoryWatchList = (test_handler) => {
    EventHandler.getInstance().register(test_handler, {
        print: {
            schema: {},
            handler: (obj) => {
                console.info(obj);
                action(obj["event"])(obj);
            }
        }
    }, {}, print_config);
}

export const createWatchList = function (test_handler, component_id, event_types) {
    // create watchlist
    const watch_list = [];
    const test_handler_id = component_id + "_handler_id";
    event_types.forEach((event_type) => {
        watch_list.push({
            'component': { 'id': component_id, 'event': event_type },
            'trigger': { 'id': test_handler_id, 'action': 'print' },
            'transform': function (data) { return { event: event_type, data: data }; }
        })
    });
    EventHandler.getInstance().watch(watch_list);
    registerStoryWatchList(test_handler_id);
};

export const createEventTriggers = (component_id, triggers_fn, trigger_data) => {
    const triggers = triggers_fn;
    trigger_data = trigger_data || {}; // default none data
    return (
        <div>
            <hr />
            {
                Object.keys(triggers).map((trigger_id, i) => {
                    let values = { 'title': trigger_id + '_value', 'id': trigger_id + '_value' };
                    if (trigger_data[trigger_id]) { values = trigger_data[trigger_id]; }
                    return (<button key={trigger_id + '_key_' + triggers[trigger_id].name} title={triggers[trigger_id].info.description} onClick={() => {
                        if (typeof (values) === 'function') {
                            EventHandler.getInstance().addAction(component_id, trigger_id, values());
                        } else {
                            EventHandler.getInstance().addAction(component_id, trigger_id, values);
                        }
                    }}>{triggers[trigger_id].info.name}</button>)
                })
            }
            <hr />
        </div>
    )
}

export const prepStoryComponent = (props, triggers, events, overrides) => {
    overrides = overrides || {};
    const component_manager = ComponentManager.getInstance();
    registerComponents(component_manager);
    StateManager.getInstance().clearAll();
    StateManager.getInstance().createLayoutState([props]);
    // attach managers and factories
    props.manager = component_manager;
    createWatchList(props.id + "_handler", props.id, Object.keys(events));
    return createEventTriggers(props.id, triggers, overrides.triggers);
}

export const createStoryArgumentTypesFromSchema = (options_schema) => {
    // https://storybook.js.org/docs/6.3/react/essentials/controls#annotation
    // https://json-schema.org/learn/miscellaneous-examples.html
    const args = {}
    Object.keys(options_schema.properties).forEach((attr, idx) => {
        const prop = options_schema.properties[attr];

        args[attr] = {
            name: prop.title || attr,
            defaultValue: prop.default,
            table: {
                type: {
                    summary: prop.description,
                    // detail: prop.description
                },
            },
        }

        if (prop.type === 'boolean') {
            args[attr].control = { type: 'boolean' }
        }
        if (prop.type === 'number' || prop.type === 'integer' || prop.type === 'float') {
            args[attr].control = { type: 'number' }
            if (prop.minimum !== undefined) {
                args[attr].control = { type: 'range', min: prop.minimum, max: prop.maximum }
            }
        }
        if (prop.type === 'string') {
            args[attr].control = { type: 'string' }
        }
        if (prop.enum) {
            args[attr].control = { type: 'select', options: prop.enum }
            if (prop.enum.length < 3) {
                args[attr].control.type = 'inline-radio';
            }
            // args[attr] = PropTypes.oneOf(prop.enum);
        }
        if (prop.format === "color") {
            args[attr].control = { type: 'color' }
        }
        if (prop.type === 'object') {
            args[attr].control = { type: 'object' }
        }
        if (prop.type === 'array') {
            args[attr].control = { type: 'array' }
        }

    });
    return args;
}

export const createStoryArgumentDefaultsFromSchema = (options_schema) => {
    // https://storybook.js.org/docs/6.3/react/essentials/controls#annotation
    const args = {}
    Object.keys(options_schema.properties).forEach((attr, idx) => {
        const prop = options_schema.properties[attr];
        if (prop.default) {
            args[attr] = prop.default;
        }
    });
    return args;
}

export const createLayoutViewArgumentTypes = (config) => {
    // depreciated: user createStoryArgumentTypesFromSchema
    // https://storybook.js.org/docs/react/essentials/controls#annotation
    const args = {};
    const defaultStyles = {  // common options
        label: { control: 'text' },
        labelPlacement: {
            control: {
                type: 'select',
                options: ["bottom", "end", "start", "top"]
            }
        },
        color: {
            control: {
                type: 'select',
                options: ['initial', 'inherit', 'primary', 'secondary', 'textPrimary', 'textSecondary', 'error']
            }
        },
        indicatorColor: {
            control: {
                type: 'select',
                options: ['initial', 'inherit', 'primary', 'secondary', 'textPrimary', 'textSecondary', 'error']
            }
        },
        textColor: {
            control: {
                type: 'select',
                options: ['initial', 'inherit', 'primary', 'secondary', 'textPrimary', 'textSecondary', 'error']
            }
        },
        buttonVariant: {
            control: {
                type: 'select',
                options: ['contained', 'outlined', 'text', 'fab']
            }
        },
        tabVariant: {
            control: {
                type: 'select',
                options: ['inherit', 'fullWidth', 'scrollable']
            }
        },
        contentMargin: {
            control: {
                type: 'number'
            }
        },
        variant: {
            control: {
                type: 'select',
                options: ['filled', 'outlined', 'standard']
            }
        },
        size: {
            control: {
                type: 'select',
                options: ['small', 'large', 'medium']
            }
        },
        shape: {
            control: {
                type: 'select',
                options: ['circular', 'rounded', 'square']
            }
        },
        max_count: {
            control: {
                type: 'number'
            }
        },
        spacing: {
            control: {
                type: 'number'
            }
        },
        direction: {
            control: {
                type: 'select',
                options: ['row', 'row-reverse', 'column', 'column-reverse']
            }
        },
        justify: {
            control: {
                type: 'select',
                options: ['flex-start', 'center', 'flex-end', 'space-between', 'space-around', 'space-evenly']
            }
        },
        alignItems: {
            control: {
                type: 'select',
                options: ['flex-start', 'center', 'flex-end', 'stretch', 'baseline']
            }
        },
        gridXS: {
            control: {
                type: 'select',
                options: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
            }
        },
        gridSM: {
            control: {
                type: 'select',
                options: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
            }
        },
        modalType: {
            control: {
                type: 'select',
                options: ["alert", "dialog", "modal"]
            }
        }
    };
    // expanded
    const inputStyles = { ...defaultStyles, ...config.options }
    // find out what this components supports and return it as argument
    Object.keys(config.options).forEach((attr, idx) => {
        let arg = inputStyles[attr];
        // TODO: https://github.com/storybookjs/storybook/blob/next/MIGRATION.md#deprecated-controloptions
        args[attr] = arg;
    });
    return args;
}