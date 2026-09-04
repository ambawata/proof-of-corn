"use client";

import { useState } from 'react';
import BoardColumn from './BoardColumn';
import CreateIssueModal from './CreateIssueModal';
import IssueDetailModal from './IssueDetailModal';
import type { Issue, User, Project } from '@prisma/client';

type IssueWithAssignee = Issue & { assignee: User | null; project?: Project };

interface BoardClientProps {
  issues: IssueWithAssignee[];
  project: Project | null;
}

export default function BoardClient({ issues, project }: BoardClientProps) {
  const [isCreateModalOpen, setCreateModalOpen] = useState(false);
  const [selectedIssue, setSelectedIssue] = useState<IssueWithAssignee | null>(null);

  const todoIssues = issues.filter((i) => i.status === 'TO_DO');
  const inProgressIssues = issues.filter((i) => i.status === 'IN_PROGRESS');
  const doneIssues = issues.filter((i) => i.status === 'DONE');

  return (
    <>
      <div className="flex-1 flex flex-col p-4 md:p-6 h-full min-h-0 bg-white">
        {/* Board Header */}
        <div className="mb-4 md:mb-6">
          <div className="text-xs md:text-sm text-gray-500 mb-1 md:mb-2 font-medium">
            Projects / {project?.name || 'Kanban Project'}
          </div>
          <div className="flex items-center justify-between">
            <h1 className="text-xl md:text-2xl font-bold text-gray-800">
              {project?.key || 'PROJ'} board
            </h1>
            <div className="flex gap-2">
              <button
                onClick={() => setCreateModalOpen(true)}
                className="px-3 py-1.5 bg-blue-600 text-white hover:bg-blue-700 rounded transition-colors shadow-sm text-sm font-medium"
              >
                Create issue
              </button>
            </div>
          </div>
        </div>

        {/* Filters (Mock) */}
        <div className="flex flex-wrap items-center gap-2 md:gap-4 mb-4 md:mb-6">
          <div className="relative w-full sm:w-auto">
            <input
              type="text"
              placeholder="Search this board"
              className="w-full sm:w-48 pl-3 pr-3 py-1.5 border border-gray-300 rounded text-sm outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>
          <div className="flex -space-x-2">
            <div className="w-8 h-8 rounded-full border-2 border-white bg-blue-500 flex items-center justify-center text-xs text-white z-10">
              JD
            </div>
            <div className="w-8 h-8 rounded-full border-2 border-white bg-purple-500 flex items-center justify-center text-xs text-white z-0">
              A
            </div>
          </div>
          <div className="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0 hide-scrollbar w-full sm:w-auto">
            <button className="text-gray-600 text-sm font-medium hover:bg-gray-100 px-2 py-1 rounded whitespace-nowrap">
              Only my issues
            </button>
            <button className="text-gray-600 text-sm font-medium hover:bg-gray-100 px-2 py-1 rounded whitespace-nowrap">
              Recently updated
            </button>
          </div>
        </div>

        {/* Board Columns */}
        <div className="flex-1 flex gap-4 min-h-0 overflow-x-auto pb-4 snap-x snap-mandatory">
          <div className="snap-center shrink-0">
            <BoardColumn title="TO DO" issues={todoIssues} onIssueClick={setSelectedIssue} onCreateClick={() => setCreateModalOpen(true)} />
          </div>
          <div className="snap-center shrink-0">
            <BoardColumn title="IN PROGRESS" issues={inProgressIssues} onIssueClick={setSelectedIssue} onCreateClick={() => setCreateModalOpen(true)} />
          </div>
          <div className="snap-center shrink-0">
            <BoardColumn title="DONE" issues={doneIssues} onIssueClick={setSelectedIssue} onCreateClick={() => setCreateModalOpen(true)} />
          </div>
        </div>
      </div>

      <CreateIssueModal
        isOpen={isCreateModalOpen}
        onClose={() => setCreateModalOpen(false)}
        projectId={project?.id || ''}
      />

      <IssueDetailModal
        isOpen={!!selectedIssue}
        issue={selectedIssue}
        onClose={() => setSelectedIssue(null)}
      />
    </>
  );
}