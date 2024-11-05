import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Student } from '../../types';
import { studentSchema } from '../../validations/studentSchema';
import { Input } from '../ui/Input';
import Button from '../common/Button';

interface StudentFormProps {
  onSubmit: (data: Omit<Student, '_id'>) => Promise<void>;
  initialData?: Student;
  isLoading?: boolean;
}

const StudentForm: React.FC<StudentFormProps> = ({
  onSubmit,
  initialData,
  isLoading = false,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<Omit<Student, '_id'>>({
    resolver: zodResolver(studentSchema),
    defaultValues: initialData,
  });

  const onSubmitHandler = async (data: Omit<Student, '_id'>) => {
    try {
      await onSubmit(data);
      reset();
    } catch (error) {
    
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmitHandler)} className="space-y-4">
      <div>
        <Input
          label="Name"
          {...register('name')}
          error={errors.name?.message}
          placeholder="Enter student name"
        />
      </div>

      <div>
        <Input
          label="Email"
          {...register('email')}
          error={errors.email?.message}
          placeholder="Enter student email"
        />
      </div>

      <div>
        <Input
          label="Grade"
          {...register('grade')}
          error={errors.grade?.message}
          placeholder="Enter grade (1-12)"
        />
      </div>

      <div>
        <Input
          label="Age"
          type="number"
          {...register('age', { valueAsNumber: true })}
          error={errors.age?.message}
          placeholder="Enter age"
        />
      </div>

      <Button
        type="submit"
        isLoading={isLoading}
        className="w-full"
      >
        {initialData ? 'Update Student' : 'Add Student'}
      </Button>
    </form>
  );
};

export default StudentForm;