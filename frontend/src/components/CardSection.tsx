import React, { useEffect, useState } from 'react';

import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '../../app/components/ui/tabs';

import { GoDotFill } from 'react-icons/go';
import Card from './Card';
import { getTasks } from '../services/task';
import { statusTask, type CardTask } from '../types/types';
import Skeleton from './Skeleton';
import { searchTask } from '../utils/utils';

const CardSection = ({
  refreshKey = 0,
  searchTerm = '',
  onTaskChanged,
}: {
  refreshKey?: number;
  searchTerm?: string;
  onTaskChanged?: () => void;
}) => {
  const [tasks, setTasks] = useState<CardTask[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        setIsLoading(true);
        setError(null);

        const [response] = await Promise.all([
          getTasks(),
          new Promise((resolve) => setTimeout(resolve, 700)),
        ]);

        if (!response.ok) {
          throw new Error('Unable to load tasks.');
        }

        const data = (await response.json()) as Array<{
          id: number;
          title: string;
          description: string;
          status: statusTask;
          createdAt?: string;
        }>;

        setTasks(
          data
            .map((task) => ({
              id: task.id,
              title: task.title,
              description: task.description,
              status: task.status,
              date: task.createdAt ?? '',
            }))
            .reverse(),
        );
      } catch (fetchError) {
        console.error('Error loading tasks:', fetchError);
        setError('Unable to load tasks.');
      } finally {
        setIsLoading(false);
      }
    };

    void fetchTasks();
  }, [refreshKey]);

  const renderTasks = (status?: statusTask) => {
    const searchedTasks = searchTask(tasks, searchTerm);
    const filteredTasks = status
      ? searchedTasks.filter((task) => task.status === status)
      : searchedTasks;

    if (isLoading) {
      return (
        <div className="grid grid-cols-1 gap-6 py-5 sm:grid-cols-2 lg:grid-cols-4">
          {Array.from({ length: 4 }, (_, index) => (
            <Skeleton key={index} />
          ))}
        </div>
      );
    }

    if (error) {
      return <p className="py-5 text-red-500">{error}</p>;
    }

    if (filteredTasks.length === 0) {
      return <p className="py-5 text-gray-500">No tasks found.</p>;
    }

    return (
      <div className="grid grid-cols-1 gap-6 py-5 sm:grid-cols-2 lg:grid-cols-3">
        {filteredTasks.map((task) => (
          <Card key={task.id} cardProps={task} onTaskChanged={onTaskChanged} />
        ))}
      </div>
    );
  };

  return (
    <React.Fragment>
      <Tabs defaultValue="All">
        <TabsList className="bg-gray-200">
          <TabsTrigger
            value="All"
            className="px-3 py-2 flex items-center gap-1"
          >
            <GoDotFill className="text-gray-600" />
            <span> All </span>
          </TabsTrigger>
          <TabsTrigger
            value="Pending"
            className="px-3 py-2 flex items-center gap-1"
          >
            <GoDotFill className="text-blue-600" />
            <span> Pending </span>
          </TabsTrigger>
          <TabsTrigger
            value="In Progress"
            className="px-3 py-2 flex items-center gap-1"
          >
            <GoDotFill className="text-orange-600" />
            <span> In Progress </span>
          </TabsTrigger>
          <TabsTrigger
            value="Completed"
            className="px-3 py-2 flex items-center gap-1"
          >
            <GoDotFill className="text-green-500" />
            <span> Completed </span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="All">{renderTasks()}</TabsContent>
        <TabsContent value="Pending">
          {renderTasks(statusTask.PENDING)}
        </TabsContent>
        <TabsContent value="In Progress">
          {renderTasks(statusTask.IN_PROGRESS)}
        </TabsContent>
        <TabsContent value="Completed">
          {renderTasks(statusTask.COMPLETED)}
        </TabsContent>
      </Tabs>
    </React.Fragment>
  );
};

export default CardSection;
