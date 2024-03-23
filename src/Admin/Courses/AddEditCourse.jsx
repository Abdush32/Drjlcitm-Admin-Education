import React, { useState, useEffect } from 'react';
import {
  Button,
  FileInput,
  Label,
  Modal,
  Spinner,
  TextInput,
} from 'flowbite-react';
import toast from 'react-hot-toast';
import LoadingOverlay from '../../common/LoadingOverlay';
import banner from '../../services/banner';
import course from '../../services/course';
const format = 'MM/DD/YYYY';

const AddEditCourse = (props) => {
  const [fields, setFields] = useState({});
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
    console.log('Hello', fields?.image);
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
  const handleChange = (e, field) => {
    setFields({
      ...fields,
      [field]: e.target.value,
    });
    setErrors({ ...errors, [field]: '' });
  };

  const validateForm = () => {
    let formIsValid = true;
    const errors = {};
    if (!fields.name) {
      errors['name'] = 'Name can not be empty';
      formIsValid = false;
    }
    if (!fields.description) {
      errors['description'] = 'Description can not be empty';
      formIsValid = false;
    }
    // if (!fields.type) {
    //   errors['type'] = 'Shift can not be empty';
    //   formIsValid = false;
    // }

    setErrors(errors);
    return formIsValid;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      const params = fields;
      params['image'] = imagePreview || fields.image;

      setLoading(true);
      const courseMethod = props.slotId
        ? course.update(params)
        : course.add(params);
      courseMethod
        .then((res) => {
          setLoading(false);
          if (res.data.status) {
            toast.success(res.data.message, {
              position: 'top-right',
            });
            setFields({});
            props.handleClose();
            props.getCourses();
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
    course
      .getOne(params)
      .then((res) => {
        if (res?.data?.status) {
          const slotData = res?.data?.data?.course;

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
    if (props.modalId) {
      getCourse(props.modalId);
    }
  }, []);

  return (
    <div>
      <Modal show={props.open} size="lg" onClose={() => props.handleClose()}>
        <form onSubmit={handleSubmit}>
          <Modal.Header>
            {' '}
            {props.slotId ? 'Update ' : 'Add '}Course
          </Modal.Header>
          <Modal.Body className="overflow-visible">
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
                    <Label htmlFor="description" value="Course Description" />
                  </div>
                  <TextInput
                    name="description"
                    type="text"
                    sizing="lg"
                    required
                    value={fields['description'] ? fields['description'] : ''}
                    onChange={(event) => handleChange(event, 'description')}
                    // color="failure"
                    helperText={
                      <span className="font-medium text-red-600">
                        {errors['description']}
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
                    // required
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
                          style={{ height: '70px' }}
                          class="bg-cover bg-center"
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
            <Button color="success" size="sm" type="submit">
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
              {props.modalId ? 'Update ' : 'Add '}
            </Button>
          </Modal.Footer>
        </form>
      </Modal>
    </div>
  );
};

export default AddEditCourse;
