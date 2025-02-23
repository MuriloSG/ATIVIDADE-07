import { FaTrashAlt } from "react-icons/fa";

// eslint-disable-next-line react/prop-types
const Card = ({ image, name, email, onDelete }) => {
  return (
    <div className="max-w-lg bg-white rounded-lg shadow-lg overflow-hidden hover:scale-105 transform transition duration-300 ease-in-out">
      <img src={image} alt={name} className="w-90 h-50 object-cover" />
      <div className="p-6">
        <h3 className="text-2xl font-semibold text-gray-800 mb-2">{name}</h3>
        <p className="text-gray-600 mb-4">{email}</p>
        <div className="mt-4 flex space-x-3">
          <button
            onClick={onDelete}
            className="flex items-center justify-center bg-red-500 text-white p-3 rounded-lg hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400 transition-all duration-300"
          >
            <FaTrashAlt className="mr-2" />
            Deletar
          </button>
        </div>
      </div>
    </div>
  );
};

export default Card;
