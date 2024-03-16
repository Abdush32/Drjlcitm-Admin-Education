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
import DatePicker, { DateObject } from 'react-multi-date-picker';
import DatePanel from 'react-multi-date-picker/plugins/date_panel';
// import "./styles.css";
import moment from 'moment';
import university from '../../services/university';
import banner from '../../services/banner';
const format = 'MM/DD/YYYY';

const AddEditUniversity = (props) => {
  const [fields, setFields] = useState({});
  const [errors, setErrors] = useState({});
  const [loader, setLoader] = useState(false);
  const [loading, setLoading] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);
  const [file, setFile] = useState(null);



  const handleChange = (e, field) => {
    setFields({
      ...fields,
      [field]: e.target.value,
    });
    setErrors({ ...errors, [field]: '' });
  };


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


  const validateForm = () => {
    let formIsValid = true;
    const errors = {};
    if (!fields.name) {
      errors['name'] = 'Name can not be empty';
      formIsValid = false;
    }

    setErrors(errors);
    return formIsValid;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      const params = fields;
      params['logo'] = imagePreview || fields.logo;

      setLoading(true);
      const UniversityMethod = props.universityId
        ? university.update(params)
        : university.add(params);
      UniversityMethod
        .then((res) => {
          setLoading(false);
          if (res.data.status) {
            toast.success(res.data.message, {
              position: 'top-right',
            });
            setFields({});
            props.getUniversities();
            props.handleClose();
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
    }
  };

  const getCourse = (id) => {
    let params = id;
    setLoader(true);
    university
      .getOne(params)
      .then((res) => {
        if (res?.data?.status) {
          const slotData = res?.data?.data?.university;

          setFields(slotData);
          setLoader(false);
        }
      })
      .catch(function (error) {
        setLoader(false);
        console.log('error', error);
      });
  };

  useEffect(() => {
    if (props.universityId) {
      getCourse(props.universityId);
    }
  }, []);

  return (
    <div>
      <Modal show={props.open} size="lg" onClose={() => props.handleClose()}>
        <Modal.Header> {props.universityId ? 'Update ' : 'Add '}University</Modal.Header>
        <Modal.Body className="overflow-visible">
          <form
            className="flex max-w-md flex-col gap-4"
            // onSubmit={handleSubmit}
          >
            <div className="relative w-full max-w-4xl max-h-full">
              <div className="relative">
                <LoadingOverlay visible={loader} />

                <div>
                  <div className="mb-2 block">
                    <Label htmlFor="name" value="Course Name" />
                  </div>
                  <TextInput
                    name="name"
                    type="text"
                    sizing="md"
                    required
                    value={fields['name'] ? fields['name'] : ''}
                    onChange={(event) => handleChange(event, 'name')}
                    // color="failure"
                    helperText={
                      <span className="font-medium text-red-600">
                        {errors['name']}
                      </span>
                    }
                  />
                </div>

                
                <div>
                  <div className="mb-2 block">
                    <Label htmlFor="slot_time" value="Course Image" />
                  </div>
                  <FileInput
                    id="file-upload-helper-text"
                    required
                    name="logo"
                    onChange={(event) => handleFileUpload(event, 'logo')}
                    helperText={
                      <span className="font-medium text-red-600">
                        {errors['logo']}
                      </span>
                    }
                  />
                  {imagePreview !== null || fields.logo ? (
                    <div className="text-center">
                      <div className="image-container relative inline-block">
                        <img
                          src={imagePreview ? imagePreview : fields?.logo}
                          alt="govihub"
                          style={{ height: '70px' }}
                          class="bg-cover bg-center"
                        />
                        {imagePreview || fields.logo ? (
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
          </form>
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
            Add
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default AddEditUniversity;
