import { NextRequest, NextResponse } from "next/server";
import { getTools, getToolById } from "@/lib/data";

interface ToolBody {
  id?: string;
  serialNumber?: string;
  name?: string;
  platformId?: string;
  customerId?: string;
  siteId?: string;
  installDate?: string;
  warrantyEndDate?: string;
  softwareVersion?: string;
  status?: string;
  notes?: string;
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");
  const customerId = searchParams.get("customerId");
  const siteId = searchParams.get("siteId");
  const platformId = searchParams.get("platformId");

  if (id) {
    const tool = getToolById(id);
    if (!tool) {
      return NextResponse.json({ error: "Tool not found" }, { status: 404 });
    }
    return NextResponse.json(tool);
  }

  let tools = getTools();

  if (customerId) {
    tools = tools.filter((t) => t.customerId === customerId);
  }
  if (siteId) {
    tools = tools.filter((t) => t.siteId === siteId);
  }
  if (platformId) {
    tools = tools.filter((t) => t.platformId === platformId);
  }

  return NextResponse.json(tools);
}

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as ToolBody;
    
    const requiredFields = ["serialNumber", "name", "platformId", "customerId", "siteId"] as const;
    for (const field of requiredFields) {
      if (!body[field]) {
        return NextResponse.json(
          { error: `Missing required field: ${field}` },
          { status: 400 }
        );
      }
    }

    const newTool = {
      id: `tool-${Date.now()}`,
      ...body,
      status: body.status || "operational",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    return NextResponse.json(newTool, { status: 201 });
  } catch {
    return NextResponse.json(
      { error: "Invalid request body" },
      { status: 400 }
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body = (await request.json()) as ToolBody;
    
    if (!body.id) {
      return NextResponse.json(
        { error: "Tool ID is required" },
        { status: 400 }
      );
    }

    const existingTool = getToolById(body.id);
    if (!existingTool) {
      return NextResponse.json(
        { error: "Tool not found" },
        { status: 404 }
      );
    }

    const updatedTool = {
      ...existingTool,
      ...body,
      updatedAt: new Date().toISOString(),
    };

    return NextResponse.json(updatedTool);
  } catch {
    return NextResponse.json(
      { error: "Invalid request body" },
      { status: 400 }
    );
  }
}
