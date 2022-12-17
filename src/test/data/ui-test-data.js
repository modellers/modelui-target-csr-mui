
export const build_data_test1_data_source = {
    "7e62ca60eea7": {
        "schema": {
            "properties": {
                "title": {
                    "description": "Optional header identifier",
                    "type": "string",
                    "title": "Title"
                },
                "id": {
                    "title": "Identifier",
                    "type": "string",
                    "description": "Required identifier"
                }
            },
            "$id": "https://example.com/schema.json",
            "required": [
                "id"
            ],
            "title": "Entitled List",
            "$schema": "https://json-schema.org/draft/2020-12/schema",
            "type": "object"
        },
        "id": "7e62ca60eea7",
        "items": [
            {
                "id": "the_title_id",
                "title": "The Title 1"
            }
        ]
    },
    "fffsfsfssfsfsf": {
        "schema": {
            "title": "Something else",
            "properties": {
                "col1": {
                    "type": "integer",
                    "title": "Column 1 val"
                },
                "id": {
                    "title": "Identifiers",
                    "type": "string"
                }
            },
            "$id": "https://example.com/ffsfsfssffsfs.schema.json",
            "type": "object"
        },
        "items": [
            {
                "id": "adsf",
                "title": "ssss",
                "col1": ""
            },
            {
                "id": "some_2",
                "col1": 32
            },
            {
                "id": "some_1",
                "col1": 33
            },
            {
                "col1": "666",
                "id": "some_3"
            },
            {
                "id": "some_77",
                "col1": "erer"
            },
            {
                "id": "some_66"
            }
        ],
        "id": "fffsfsfssfsfsf"
    },
    "ee4b54935f88": {
        "id": "ee4b54935f88",
        "items": [
            {
                "name": "Akil",
                "id": "akil",
                "age": "46"
            },
            {
                "name": "Amíra",
                "id": "amira",
                "age": "9"
            }
        ],
        "schema": {
            "required": [
                "id"
            ],
            "properties": {
                "name": {
                    "title": "Name",
                    "description": "Name of persion",
                    "type": "string"
                },
                "age": {
                    "type": "number",
                    "title": "Age",
                    "description": "Age of persion"
                },
                "id": {
                    "type": "string",
                    "title": "Identifier",
                    "description": "Required identifier"
                }
            },
            "type": "object",
            "$schema": "https://json-schema.org/draft/2020-12/schema",
            "$id": "https://example.com/schema.json",
            "title": "Person List"
        }
    }
}
export const build_data_test1_layout_tree = [
    {
        "id": "c8e22aeddb01a0150f5ccd44369a913b01ce8735",
        "schema": {},
        "type": "tabs",
        "config": {
            "options": {
                "tabVariant": "standard",
                "contentMargin": 1,
                "indicatorColor": "secondary",
                "textColor": "inherit"
            }
        },
        "data": [
            {
                "id": "3c225c434ded021940ce2e5226f8021506b981e0",
                "title": "Calendar",
                "icon": "",
                "disabled": false,
                "content": {
                    "id": "16c7dc9cf1b8239084221605776f2633ce6dec64",
                    "schema": {},
                    "type": "calendar-big",
                    "config": {
                        "options": {
                            "selectable": true,
                            "config": "month",
                            "views": "work_week"
                        }
                    },
                    "data": []
                }
            },
            {
                "id": "67477e9ddd0b92b3736c81abaf3aef1b82e1877f",
                "title": "Button",
                "disabled": false,
                "icon": "",
                "content": {
                    "id": "53f3305e201830f18e7fb081913b77aa990f39af",
                    "schema": {},
                    "type": "buttons",
                    "config": {
                        "options": {
                            "color": "primary",
                            "buttonVariant": "contained",
                            "size": "medium"
                        }
                    },
                    "data": [
                        {
                            "id": "d1673ca0a37318591b4f2fb738c8e6914e61857a",
                            "icon": "font-awesome:fa fa-heart-o",
                            "disabled": false,
                            "title": "Button"
                        }
                    ]
                }
            },
            {
                "id": "b5d2d7da11fb4c6f462c0523265e288c14699851",
                "title": "Table",
                "disabled": false,
                "icon": "",
                "content": {
                    "id": "287c980e0d91f2c6966099435c3195efdf28a875",
                    "schema": {},
                    "type": "table",
                    "config": {
                        "options": {
                            "size": "medium",
                            "_$data": "fffsfsfssfsfsf",
                            "select": false
                        }
                    },
                    "data": []
                }
            }
        ]
    }
]
