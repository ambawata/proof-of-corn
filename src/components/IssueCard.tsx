import { CheckSquare, ArrowUp, ArrowDown, ArrowRight, Bookmark } from 'lucide-react';
import type { Issue, User, Project } from '@prisma/client';

type IssueWithAssignee = Issue & { assignee: User | null; project?: Project };

interface IssueCardProps {
  issue: IssueWithAssignee;
}

const getPriorityIcon = (priority: string) => {
  switch (priority) {
    case 'HIGHEST':
      return <ArrowUp className="text-red-600" size={16} />;
    case 'HIGH':
      return <ArrowUp className="text-red-400" size={16} />;
    case 'MEDIUM':
      return <ArrowRight className="text-orange-500" size={16} />;
    case 'LOW':
      return <ArrowDown className="text-blue-500" size={16} />;
    case 'LOWEST':
      return <ArrowDown className="text-blue-300" size={16} />;
    default:
      return <ArrowRight className="text-gray-500" size={16} />;
  }
};

const getTypeIcon = (type: string) => {
  switch (type) {
    case 'TASK':
      return <div className="bg-blue-400 p-0.5 rounded text-white"><CheckSquare size={12} /></div>;
    case 'BUG':
      return <div className="bg-red-500 p-0.5 rounded text-white"><div className="w-3 h-3 rounded-full border-2 border-white bg-transparent"></div></div>;
    case 'STORY':
      return <div className="bg-green-500 p-0.5 rounded text-white"><Bookmark size={12} /></div>;
    default:
      return <CheckSquare className="text-blue-500" size={16} />;
  }
};

export default function IssueCard({ issue }: IssueCardProps) {
  return (
    <button className="w-full text-left bg-white p-3 rounded-sm shadow-sm border border-gray-200 cursor-pointer hover:bg-gray-50 flex flex-col gap-3 group transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500">
      <div className="text-sm text-gray-800 font-medium line-clamp-2 leading-snug">
        {issue.title}
      </div>
      <div className="flex items-center justify-between mt-auto w-full">
        <div className="flex items-center gap-2">
          {getTypeIcon(issue.type)}
          <span className="text-xs text-gray-500 font-medium uppercase tracking-tight">
            {issue.issueKey}
          </span>
        </div>
        <div className="flex items-center gap-2">
          {getPriorityIcon(issue.priority)}
          {issue.assignee ? (
            <div className="w-6 h-6 rounded-full bg-blue-600 flex items-center justify-center text-[10px] text-white overflow-hidden" title={issue.assignee.name}>
              {issue.assignee.avatarUrl ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={issue.assignee.avatarUrl} alt={issue.assignee.name} className="w-full h-full object-cover" />
              ) : (
                issue.assignee.name.charAt(0)
              )}
            </div>
          ) : (
            <div className="w-6 h-6 rounded-full bg-gray-200 border border-gray-300 border-dashed flex items-center justify-center text-gray-400">
              ?
            </div>
          )}
        </div>
      </div>
    </button>
  );
}
