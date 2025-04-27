export const handleImageUpload = (uploadedImage) => {
  return new Promise((resolve, reject) => {
    const file = uploadedImage[0];
    if (!file) {
      return resolve(null);
    }

    // Validate type
    if (!file.type.startsWith("image/")) {
      alert("Please upload a valid image file (jpg, png, etc).");
      return resolve(null);
    }

    // Validate size (less than 3MB)
    if (file.size > 1 * 1024 * 1024) {  // 3MB = 3 * 1024 * 1024
      alert("Image must be less than 1MB in size.");
      return resolve(null);
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      const img = new Image();
      img.src = reader.result;

      img.onload = () => {
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");

        const maxWidth = 800;
        const maxHeight = 800;
        let width = img.width;
        let height = img.height;

        // Maintain aspect ratio
        if (width > height) {
          if (width > maxWidth) {
            height *= maxWidth / width;
            width = maxWidth;
          }
        } else {
          if (height > maxHeight) {
            width *= maxHeight / height;
            height = maxHeight;
          }
        }

        canvas.width = width;
        canvas.height = height;
        ctx.drawImage(img, 0, 0, width, height);

        const resizedImage = canvas.toDataURL(file.type);
        resolve(resizedImage);  // ✅ Return the resized image
      };

      img.onerror = (error) => {
        reject(error);
      };
    };

    reader.onerror = (error) => {
      reject(error);
    };

    reader.readAsDataURL(file);
  });
};
