import { useEffect, useState, useRef } from "react";
import styles from "./CloudinaryButton.module.css";

const CloudinaryButton = ({ handleImageUrlCloudinary, loading, imageprev }) => {
  const cloudinaryRef = useRef();
  const widgetRef = useRef();
  const [preview, setPreview] = useState(null);

  useEffect(() => {
    preview && handleImageUrlCloudinary(preview);
  }, [preview]);

  useEffect(() => {
    cloudinaryRef.current = window.cloudinary;
    widgetRef.current = cloudinaryRef.current.createUploadWidget(
      {
        cloudName: import.meta.env.VITE_CLOUDINARY_NAME,
        uploadPreset: import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET,
        resourceType: "image", //restrict uploading to image files only
        multiple: false, // allow only single file selection
        maxFiles: 1, // allow only one file to be selected
        cropping: true, // enable image cropping
        croppingShowDimensions: true,
        croppingAspectRatio: 1, // aspect ratio for cropped image
        showSkipCropButton: true, // hide the "Skip" button during cropping
        croppingShowBackButton: true, // show "Back" button during cropping
        sources: ["local", "camera", "url"],
        // singleUploadAutoClose: false, //esto es para que aparezca el done despues del crop y tbm para que aparezca sino se hace el crop.
      },
      function (error, result) {
        if (!error && result?.event === "success") {
          console.log(result.info.secure_url);
          setPreview(result.info.secure_url);
        }
      }
    );
  }, []);

  return (
    <div className={styles.cloud}>
      <button
        disabled={loading}
        className="fadein"
        onClick={() => widgetRef.current.open()}
      >
        Upload
      </button>
      {imageprev && (
        <img
          style={{ width: "50px", height: "50px" }}
          src={imageprev}
          alt="image_upload"
        />
      )}
    </div>
  );
};

export default CloudinaryButton;
