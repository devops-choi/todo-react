#!/usr/bin/env python3
"""
챕터 네비게이션 링크 자동 추가 스크립트
"""

import os
import re

# 챕터 정보 정의
chapters = [
    ("chapter-05-package-json.md", "Chapter 5: package.json - 프로젝트 설정과 의존성 관리", "chapter-04-react-intro.md", "chapter-06-index-html.md"),
    ("chapter-06-index-html.md", "Chapter 6: public/index.html - React 앱의 진입점", "chapter-05-package-json.md", "chapter-07-index-js.md"),
    ("chapter-07-index-js.md", "Chapter 7: src/index.js - React 애플리케이션 시작점", "chapter-06-index-html.md", "chapter-08-app-js.md"),
    ("chapter-08-app-js.md", "Chapter 8: src/App.js - 메인 애플리케이션 컴포넌트", "chapter-07-index-js.md", "chapter-09-todo-container.md"),
    ("chapter-09-todo-container.md", "Chapter 9: TodoContainer.js - 컨테이너 컴포넌트", "chapter-08-app-js.md", "chapter-10-todo-input.md"),
    ("chapter-10-todo-input.md", "Chapter 10: TodoInput.js - 입력 컴포넌트", "chapter-09-todo-container.md", "chapter-11-todo-list.md"),
    ("chapter-11-todo-list.md", "Chapter 11: TodoList.js - 목록 컴포넌트", "chapter-10-todo-input.md", "chapter-12-todo-item.md"),
    ("chapter-12-todo-item.md", "Chapter 12: TodoItem.js - 개별 아이템 컴포넌트", "chapter-11-todo-list.md", "chapter-13-todo-service.md"),
    ("chapter-13-todo-service.md", "Chapter 13: todoService/index.js - 서비스 레이어 구조", "chapter-12-todo-item.md", "chapter-14-crud-create-read.md"),
    ("chapter-14-crud-create-read.md", "Chapter 14: CRUD 연산 - Create와 Read", "chapter-13-todo-service.md", "chapter-15-crud-update-delete.md"),
    ("chapter-15-crud-update-delete.md", "Chapter 15: CRUD 연산 - Update와 Delete", "chapter-14-crud-create-read.md", "chapter-16-server-database.md"),
    ("chapter-16-server-database.md", "Chapter 16: server.js와 database.json - 백엔드 서버", "chapter-15-crud-update-delete.md", "chapter-17-jest-config.md"),
    ("chapter-17-jest-config.md", "Chapter 17: 테스팅 - jest.config.json과 테스트 작성", "chapter-16-server-database.md", "chapter-18-build-deployment.md"),
    ("chapter-18-build-deployment.md", "Chapter 18: 빌드와 배포 - GitHub Pages", "chapter-17-jest-config.md", "chapter-19-vercel-deployment.md"),
    ("chapter-19-vercel-deployment.md", "Chapter 19: Vercel 배포와 vercel.json 설정", "chapter-18-build-deployment.md", "chapter-20-performance-optimization.md"),
    ("chapter-20-performance-optimization.md", "Chapter 20: 성능 최적화와 모범 사례", "chapter-19-vercel-deployment.md", None),
]

def get_chapter_title(filename):
    """파일명에서 챕터 제목 추출"""
    for chapter_file, title, _, _ in chapters:
        if chapter_file == filename:
            return title
    return None

def get_prev_next(filename):
    """이전/다음 챕터 정보 반환"""
    for chapter_file, title, prev_file, next_file in chapters:
        if chapter_file == filename:
            prev_title = get_chapter_title(prev_file) if prev_file else None
            next_title = get_chapter_title(next_file) if next_file else None
            return prev_file, prev_title, next_file, next_title
    return None, None, None, None

def create_navigation_section(filename):
    """네비게이션 섹션 생성"""
    prev_file, prev_title, next_file, next_title = get_prev_next(filename)
    
    nav_lines = ["---", "", "## 📚 네비게이션", ""]
    
    if prev_file and prev_title:
        nav_lines.append(f"- **◀ 이전**: [{prev_title}](./{prev_file})")
    
    nav_lines.append("- **🏠 목차**: [전체 목차](./README.md)")
    
    if next_file and next_title:
        nav_lines.append(f"- **▶ 다음**: [{next_title}](./{next_file})")
    
    nav_lines.extend(["", "---", "", f"**🎉 {get_chapter_title(filename)} 완료! 수고하셨습니다! 🚀**"])
    
    return "\n".join(nav_lines)

def process_chapter_file(filepath, filename):
    """개별 챕터 파일 처리"""
    try:
        with open(filepath, 'r', encoding='utf-8') as f:
            content = f.read()
        
        # 시작 부분에 네비게이션 추가 (이미 있는 경우 건너뛰기)
        if "## 📚 네비게이션" not in content:
            title_match = re.search(r'^# (.+?)$', content, re.MULTILINE)
            if title_match:
                title_line = title_match.group(0)
                
                prev_file, prev_title, next_file, next_title = get_prev_next(filename)
                
                start_nav_lines = ["", "---", "", "## 📚 네비게이션", ""]
                
                if prev_file and prev_title:
                    start_nav_lines.append(f"- **◀ 이전**: [{prev_title}](./{prev_file})")
                
                start_nav_lines.append("- **🏠 목차**: [전체 목차](./README.md)")
                
                if next_file and next_title:
                    start_nav_lines.append(f"- **▶ 다음**: [{next_title}](./{next_file})")
                
                start_nav_lines.append("")
                
                start_nav = "\n".join(start_nav_lines)
                content = content.replace(title_line, title_line + start_nav)
        
        # 마지막에 네비게이션 추가 (핵심 요약 뒤에)
        if "**🎉" not in content:
            # 핵심 요약 섹션 찾기
            summary_pattern = r'(## 📝 핵심 요약.*?)(\n\n.*?다음 챕터.*?!\s*)'
            summary_match = re.search(summary_pattern, content, re.DOTALL)
            
            if summary_match:
                summary_section = summary_match.group(1)
                next_chapter_text = summary_match.group(2)
                
                end_nav = "\n\n" + create_navigation_section(filename)
                
                new_section = summary_section + next_chapter_text + end_nav
                content = content.replace(summary_match.group(0), new_section)
        
        # 파일 저장
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(content)
        
        print(f"✅ {filename} 업데이트 완료")
        
    except Exception as e:
        print(f"❌ {filename} 처리 중 오류: {e}")

def main():
    """메인 함수"""
    base_dir = r"c:\Users\smile\Documents\강의\20250610 양주청년\react-remote\docs\chapters"
    
    print("📚 챕터 네비게이션 링크 자동 추가 시작...")
    
    for chapter_file, title, prev_file, next_file in chapters:
        filepath = os.path.join(base_dir, chapter_file)
        if os.path.exists(filepath):
            process_chapter_file(filepath, chapter_file)
        else:
            print(f"⚠️  파일을 찾을 수 없음: {chapter_file}")
    
    print("\n🎉 모든 챕터 네비게이션 링크 추가 완료!")

if __name__ == "__main__":
    main()
