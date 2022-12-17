
export const got_characters_data = [
    { id: "1", lastName: 'Snow', firstName: 'Jon', age: 35, house: 'Stark' },
    { id: "2", lastName: 'Lannister', firstName: 'Cersei', age: 42, house: 'Lannister' },
    { id: "3", lastName: 'Lannister', firstName: 'Jaime', age: 45, house: 'Lannister' },
    { id: "4", lastName: 'Stark', firstName: 'Arya', age: 16, house: 'Stark' },
    { id: "5", lastName: 'Targaryen', firstName: 'Daenerys', age: null, house: 'Targaryen' },
    { id: "6", lastName: 'Melisandre', firstName: null, age: 150, house: '-' },
    { id: "7", lastName: 'Clifford', firstName: 'Ferrara', age: 44, house: '-' },
    { id: "8", lastName: 'Frances', firstName: 'Rossini', age: 36, house: '-' },
    { id: "9", lastName: 'Roxie', firstName: 'Harvey', age: 65, house: '-' },
]

const getRandomValueRange = (minValue, maxValue) => {
    return minValue + parseInt(Math.random() * maxValue);
}

export const gotCharactersDataMore = (_id) => {
    if (!_id) { _id = getRandomValueRange(100, 100); }
    return { id: _id, lastName: 'Bolton', firstName: 'Ramsay', age: 32 };
}


export const got_characters_schema = {
    "$id": "https://example.com/address.schema.json",
    "$schema": "http://json-schema.org/draft-07/schema#",
    "description": "An address similar to http://microformats.org/wiki/h-card",
    "type": "object",
    "properties": {
        "id": {
            "type": "string",
            "decription": "Identifier not visible",
            "default": undefined,
            "deprecated": false,
            //  https://json-schema.org/draft/2020-12/json-schema-validation.html#rfc.section.9.4
            "readOnly": true, // may edit
            "writeOnly": true, // value is showable and exists
            "title": "ID", // not by spec,
        },
        "firstName": {
            "type": "string",
            "decription": "The first name of the character in the series Game of Thrones",
            "default": undefined,
            "deprecated": false,
            "readOnly": false,
            "writeOnly": false,
            "title": "First Name",
            "width": 500, // not by spec,
        },
        "lastName": {
            "type": "string",
            "decription": "The last name of the character in the series Game of Thrones",
            "default": undefined,
            "deprecated": false,
            "readOnly": false,
            "writeOnly": false,
            "title": "Last Name",
        },
        "age": {
            "type": "number",
            "decription": "The age of the character in the series Game of Thrones",
            "default": '',
            "deprecated": false,
            "readOnly": false,
            "writeOnly": false,
            "title": "Age",
            "minimum": 0,
            "maximum": 99999999
        },
        "house": {
            "type": "string",
            "decription": "The charater initial house in Game of Thrones",
            "default": '-',
            "deprecated": false,
            "readOnly": false,
            "writeOnly": false,
            "title": "House",
            "enum": [
                "-",
                "Reyne",
                "Frey",
                "Bolton",
                "Tyrell",
                "Tarly",
                "Clegane",
                "Seaworth",
                "Tully",
                "Martell",
                "Reed",
                "Baratheon",
                "Mormont",
                "Karstark",
                "Umber",
                "Royce",
                "Greyjoy",
                "Arryn",
                "Lannister",
                "Stark",
                "Targaryen"
            ]
        }
    },
    "required": ["id", "firstName", "lastName"],
}
