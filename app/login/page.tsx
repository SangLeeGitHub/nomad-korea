import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Mail, Lock, ArrowRight, AlertCircle, CheckCircle } from 'lucide-react';
import { login, signup } from './actions';

const errorMessages: Record<string, string> = {
  invalid_email: '올바른 이메일 주소를 입력해주세요.',
  invalid_password: '비밀번호를 입력해주세요.',
  password_too_short: '비밀번호는 최소 6자 이상이어야 합니다.',
  invalid_credentials: '이메일 또는 비밀번호가 올바르지 않습니다.',
  email_not_confirmed: '이메일 인증이 완료되지 않았습니다. 이메일을 확인해주세요.',
  email_exists: '이미 등록된 이메일입니다.',
  login_failed: '로그인에 실패했습니다. 다시 시도해주세요.',
  signup_failed: '회원가입에 실패했습니다. 다시 시도해주세요.',
  email_confirmation_failed: '이메일 인증에 실패했습니다. 다시 시도해주세요.',
}

const successMessages: Record<string, string> = {
  check_email: '인증 이메일을 발송했습니다. 이메일을 확인해주세요.',
}

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string; message?: string }>
}) {
  const { error, message } = await searchParams
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/5 via-background to-secondary/5 px-4 py-12">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center space-x-2 mb-4">
            <span className="text-4xl">🏙️</span>
            <span className="text-2xl font-bold text-primary">노마드코리아</span>
          </Link>
          <h1 className="text-3xl font-bold text-foreground mt-4">로그인</h1>
          <p className="text-muted-foreground mt-2">
            디지털 노마드 커뮤니티에 오신 것을 환영합니다
          </p>
        </div>

        {/* Login Card */}
        <Card>
          <CardHeader>
            <CardTitle>계정에 로그인하세요</CardTitle>
            <CardDescription>
              이메일과 비밀번호를 입력해주세요
            </CardDescription>
          </CardHeader>
          <CardContent>
            {/* Error Message */}
            {error && errorMessages[error] && (
              <div className="mb-4 p-3 bg-destructive/10 border border-destructive/20 rounded-md flex items-center gap-2 text-destructive text-sm">
                <AlertCircle className="h-4 w-4 flex-shrink-0" />
                <span>{errorMessages[error]}</span>
              </div>
            )}

            {/* Success Message */}
            {message && successMessages[message] && (
              <div className="mb-4 p-3 bg-green-500/10 border border-green-500/20 rounded-md flex items-center gap-2 text-green-600 text-sm">
                <CheckCircle className="h-4 w-4 flex-shrink-0" />
                <span>{successMessages[message]}</span>
              </div>
            )}
            <form className="space-y-4">
              {/* Email Input */}
              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-medium text-foreground">
                  이메일
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="example@email.com"
                    className="pl-10"
                    required
                  />
                </div>
              </div>

              {/* Password Input */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label htmlFor="password" className="text-sm font-medium text-foreground">
                    비밀번호
                  </label>
                  <Link
                    href="/forgot-password"
                    className="text-sm text-primary hover:underline"
                  >
                    비밀번호 찾기
                  </Link>
                </div>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="password"
                    name="password"
                    type="password"
                    placeholder="••••••••"
                    className="pl-10"
                    required
                  />
                </div>
              </div>

              {/* Submit Buttons */}
              <div className="space-y-2">
                <Button
                  formAction={login}
                  className="w-full group"
                >
                  로그인
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Button>
                <Button
                  formAction={signup}
                  variant="outline"
                  className="w-full"
                >
                  회원가입
                </Button>
              </div>
            </form>
          </CardContent>

          <CardFooter className="flex-col space-y-4">
            <div className="text-sm text-center text-muted-foreground">
              아직 계정이 없으신가요?{' '}
              <Link href="/register" className="text-primary font-medium hover:underline">
                회원가입
              </Link>
            </div>
          </CardFooter>
        </Card>

        {/* Footer Links */}
        <div className="mt-8 text-center text-sm text-muted-foreground">
          <Link href="/" className="hover:text-primary transition-colors">
            홈으로 돌아가기
          </Link>
          <span className="mx-2">·</span>
          <Link href="/help" className="hover:text-primary transition-colors">
            도움말
          </Link>
          <span className="mx-2">·</span>
          <Link href="/privacy" className="hover:text-primary transition-colors">
            개인정보처리방침
          </Link>
        </div>
      </div>
    </div>
  );
}
