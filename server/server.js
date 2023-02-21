import express from "express";
import fs from "fs";
import path from "path";
import React from "react";
import ReactDOMServer from "react-dom/server";
import { StaticRouter } from "react-router-dom/server";
import App from "../src/AppTest";

const app = express();


// serve static assets
app.get( /\.(js|css|map|ico|json|png|jpg|svg)$/, express.static( path.resolve( __dirname, '../build' ) ) );

app.get("*", (req, res) => {
  fs.readFile(path.resolve("./build/index.html"), "utf-8", (err, data) => {
    if (err) {
      console.err(err);
      return res.status(500).send("Some error happened");
    }

    const html = ReactDOMServer.renderToString(
      <StaticRouter location={req.url}>
        <App />
      </StaticRouter>
    );
    // set header and status
    res.contentType( 'text/html' );
    res.status( 200 );
    
    return res.send(
      data.replace('<div id="root"></div>', `<div id="root">${html}</div>`)
    );
  });
});

app.listen(3005, () => {
  console.log("App is launched");
});
