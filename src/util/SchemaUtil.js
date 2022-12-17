import jsf from 'json-schema-faker';
import MD5 from 'object-hash';

export const generateIdentifier = () => {
    return (MD5(new Date().toISOString()) + "").substring(0, 12)
}

export const getSchemaGeneratedData = (schema) => {
    return jsf.generate(schema);
}