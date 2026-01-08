# PowerShell 스크립트 - Windows용 워크트리 생성

param(
    [Parameter(Mandatory=$false, Position=0)]
    [string]$WorktreeName
)

# 아규먼트 체크
if (-not $WorktreeName) {
    Write-Error "Error: 워크트리 이름을 입력해주세요!"
    Write-Host "사용법: .\create-worktree.ps1 <워크트리이름>"
    exit 1
}

$WorktreePath = "worktree\$WorktreeName"

# 워크트리 생성
try {
    git worktree add $WorktreePath
    if ($LASTEXITCODE -eq 0) {
        Write-Host "워크트리 생성 성공: $WorktreePath" -ForegroundColor Green
        Set-Location $WorktreePath
        Write-Host "디렉터리 변경 완료: $(Get-Location)" -ForegroundColor Green
        claude
    } else {
        throw "Git worktree 명령 실패"
    }
} catch {
    Write-Error "워크트리 생성에 실패했습니다."
    exit 1
}
