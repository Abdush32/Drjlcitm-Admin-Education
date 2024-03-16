import React, { useState, useEffect } from 'react';
import Breadcrumb from '../../components/Breadcrumb';
import { Button, Table } from 'flowbite-react';
import AddEditBanner from './AddEditBanner';
import Banner from './Banner';
import toast from 'react-hot-toast';
import Skeleton from '../../common/Skelton';
import banner from '../../services/banner';

const Index = () => {
  const [banners, setBanners] = useState({});
  const [loader, setLoader] = useState(false);
  const [bannerOpen, setBannerOpen] = useState(false);
  const [bannerId, setBannerId] = useState('');

  const bannerModal = (slot_id) => {
    setBannerOpen(true);
    setBannerId(slot_id);
  };

  const getBanners = () => {
    setLoader(true);
    banner
      .list()
      .then((res) => {
        if (res.data.status) {
          setBanners(res?.data?.data?.banners);
            setLoader(false);
        }
      })
      .catch(function (error) {
        setLoader(false);
        console.log('error', error);
      });
  };

  const deleteBanner = (id) => {
    if (window.confirm('Are you sure to delete this banner?')) {
      banner.Delete(id).then((res) => {
        if (res?.data?.status) {
          // const newSlot = {
          //   ...banners,
          //   data: banners?.banners?.filter((item) => item.id !== id),
          // };

          const newSlot = banners.filter((item) => item.id !== id);
          setBanners(newSlot);

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
    getBanners();
  }, []);

  return (
    <div>
      <div className="flex flex-col sm:flex-row p-4">
        <Breadcrumb pageName="Banners" />

        <div className="flex mt-4 sm:mt-0 sm:ml-auto sm:space-x-2">
          {/* <Button color="failure" size="sm" className="mr-2">
            Export
          </Button>
          <Button color="warning" size="sm" className="mr-2">
            Search
          </Button> */}
          <Button color="success" size="sm" onClick={() => setBannerOpen(true)}>
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
                <Table.HeadCell>Status</Table.HeadCell>
                <Table.HeadCell>Created At</Table.HeadCell>
                <Table.HeadCell>Action</Table.HeadCell>
              </Table.Head>
              <Table.Body className="divide-y">
                {banners?.length > 0
                  ? banners?.map((banner, index) => (
                      <Banner
                        banner={banner}
                        index={index}
                        key={`key-banner-${index}`}
                        bannerModal={bannerModal}
                        deleteBanner={deleteBanner}
                        getBanners={getBanners}
                      />
                    ))
                  : !loader && (
                      <tr>
                        <td key={0} colSpan="6">
                          <p className="text-center">Banner not found.</p>
                        </td>
                      </tr>
                    )}
              </Table.Body>
            </Table>
          </div>
        )}
      </div>
      {bannerOpen && (
        <AddEditBanner
          open={bannerOpen}
          handleClose={() => {
            setBannerOpen();
            setBannerId(null);
          }}
          bannerId={bannerId}
          getBanners={getBanners}
        />
      )}
    </div>
  );
};

export default Index;
