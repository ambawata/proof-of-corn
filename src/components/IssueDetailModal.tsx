"use client";

import { useEffect } from 'react';
import { X, CheckSquare, Bookmark, Paperclip, Link as LinkIcon, MoreHorizontal, Maximize2 } from 'lucide-react';
import type { Issue, User, Project } from '@prisma/client';
import FocusTrap from 'focus-trap-react';

type IssueFull = Issue & {
  assignee: User | null;
  project?: Project;
};

interface IssueDetailModalProps {
  issue: IssueFull | null;
  isOpen: boolean;
  onClose: () => void;
}

const getTypeIcon = (type: string) => {
  switch (type) {
    case 'TASK':
      return <div className="bg-blue-400 p-1 rounded text-white flex-shrink-0"><CheckSquare size={16} /></div>;
    case 'BUG':
      return <div className="bg-red-500 p-1 rounded text-white flex-shrink-0"><div className="w-4 h-4 rounded-full border-2 border-white bg-transparent"></div></div>;
    case 'STORY':
      return <div className="bg-green-500 p-1 rounded text-white flex-shrink-0"><Bookmark size={16} /></div>;
    default:
      return <CheckSquare className="text-blue-500" size={20} />;
  }
};

export default function IssueDetailModal({ issue, isOpen, onClose }: IssueDetailModalProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen || !issue) return null;

  return (
    <FocusTrap focusTrapOptions={{ fallbackFocus: '#issue-title-heading' }}>
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-2 sm:p-4 md:p-8">
        <div
          className="bg-white w-full h-full max-w-6xl md:h-[90vh] rounded-lg shadow-xl flex flex-col overflow-hidden focus:outline-none"
          role="dialog"
          aria-modal="true"
          tabIndex={-1}
        >

        {/* Modal Header */}
        <div className="flex items-center justify-between p-3 sm:p-4 md:px-6 border-b border-gray-200">
          <div className="flex items-center gap-4 text-gray-500 text-sm">
            <div className="flex items-center gap-2 hover:bg-gray-100 p-1 rounded cursor-pointer transition-colors">
              {getTypeIcon(issue.type)}
              <span className="font-medium hover:underline">{issue.issueKey}</span>
            </div>
          </div>
          <div className="flex items-center gap-1 sm:gap-2 text-gray-500">
            <button className="p-2 hover:bg-gray-100 rounded transition-colors hidden sm:block" title="Attach">
              <Paperclip size={18} />
            </button>
            <button className="p-2 hover:bg-gray-100 rounded transition-colors hidden sm:block" title="Link issue">
              <LinkIcon size={18} />
            </button>
            <button className="p-2 hover:bg-gray-100 rounded transition-colors">
              <MoreHorizontal size={18} />
            </button>
            <button className="p-2 hover:bg-gray-100 rounded transition-colors ml-1 sm:ml-2">
              <Maximize2 size={18} />
            </button>
            <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded transition-colors ml-1 sm:ml-2" aria-label="Close modal">
              <X size={20} />
            </button>
          </div>
        </div>

        {/* Modal Body */}
        <div className="flex-1 overflow-y-auto flex flex-col md:flex-row relative">
          {/* Main Content Area */}
          <div className="flex-1 p-4 sm:p-6 md:p-8 md:pr-4">
            <h1 id="issue-title-heading" className="text-xl sm:text-2xl font-semibold text-gray-800 mb-6 leading-tight hover:bg-gray-50 p-1 -ml-1 rounded cursor-text break-words focus:outline-none focus:ring-2 focus:ring-blue-500" tabIndex={0}>
              {issue.title}
            </h1>

            <div className="flex flex-wrap gap-2 mb-6">
              <button className="px-3 py-1.5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded text-sm font-medium flex items-center gap-2 transition-colors">
                <Paperclip size={14} /> Attach
              </button>
              <button className="px-3 py-1.5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded text-sm font-medium flex items-center gap-2 transition-colors">
                <LinkIcon size={14} /> Link issue
              </button>
            </div>

            <div className="mb-8">
              <h3 className="font-semibold text-gray-700 mb-2">Description</h3>
              <div className="text-sm text-gray-600 bg-gray-50 hover:bg-gray-100 p-3 sm:p-4 rounded min-h-[100px] cursor-text transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500" tabIndex={0}>
                {issue.description || 'Add a description...'}
              </div>
            </div>

            <div>
              <h3 className="font-semibold text-gray-700 mb-4">Activity</h3>
              <div className="flex gap-4 border-b border-gray-200 mb-4 overflow-x-auto">
                <button className="pb-2 text-sm font-medium border-b-2 border-blue-600 text-blue-600 whitespace-nowrap">Comments</button>
                <button className="pb-2 text-sm font-medium text-gray-500 hover:text-gray-700 whitespace-nowrap">History</button>
                <button className="pb-2 text-sm font-medium text-gray-500 hover:text-gray-700 whitespace-nowrap">Work log</button>
              </div>

              {/* Comment Input Mock */}
              <div className="flex gap-3 sm:gap-4">
                <div className="w-8 h-8 rounded-full bg-purple-600 flex-shrink-0 flex items-center justify-center text-white text-xs font-bold">
                  A
                </div>
                <div className="flex-1">
                  <input
                    type="text"
                    placeholder="Add a comment..."
                    className="w-full border border-gray-300 p-2 sm:p-3 rounded text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 transition-all shadow-sm hover:bg-gray-50 focus:bg-white"
                  />
                  <div className="text-xs text-gray-500 mt-2 hidden sm:block">
                    <span className="font-semibold">Pro tip:</span> press <kbd className="bg-gray-100 p-1 rounded border border-gray-300">M</kbd> to comment
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Sidebar Info */}
          <div className="w-full md:w-80 p-4 sm:p-6 md:p-8 md:pl-4 flex flex-col gap-6 bg-white md:border-l border-gray-200 mt-6 md:mt-0">
            <div>
              <div className="text-sm font-medium text-gray-500 mb-1">Status</div>
              <button className="w-full flex items-center justify-between p-1.5 px-3 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded text-sm font-semibold transition-colors uppercase focus:outline-none focus:ring-2 focus:ring-blue-500">
                {issue.status.replace('_', ' ')}
                <span className="text-[10px]">&#9660;</span>
              </button>
            </div>

            <div className="space-y-4 rounded-md border border-gray-200 p-4">
              <h3 className="font-semibold text-gray-700 text-sm">Details</h3>

              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-500 w-1/3">Assignee</span>
                <button className="flex-1 flex items-center gap-2 hover:bg-gray-100 p-1 -mr-1 rounded cursor-pointer text-left focus:outline-none focus:ring-2 focus:ring-blue-500">
                  {issue.assignee ? (
                    <>
                      <div className="w-6 h-6 rounded-full bg-blue-600 flex items-center justify-center text-xs text-white overflow-hidden flex-shrink-0">
                        {issue.assignee.avatarUrl ? (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img src={issue.assignee.avatarUrl} alt={issue.assignee.name} className="w-full h-full object-cover" />
                        ) : (
                          issue.assignee.name.charAt(0)
                        )}
                      </div>
                      <span className="text-gray-700 font-medium truncate" title={issue.assignee.name}>{issue.assignee.name}</span>
                    </>
                  ) : (
                    <>
                      <div className="w-6 h-6 rounded-full bg-gray-200 border border-gray-300 border-dashed flex items-center justify-center text-gray-400 flex-shrink-0">
                        ?
                      </div>
                      <span className="text-gray-500 italic">Unassigned</span>
                    </>
                  )}
                </button>
              </div>

              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-500 w-1/3">Reporter</span>
                <button className="flex-1 flex items-center gap-2 hover:bg-gray-100 p-1 -mr-1 rounded cursor-pointer text-left focus:outline-none focus:ring-2 focus:ring-blue-500">
                  <div className="w-6 h-6 rounded-full bg-purple-600 flex items-center justify-center text-[10px] text-white flex-shrink-0">
                    A
                  </div>
                  <span className="text-gray-700 font-medium truncate">Alice Developer</span>
                </button>
              </div>

              <div className="flex items-center justify-between text-sm pt-2 border-t border-gray-100">
                <span className="text-gray-500 w-1/3">Priority</span>
                <button className="flex-1 flex items-center gap-2 hover:bg-gray-100 p-1 -mr-1 rounded cursor-pointer text-left focus:outline-none focus:ring-2 focus:ring-blue-500">
                  <span className="text-gray-700 font-medium capitalize">{issue.priority.toLowerCase()}</span>
                </button>
              </div>
            </div>

            <div className="text-xs text-gray-500 mt-auto pt-4 space-y-1 border-t md:border-none border-gray-100">
              <div>Created {new Date(issue.createdAt).toLocaleDateString()}</div>
              <div>Updated {new Date(issue.updatedAt).toLocaleDateString()}</div>
            </div>
          </div>
        </div>
      </div>
      </div>
    </FocusTrap>
  );
}
