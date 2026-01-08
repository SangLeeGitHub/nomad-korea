'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { createClient } from '@/utils/supabase/server'

// 이메일 유효성 검사
function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

// 비밀번호 유효성 검사 (최소 6자)
function isValidPassword(password: string): boolean {
  return password.length >= 6
}

export async function login(formData: FormData) {
  const email = formData.get('email') as string
  const password = formData.get('password') as string

  // 입력 유효성 검사
  if (!email || !isValidEmail(email)) {
    redirect('/login?error=invalid_email')
  }

  if (!password || !isValidPassword(password)) {
    redirect('/login?error=invalid_password')
  }

  const supabase = await createClient()

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  })

  if (error) {
    if (error.message.includes('Invalid login credentials')) {
      redirect('/login?error=invalid_credentials')
    }
    if (error.message.includes('Email not confirmed')) {
      redirect('/login?error=email_not_confirmed')
    }
    redirect('/login?error=login_failed')
  }

  revalidatePath('/', 'layout')
  redirect('/')
}

export async function signup(formData: FormData) {
  const email = formData.get('email') as string
  const password = formData.get('password') as string

  // 입력 유효성 검사
  if (!email || !isValidEmail(email)) {
    redirect('/login?error=invalid_email')
  }

  if (!password || !isValidPassword(password)) {
    redirect('/login?error=password_too_short')
  }

  const supabase = await createClient()

  const { error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      emailRedirectTo: `${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/auth/confirm`,
    },
  })

  if (error) {
    if (error.message.includes('already registered')) {
      redirect('/login?error=email_exists')
    }
    redirect('/login?error=signup_failed')
  }

  redirect('/login?message=check_email')
}

export async function logout() {
  const supabase = await createClient()

  await supabase.auth.signOut()

  revalidatePath('/', 'layout')
  redirect('/login')
}
