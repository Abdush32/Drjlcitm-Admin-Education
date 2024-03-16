import React, { useState, useEffect } from 'react';
import {
  Button,
  FileInput,
  Label,
  Modal,
  Select,
  Spinner,
  TextInput,
} from 'flowbite-react';
import toast from 'react-hot-toast';
import LoadingOverlay from '../../common/LoadingOverlay';
import banner from '../../services/banner';
 
const AddEditCourse = (props) => {
  const [fields, setFields] = useState({ });
  const [errors, setErrors] = useState({});
  const [loader, setLoader] = useState(false);
  const [loading, setLoading] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);
  const [file, setFile] = useState(null);

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    setFile(URL.createObjectURL(file));

    const formData = new FormData();
    formData.append('file', file);
    banner
      .uploadImage(formData)
      .then((res) => {
        if (res.data.status) {
          setImagePreview(res?.data?.data?.filePath);
          toast.success(res.data.message, {
            position: 'top-right',
          });
        }
      })
      .catch((error) => {
        console.error('Image uploading error', error);
      });
  };

  const handleImageDelete = () => {
    let params = { filePath: fields?.image };
    banner
      .deleteImage(params)
      .then((res) => {
        if (res.data.status) {
          // setreFetch(!reFetch)
          setFile(null);

          const fileInput = document.getElementById('image');
          if (fileInput) {
            fileInput.value = '';
          }
          setFields({ ...fields, image: null });
          toast.success(res.data.message, {
            position: 'top-right',
          });
        }
      })
      .catch((error) => {
        console.error('Image delete error', error);
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // if (validateForm()) {
    let params = fields;
    params['image'] = imagePreview || fields.image;
    setLoading(true);
    const bannerMethod = props.bannerId ? banner.update : banner.add;
    bannerMethod(params)
      .then((res) => {
        console.log(res);
        setLoading(false);
        if (res.data.status) {
          toast.success(res.data.message, {
            position: 'top-right',
          });
          setFields({});
          setLoading(true);
          props.handleClose();
          props.getBanners();
        } else {
          let errors = {};
          for (let key in res.data.errors) {
            errors[key] = res.data.errors[key];
          }
          setErrors(errors);
          setLoading(false);
        }
      })
      .catch(function (error) {
        console.log('error', error);
        setLoading(false);
      });
    // }
  };

  const getBanner = () => {
    let params = props.bannerId;
    setLoader(true);
    banner
      .getOne(params)
      .then((res) => {
        if (res.data.status) {
          setLoader(false);
          setFields(res?.data?.data?.banner);
        }
      })
      .catch(function (error) {
        setLoader(false);
        console.log('error', error);
      });
  };

  useEffect(() => {
    if (props.bannerId) {
      getBanner(props.bannerId);
    }
  }, []);

  return (
    <div className="h-screen">
      <Modal  show={props.open} size="lg" onClose={() => props.handleClose()}>
      <form onSubmit={handleSubmit}>
        <Modal.Header> {props.bannerId ? 'Update ' : 'Add '}Banner</Modal.Header>
        <Modal.Body className="overflow-visible">
       
            <div className="relative w-full max-w-4xl max-h-full">
              <div className="relative">
                <LoadingOverlay visible={loader} />

                <div>
                  <div className="mb-2 block">
                    <Label htmlFor="file-upload-helper-text" value="Image" />
                  </div>
                  <FileInput
                    id="file-upload-helper-text"
                    required
                    name="image"
                    onChange={(event) => handleFileUpload(event, 'image')}
                    helperText={
                      <span className="font-medium text-red-600">
                        {errors['image']}
                      </span>
                    }
                  />

                  {imagePreview !== null || fields.image ? (
                    <div className="text-center">
                      <div className="image-container relative inline-block">
                        <img
                          src={imagePreview ? imagePreview : fields?.image}
                          alt="Drjlcitm"
                          className="min-h-64 max-w-xs"
                        />
                        {imagePreview || fields.image ? (
                          <span
                            className="close-icon absolute top-0 right-0 mt-1 mr-1"
                            onClick={handleImageDelete}
                          >
                            <i class="fa-solid fa-trash"></i>
                          </span>
                        ) : null}
                      </div>
                    </div>
                  ) : null}
                </div>
              </div>
            </div>
        </Modal.Body>
        <Modal.Footer className="flex justify-end">
          <Button
            color="gray"
            size="sm"
            disabled={loading}
            onClick={() => props.handleClose()}
          >
            Cancel
          </Button>
          <Button
            color="success"
            size="sm"
            type="submit"
            onClick={handleSubmit}
          >
            {' '}
            {loading ? (
              <Spinner
                color="success"
                size="sm"
                className="mr-1"
                disabled={loading}
              />
            ) : (
              ''
            )}
           {props.bannerId ? 'Update ' : 'Add '}
          </Button>
        </Modal.Footer>
        </form>

      </Modal>
    </div>
  );
};

export default AddEditCourse;
