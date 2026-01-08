'use server'

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

export async function signup(formData: FormData) {
  const email = formData.get('email') as string
  const password = formData.get('password') as string
  const confirmPassword = formData.get('confirmPassword') as string

  // 입력 유효성 검사
  if (!email || !isValidEmail(email)) {
    redirect('/register?error=invalid_email')
  }

  if (!password || !isValidPassword(password)) {
    redirect('/register?error=password_too_short')
  }

  if (password !== confirmPassword) {
    redirect('/register?error=passwords_not_match')
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
    console.error('Signup error:', error.message)
    if (error.message.includes('already registered')) {
      redirect('/register?error=email_exists')
    }
    redirect(`/register?error=signup_failed&details=${encodeURIComponent(error.message)}`)
  }

  redirect('/register?message=check_email')
}
