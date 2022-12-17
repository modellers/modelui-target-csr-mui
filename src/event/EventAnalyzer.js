/**
 * EventAnalyzer
 * 
 * Validates data against schemas
 * 
 */

// TODO: https://ajv.js.org/security.html 
import Ajv from "ajv";
import { compareDeep } from "../util/ObjUtil";
import { StateManager } from './StateManager';
import ComponentManager from '../components/Layout/Manager';
import { getTransformFunction } from '../event/Event';
// schema utils
import { getSchemaGeneratedData } from "../util/SchemaUtil";

export class EventAnalyzer {

  static _instance = null;

  _schemas = {};
  _options = { strict: false };

  /**
   * @returns {EventAnalyzer}
   */
  static getInstance() {
    if (EventAnalyzer._instance === null) {
      EventAnalyzer._instance = new EventAnalyzer();
      EventAnalyzer._instance.ajv = new Ajv({ allErrors: false });
    }
    return this._instance;
  }

  clearAll() {
    this._schemas = {};
    this.ajv.removeSchema();
  }

  registerSchema(schema, callback) {
    // saves reference and compiles schema
    const schema_id = schema["$id"];
    if (schema_id) {
      if (this._schemas[schema_id]) {
        if (this._options.strict) {
          // TODO: create a has value from the JSON string making sure it is the same
        }
      } else {
        try {
          this._schemas[schema_id] = {
            compiled: this.ajv.compile(schema),
            schema: schema
          }
          if (callback) { callback({ success: true, errors: { ...this._schemas[schema_id].errors } }); }
        } catch (e) {
          if (callback) { callback({ success: false, errors: null, }); }
        }
        // TODO: create has value from the JSON string and save it as well
      }
    }
  }

  getSchema(schema) {
    // TODO: use ajv caching only, skipping our own _schema caching
    const schema_id = schema["$id"];
    const schema_cache = this._schemas[schema_id];
    if (schema_cache) {
      return schema_cache.compiled;
    } else { // schema is missing, lets compile and return
      this._schemas[schema_id] = {
        compiled: this.ajv.compile(schema),
        schema: schema
      }
      return this._schemas[schema_id].compiled;
    }
  }

  getSchemaDefaults(schema) {
    return getSchemaGeneratedData(schema)
  }

  fetchComponentInfo(component_id, components_registered, components_inventory) {
    if (components_registered) {
      const reg = components_registered[component_id];
      const comp = components_inventory[reg.type];
      return {
        props: {
          type: comp.type,
          triggers: comp.events,
          actions: comp.actions,
        }
      }
    } else {
      return StateManager.getInstance().getManager(component_id);
    }
  }

  validateData(schema, data) {
    // uses schema id to lookup compiled version and execute data validation
    const validated = { valid: false }
    const schema_compiled = this.getSchema(schema);
    if (schema_compiled) {
      validated.valid = schema_compiled(data);
      validated.error = schema_compiled.errors;
      return validated;
    }
    return null;
  }

  validateEventAction(event_action) {
    if (event_action.input === undefined) { event_action.input = []; }
    if (event_action.output === undefined) { event_action.output = []; }
    try {
      const report = this.validateEventActionRun(event_action, event_action.input[0], event_action.output[0]);
      return report
    } catch (report) {
      return report
    }
  }

  validateEventActionRun(event, data_input, data_output, components_registered, components_inventory) {
    // executes the event transform making sure that input and output is valid
    const report = {} // TODO: decide how the report should be

    if (event.transform === undefined) {
      report.error_resolve = "Add transform section to event"
      report.error_detail = "Transform section is required";
      report.data = {
        "type": "critical",
        "name": "missing",
        "was": "section",
        "use": "function"
      }
      throw report;
    } // total failure

    ///
    /// Check component
    /// 

    const component = event.component;
    if (component === undefined) {
      report.error_resolve = "Add component section to event"
      report.error_detail = "Component section is required";
      report.data = {
        "type": "critical",
        "name": "missing",
        "was": "section",
        "use": Object.keys(ComponentManager.getInstance().getComponents())
      }
      throw report;
    } // total failure
    const component_inst = this.fetchComponentInfo(component.id, components_registered, components_inventory);
    if (component_inst === undefined) {
      report.error_resolve = "Make sure state manager registers '" + component.id + "'"
      report.error_detail = "Component '" + component.id + "' was not registered with state manager";
      report.data = {
        "type": "critical",
        "name": "missing",
        "was": component.id,
        "use": "State manager"
      }
      throw report;
    } // total failure
    const component_type = ComponentManager.getInstance().getComponent(component_inst.props.type);
    if (component_type === undefined) {
      report.error_resolve = "Use one of these: " + ComponentManager.getInstance().getComponentTypes();
      report.error_detail = "Component type '" + component_inst.props.type + "' is not supported";
      report.data = {
        "type": "critical",
        "name": "unsupported",
        "was": component_inst.props.type,
        "use": ComponentManager.getInstance().getComponentTypes()
      }
      throw report;
    } // total failure

    ///
    /// Check trigger
    /// 

    const trigger = event.trigger;
    if (trigger === undefined) {
      report.error_resolve = "Add trigger section to event"
      report.error_detail = "Trigger section is required";
      report.data = {
        "type": "critical",
        "name": "missing",
        "was": "section",
        "use": Object.keys(ComponentManager.getInstance().getComponents())
      }
      throw report;
    }
    const trigger_inst = this.fetchComponentInfo(trigger.id, components_registered, components_inventory);
    if (trigger_inst === undefined) {
      report.error_resolve = "Make sure state manager registers '" + trigger.id + "'"
      report.error_detail = "Trigger '" + trigger.id + "' was not registered with state manager";
      report.data = {
        "type": "critical",
        "name": "missing",
        "was": trigger.id,
        "use": "State manager"
      }
      throw report;
    } // total failure

    const trigger_type = ComponentManager.getInstance().getComponent(trigger_inst.props.type);
    if (trigger_type === undefined) {
      report.error_resolve = "Use one of these: " + ComponentManager.getInstance().getComponentTypes();
      report.error_detail = "Trigger type '" + trigger_inst.props.type + "' is not supported";
      report.data = {
        "type": "critical",
        "name": "unsupported",
        "was": trigger_inst.props.type,
        "use": ComponentManager.getInstance().getComponentTypes()
      }
    } // total failure

    // xxx
    if (component_type && component_type.events) {
      const component_event = component_type.events[component.event];
      if (!component_event) { // referred event does not exist
        report.error_resolve = "Use one of these " + Object.keys(component_type.events)
        report.error_detail = "Component '" + component.id + "' does not have event '" + component.event + "'";
        report.data = {
          "type": "missing",
          "name": component.event,
          "was": component.event,
          "use": Object.keys(component_type.events)
        }
        throw report;
      }

      if (trigger_type && trigger_type.triggers && component_event) {
        const triggers_event = trigger_type.triggers[trigger.action];

        if (!triggers_event) {
          report.error_resolve = "Use one of these " + Object.keys(trigger_type.triggers)
          report.error_detail = "Component '" + trigger.id + "' does not have action '" + trigger.action + "'";
          report.data = {
            "type": "missing",
            "name": trigger.action,
            "was": trigger.action,
            "use": Object.keys(trigger_type.triggers)
          }
          throw report;
        }

        // check if we need to genrate test data
        if (!data_input) {
          data_input = this.getSchemaDefaults(component_event.schema)
        }

        // validate the data going in
        const component_data_validated = this.validateData(component_event.schema, data_input);
        if (component_data_validated.valid === false) {
          report.error_resolve = "Must conform to schema " + JSON.stringify(component_event.schema["$id"])
          report.error_detail = "Component '" + component.id + "' event '" + component.event + "' was provided with bad input data " + JSON.stringify(data_input) + "";
          report.data = {
            "type": "data",
            "name": component.event,
            "was": data_input,
            "use": component_event.schema
          }
          throw report;
        }

        // prepare transform
        let event_transform = event.transform;

        // create the function if string
        if (typeof (event.transform) === 'string') {
          event_transform = getTransformFunction(event);
        }

        // execute transform with validated data
        try {
          const transformed_data = event_transform(data_input);

          // make sure that the transform returns valid data
          const trigger_data_validated = this.validateData(triggers_event.schema, transformed_data);
          if (trigger_data_validated.valid === false) {
            report.error_resolve = "Must conform to schema " + JSON.stringify(triggers_event.schema["$id"])
            report.error_detail = "Component '" + trigger.id + "' action '" + trigger.action + "' was provided with bad input data " + JSON.stringify(transformed_data) + "";
            report.data = {
              "type": "data",
              "name": trigger.action,
              "was": transformed_data,
              "use": triggers_event.schema
            }
            return report;
          }

          // check if we are whitebox testing (expecting specific results)
          if (data_output !== undefined) {
            if (compareDeep(data_output, transformed_data) === false) {
              report.error_resolve = "Fix transform code or re-evaluate expected result";
              report.error_detail = "Whitebox '" + component.id + "' testing got unexpected result with regard to input";
              report.data = {
                "type": "test",
                "name": trigger.action,
                "was": transformed_data,
                "use": data_output
              }
              return report;
            }
          }

        } catch (e) {
          report.error_resolve = "Fix transform code";
          report.error_detail = "Component '" + component.id + "' transform '" + trigger.action + "' failed executing. Error given: " + e + "";
          report.data = {
            "type": "code",
            "name": trigger.action,
            "was": event.transform,
            "use": e + ""
          }
          throw report;
        }
      }
    }
    return report;
  }

  validateEventActions(events) {
    // TODO: avoid duplicates by storing in key
    // executes validateEventAction against data array
    const reports = [];

    events.forEach(itm => {
      const report = this.validateEventAction(itm);
      // add if there is something to report
      if (Object.keys(report).length) {
        // store the report result in a dictionary avoiding duplicate reports
        reports.push(report);
      }
    });
    return reports;
  }

}
