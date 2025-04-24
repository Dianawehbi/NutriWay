// src/utils/imageUtils.js

export const validateImage = (file) => {
    if (!file) return null;
  
    if (!file.type.startsWith("image/")) {
      alert("Only image files are allowed.");
      return null;
    }
  
    if (file.size > 1024 * 1024) {  // 1MB limit
      alert("Image must be smaller than 1MB.");
      return null;
    }
  
    const reader = new FileReader();
    return new Promise((resolve, reject) => {
      reader.onloadend = () => resolve(reader.result);
      reader.onerror = (err) => reject(err);
      reader.readAsDataURL(file);
    });
  };