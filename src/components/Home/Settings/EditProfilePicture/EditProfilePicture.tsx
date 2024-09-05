import React, { useState } from 'react';
import { updateUser } from '../../../../services/user';

const EditProfilePicture = (props:any) => {
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [previewImage, setPreviewImage] = useState<string | undefined>(props.user.profilePicture);
  const fileInputRef = React.createRef<HTMLInputElement>();
  const [base64Image, setBase64Image] = useState<string | null>(null);

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      const file = files[0];
      setSelectedImage(file);

      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        setPreviewImage(base64String);
        setBase64Image(base64String);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSaveImage = async () => {
    if (selectedImage && base64Image) {
        const data = await updateUser(props.user._id, base64Image, "", 60 )
        if(data) {
            props.setUser(data);
            setSelectedImage(null)
        }
    }
  };  
  
  const handleButtonClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  return (
    <>
      <span className='title-section-settings' style={{ marginBottom: "-15px" }}>Foto de perfil</span>
      <div className='edit-picture'>
        <img className='img-marco' src={previewImage} alt="Profile Preview" />
        <div className='container-edit-picture'>

          <input 
            type="file" 
            accept="image/jpeg, image/png, image/gif" 
            style={{ display: 'none' }} 
            id="file-input" 
            ref={fileInputRef}
            onChange={handleImageChange} 
          />

          <div className='container-buttons-edit-picture'>
            <button  onClick={handleButtonClick} className='link-main jaro-regular btn-edit-click'>
                Editar foto de perfil
            </button>

            {selectedImage && (
              <div className='cnt-buttons-flex-1'>
                <button style={{ backgroundColor: "#31ae31" }} className='link-main jaro-regular btn-flex-1' onClick={handleSaveImage}>Aplicar</button>
                <button style={{ backgroundColor: "#ff4d4d" }} className='link-main jaro-regular btn-flex-1' onClick={()=>{setSelectedImage(null), setPreviewImage(props.user.profilePicture)}}>Cancelar</button>
              </div>
            )}
          </div>

          <span>Debe ser JPEG, PNG o GIF y no puede exceder los 10 MB</span>

        </div>
      </div>
      
    </>
  );
};

export default EditProfilePicture;
