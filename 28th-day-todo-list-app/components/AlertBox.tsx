import { motion } from "framer-motion";

interface AlertBoxProps {
  message: string;
  type: "success" | "error";
  onClose: () => void;
}

export default function AlertBox({ message, type, onClose }: AlertBoxProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -50 }}
      className="fixed top-5 left-1/2 transform -translate-x-1/2 z-50"
    >
      <div
        className={`bg-white shadow-lg rounded-lg p-4 text-center max-w-sm w-full ${
          type === "success" ? "border-green-500" : "border-red-500"
        } border-t-4`}
      >
        <p
          className={`text-lg font-semibold ${
            type === "success" ? "text-green-600" : "text-red-600"
          }`}
        >
          {message}
        </p>
        <button
          onClick={onClose}
          className="mt-3 px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-900"
        >
          Close
        </button>
      </div>
    </motion.div>
  );
}
