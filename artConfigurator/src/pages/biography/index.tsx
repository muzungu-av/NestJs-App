import photo from "./../../assets/Frame9.png";
import addPhoto from "./../../assets/Add_photo.png";
import deletePhoto from "./../../assets/Delete.png";
// import { CKEditor } from "@ckeditor/ckeditor5-react";
// import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
// import { loremIpsum } from "lorem-ipsum";
export const Biography = () => {
  // const handleEditorChange = (event: any, editor: any) => {
  //   const data = editor.getData();
  //   console.log({ event, editor, data });
  // };
  return (
    <>
      <div className="font-italiana text-5xl mx-[5%] my-[2%]">
        Bearbeiten der Biografie Seite
      </div>
      <div className="flex justify-around m-[5%]">
        <div className="flex flex-col justify-start items-center w-[40%]">
          <div className="font-federo text-3xl mb-4">Foto</div>
          <img className="mb-2" src={photo} />
          <button className="w-[100%] flex justify-center m-2 ">
            <img src={addPhoto} /> Foto ändern
          </button>{" "}
          <button className="w-[100%] flex justify-center m-2">
            <img src={deletePhoto} /> Foto löschen
          </button>
        </div>{" "}
        <div className="w-[60%]">
          <div className="font-federo text-3xl mb-4">Beschreibung</div>
          <div>
            {/* <CKEditor
              editor={ClassicEditor}
              data={loremIpsum({
                count: 33,
                format: "plain",
                units: "sentences",
              })}
              config={{
                toolbar: [],
              }}
              onChange={(event, editor) => {
                handleEditorChange(event, editor);
              }}
            /> */}
          </div>
          <div className="flex justify-end my-4">
            <button className="btn-primary">abbrechen</button>{" "}
            <button className="btn-primary ml-2">speichern</button>
          </div>
        </div>
      </div>
    </>
  );
};
