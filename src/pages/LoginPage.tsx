import React from 'react';
import { LoginForm } from '../components/auth/LoginForm';
import { Container } from '../components/common/Container';
import { BackButton } from '../components/common/BackButton';
import { useNavigate } from 'react-router-dom';

export const LoginPage = () => {
  const navigate = useNavigate();

  const handleConsultation = () => {
    navigate('/consultation');
  };

  return (
    <div className="min-h-screen bg-gray-900 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <Container>
        <BackButton className="mb-8 text-gray-300 hover:text-white" />
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <div className="flex justify-center">
            <img 
              src="https://github.com/QRUMN/imgaes/blob/main/ICON.png?raw=true" 
              alt="Grinnage Extermination Logo"
              className="w-12 h-12 object-contain"
            />
          </div>
          <h2 className="mt-6 text-center text-3xl font-bold text-white">
            Sign in to your account
          </h2>
          <p className="mt-2 text-center text-sm text-gray-300">
            Or{' '}
            <button 
              onClick={handleConsultation}
              className="font-medium text-[#56e39f] hover:text-[#48c98a]"
            >
              schedule a free inspection
            </button>
          </p>
        </div>

        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-gray-800 py-8 px-4 shadow-xl sm:rounded-lg sm:px-10">
            <LoginForm />
          </div>
        </div>
      </Container>
    </div>
  );
};