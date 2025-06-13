# Chapter 15: CRUD 작업 - Update와 Delete 기능

## 학습 목표
- HTTP PUT/PATCH 요청을 통한 데이터 수정 (Update)
- HTTP DELETE 요청을 통한 데이터 삭제 (Delete)
- 부분 업데이트와 전체 업데이트의 차이점
- 안전한 삭제 패턴과 사용자 경험
- 상태 관리와 UI 동기화 최적화

## 사전 준비사항
- HTTP 메서드 이해 (PUT, PATCH, DELETE)
- JavaScript 객체 조작
- React 상태 관리 기초

---

## 1. Update 작업 - 할 일 수정

### 1.1 updateTodoItem 함수 분석

```javascript
export function updateTodoItem(id, item) {
  return fetch(`http://localhost:5000/todos/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(item),
  }).then(response => {
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.json();
  });
}
```

### 1.2 PUT vs PATCH 차이점

```javascript
// PUT: 전체 리소스 교체
export function updateTodoItemPUT(id, completeItem) {
  return fetch(`http://localhost:5000/todos/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(completeItem) // 전체 객체 전송
  });
}

// PATCH: 부분 리소스 수정
export function updateTodoItemPATCH(id, partialItem) {
  return fetch(`http://localhost:5000/todos/${id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(partialItem) // 변경된 필드만 전송
  });
}
```

### 1.3 실제 사용 예시

```javascript
// 할 일 완료 상태 토글
async function toggleTodoCompletion(todoId, currentStatus) {
  try {
    // 현재 할 일 데이터 조회
    const currentTodo = todos.find(todo => todo.id === todoId);
    
    // 전체 객체 업데이트 (PUT 방식)
    const updatedTodo = {
      ...currentTodo,
      completed: !currentStatus,
      updatedAt: new Date().toISOString()
    };
    
    const result = await updateTodoItem(todoId, updatedTodo);
    
    // UI 상태 업데이트
    setTodos(prevTodos => 
      prevTodos.map(todo => 
        todo.id === todoId ? result : todo
      )
    );
    
  } catch (error) {
    console.error('할 일 상태 변경 실패:', error);
    // 에러 발생 시 사용자에게 알림
    showErrorMessage('상태 변경에 실패했습니다.');
  }
}

// 할 일 제목 수정
async function updateTodoTitle(todoId, newTitle) {
  try {
    // 부분 업데이트 (PATCH 방식)
    const partialUpdate = {
      title: newTitle,
      updatedAt: new Date().toISOString()
    };
    
    const result = await updateTodoItemPATCH(todoId, partialUpdate);
    
    setTodos(prevTodos => 
      prevTodos.map(todo => 
        todo.id === todoId ? { ...todo, ...result } : todo
      )
    );
    
  } catch (error) {
    console.error('제목 수정 실패:', error);
  }
}
```

### 1.4 낙관적 업데이트 (Optimistic Update)

```javascript
async function optimisticToggleTodo(todoId) {
  // 1. UI 먼저 업데이트 (낙관적)
  const originalTodos = todos;
  setTodos(prevTodos => 
    prevTodos.map(todo => 
      todo.id === todoId 
        ? { ...todo, completed: !todo.completed }
        : todo
    )
  );
  
  try {
    // 2. 서버에 실제 요청
    const currentTodo = originalTodos.find(todo => todo.id === todoId);
    const updatedTodo = {
      ...currentTodo,
      completed: !currentTodo.completed,
      updatedAt: new Date().toISOString()
    };
    
    await updateTodoItem(todoId, updatedTodo);
    
  } catch (error) {
    // 3. 실패 시 원래 상태로 되돌리기
    setTodos(originalTodos);
    console.error('업데이트 실패:', error);
    showErrorMessage('변경사항을 저장할 수 없습니다.');
  }
}
```

## 2. Delete 작업 - 할 일 삭제

### 2.1 deleteTodoItem 함수 분석

```javascript
export function deleteTodoItem(id) {
  return fetch(`http://localhost:5000/todos/${id}`, { 
    method: 'DELETE' 
  }).then(response => {
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.json();
  });
}
```

### 2.2 안전한 삭제 패턴

```javascript
// 삭제 확인 후 실행
async function safeDeleteTodo(todoId, todoTitle) {
  // 1. 사용자 확인
  const confirmed = window.confirm(
    `"${todoTitle}"을(를) 정말 삭제하시겠습니까?`
  );
  
  if (!confirmed) {
    return; // 사용자가 취소한 경우
  }
  
  try {
    // 2. 서버에서 삭제
    await deleteTodoItem(todoId);
    
    // 3. UI에서 제거
    setTodos(prevTodos => 
      prevTodos.filter(todo => todo.id !== todoId)
    );
    
    // 4. 성공 피드백
    showSuccessMessage('할 일이 삭제되었습니다.');
    
  } catch (error) {
    console.error('삭제 실패:', error);
    showErrorMessage('삭제에 실패했습니다.');
  }
}

// 더 나은 UX를 위한 모달 확인
function ConfirmDeleteModal({ todo, onConfirm, onCancel }) {
  return (
    <div className="modal-overlay">
      <div className="modal">
        <h3>할 일 삭제</h3>
        <p>"{todo.title}"을(를) 정말 삭제하시겠습니까?</p>
        <div className="modal-actions">
          <button onClick={onCancel} className="btn-secondary">
            취소
          </button>
          <button onClick={onConfirm} className="btn-danger">
            삭제
          </button>
        </div>
      </div>
    </div>
  );
}
```

### 2.3 소프트 삭제 (Soft Delete) 구현

```javascript
// 소프트 삭제: 실제로 삭제하지 않고 삭제 표시만
export function softDeleteTodoItem(id) {
  return fetch(`http://localhost:5000/todos/${id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      deleted: true,
      deletedAt: new Date().toISOString()
    })
  }).then(response => response.json());
}

// 삭제된 항목 복구
export function restoreTodoItem(id) {
  return fetch(`http://localhost:5000/todos/${id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      deleted: false,
      deletedAt: null
    })
  }).then(response => response.json());
}

// 컴포넌트에서 사용
async function handleSoftDelete(todoId) {
  try {
    await softDeleteTodoItem(todoId);
    
    // UI에서 일시적으로 숨기기
    setTodos(prevTodos => 
      prevTodos.map(todo => 
        todo.id === todoId 
          ? { ...todo, deleted: true }
          : todo
      )
    );
    
    // 복구 옵션과 함께 알림 표시
    showUndoNotification(
      '할 일이 삭제되었습니다.',
      () => handleRestore(todoId)
    );
    
  } catch (error) {
    console.error('삭제 실패:', error);
  }
}
```

### 2.4 배치 삭제 구현

```javascript
// 여러 항목 동시 삭제
export function deleteMultipleTodos(ids) {
  return fetch('http://localhost:5000/todos/batch-delete', {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ ids })
  }).then(response => response.json());
}

// 선택된 항목들 삭제
async function deleteSelectedTodos() {
  const selectedIds = todos
    .filter(todo => todo.selected)
    .map(todo => todo.id);
  
  if (selectedIds.length === 0) {
    showWarningMessage('삭제할 항목을 선택해주세요.');
    return;
  }
  
  const confirmed = window.confirm(
    `선택된 ${selectedIds.length}개 항목을 삭제하시겠습니까?`
  );
  
  if (!confirmed) return;
  
  try {
    await deleteMultipleTodos(selectedIds);
    
    setTodos(prevTodos => 
      prevTodos.filter(todo => !selectedIds.includes(todo.id))
    );
    
    showSuccessMessage(`${selectedIds.length}개 항목이 삭제되었습니다.`);
    
  } catch (error) {
    console.error('배치 삭제 실패:', error);
    showErrorMessage('삭제에 실패했습니다.');
  }
}
```

## 3. 고급 업데이트 패턴

### 3.1 부분 업데이트 최적화

```javascript
// 변경된 필드만 감지해서 업데이트
function createPartialUpdate(original, updated) {
  const changes = {};
  
  Object.keys(updated).forEach(key => {
    if (original[key] !== updated[key]) {
      changes[key] = updated[key];
    }
  });
  
  // 변경사항이 없으면 null 반환
  return Object.keys(changes).length > 0 ? changes : null;
}

async function smartUpdateTodo(todoId, newData) {
  const originalTodo = todos.find(todo => todo.id === todoId);
  const changes = createPartialUpdate(originalTodo, newData);
  
  if (!changes) {
    console.log('변경사항이 없습니다.');
    return;
  }
  
  try {
    // 변경된 필드만 전송
    const result = await updateTodoItemPATCH(todoId, {
      ...changes,
      updatedAt: new Date().toISOString()
    });
    
    setTodos(prevTodos => 
      prevTodos.map(todo => 
        todo.id === todoId ? { ...todo, ...result } : todo
      )
    );
    
  } catch (error) {
    console.error('업데이트 실패:', error);
  }
}
```

### 3.2 실시간 협업 지원

```javascript
// 다른 사용자의 변경사항 감지
function handleRemoteUpdate(updatedTodo) {
  setTodos(prevTodos => {
    const existingTodo = prevTodos.find(todo => todo.id === updatedTodo.id);
    
    // 로컬 변경사항과 충돌 확인
    if (existingTodo && existingTodo.updatedAt > updatedTodo.updatedAt) {
      // 충돌 해결 UI 표시
      showConflictResolver(existingTodo, updatedTodo);
      return prevTodos;
    }
    
    // 충돌이 없으면 업데이트 적용
    return prevTodos.map(todo => 
      todo.id === updatedTodo.id ? updatedTodo : todo
    );
  });
}

// 충돌 해결 컴포넌트
function ConflictResolver({ localVersion, remoteVersion, onResolve }) {
  return (
    <div className="conflict-modal">
      <h3>변경사항 충돌</h3>
      <div className="versions">
        <div className="local-version">
          <h4>내 변경사항</h4>
          <p>{localVersion.title}</p>
          <button onClick={() => onResolve(localVersion)}>
            내 것으로 유지
          </button>
        </div>
        <div className="remote-version">
          <h4>다른 사용자 변경사항</h4>
          <p>{remoteVersion.title}</p>
          <button onClick={() => onResolve(remoteVersion)}>
            상대방 것으로 변경
          </button>
        </div>
      </div>
    </div>
  );
}
```

### 3.3 오프라인 지원

```javascript
// 오프라인 큐를 사용한 지연 업데이트
class OfflineQueue {
  constructor() {
    this.queue = JSON.parse(localStorage.getItem('offlineQueue') || '[]');
    this.isOnline = navigator.onLine;
    
    window.addEventListener('online', () => {
      this.isOnline = true;
      this.processQueue();
    });
    
    window.addEventListener('offline', () => {
      this.isOnline = false;
    });
  }
  
  addOperation(operation) {
    this.queue.push({
      ...operation,
      timestamp: Date.now(),
      id: Math.random().toString(36)
    });
    
    localStorage.setItem('offlineQueue', JSON.stringify(this.queue));
    
    if (this.isOnline) {
      this.processQueue();
    }
  }
  
  async processQueue() {
    while (this.queue.length > 0 && this.isOnline) {
      const operation = this.queue[0];
      
      try {
        await this.executeOperation(operation);
        this.queue.shift();
        localStorage.setItem('offlineQueue', JSON.stringify(this.queue));
      } catch (error) {
        console.error('오프라인 작업 실행 실패:', error);
        break;
      }
    }
  }
  
  async executeOperation(operation) {
    switch (operation.type) {
      case 'UPDATE':
        return updateTodoItem(operation.id, operation.data);
      case 'DELETE':
        return deleteTodoItem(operation.id);
      case 'CREATE':
        return createTodoItem(operation.data);
      default:
        throw new Error(`알 수 없는 작업 타입: ${operation.type}`);
    }
  }
}

const offlineQueue = new OfflineQueue();

// 오프라인을 고려한 업데이트
async function updateTodoWithOfflineSupport(todoId, data) {
  if (navigator.onLine) {
    try {
      return await updateTodoItem(todoId, data);
    } catch (error) {
      // 네트워크 오류 시 큐에 추가
      offlineQueue.addOperation({
        type: 'UPDATE',
        id: todoId,
        data
      });
      throw error;
    }
  } else {
    // 오프라인 시 큐에 추가
    offlineQueue.addOperation({
      type: 'UPDATE',
      id: todoId,
      data
    });
    
    // 로컬 상태만 업데이트
    setTodos(prevTodos => 
      prevTodos.map(todo => 
        todo.id === todoId ? { ...todo, ...data } : todo
      )
    );
  }
}
```

## 4. 실습 과제

### 과제 1: 인라인 편집 기능

```javascript
function EditableTodoItem({ todo, onUpdate }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(todo.title);
  
  const handleSave = async () => {
    if (editTitle.trim() === '') {
      alert('제목을 입력해주세요.');
      return;
    }
    
    if (editTitle === todo.title) {
      setIsEditing(false);
      return;
    }
    
    try {
      await onUpdate(todo.id, { title: editTitle });
      setIsEditing(false);
    } catch (error) {
      alert('수정에 실패했습니다.');
      setEditTitle(todo.title); // 원래 값으로 복원
    }
  };
  
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSave();
    } else if (e.key === 'Escape') {
      setEditTitle(todo.title);
      setIsEditing(false);
    }
  };
  
  return (
    <div className="todo-item">
      {isEditing ? (
        <input
          value={editTitle}
          onChange={(e) => setEditTitle(e.target.value)}
          onBlur={handleSave}
          onKeyPress={handleKeyPress}
          autoFocus
        />
      ) : (
        <span onDoubleClick={() => setIsEditing(true)}>
          {todo.title}
        </span>
      )}
    </div>
  );
}
```

### 과제 2: 실행 취소/다시 실행 기능

```javascript
class UndoRedoManager {
  constructor() {
    this.history = [];
    this.currentIndex = -1;
    this.maxHistory = 50;
  }
  
  addAction(action) {
    // 현재 위치 이후의 히스토리 제거
    this.history = this.history.slice(0, this.currentIndex + 1);
    
    // 새 액션 추가
    this.history.push(action);
    this.currentIndex++;
    
    // 히스토리 크기 제한
    if (this.history.length > this.maxHistory) {
      this.history.shift();
      this.currentIndex--;
    }
  }
  
  canUndo() {
    return this.currentIndex >= 0;
  }
  
  canRedo() {
    return this.currentIndex < this.history.length - 1;
  }
  
  undo() {
    if (!this.canUndo()) return null;
    
    const action = this.history[this.currentIndex];
    this.currentIndex--;
    return action;
  }
  
  redo() {
    if (!this.canRedo()) return null;
    
    this.currentIndex++;
    const action = this.history[this.currentIndex];
    return action;
  }
}

const undoManager = new UndoRedoManager();

// 실행 취소 가능한 삭제
async function deleteTodoWithUndo(todoId) {
  const todoToDelete = todos.find(todo => todo.id === todoId);
  
  try {
    await deleteTodoItem(todoId);
    
    // UI에서 제거
    setTodos(prevTodos => prevTodos.filter(todo => todo.id !== todoId));
    
    // 실행 취소 히스토리에 추가
    undoManager.addAction({
      type: 'DELETE',
      data: todoToDelete,
      undo: () => createTodoItem(todoToDelete),
      redo: () => deleteTodoItem(todoId)
    });
    
  } catch (error) {
    console.error('삭제 실패:', error);
  }
}
```

### 과제 3: 버전 관리 시스템

```javascript
// 할 일 항목의 버전 히스토리 관리
export function getTodoHistory(todoId) {
  return fetch(`http://localhost:5000/todos/${todoId}/history`)
    .then(response => response.json());
}

export function revertToVersion(todoId, versionId) {
  return fetch(`http://localhost:5000/todos/${todoId}/revert`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ versionId })
  }).then(response => response.json());
}

function TodoHistoryModal({ todoId, onClose }) {
  const [history, setHistory] = useState([]);
  
  useEffect(() => {
    getTodoHistory(todoId).then(setHistory);
  }, [todoId]);
  
  const handleRevert = async (versionId) => {
    try {
      await revertToVersion(todoId, versionId);
      onClose();
      // 목록 새로고침
    } catch (error) {
      alert('버전 복원에 실패했습니다.');
    }
  };
  
  return (
    <div className="history-modal">
      <h3>변경 이력</h3>
      <div className="history-list">
        {history.map(version => (
          <div key={version.id} className="history-item">
            <div className="version-info">
              <span>{version.title}</span>
              <span>{new Date(version.createdAt).toLocaleString()}</span>
            </div>
            <button onClick={() => handleRevert(version.id)}>
              이 버전으로 복원
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
```

## 요약

이번 장에서는 Update와 Delete CRUD 작업을 통해 다음 개념들을 학습했습니다:

1. **HTTP PUT/PATCH 요청**: 전체 업데이트와 부분 업데이트의 차이점
2. **HTTP DELETE 요청**: 안전한 삭제 패턴과 사용자 경험 고려
3. **낙관적 업데이트**: UI 응답성 향상을 위한 선행 업데이트
4. **소프트 삭제**: 데이터 복구 가능성을 고려한 삭제 방식
5. **고급 패턴**: 충돌 해결, 오프라인 지원, 실행 취소 기능

## 다음 장 미리보기

다음 장에서는 server.js와 database.json을 분석하며 다음 내용을 학습합니다:
- Node.js Express 서버 구조
- JSON 파일을 데이터베이스로 사용하기
- RESTful API 엔드포인트 구현
- CORS 설정과 미들웨어
- 개발 서버와 프로덕션 환경

---

💡 **추가 학습 자료**
- [MDN - HTTP PATCH 메서드](https://developer.mozilla.org/ko/docs/Web/HTTP/Methods/PATCH)
- [RESTful API 설계 모범 사례](https://restfulapi.net/rest-api-design-tutorial-with-example/)
- [JavaScript 상태 관리 패턴](https://ko.javascript.info/object-copy)
