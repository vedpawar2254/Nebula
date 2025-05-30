import { NextRequest, NextResponse } from 'next/server';
import connectDb from '@/lib/connectDb'
import User from '@/models/userModel';

/**
 * @function POST
 * @description Handles POST requests for user signup.
 * @param {NextRequest} req - The incoming Next.js request object.
 * @returns {NextResponse} - The Next.js response object.
 */
export async function POST(req: NextRequest) {
  try {
    await connectDb();
    const { username, email, githubId, password } = await req.json();
    if (!username || !email || !password) {
      return NextResponse.json({ message: 'Please provide username, email, and password' }, { status: 400 });
    }
    const existingUser = await User.findOne({ $or: [{ email }, { username }] });
    if (existingUser) {
      return NextResponse.json({ message: 'User with that email or username already exists' }, { status: 409 });
    }
    const newUser = new User({
      username,
      email,
      githubId: githubId || undefined, 
      password, 
    });
    await newUser.save();
    return NextResponse.json({ message: 'User registered successfully!' }, { status: 201 });

  } catch (error: any) {
    console.error('Signup API error:', error);
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map((err: any) => err.message);
      return NextResponse.json({ message: messages.join(', ') }, { status: 400 });
    }
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}
