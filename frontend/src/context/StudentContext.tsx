import React, { createContext, useContext, useState, useCallback } from 'react';
import api from '../services/api';
import { Student } from '../types';

interface StudentContextType {
  students: Student[];
  isLoading: boolean;
  error: string | null;
  fetchStudents: () => Promise<void>;
  createStudent: (data: Omit<Student, '_id'>) => Promise<void>;
  updateStudent: (id: string, data: Partial<Student>) => Promise<void>;
  deleteStudent: (id: string) => Promise<void>;
  clearError: () => void;
}

const StudentContext = createContext<StudentContextType | null>(null);

export const StudentProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [students, setStudents] = useState<Student[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchStudents = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);
      const data = await api.get<Student[]>('/students');
      setStudents(data);
    } catch (err: any) {
      setError(err.message);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const createStudent = useCallback(async (data: Omit<Student, '_id'>) => {
    try {
      setIsLoading(true);
      setError(null);
      const newStudent = await api.post<Student>('/students', data);
      setStudents(prev => [newStudent, ...prev]);
    } catch (err: any) {
      setError(err.message);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const updateStudent = useCallback(async (id: string, data: Partial<Student>) => {
    try {
      setIsLoading(true);
      setError(null);
      const updatedStudent = await api.put<Student>(`/students/${id}`, data);
      setStudents(prev => 
        prev.map(student => student._id === id ? updatedStudent : student)
      );
    } catch (err: any) {
      setError(err.message);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const deleteStudent = useCallback(async (id: string) => {
    try {
      setIsLoading(true);
      setError(null);
      await api.delete(`/students/${id}`);
      setStudents(prev => prev.filter(student => student._id !== id));
    } catch (err: any) {
      setError(err.message);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  return (
    <StudentContext.Provider
      value={{
        students,
        isLoading,
        error,
        fetchStudents,
        createStudent,
        updateStudent,
        deleteStudent,
        clearError,
      }}
    >
      {children}
    </StudentContext.Provider>
  );
};

export const useStudents = () => {
  const context = useContext(StudentContext);
  if (!context) {
    throw new Error('useStudents must be used within a StudentProvider');
  }
  return context;
};