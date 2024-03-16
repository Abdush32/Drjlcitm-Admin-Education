import React, { useState, useEffect } from 'react';
import Breadcrumb from '../../components/Breadcrumb';
import { Button, Table } from 'flowbite-react';
import AddEditCourse from './AddEditCourse';
import Course from './Course';
import toast from 'react-hot-toast';
import Skeleton from '../../common/Skelton';
import course from '../../services/course';

const Index = () => {
  const [courses, setCourses] = useState({});
  const [loader, setLoader] = useState(false);
  const [slotOpen, setSlotOpen] = useState(false);
  const [slotId, setSlotId] = useState('');

  const openCourseModal = (slot_id) => {
    setSlotOpen(true);
    setSlotId(slot_id);
  };

  const getCourses = () => {
    setLoader(true);
    course
      .list()
      .then((res) => {
        if (res.data.status) {
          setCourses(res?.data?.data?.courses);
          // if (!searchValue) {
          //   setPage(res.data.data.current_page);
          // }
          // setTotalPages(res.data.data.total / res.data.data.per_page);
          setLoader(false);
        }
      })
      .catch(function (error) {
        setLoader(false);
        console.log('error', error);
      });
  };

  const deleteCourse = (id) => {
    if (window.confirm('Are you sure to delete this course?')) {
      course.Delete(id).then((res) => {
        if (res?.data?.status) {
  
          const newSlot = courses.filter((item) => item.id !== id);
          setCourses(newSlot);

          toast.success(res?.data?.message, {
            position: 'top-right',
            // position="top-right"
          });
        } else {
          toast.error(res?.data?.message, {
            position: 'top-right',
            // position="top-right"
          });
        }
      });
    }
  };

  useEffect(() => {
    getCourses();
  }, []);

  return (
    <div>
      <div className="flex flex-col sm:flex-row p-4">
        <Breadcrumb pageName="Courses" />

        <div className="flex mt-4 sm:mt-0 sm:ml-auto sm:space-x-2">
          {/* <Button color="failure" size="sm" className="mr-2">
            Export
          </Button>
          <Button color="warning" size="sm" className="mr-2">
            Search
          </Button> */}
          <Button color="success" size="sm" onClick={() => setSlotOpen(true)}>
            Add New
          </Button>
        </div>
      </div>

      <div className="bg-white w-full h-screen rounded-2xl p-6">
        {loader ? (
          <Skeleton cols={6} rows={10} />
        ) : (
          <div className="overflow-x-auto">
            <Table hoverable striped>
              <Table.Head>
                <Table.HeadCell>S.No</Table.HeadCell>
                <Table.HeadCell>Image</Table.HeadCell>
                <Table.HeadCell>Name</Table.HeadCell>
                <Table.HeadCell>Slug</Table.HeadCell>
                <Table.HeadCell>Created At</Table.HeadCell>
                <Table.HeadCell>Action</Table.HeadCell>
              </Table.Head>
              <Table.Body className="divide-y">
                {courses?.length > 0
                  ? courses?.map((course, index) => (
                      <Course
                        course={course}
                        index={index}
                        key={`key-course-${index}`}
                        openCourseModal={openCourseModal}
                        deleteCourse={deleteCourse}
                        getCourses={getCourses}
                      />
                    ))
                  : !loader && (
                      <tr>
                        <td key={0} colSpan="6">
                          <p className="text-center">Course not found.</p>
                        </td>
                      </tr>
                    )}
              </Table.Body>
            </Table>
          </div>
        )}
      </div>
      {slotOpen && (
        <AddEditCourse
          open={slotOpen}
          handleClose={() => {
            setSlotOpen();
            setSlotId(null);
          }}
          slotId={slotId}
          getCourses={getCourses}
        />
      )}
    </div>
  );
};

export default Index;
