import { motion } from 'framer-motion';

export default function Footer() {
  return (
    <motion.footer
      className="w-full py-4 bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 text-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <motion.p
        className="text-white font-semibold text-lg"
        initial={{ y: 10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.8 }}
      >
        Made by Taha Saif (GIAIC Student)
      </motion.p>
    </motion.footer>
  );
}
