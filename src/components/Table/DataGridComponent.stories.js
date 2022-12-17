import React from 'react';

// test utils
import { prepStoryComponent, createStoryArgumentTypesFromSchema } from '../../test/utils/StoryUtil'

// components
import { DataGrid } from './Table';
import { triggers, events, config } from './DataGridComponent'

// test data
import { got_characters_data, got_characters_schema, gotCharactersDataMore } from '../../test/data/TestGOT'

/// Event addon

export default {
  title: 'Components/DataGrid',
  component: DataGrid,
  argTypes: createStoryArgumentTypesFromSchema(config.options)
};

const schema_id_title_test = {
  "$id": "https://example.com/address.schema.json",
  "$schema": "http://json-schema.org/draft-07/schema#",
  "description": "An address similar to http://microformats.org/wiki/h-card",
  "type": "object",
  "properties": {
    "id": {
      "type": "string" //shows that we show property name as default name if title is missing
    },
    "title": {
      "type": "string",
      "title": "TITLE"
    }
  },
  "required": ["id", "title"],
}

export const DataGridBasic = (args) => {

  const props = {
    id: 'DataGridBasic_id',
    type: 'table',
    data: {
      items: [{
        'id': 'jondoe',
        'title': 'title 1',
      }, {
        'id': 'id2',
        'title': 'title 2',
      }, {
        'id': 'select_value',
        'title': 'select_value',
      }, {
        'id': 'delete_value',
        'title': 'delete_value',
      }]
    },
    config: { options: args },
    schema: schema_id_title_test
  }

  return (
    <div>
      {prepStoryComponent(props, triggers, events, {
        triggers: {
          replace: {
            items: [{
              'id': 'id2',
              'title': 'title 2',
            }, {
              'id': 'select_value',
              'title': 'select_value',
            }, {
              'id': 'delete_value',
              'title': 'delete_value',
            }]
          },
        }
      })}
      <DataGrid {...props} />
    </div>
  );
};
DataGridBasic.args = {
  label: 'Your table',
  size: 'medium' // 'small', 'medium'
}

export const DataGridColumns = (args) => {
  const props = {
    id: 'DataGridColumns_id',
    type: 'table',
    data: { items: got_characters_data },
    config: { options: args },
    schema: got_characters_schema
  }

  return (
    <div>
      {prepStoryComponent(props, triggers, events, {
        triggers: {
          push: gotCharactersDataMore(),
          push_front: gotCharactersDataMore(),
          delete: { id: 1 },  // delete John Snow
          select: { id: 2 }, // select Jamie
          replace: { items: [gotCharactersDataMore(2)] }, // replace all with Ramsey with Jamie
        }
      }
      )}
      <DataGrid {...props} />
    </div>
  );
};
DataGridColumns.args = {
  label: 'Your table',
  size: 'medium' // 'small', 'medium'
}


export const DataGridSchema = (args) => {
  const props = {
    id: 'DataGridSchema_id',
    type: 'table',
    data: { items: got_characters_data },
    config: { options: args },
    schema: got_characters_schema
  }

  return (
    <div>
      {prepStoryComponent(props, triggers, events, {
        triggers: {
          push: gotCharactersDataMore(),
          push_front: gotCharactersDataMore(),
          delete: { id: 1 },  // delete John Snow
          select: { id: 2 }, // select Jamie
          replace: {
            schema: schema_id_title_test,
            items: [{
              'id': 'id2',
              'title': 'title 2',
            }, {
              'id': 'select_value',
              'title': 'select_value',
            }, {
              'id': 'delete_value',
              'title': 'delete_value',
            }]
          },
        }
      }
      )}
      <DataGrid {...props} />
    </div>
  );
};
DataGridSchema.args = {
  label: 'Your table',
  size: 'medium' // 'small', 'medium'
}
