import ImageCanvas from "../components/ImageCanvas";
import pic from "../assets/images/pic.png"; // Adjust the path based on your project structure

const divStyle = {
  color: "#CF4643",
};

export const PrivatePage = () => (
  <>
    <h3 style={divStyle}>Page Private</h3>
    <div style={divStyle}>Welcome to Page Private!</div>
    <ImageCanvas pic={pic} />
  </>
);
