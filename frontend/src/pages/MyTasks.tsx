import React, { useEffect, useState } from 'react';
import {
  getTokenFromLocalStorage,
  decodeToken,
  removeTokenFromLocalStorage,
} from '../utils/utils';

import { Link } from 'react-router-dom';
import logo from '../assets/logo.png';
import { Button } from '../../app/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { CiSearch } from 'react-icons/ci';
import CardSection from '../components/CardSection';
import CreateTaskForm from '../components/CreateTaskForm';

const MyTasks = () => {
  const [username, setUsername] = useState<string>(' ');
  const [tasksRefreshKey, setTasksRefreshKey] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  const refreshTasks = () => {
    setTasksRefreshKey((currentKey) => currentKey + 1);
  };

  const getTokenInformations = () => {
    const token = getTokenFromLocalStorage();
    const decodedToken = decodeToken(token || '');
    setUsername(decodedToken?.sub || ' ');
  };

  useEffect(() => getTokenInformations(), []);

  const logoutHandler = () => {
    removeTokenFromLocalStorage();
    navigate('/');
  };

  return (
    <React.Fragment>
      <div className="min-h-screen w-full bg-gray-100 pb-8 sm:pb-12">
        <header className="w-full px-4 sm:px-6 lg:px-12 py-4 sm:py-6">
          <div className="mx-auto flex max-w-7xl items-center justify-between gap-4">
            <Link to="/" className="flex-shrink-0">
              <img src={logo} alt="Logo" className="h-7 sm:h-8" />
            </Link>

            <Button
              onClick={logoutHandler}
              className="cursor-pointer px-3 py-2 text-sm sm:text-base font-bold"
              variant="destructive"
            >
              Logout
            </Button>
          </div>
        </header>

        <main className="mx-auto w-[92%] max-w-7xl">
          <section className="pt-2 sm:pt-4">
            <h1 className="text-xl sm:text-2xl lg:text-4xl font-bold tracking-tight text-gray-800">
              Welcome back,{' '}
              <span className="text-green-500">
                {username.charAt(0).toUpperCase() + username.slice(1)}
              </span>
            </h1>
            <p className="mt-2 text-sm sm:text-base lg:text-xl font-semibold text-gray-500">
              Let’s continue where you left off.
            </p>
          </section>

          <div className="mt-6 flex flex-col gap-4 sm:gap-5 lg:flex-row lg:items-center lg:justify-between">
            <div className="relative w-full lg:max-w-xl">
              <CiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-xl text-gray-500" />
              <input
                type="text"
                placeholder="Find tasks"
                value={searchTerm}
                onChange={(event) => setSearchTerm(event.target.value)}
                className="w-full rounded-xl border border-gray-300 bg-white py-3 pl-12 pr-4 text-sm sm:text-base text-gray-700 shadow-sm transition focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-200"
              />
            </div>

            <div className="w-full lg:w-auto lg:flex lg:justify-end">
              <CreateTaskForm onTaskCreated={refreshTasks} />
            </div>
          </div>

          <div className="mt-6">
            <CardSection
              refreshKey={tasksRefreshKey}
              searchTerm={searchTerm}
              onTaskChanged={refreshTasks}
            />
          </div>
        </main>
      </div>
    </React.Fragment>
  );
};

export default MyTasks;
