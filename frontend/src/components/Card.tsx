import React from 'react';
import { GoDotFill } from 'react-icons/go';
import { IoCalendarOutline } from 'react-icons/io5';
import { IoTrashBinOutline } from 'react-icons/io5';
import EditTaskForm from './EditTaskForm';
import { statusTask, type CardTask } from '../types/types';
import { formatDate } from '../utils/utils';
import { deleteTask } from '../services/task';
import { toast } from '../../app/components/ui/toast';

const Card = ({
  cardProps = {
    id: 1,
    title: 'Example task',
    description: 'This is a sample task description.',
    status: statusTask.PENDING,
    date: '2026-03-23',
  },
  onTaskChanged,
}: {
  cardProps?: CardTask;
  onTaskChanged?: () => void;
}) => {
  const handleDelete = async () => {
    try {
      const response = await deleteTask(cardProps);

      if (!response.ok) {
        throw new Error('Unable to delete task.');
      }

      toast.add({ title: 'Task deleted successfully!', type: 'success' });
      onTaskChanged?.();
    } catch (error) {
      console.error('Error deleting task:', error);
      toast.add({ title: 'Error deleting task.', type: 'error' });
    }
  };

  return (
    <React.Fragment>
      <div className="w-full rounded-xl bg-white p-2">
        <div className="flex items-center justify-between">
          {cardProps.status == statusTask.PENDING && (
            <GoDotFill className="text-blue-500" />
          )}
          {cardProps.status == statusTask.IN_PROGRESS && (
            <GoDotFill className="text-orange-500" />
          )}
          {cardProps.status == statusTask.COMPLETED && (
            <GoDotFill className="text-green-400" />
          )}
          <div className="text-sm text-gray-500 flex items-center gap-1">
            <IoCalendarOutline />
            <span>{formatDate(cardProps.date)}</span>
          </div>
        </div>

        <div className="mt-3 p-3 bg-gray-100 rounded-xl">
          <h2 className="text-lg font-semibold">{cardProps.title}</h2>
          <p className="text-sm text-gray-500">{cardProps.description}</p>
        </div>

        <div className="flex items-center justify-end gap-2 py-2 px-3">
          <button
            className="cursor-pointer"
            type="button"
            onClick={handleDelete}
            aria-label="Delete task"
          >
            <IoTrashBinOutline size={20} className="text-red-400" />
          </button>
          <EditTaskForm cardProps={cardProps} onTaskChanged={onTaskChanged} />
        </div>
      </div>
    </React.Fragment>
  );
};

export default Card;
