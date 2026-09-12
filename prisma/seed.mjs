import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  await prisma.issue.deleteMany();
  await prisma.project.deleteMany();
  await prisma.user.deleteMany();

  const user = await prisma.user.create({
    data: {
      name: 'Alice Developer',
      email: 'alice@example.com',
      avatarUrl: 'https://i.pravatar.cc/150?u=alice',
    },
  });

  const project = await prisma.project.create({
    data: {
      name: 'Kanban Board Project',
      key: 'PROJ',
      description: 'A project to manage task development.',
    },
  });

  await prisma.issue.createMany({
    data: [
      {
        issueKey: 'PROJ-1',
        title: 'Set up Next.js app',
        description: 'Initialize Next.js app with Tailwind and TypeScript',
        status: 'DONE',
        priority: 'HIGHEST',
        type: 'TASK',
        projectId: project.id,
        assigneeId: user.id,
      },
      {
        issueKey: 'PROJ-2',
        title: 'Design database schema',
        description: 'Create Prisma schema for User, Project, and Issue',
        status: 'IN_PROGRESS',
        priority: 'HIGH',
        type: 'TASK',
        projectId: project.id,
        assigneeId: user.id,
      },
      {
        issueKey: 'PROJ-3',
        title: 'Build Sidebar navigation',
        description: 'Implement persistent layout sidebar',
        status: 'TO_DO',
        priority: 'MEDIUM',
        type: 'TASK',
        projectId: project.id,
        assigneeId: null,
      },
      {
        issueKey: 'PROJ-4',
        title: 'Implement drag and drop',
        description: 'Add drag and drop functionality to the kanban board',
        status: 'TO_DO',
        priority: 'HIGH',
        type: 'STORY',
        projectId: project.id,
        assigneeId: user.id,
      },
      {
        issueKey: 'PROJ-5',
        title: 'Fix modal styling',
        description: 'Modal is slightly off center on mobile',
        status: 'TO_DO',
        priority: 'LOW',
        type: 'BUG',
        projectId: project.id,
        assigneeId: null,
      },
    ],
  });
  console.log('Seed data inserted successfully.');
}
main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
