import { NextResponse } from 'next/server';


let mockFormData = {
    name: "Ankit Kumar",
    username: "henry",
    email: "abc@example.com",
    addressLine1: "123 address",
    addressLine2: "chandigarh",

};




export async function GET() {
    return NextResponse.json(mockFormData);
}


