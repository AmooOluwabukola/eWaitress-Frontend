import RestaurantQRCode from "../components/QRCode";

const RestaurantDashboard = () => {
  const restaurantId = "1"; 

  return (
    <div className="p-8" >
      <RestaurantQRCode restaurantId={restaurantId} />
    </div>
  );
};

export default RestaurantDashboard;
