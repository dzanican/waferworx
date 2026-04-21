import { NextRequest, NextResponse } from "next/server";
import { getJobs, getJobById } from "@/lib/data";

interface JobBody {
  id?: string;
  title?: string;
  customerId?: string;
  siteId?: string;
  toolId?: string;
  technicianId?: string;
  statusId?: string;
  priority?: string;
  entitlementType?: string;
  plannedWeekYear?: number;
  plannedWeekNumber?: number;
  plannedStartDate?: string;
  plannedEndDate?: string;
  description?: string;
  notes?: string;
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");
  const status = searchParams.get("status");
  const customerId = searchParams.get("customerId");
  const technicianId = searchParams.get("technicianId");

  if (id) {
    const job = getJobById(id);
    if (!job) {
      return NextResponse.json({ error: "Job not found" }, { status: 404 });
    }
    return NextResponse.json(job);
  }

  let jobs = getJobs();

  // Apply filters
  if (status) {
    jobs = jobs.filter((j) => j.statusId === status);
  }
  if (customerId) {
    jobs = jobs.filter((j) => j.customerId === customerId);
  }
  if (technicianId) {
    jobs = jobs.filter((j) => j.technicianId === technicianId);
  }

  return NextResponse.json(jobs);
}

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as JobBody;
    
    // Validate required fields
    const requiredFields = ["title", "customerId", "siteId"] as const;
    for (const field of requiredFields) {
      if (!body[field]) {
        return NextResponse.json(
          { error: `Missing required field: ${field}` },
          { status: 400 }
        );
      }
    }

    // In production, this would insert into D1 database
    const newJob = {
      id: `job-${Date.now()}`,
      jobNumber: `JOB-${new Date().getFullYear()}-${String(Math.floor(Math.random() * 10000)).padStart(4, "0")}`,
      ...body,
      statusId: body.statusId || "status-open",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    return NextResponse.json(newJob, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: "Invalid request body" },
      { status: 400 }
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body = (await request.json()) as JobBody;
    
    if (!body.id) {
      return NextResponse.json(
        { error: "Job ID is required" },
        { status: 400 }
      );
    }

    const existingJob = getJobById(body.id);
    if (!existingJob) {
      return NextResponse.json(
        { error: "Job not found" },
        { status: 404 }
      );
    }

    // In production, this would update the D1 database
    const updatedJob = {
      ...existingJob,
      ...body,
      updatedAt: new Date().toISOString(),
    };

    return NextResponse.json(updatedJob);
  } catch (error) {
    return NextResponse.json(
      { error: "Invalid request body" },
      { status: 400 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");

  if (!id) {
    return NextResponse.json(
      { error: "Job ID is required" },
      { status: 400 }
    );
  }

  const existingJob = getJobById(id);
  if (!existingJob) {
    return NextResponse.json(
      { error: "Job not found" },
      { status: 404 }
    );
  }

  // In production, this would delete from D1 database
  return NextResponse.json({ success: true, id });
}
