import Breadcrumb from '../../components/Breadcrumb';

const ECommerce = () => {
  return (
    <div>
      <div className="flex flex-col sm:flex-row p-4">
        <Breadcrumb pageName="Home" />
      </div>

      <div className="bg-white w-full h-screen rounded-2xl p-6">
        <h2>Welcome to Dashboard</h2>
      </div>
    </div>
  );
};

export default ECommerce;
