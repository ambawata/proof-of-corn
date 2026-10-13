import IssueCard from './IssueCard';
import { Plus } from 'lucide-react';
import type { Issue, User, Project } from '@prisma/client';

type IssueWithAssignee = Issue & { assignee: User | null; project?: Project };

interface BoardColumnProps {
  title: string;
  issues: IssueWithAssignee[];
  onIssueClick: (issue: IssueWithAssignee) => void;
  onCreateClick: () => void;
}

export default function BoardColumn({ title, issues, onIssueClick, onCreateClick }: BoardColumnProps) {
  return (
    <div className="flex flex-col w-[85vw] sm:w-72 flex-shrink-0 bg-gray-50 rounded-lg max-h-full">
      <div className="p-3 pb-2 text-xs font-semibold text-gray-500 uppercase tracking-wider flex items-center gap-2">
        <span>{title}</span>
        <span className="text-gray-400 bg-gray-200 px-1.5 py-0.5 rounded-full text-[10px]">
          {issues.length}
        </span>
      </div>
      <div className="flex-1 overflow-y-auto p-2 space-y-2 min-h-[150px]">
        {issues.length === 0 ? (
           <div className="flex items-center justify-center h-24 border-2 border-dashed border-gray-300 rounded text-sm text-gray-500 bg-gray-50/50">
             No issues
           </div>
        ) : (
          issues.map((issue) => (
            <div key={issue.id} onClick={() => onIssueClick(issue)}>
              <IssueCard issue={issue} />
            </div>
          ))
        )}
      </div>
      <div className="p-2 pt-0 mt-2">
        <button onClick={onCreateClick} className="flex items-center gap-1 w-full text-gray-600 hover:bg-gray-200 p-2 rounded text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500">
          <Plus size={16} />
          Create issue
        </button>
      </div>
    </div>
  );
}
