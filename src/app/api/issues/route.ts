import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET() {
  try {
    const issues = await prisma.issue.findMany({
      include: {
        assignee: true,
        project: true,
      },
      orderBy: {
        createdAt: 'desc',
      }
    });
    return NextResponse.json(issues);
  } catch (error) {
    console.error('Error fetching issues:', error);
    return NextResponse.json({ error: 'Failed to fetch issues' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { title, description, type, status, priority, projectId, assigneeId } = body;

    // Basic validation
    if (!title || !type || !status || !priority || !projectId) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // Get project to determine next issue key
    const project = await prisma.project.findUnique({
      where: { id: projectId },
      include: { issues: true }
    });

    if (!project) {
      return NextResponse.json({ error: 'Project not found' }, { status: 404 });
    }

    // Generate Issue Key (e.g., PROJ-6)
    const issueCount = await prisma.issue.count({
      where: { projectId }
    });
    const issueKey = `${project.key}-${issueCount + 1}`;

    const newIssue = await prisma.issue.create({
      data: {
        title,
        description,
        type,
        status,
        priority,
        projectId,
        assigneeId: assigneeId || null,
        issueKey,
      },
      include: {
        assignee: true,
      }
    });

    return NextResponse.json(newIssue, { status: 201 });
  } catch (error) {
    console.error('Error creating issue:', error);
    return NextResponse.json({ error: 'Failed to create issue' }, { status: 500 });
  }
}