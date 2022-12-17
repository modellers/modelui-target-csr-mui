// Firebase Config
export const config_firebase = {
  apiKey: "AIzaSyD8-rJsE7A-kT16ToUQgh5FkRQRNb2JjGw",
  authDomain: "ui-modeller.firebaseapp.com",
  projectId: "ui-modeller",
  storageBucket: "ui-modeller.appspot.com",
  messagingSenderId: "872669588937",
  appId: "1:872669588937:web:6d48da6a246babc5154c18"
};

/* input model

case_model
 - name
 - description
 - model
 - cmmn
 - version
 - actors

target
- project
- layouts (views)
- device / platform
- version
- label

instance
- target

project
 - id
 - icon
 - case_models
 - targets

member
 - projects [{project_id, access_level}]
 - team_id

team
 - name
 - id

company
  - members


  
*/