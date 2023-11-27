import Image from "next/image";

const BackgroundImage = ({ content, height, width }) => {
  return (
    <div>
      <div
        style={{
          position: "absolute",
          height: height,
          width: width,
          clipPath: "inset(0 0 0 0)",
          zIndex: "1",
          color: "red",
        }}
      >
        <div
          style={{
            position: "fixed",
            height: "100%",
            width: width,
            left: "0",
            top: "0",
          }}
        >
          {content}
        </div>
      </div>

      <div
        style={{
          position: "relative",
          height: height,
          width: width,
          clipPath: "inset(0 0 0 0)",
        }}
      >
        <div
          style={{
            position: "fixed",
            height: "100%",
            width: width,
            left: "0",
            top: "0",
          }}
        ></div>
      </div>
    </div>
  );
};

export default BackgroundImage;
