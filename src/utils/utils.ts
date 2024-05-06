import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';

export const isEmpty = (str: string) => {
    return (!str || str.length === 0 || str.trim().length === 0);
}

export const saveUserMessage = async (user: string, message: string) => {
    try {
        await sql`INSERT INTO chats (sender, message) VALUES (${user}, ${message});`;
    } catch (error) {
        return NextResponse.json({ error }, { status: 500 });
    }
}

export const saveBotMessage = async (message: string) => {
    try {
        await sql`INSERT INTO chats (sender, message) VALUES ('bot', ${message});`;
    } catch (error) {
        return NextResponse.json({ error }, { status: 500 });
    }
}