import React from 'react';
import { Button } from "@/components/ui/button"; 
import { useNavigate } from 'react-router-dom'; 
import { Lock } from 'lucide-react';
import { motion } from 'framer-motion'; 
import { useAuth } from '@/auth/AuthContext';

const Unauthorized = () => {
  const navigate = useNavigate();
  const { userRole } = useAuth();


  const getRedirectPath = () => {
    // Return early after navigating based on the role
    if (userRole === 1) {
      navigate('/dashboard/admin');
      return;
    }
    if (userRole === 2) {
      navigate('/dashboard/teamlead');
      return;
    }
    if (userRole === 3) {
      navigate('/dashboard/user');
      return;
    }
    
    // Default to login page if no valid role is found
    navigate('/');
  };

  return (
    <motion.div
      className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-100 via-indigo-200 to-purple-300 text-indigo-700"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
    >
      <Lock className="text-6xl mb-4 text-indigo-500" />
      <h1 className="text-4xl font-bold mb-2">Access Denied</h1>
      <p className="text-lg mb-6">You do not have the necessary permissions to view this page.</p>

      <Button
        className="bg-indigo-500 text-white hover:bg-indigo-600 px-6 py-2 rounded-md shadow-lg transition-all"
        onClick={getRedirectPath}
      >
        Go Back Home
      </Button>
    </motion.div>
  );
};

export default Unauthorized;
