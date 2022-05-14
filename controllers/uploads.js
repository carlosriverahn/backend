const path = require('path');
const fs = require('fs');
const { response } = require("express");
const { v4: uuidv4 } = require("uuid");
const { updateImage } = require("../helpers/updateImage");

const uploadFile = (req, res = response) => {
  const type = req.params.type;
  const id = req.params.id;

  const validTypes = ["hospitals", "doctors", "users"];

  if (!validTypes.includes(type)) {
    res.status(400).json({
      ok: false,
      msj: "Its not a valid file",
    });
  }

  if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(400).json({
      ok: false,
      msj: "No files were uploaded.",
    });
  }

  const file = req.files.imagen;
  console.log(file);

  const cutName = file.name.split('.');
  const extension = cutName[cutName.length - 1];

  const validExtensions = ["png", "jpg", "jpeg", "gif"];
  if ( !validExtensions.includes(extension) ) {
    return res.status(400).json({
      ok: false,
      msj: "wrong extension file.",
    });
  }

  const nameFile = `${uuidv4()}.${extension}`;

  const path = `./uploads/${type}/${nameFile}`;

  //move the file to directory uploads
  file.mv( path, (err) => {
    if (err) return res.status(500).json({
        ok: false,
        msj: "error moving the file.",
    });
  })

  updateImage( type, id, nameFile );

  res.status(200).json({
    ok: true,
    msj: "file uploaded",
    nameFile
  });

}

const getImagen = ( req, res = response ) => {
  
  const type = req.params.type;
  const foto = req.params.foto;

  const pathImg = path.join( __dirname, `../uploads/${type}/${ foto }`)
  
  if ( fs.existsSync( pathImg )) {
    res.sendFile( pathImg );
  } else {
    const pathImg = path.join( __dirname, `../uploads/no-img.jpg`)
    res.sendFile( pathImg );
  }

}

module.exports = {
  uploadFile,
  getImagen
};
