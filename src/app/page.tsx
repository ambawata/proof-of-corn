import BoardClient from '@/components/BoardClient';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Add revalidation to make this a dynamic route that fetches fresh data
export const revalidate = 0;

export default async function Home() {
  // Fetch issues
  const issues = await prisma.issue.findMany({
    include: { assignee: true, project: true },
    orderBy: { createdAt: 'desc' }
  });

  // Fetch project
  const project = await prisma.project.findFirst();

  return <BoardClient issues={issues} project={project} />;
}