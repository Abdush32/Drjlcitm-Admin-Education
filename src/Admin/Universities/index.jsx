import React, { useState, useEffect } from 'react';
import Breadcrumb from '../../components/Breadcrumb';
import { Button, Table } from 'flowbite-react';
import AddEditUniversity from './AddEditUniversity';
import University from './University';
import toast from 'react-hot-toast';
import Skeleton from '../../common/Skelton';
import university from '../../services/university';

const Index = () => {
  const [universities, setUniversities] = useState({});
  const [loader, setLoader] = useState(false);
  const [slotOpen, setOpen] = useState(false);
  const [universityId, setUniversityId] = useState('');

  const openUniversityModal = (slot_id) => {
    setOpen(true);
    setUniversityId(slot_id);
  };

  const getUniversities = () => {
    setLoader(true);
    university
      .list()
      .then((res) => {
        if (res.data.status) {
          setUniversities(res?.data?.data?.universities);
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

  const deleteUniversity = (id) => {
    if (window.confirm('Are you sure to delete this university?')) {
      university.Delete(id).then((res) => {
        if (res?.data?.status) {
          // const newSlot = {
          //   ...universities,
          //   data: universities?.universities?.filter((item) => item.id !== id),
          // };

          const newSlot = universities.filter((item) => item.id !== id);
          setUniversities(newSlot);

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
    getUniversities();
  }, []);

  return (
    <div>
      <div className="flex flex-col sm:flex-row p-4">
        <Breadcrumb pageName="Universities" />

        <div className="flex mt-4 sm:mt-0 sm:ml-auto sm:space-x-2">
          {/* <Button color="failure" size="sm" className="mr-2">
            Export
          </Button>
          <Button color="warning" size="sm" className="mr-2">
            Search
          </Button> */}
          <Button color="success" size="sm" onClick={() => setOpen(true)}>
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
                {universities?.length > 0
                  ? universities?.map((slot, index) => (
                      <University
                        slot={slot}
                        index={index}
                        key={`key-slot-${index}`}
                        openUniversityModal={openUniversityModal}
                        deleteUniversity={deleteUniversity}
                        getUniversities={getUniversities}
                      />
                    ))
                  : !loader && (
                      <tr>
                        <td key={0} colSpan="6">
                          <p className="text-center">University not found.</p>
                        </td>
                      </tr>
                    )}
              </Table.Body>
            </Table>
          </div>
        )}
      </div>
      {slotOpen && (
        <AddEditUniversity
          open={slotOpen}
          handleClose={() => {
            setOpen();
            setUniversityId(null);
          }}
          universityId={universityId}
          getUniversities={getUniversities}
        />
      )}
    </div>
  );
};

export default Index;
