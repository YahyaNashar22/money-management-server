import fs from "fs";

function removePicture(picture) {
  console.log(picture);
  fs.unlinkSync(picture, (err) => {
    if (err) {
      return console.log(`unable to delete picture`, err.message);
    }
    return console.log("picture deleted");
  });
}

export default removePicture;
