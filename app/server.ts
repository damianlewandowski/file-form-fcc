// lib/app.ts
import express = require("express");
import formidable = require("formidable");

// Create a new express application instance
const app: express.Application = express();

app.use(express.static("public"));

app.get("/", function(req, res) {
  res.sendFile("index.html");
});

app.post("/add-file", (req: express.Request, res: express.Response) => {
  console.log("hello");
  new formidable.IncomingForm().parse(
    req,
    (err: Error, fields: formidable.Fields, files: formidable.Files) => {
      if (err) {
        console.error("Error", err);
        res.json({
          error: err
        });
        return;
      }
      console.log(files);
      res.json({
        fileName: files.upfile.name,
        type: files.upfile.type,
        size: files.upfile.size
      });
    }
  );
});

app.listen(3000, function() {
  console.log("Example app listening on port 3000!");
});
