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
      <div className="min-h-screen bg-gray-100 pb-12 flex flex-col items-center w-full">
        <div className="w-full flex justify-between items-center p-12 py-6">
          <Link to="/">
            <img src={logo} alt="Logo" className="h-8" />
          </Link>

          <Button
            onClick={logoutHandler}
            className="cursor-pointer px-3 py-2 font-bold"
            variant="destructive"
          >
            Logout
          </Button>
        </div>

        <div className="w-11/12 max-w-7xl py-0">
          <h1>
            Welcome back,{' '}
            <span className="text-green-500">
              {username.charAt(0).toUpperCase() + username.slice(1)}
            </span>
          </h1>
          <p className="text-xl font-semibold text-gray-500">
            Let’s continue where you left off.
          </p>

          <div className="w-full py-8 flex justify-between items-center">
            <div className="relative">
              <CiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-xl text-gray-500" />
              <input
                type="text"
                placeholder="Find tasks"
                value={searchTerm}
                onChange={(event) => setSearchTerm(event.target.value)}
                className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-300 bg-white focus:outline-none focus:border-green-500"
              />
            </div>

            <CreateTaskForm onTaskCreated={refreshTasks} />
          </div>
          <CardSection
            refreshKey={tasksRefreshKey}
            searchTerm={searchTerm}
            onTaskChanged={refreshTasks}
          />
        </div>
      </div>
    </React.Fragment>
  );
};

export default MyTasks;
