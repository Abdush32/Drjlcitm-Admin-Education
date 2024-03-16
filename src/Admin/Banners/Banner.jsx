import React, {  useState } from 'react';
import { Badge, Table } from 'flowbite-react';
import moment from 'moment';
import bannerMethod from '../../services/banner';
import toast from 'react-hot-toast';
import { HiCheck, HiClock } from 'react-icons/hi';
import { RxCross2 } from 'react-icons/rx';

const Banner = (props) => {
  const [reFetch, setreFetch] = useState(false);
  const banner = props.banner;

  const handleStatus = (id) => {
    bannerMethod.status(id).then((res) => {
      if (res?.data?.status) {
        props.getBanners();
        toast.success(res?.data?.message, {
          position: 'top-right',
        });
      } else {
        toast.error(res?.data?.message, {
          position: 'top-right',
        });
      }
    });
  };

  return (
    <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
      <Table.Cell>{props?.index + 1}</Table.Cell>
      <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white capitalize">
        {banner?.image ? (
          <img src={banner?.image} style={{ height: '18px' }} />
        ) : (
          <FontAwesomeIcon icon={faImage} size="lg" />
        )}
      </Table.Cell>
      <Table.Cell>
        <Badge
          icon={banner?.status == true ? HiCheck : RxCross2}
          className="cursor-pointer w-20"
          color={banner?.status == true ? 'success' : 'failure'}
          onClick={() => handleStatus(banner?.id)}
        >
          {banner?.status == true ? 'Active' : 'Inactive'}
        </Badge>
      </Table.Cell>


      <Table.Cell>{moment(banner?.createdAt).format('D MMM,  YYYY')}</Table.Cell>



     
      <Table.Cell>
        <i
          className="fa-solid fa-pen-to-square cursor-pointer"
          onClick={() => props.bannerModal(banner.id)}
        ></i>{' '}
        &nbsp;
        <i
          className="fa-solid fa-trash cursor-pointer"
          onClick={() => props.deleteBanner(banner.id)}
        ></i>
      </Table.Cell>
    </Table.Row>
  );
};

export default Banner;
