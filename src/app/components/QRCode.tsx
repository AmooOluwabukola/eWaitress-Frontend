import QRCode from "react-qr-code";

type Props = {
  restaurantId: string;
};

const RestaurantQRCode = ({ restaurantId }: Props) => {
  const qrUrl = `${window.location.origin}/restaurant/${restaurantId}/menu`;

  return (
    <div className="text-center">
      <h3 className="text-lg font-semibold my-3">Scan to Order</h3>

      <div className="mx-auto p-4 bg-white rounded-lg shadow-md inline-block  ">
        <QRCode value={qrUrl} size={480} />
      </div>

    </div>
  );
};

export default RestaurantQRCode;
