import { NextRequest, NextResponse } from "next/server";

interface DailyUpdateBody {
  id?: string;
  jobId: string;
  date?: string;
  machineState: string;
  workCompleted: string;
  openRisks?: string;
  nextSteps: string;
  partsNeeded?: string;
  hoursWorked: number;
  isPassDown?: boolean;
  authorId?: string;
}

// In-memory storage for demo
const dailyUpdates: DailyUpdateBody[] = [];

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const jobId = searchParams.get("jobId");

  if (!jobId) {
    return NextResponse.json(
      { error: "Job ID is required" },
      { status: 400 }
    );
  }

  const updates = dailyUpdates.filter((u) => u.jobId === jobId);
  return NextResponse.json(updates);
}

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as DailyUpdateBody;
    
    const requiredFields = ["jobId", "machineState", "workCompleted", "nextSteps", "hoursWorked"] as const;
    for (const field of requiredFields) {
      if (body[field] === undefined || body[field] === null) {
        return NextResponse.json(
          { error: `Missing required field: ${field}` },
          { status: 400 }
        );
      }
    }

    const newUpdate: DailyUpdateBody = {
      id: `update-${Date.now()}`,
      date: new Date().toISOString(),
      isPassDown: false,
      ...body,
    };

    dailyUpdates.push(newUpdate);

    return NextResponse.json(newUpdate, { status: 201 });
  } catch {
    return NextResponse.json(
      { error: "Invalid request body" },
      { status: 400 }
    );
  }
}
