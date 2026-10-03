"use client";

import { useState, useEffect } from 'react';
import { X, AlertCircle } from 'lucide-react';
import FocusTrap from 'focus-trap-react';
import { useRouter } from 'next/navigation';

interface CreateIssueModalProps {
  isOpen: boolean;
  onClose: () => void;
  projectId: string;
}

export default function CreateIssueModal({ isOpen, onClose, projectId }: CreateIssueModalProps) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    type: 'TASK',
    status: 'TO_DO',
    priority: 'MEDIUM',
  });

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsSubmitting(true);

    try {
      const res = await fetch('/api/issues', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          projectId,
        }),
      });

      if (res.ok) {
        setFormData({ title: '', description: '', type: 'TASK', status: 'TO_DO', priority: 'MEDIUM' });
        router.refresh();
        onClose();
      } else {
        const data = await res.json();
        setError(data.error || 'Failed to create issue');
      }
    } catch (err) {
      setError('A network error occurred.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <FocusTrap focusTrapOptions={{ initialFocus: '#summary' }}>
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
        <div
          className="bg-white w-full max-w-2xl rounded-lg shadow-xl flex flex-col max-h-[90vh] overflow-hidden focus:outline-none"
          role="dialog"
          aria-modal="true"
          tabIndex={-1}
        >
        <div className="flex items-center justify-between p-4 md:p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-800">Create issue</h2>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded text-gray-500" aria-label="Close modal">
            <X size={20} />
          </button>
        </div>

        <div className="p-4 md:p-6 overflow-y-auto flex-1">
          {error && (
            <div className="mb-4 p-3 bg-red-50 text-red-700 text-sm rounded flex items-center gap-2">
              <AlertCircle size={16} />
              {error}
            </div>
          )}
          <form id="create-issue-form" onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="issueType">Issue type <span className="text-red-500">*</span></label>
                <select
                  id="issueType"
                  value={formData.type}
                  onChange={(e) => setFormData({...formData, type: e.target.value})}
                  className="w-full sm:w-1/2 p-2 border border-gray-300 rounded bg-gray-50 text-sm focus:ring-blue-500 focus:border-blue-500 outline-none"
                >
                  <option value="TASK">Task</option>
                  <option value="STORY">Story</option>
                  <option value="BUG">Bug</option>
                </select>
              </div>

              <hr className="border-gray-200" />

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="summary">Summary <span className="text-red-500">*</span></label>
                <input
                  id="summary"
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) => setFormData({...formData, title: e.target.value})}
                  className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                  autoFocus
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="description">Description</label>
                <textarea
                  id="description"
                  rows={4}
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                  className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all resize-y"
                  placeholder="Add a description..."
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="status">Status</label>
                  <select
                    id="status"
                    value={formData.status}
                    onChange={(e) => setFormData({...formData, status: e.target.value})}
                    className="w-full p-2 border border-gray-300 rounded bg-gray-50 text-sm focus:ring-blue-500 focus:border-blue-500 outline-none"
                  >
                    <option value="TO_DO">To Do</option>
                    <option value="IN_PROGRESS">In Progress</option>
                    <option value="DONE">Done</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="priority">Priority</label>
                  <select
                    id="priority"
                    value={formData.priority}
                    onChange={(e) => setFormData({...formData, priority: e.target.value})}
                    className="w-full p-2 border border-gray-300 rounded bg-gray-50 text-sm focus:ring-blue-500 focus:border-blue-500 outline-none"
                  >
                    <option value="HIGHEST">Highest</option>
                    <option value="HIGH">High</option>
                    <option value="MEDIUM">Medium</option>
                    <option value="LOW">Low</option>
                    <option value="LOWEST">Lowest</option>
                  </select>
                </div>
              </div>
            </div>
          </form>
        </div>

        <div className="p-4 border-t border-gray-200 flex justify-end gap-3 bg-gray-50 mt-auto">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-gray-700 font-medium hover:bg-gray-200 rounded transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            form="create-issue-form"
            disabled={isSubmitting}
            className="px-4 py-2 bg-blue-600 text-white font-medium hover:bg-blue-700 rounded transition-colors flex items-center justify-center min-w-[80px]"
          >
            {isSubmitting ? (
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            ) : (
              'Create'
            )}
          </button>
        </div>
      </div>
      </div>
    </FocusTrap>
  );
}