import { EventAnalyzer } from './EventAnalyzer';
import { StateManager } from './StateManager';
import ComponentManager from '../components/Layout/Manager';
import { registerList } from '../components/List/List';
import { registerEventApp } from '../event/CommonEvents';

const simple_schema = {
  "$id": "simple_schema",
  type: "object",
  properties: {
    foo: { type: "integer" },
    bar: { type: "string" }
  },
  required: ["foo"],
  additionalProperties: false,
}

const simple_data_ok = {
  foo: 1,
  bar: "abc"
}

const simple_data_bad = {
  foo: "1",
  bar: 999
}


const schema_only_id = {
  // "$schema": "http://json-schema.org/draft-06/schema#",
  "$id": "v1/listbase/..",
  "type": "array",
  "items": {
    "$ref": "#/definitions/identifier"
  },
  "definitions": {
    "identifier": {
      "type": "object",
      "additionalProperties": true,
      "properties": {
        "id": {
          "type": "string"
        }
      },
      "required": ["id"],
      "title": "Identifier with additional properties"
    }
  }
}

const array_of_ids = [
  { "id": "myfirst_id_item" },
  { "id": "mysecond_id_item" }
]

/// event tests

const event_simple_event = {
  output: [array_of_ids],
  input: [array_of_ids],
  'component': { 'id': 'component_id', 'event': 'selected' },
  'trigger': { 'id': 'trigger_id', 'action': 'delete' },
  'transform': function (data) { return data; }
}
const event_allowing_none_state = {
  output: [],
  input: [],
  'component': { 'id': 'app', 'event': 'ready' },
  'trigger': { 'id': 'trigger_id', 'action': 'delete' },
  'transform': function (data) { return data; }
}
const event_missing_event = {
  output: [array_of_ids],
  input: [array_of_ids],
  'component': { 'id': 'component_id', 'event': 'missing_event' },
  'trigger': { 'id': 'trigger_id', 'action': 'delete' },
  'transform': function (data) { return data; }
}
const event_missing_action = {
  output: [array_of_ids],
  input: [array_of_ids],
  'component': { 'id': 'component_id', 'event': 'selected' },
  'trigger': { 'id': 'trigger_id', 'action': 'missing_action' },
  'transform': function (data) { return data; }
}
const event_bad_input_data = {
  output: [array_of_ids],
  input: [
    [{ noid: 1 }, { noid: 2 }]
  ],
  'component': { 'id': 'component_id', 'event': 'selected' },
  'trigger': { 'id': 'trigger_id', 'action': 'delete' },
  'transform': function (data) { return data; }
}
const event_bad_ouput_data = {
  output: [array_of_ids],
  input: [array_of_ids],
  'component': { 'id': 'component_id', 'event': 'selected' },
  'trigger': { 'id': 'trigger_id', 'action': 'delete' },
  'transform': function (data) { return [{ noid: 1 }, { noid: 2 }]; }
}
const event_bad_transfrom = {
  output: [array_of_ids],
  input: [array_of_ids],
  'component': { 'id': 'component_id', 'event': 'selected' },
  'trigger': { 'id': 'trigger_id', 'action': 'delete' },
  'transform': function (data) {
    const a = 2;
    a = 3; // not allowed to reasign const
    return data;
  }
}
const event_skip_whitetesting = {
  output: [undefined], // undefined output skips whitebox testing and only performs blackbox testing
  input: [array_of_ids],
  'component': { 'id': 'component_id', 'event': 'selected' },
  'trigger': { 'id': 'trigger_id', 'action': 'delete' },
  'transform': function (data) { return data; }
}
const event_bad_whitetesting = {
  output: [[{ id: 666 }]], // white box test expected other result
  input: [array_of_ids],
  'component': { 'id': 'component_id', 'event': 'selected' },
  'trigger': { 'id': 'trigger_id', 'action': 'delete' },
  'transform': function (data) { return data; }
}
const event_missing_inputdata = {
  output: [], // no outputs
  input: [], // no inputs
  'component': { 'id': 'component_id', 'event': 'selected' },
  'trigger': { 'id': 'trigger_id', 'action': 'delete' },
  'transform': function (data) { return data; }
}
const event_missing_compnent_section = {
  output: [array_of_ids],
  input: [array_of_ids],
  'trigger': { 'id': 'trigger_id', 'action': 'delete' },
  'transform': function (data) { return data; }
}
const event_missing_compnent_id = {
  output: [array_of_ids],
  input: [array_of_ids],
  'component': { 'id': 'component-missing_id', 'event': 'selected' },
  'trigger': { 'id': 'trigger_id', 'action': 'delete' },
  'transform': function (data) { return data; }
}
const event_missing_compnent_type = {

  output: [array_of_ids],
  input: [array_of_ids],
  'component': { 'id': 'component_id', 'event': 'selected' },
  'trigger': { 'id': 'trigger_id', 'action': 'delete' },
  'transform': function (data) { return data; }
}

const event_missing_trigger_section = {

  output: [array_of_ids],
  input: [array_of_ids],
  'component': { 'id': 'component_id', 'event': 'selected' },
  'transform': function (data) { return data; }
}
const event_missing_trigger_id = {

  output: [array_of_ids],
  input: [array_of_ids],
  'component': { 'id': 'component_id', 'event': 'selected' },
  'trigger': { 'id': 'trigger-missing_id', 'action': 'delete' },
  'transform': function (data) { return data; }
}
const event_missing_trigger_type = {

  output: [array_of_ids],
  input: [array_of_ids],
  'component': { 'id': 'component_id', 'event': 'selected' },
  'trigger': { 'id': 'trigger_id', 'action': 'delete' },
  'transform': function (data) { return data; }
}
const event_missing_transform_section = {
  output: [array_of_ids],
  input: [array_of_ids],
  'component': { 'id': 'component_id', 'event': 'selected' },
  'trigger': { 'id': 'trigger_id', 'action': 'delete' }

}
const event_tests = [
  event_simple_event,
  event_allowing_none_state,
  event_missing_event,
  event_missing_event, // test avoid dupl
  event_missing_event, // test avoid dupl
  event_missing_action,
  event_bad_input_data,
  event_bad_ouput_data,
  event_bad_transfrom,
  event_skip_whitetesting,
  event_bad_whitetesting,
  event_missing_inputdata,
  event_missing_compnent_section,
  event_missing_compnent_id,
  event_missing_compnent_type,
  event_missing_trigger_section,
  event_missing_trigger_id,
  event_missing_trigger_type,
  event_missing_transform_section
]

describe('EventAnalyzer test', () => {

  beforeEach(() => {
    ComponentManager.getInstance().clearAll();
    EventAnalyzer.getInstance().clearAll();
    // register components
    registerList(ComponentManager.getInstance());
    registerEventApp(ComponentManager.getInstance());
    // prepare state manager
    StateManager.getInstance().clearAll();
    StateManager.getInstance().createState({
      id: "component_id",
      type: "list",
      config: {
        options: {}
      },
      data: [],
      schema: {}
    });

    StateManager.getInstance().createState({
      id: "trigger_id",
      type: "list",
      config: {
        options: {}
      },
      data: [],
      schema: {}
    });

  });

  test('registerSchema with callback test', (done) => {
    EventAnalyzer.getInstance().registerSchema(simple_schema, (result) => {
      expect(result.success).toBeTruthy();
      done();
    });
  });

  test('registerSchema without callback test', (done) => {
    EventAnalyzer.getInstance().registerSchema(simple_schema);
    done();
  });

  test('registerSchema with definition test', (done) => {
    EventAnalyzer.getInstance().registerSchema(schema_only_id, (result) => {
      expect(result.success).toBeTruthy();
      done();
    });
  });

  test('getSchema that is cached test', (done) => {
    const compiled_schema = EventAnalyzer.getInstance().getSchema(simple_schema);
    expect(compiled_schema.schema["$id"]).toEqual("simple_schema")
    done();
  });

  test('getSchema that is not cached test', (done) => {
    const notcache_schema = {
      "$id": "notcache_schema",
      type: "object",
      properties: {
        foo: { type: "integer" },
        bar: { type: "string" }
      },
      required: ["foo"],
      additionalProperties: false,
    }
    const compiled_schema = EventAnalyzer.getInstance().getSchema(notcache_schema);
    expect(compiled_schema.schema["$id"]).toEqual("notcache_schema")
    done();

  });

  test('getSchema that is not cached (x2) test', (done) => {
    const notcache_schema = {
      "$id": "notcache_schemax2",
      type: "object",
      properties: {
        foo: { type: "integer" },
        bar: { type: "string" }
      },
      required: ["foo"],
      additionalProperties: false,
    }
    EventAnalyzer.getInstance().getSchema(notcache_schema);
    const compiled_schema = EventAnalyzer.getInstance().getSchema(notcache_schema);
    expect(compiled_schema.schema["$id"]).toEqual("notcache_schemax2")
    done();

  });
  /*
    test('validateEventAction missing allowing none state component test', (done) => {
      const report = EventAnalyzer.getInstance().validateEventAction(event_allowing_none_state);
      expect(report.error_detail).toEqual(undefined)
      expect(report.error_resolve).toEqual(undefined)
      done();
    });
  */
  test('validateData valid data test', (done) => {
    EventAnalyzer.getInstance().registerSchema(simple_schema, (register_result) => {
      const result = EventAnalyzer.getInstance().validateData(simple_schema, simple_data_ok);
      expect(result.valid).toBeTruthy();
      expect(result.error).toEqual(null)
      done();
    });
  });

  test('validateData bad data test', (done) => {
    EventAnalyzer.getInstance().registerSchema(simple_schema, (register_result) => {
      const result = EventAnalyzer.getInstance().validateData(simple_schema, simple_data_bad);
      expect(result.valid).toBeFalsy();
      expect(result.error.length).toEqual(1)
      done();
    });
  });

  test('getSchemaDefaults empty schema test', () => {
    const empty_result = EventAnalyzer.getInstance().getSchemaDefaults({});
    expect(empty_result).toEqual({})
  });

  test('validateEventAction simple event test', (done) => {
    const report = EventAnalyzer.getInstance().validateEventAction(event_simple_event);
    expect(report.error_detail).toEqual(undefined)
    expect(report.error_resolve).toEqual(undefined)
    done();
  });

  test('validateEventAction missing transform section test', (done) => {
    const report = EventAnalyzer.getInstance().validateEventAction(event_missing_transform_section);
    expect(report.error_detail).toEqual("Transform section is required")
    expect(report.error_resolve).toEqual("Add transform section to event")
    done();
  });

  test('validateEventAction missing event test', (done) => {
    const report = EventAnalyzer.getInstance().validateEventAction(event_missing_event);
    expect(report.error_detail).toEqual("Component 'component_id' does not have event 'missing_event'")
    expect(report.error_resolve).toEqual("Use one of these changed,replacing,replaced,submitted,deleted,pushing,pushed,selected,deselected,clearing,cleared")
    done();
  });

  test('validateEventAction missing action test', (done) => {
    const report = EventAnalyzer.getInstance().validateEventAction(event_missing_action);
    expect(report.error_detail).toEqual("Component 'trigger_id' does not have action 'missing_action'")
    expect(report.error_resolve).toEqual("Use one of these submit,replace,push,push_front,delete,pop,pop_front,select,clear")
    done();
  });

  test('validateEventAction bad input data test', (done) => {
    const report = EventAnalyzer.getInstance().validateEventAction(event_bad_input_data);
    expect(report.error_detail).toEqual("Component 'component_id' event 'selected' was provided with bad input data [{\"noid\":1},{\"noid\":2}]")
    expect(report.error_resolve).toEqual("Must conform to schema \"v1/listbase/selected\"")
    done();
  });

  test('validateEventAction bad output data test', (done) => {
    const report = EventAnalyzer.getInstance().validateEventAction(event_bad_ouput_data);
    expect(report.error_detail).toEqual("Component 'trigger_id' action 'delete' was provided with bad input data [{\"noid\":1},{\"noid\":2}]")
    expect(report.error_resolve).toEqual("Must conform to schema \"v1/listbase/delete\"")
    done();
  });

  test('validateEventAction bad transform test', (done) => {
    const report = EventAnalyzer.getInstance().validateEventAction(event_bad_transfrom);
    expect(report.error_detail).toEqual("Component 'component_id' transform 'delete' failed executing. Error given: TypeError: \"a\" is read-only")
    expect(report.error_resolve).toEqual("Fix transform code")
    done();
  });

  test('validateEventAction skip whitebox test', (done) => {
    const report = EventAnalyzer.getInstance().validateEventAction(event_skip_whitetesting);
    expect(report.error_detail).toEqual(undefined)
    expect(report.error_resolve).toEqual(undefined)
    done();
  });

  test('validateEventAction bad whitebox test', (done) => {
    const report = EventAnalyzer.getInstance().validateEventAction(event_bad_whitetesting);
    expect(report.error_detail).toEqual("Whitebox 'component_id' testing got unexpected result with regard to input")
    expect(report.error_resolve).toEqual("Fix transform code or re-evaluate expected result")
    done();
  });

  test('validateEventAction missing input data creates default input values test', (done) => {
    const report = EventAnalyzer.getInstance().validateEventAction(event_missing_inputdata);
    expect(report.error_detail).toEqual(undefined)
    expect(report.error_resolve).toEqual(undefined)
    done();
  });

  test('validateEventActions test', (done) => {
    const reports = EventAnalyzer.getInstance().validateEventActions(event_tests);
    expect(reports.length).toEqual(14)
    // expect(reports[reports.length - 1]).toEqual({})
    done();
  });

  // Tests for missing component section
  test('validateEventAction missing component section test', (done) => {
    const report = EventAnalyzer.getInstance().validateEventAction(event_missing_compnent_section);
    expect(report.error_detail).toEqual("Component section is required")
    expect(report.error_resolve).toEqual("Add component section to event")
    done();
  });

  // Tests for missing trigger section
  test('validateEventAction missing trigger section test', (done) => {
    const report = EventAnalyzer.getInstance().validateEventAction(event_missing_trigger_section);
    expect(report.error_detail).toEqual("Trigger section is required")
    expect(report.error_resolve).toEqual("Add trigger section to event")
    done();
  });

  //  Tests for missing component id
  test('validateEventAction missing component id test', (done) => {
    const report = EventAnalyzer.getInstance().validateEventAction(event_missing_compnent_id);
    expect(report.error_detail).toEqual("Component 'component-missing_id' was not registered with state manager")
    expect(report.error_resolve).toEqual("Make sure state manager registers 'component-missing_id'")
    done();
  });

  // Tests for missing trigger id
  test('validateEventAction missing trigger id test', (done) => {
    const report = EventAnalyzer.getInstance().validateEventAction(event_missing_trigger_id);
    expect(report.error_detail).toEqual("Trigger 'trigger-missing_id' was not registered with state manager")
    expect(report.error_resolve).toEqual("Make sure state manager registers 'trigger-missing_id'")
    done();
  });

  // Tests for missing component type
  test('validateEventAction missing component type test', (done) => {
    const comp = StateManager.getInstance().getManager('component_id');
    comp.props.type = comp.type = 'no_such_type'; // remove the registration
    const x = StateManager.getInstance().getManager('component_id');
    const report = EventAnalyzer.getInstance().validateEventAction(event_missing_compnent_type);
    expect(report.error_detail).toEqual("Component type 'no_such_type' is not supported")
    expect(report.error_resolve).toEqual("Use one of these: list")
    done();
  });

  /* DISABLED SINCE WE NEED TO REGISTER A NEW TYPE FOR TEST (other than list which effects the last test)
  // Tests for missing trigger type
  test('validateEventAction missing trigger type test', (done) => {
    const comp = StateManager.getInstance().getManager('trigger_id');
    comp.props.type = comp.type = 'no_such_type'; // remove the registration
    const x = StateManager.getInstance().getManager('trigger_id');
    const report = EventAnalyzer.getInstance().validateEventAction(event_missing_trigger_type);
    expect(report.error_detail).toEqual("Trigger type 'no_such_type' is not supported")
    expect(report.error_resolve).toEqual("Use one of these: list")
    done();
  });
  */


});
