import React, { useState } from 'react';

import { toast } from '../../app/components/ui/toast';
import { Button } from '../../app/components/ui/button';
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
import { Textarea } from '../../app/components/ui/textarea';
import { IoIosAdd } from 'react-icons/io';
import { statusTask, type CreatedTask } from '../types/types';
import { createTask } from '../services/task';

const CreateTaskForm = ({ onTaskCreated }: { onTaskCreated?: () => void }) => {
  const [title, setTitle] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [isTitleValid, setIsTitleValid] = useState<boolean>(true);
  const [isDescriptionValid, setIsDescriptionValid] = useState<boolean>(true);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const titleOk = title.trim().length >= 3;
    const descriptionOk = description.trim().length >= 5;

    setIsTitleValid(titleOk);
    setIsDescriptionValid(descriptionOk);

    if (!titleOk || !descriptionOk) {
      toast.add({
        title: 'Please complete the form correctly before saving.',
        type: 'error',
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const task: CreatedTask = {
        title: title.trim(),
        description: description.trim(),
        status: statusTask.PENDING,
      };

      const response = await createTask(task);

      if (!response.ok) {
        throw new Error('Unable to create task.');
      }

      setTitle('');
      setDescription('');
      toast.add({ title: 'Task created successfully!', type: 'success' });
      onTaskCreated?.();
    } catch (error) {
      console.error('Error creating task:', error);
      toast.add({ title: 'Error creating task.', type: 'error' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <React.Fragment>
      <Dialog>
        <DialogTrigger
          render={
            <Button className="cursor-pointer px-3 py-4 font-semibold flex items-center gap-1">
              <IoIosAdd size={30} />
              <span>New Task</span>
            </Button>
          }
        />

        <DialogContent className="sm:max-w-sm">
          <form id="create-task-form" onSubmit={handleSubmit}>
            <DialogHeader>
              <DialogTitle>Create Task</DialogTitle>
              <DialogDescription>Create your task here</DialogDescription>
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
                  className="w-full px-4 py-2 text-sm rounded-xl bg-gray-100 border-2 border-gray-300 focus:outline-none focus:border-gray-600"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
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
                    maxLength={100}
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

            <DialogFooter>
              <DialogClose render={<Button variant="outline">Cancel</Button>} />
              <Button
                type="submit"
                form="create-task-form"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Creating...' : 'Create'}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </React.Fragment>
  );
};

export default CreateTaskForm;
