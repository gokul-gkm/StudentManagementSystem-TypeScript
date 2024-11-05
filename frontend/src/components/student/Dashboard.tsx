import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { useAuth } from '../../context/AuthContext';
import { useStudents } from '../../context/StudentContext';
import { Student } from '../../types';
import Button from '../common/Button';
import Modal from '../common/Modal';
import StudentForm from './StudentForm';
import StudentList from './StudentList';
import SearchBar from '../common/SearchBar';
import ConfirmationButton from '../common/ConfirmButton';

const Dashboard: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const [isConfirmOpen, setIsConfirmOpen] = useState<boolean>(false);
  const [studentToDelete, setStudentToDelete] = useState<string | null>(null);

  const navigate = useNavigate();
  const { token, logout } = useAuth();
  const {
    students,
    isLoading,
    error,
    fetchStudents,
    createStudent,
    updateStudent,
    deleteStudent,
  } = useStudents();

  useEffect(() => {
    if (!token) {
      navigate('/login');
    } else {
      fetchStudents().catch(err => {
        console.log(err)
        toast.error('Failed to fetch students');
      });
    }
  }, [token, navigate, fetchStudents]);

  const handleCreateStudent = async (data: Omit<Student, '_id'>) => {
    try {
      await createStudent(data);
      toast.success('Student created successfully');
      setIsModalOpen(false);
    } catch (err) {
      toast.error('Failed to create student');
    }
  };

  const handleUpdateStudent = async (data: Omit<Student, '_id'>) => {
    if (!selectedStudent?._id) return;
    try {
      await updateStudent(selectedStudent._id, data);
      toast.success('Student updated successfully');
      setIsModalOpen(false);
      setSelectedStudent(null);
    } catch (err) {
      toast.error('Failed to update student');
    }
  };

  const handleDeleteClick = (id: string) => {
    setStudentToDelete(id);
    setIsConfirmOpen(true);
  };

  const confirmDelete = async () => {
    if (!studentToDelete) return;
    try {
      await deleteStudent(studentToDelete);
      toast.success('Student deleted successfully');
    } catch (err) {
      toast.error('Failed to delete student');
    } finally {
      setIsConfirmOpen(false);
      setStudentToDelete(null);
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <h1 className="text-xl font-semibold">Student Management System</h1>
            </div>
            <div className="flex items-center">
              <Button variant="secondary" onClick={handleLogout}>
                Logout
              </Button>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="flex justify-between items-center mb-6">
            <div className="w-64">
              <SearchBar
                value={searchQuery}
                onChange={setSearchQuery}
                placeholder="Search students..."
              />
            </div>
            <Button
              onClick={() => setIsModalOpen(true)}
              isLoading={isLoading}
            >
              Add New Student
            </Button>
          </div>

          {error && (
            <div className="bg-red-50 text-red-600 p-4 rounded-md mb-4">
              {error}
            </div>
          )}

          <StudentList
            students={students}
            onEdit={(student) => {
              setSelectedStudent(student);
              setIsModalOpen(true);
            }}
            onDelete={handleDeleteClick}
            searchQuery={searchQuery}
          />
        </div>
      </main>

      {isConfirmOpen && (
        <ConfirmationButton
          message="Are you sure you want to delete this student?"
          onConfirm={confirmDelete}
          onCancel={() => {
            setIsConfirmOpen(false);
            setStudentToDelete(null);
          }}
        />
      )}

      <Modal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedStudent(null);
        }}
        title={selectedStudent ? 'Edit Student' : 'Add New Student'}
      >
        <StudentForm
          onSubmit={selectedStudent ? handleUpdateStudent : handleCreateStudent}
          initialData={selectedStudent || undefined}
          isLoading={isLoading}
        />
      </Modal>
    </div>
  );
};

export default Dashboard;