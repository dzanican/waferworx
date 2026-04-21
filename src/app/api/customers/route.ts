import { NextRequest, NextResponse } from "next/server";
import { getCustomers, getCustomerById } from "@/lib/data";

interface CustomerBody {
  id?: string;
  name?: string;
  accountNumber?: string;
  industry?: string;
  address?: string;
  city?: string;
  state?: string;
  country?: string;
  postalCode?: string;
  phone?: string;
  email?: string;
  website?: string;
  notes?: string;
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");

  if (id) {
    const customer = getCustomerById(id);
    if (!customer) {
      return NextResponse.json({ error: "Customer not found" }, { status: 404 });
    }
    return NextResponse.json(customer);
  }

  const customers = getCustomers();
  return NextResponse.json(customers);
}

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as CustomerBody;
    
    if (!body.name) {
      return NextResponse.json(
        { error: "Customer name is required" },
        { status: 400 }
      );
    }

    const newCustomer = {
      id: `cust-${Date.now()}`,
      accountNumber: body.accountNumber || `CUST-${String(Math.floor(Math.random() * 10000)).padStart(4, "0")}`,
      ...body,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    return NextResponse.json(newCustomer, { status: 201 });
  } catch {
    return NextResponse.json(
      { error: "Invalid request body" },
      { status: 400 }
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body = (await request.json()) as CustomerBody;
    
    if (!body.id) {
      return NextResponse.json(
        { error: "Customer ID is required" },
        { status: 400 }
      );
    }

    const existingCustomer = getCustomerById(body.id);
    if (!existingCustomer) {
      return NextResponse.json(
        { error: "Customer not found" },
        { status: 404 }
      );
    }

    const updatedCustomer = {
      ...existingCustomer,
      ...body,
      updatedAt: new Date().toISOString(),
    };

    return NextResponse.json(updatedCustomer);
  } catch {
    return NextResponse.json(
      { error: "Invalid request body" },
      { status: 400 }
    );
  }
}
