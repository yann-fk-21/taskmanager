import React, { useEffect, useState } from 'react';

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../../app/components/ui/dialog';
import { GrEdit } from 'react-icons/gr';

import { toast } from '../../app/components/ui/toast';
import { Button } from '../../app/components/ui/button';
import { Textarea } from '../../app/components/ui/textarea';
import SelectInput from './SelectInput';
import type { CardTask } from '../types/types';
import { updateTask } from '../services/task';

const EditTaskForm = ({
  cardProps,
  onTaskChanged,
}: {
  cardProps: CardTask;
  onTaskChanged?: () => void;
}) => {
  const [title, setTitle] = useState<string>(cardProps.title);
  const [description, setDescription] = useState<string>(cardProps.description);
  const [status, setStatus] = useState<string>(cardProps.status);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [isTitleValid, setIsTitleValid] = useState<boolean>(true);
  const [isDescriptionValid, setIsDescriptionValid] = useState<boolean>(true);

  useEffect(() => {
    setTitle(cardProps.title);
    setDescription(cardProps.description);
    setStatus(cardProps.status);
  }, [cardProps]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const titleOk = title.trim().length >= 3;
    const descriptionOk = description.trim().length >= 5;

    setIsTitleValid(titleOk);
    setIsDescriptionValid(descriptionOk);

    if (!titleOk || !descriptionOk) {
      toast.add({
        title: 'Please complete the task title and description correctly.',
        type: 'error',
      });
      return;
    }

    setIsSubmitting(true);

    const updatedTask: CardTask = {
      id: cardProps.id,
      title: title.trim(),
      description: description.trim(),
      status: status as CardTask['status'],
      date: cardProps.date,
    };

    try {
      const response = await updateTask(updatedTask);

      if (!response.ok) {
        throw new Error('Unable to update task.');
      }

      toast.add({ title: 'Task updated successfully!', type: 'success' });
      onTaskChanged?.();
    } catch (error) {
      console.error('Error updating task:', error);
      toast.add({ title: 'Error updating task.', type: 'error' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <React.Fragment>
      <Dialog>
        <DialogTrigger
          render={
            <button className="cursor-pointer" type="button">
              <GrEdit size={20} className="text-blue-400" />
            </button>
          }
        />

        <DialogContent className="sm:max-w-sm">
          <form id="update-task-form" onSubmit={handleSubmit}>
            <DialogHeader>
              <DialogTitle>Update Task</DialogTitle>
              <DialogDescription>Update your task here</DialogDescription>
            </DialogHeader>

            <div className="space-y-6 mt-4">
              <div>
                <label htmlFor="title" className="text-sm font-semibold">
                  Title
                </label>
                <input
                  id="title"
                  type="text"
                  placeholder="Do something..."
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full px-4 py-2 text-sm rounded-xl bg-gray-100 border-2 border-gray-300 focus:outline-none focus:border-gray-600"
                />
                {!isTitleValid && (
                  <p className="mt-1 text-xs text-red-500">
                    Title must be at least 3 characters.
                  </p>
                )}

                <div className="my-4">
                  <label
                    htmlFor="description"
                    className="text-sm font-semibold"
                  >
                    Description
                  </label>
                  <Textarea
                    id="description"
                    className="bg-gray-100"
                    placeholder="Describe your task here."
                    maxLength={60}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  />
                  {!isDescriptionValid && (
                    <p className="mt-1 text-xs text-red-500">
                      Description must be at least 5 characters.
                    </p>
                  )}
                </div>
              </div>
            </div>

            <SelectInput
              value={status}
              onChange={(newValue) => setStatus(newValue ?? 'PENDING')}
            />

            <DialogFooter>
              <DialogClose render={<Button variant="outline">Cancel</Button>} />
              <Button
                type="submit"
                form="update-task-form"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Saving...' : 'Save changes'}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </React.Fragment>
  );
};

export default EditTaskForm;
