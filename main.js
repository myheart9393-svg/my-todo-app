const STORAGE_KEY = 'todos';

// LocalStorage에서 불러오기
function load() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
  } catch {
    return [];
  }
}

// LocalStorage에 저장
function save() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
}

// 메모리 내 할 일 목록
let todos = load();

// 기존 항목 중 가장 큰 id + 1 로 초기화
let nextId = todos.length ? Math.max(...todos.map((t) => t.id)) + 1 : 1;

// 현재 선택된 필터 ('all' | 'active' | 'completed')
let currentFilter = 'all';

// DOM 요소 참조
let todoInput;
let addBtn;
let todoList;
let countTotal;
let countDone;
let clearDoneBtn;
let filterBtns;

function initApp() {
  todoInput    = document.querySelector('.todo-input');
  addBtn       = document.querySelector('.add-btn');
  todoList     = document.querySelector('.todo-list');
  countTotal   = document.querySelector('.count-total');
  countDone    = document.querySelector('.count-done');
  clearDoneBtn = document.querySelector('.clear-done-btn');
  filterBtns   = document.querySelectorAll('.filter-btn');

  // 추가 버튼 클릭
  addBtn.addEventListener('click', handleAdd);

  // Enter 키로도 추가
  todoInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') handleAdd();
  });

  // 필터 버튼 클릭
  filterBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      currentFilter = btn.dataset.filter;
      render();
    });
  });

  // 완료 항목 일괄 삭제
  clearDoneBtn.addEventListener('click', () => {
    todos = todos.filter((t) => !t.completed);
    save();
    render();
  });

  // 초기 렌더링
  render();
}

// 할 일 추가 처리
function handleAdd() {
  const text = todoInput.value.trim();

  if (!text) {
    alert('할 일을 입력하세요');
    todoInput.focus();
    return;
  }

  // 중복 검사 (대소문자 무시)
  const isDuplicate = todos.some(
    (t) => t.text.toLowerCase() === text.toLowerCase()
  );
  if (isDuplicate) {
    alert('이미 등록된 할 일입니다');
    todoInput.focus();
    return;
  }

  todos.push({ id: nextId++, text, completed: false });
  todoInput.value = '';
  todoInput.focus();

  save();
  render();
}

// 완료/미완료 토글
function handleToggle(id) {
  const todo = todos.find((t) => t.id === id);
  if (todo) todo.completed = !todo.completed;
  save();
  render();
}

// 항목 삭제
function handleDelete(id) {
  todos = todos.filter((t) => t.id !== id);
  save();
  render();
}

// 현재 필터에 맞는 항목 반환
function getFiltered() {
  if (currentFilter === 'active')    return todos.filter((t) => !t.completed);
  if (currentFilter === 'completed') return todos.filter((t) => t.completed);
  return todos;
}

// 개수 및 버튼 상태 업데이트
function updateUI() {
  const done = todos.filter((t) => t.completed).length;
  countTotal.textContent = `전체 ${todos.length}개`;
  countDone.textContent  = `완료 ${done}개`;

  // 완료 항목 없으면 일괄 삭제 버튼 비활성화
  clearDoneBtn.disabled = done === 0;

  // 선택된 필터 버튼 강조
  filterBtns.forEach((btn) => {
    btn.classList.toggle('active', btn.dataset.filter === currentFilter);
  });
}

// 목록 전체를 다시 그리기
function render() {
  todoList.innerHTML = '';

  getFiltered().forEach((todo) => {
    const li = document.createElement('li');
    li.className = 'todo-item' + (todo.completed ? ' completed' : '');

    // 체크박스
    const checkbox = document.createElement('input');
    checkbox.type      = 'checkbox';
    checkbox.className = 'todo-checkbox';
    checkbox.checked   = todo.completed;
    checkbox.addEventListener('change', () => handleToggle(todo.id));

    // 텍스트
    const span = document.createElement('span');
    span.className   = 'todo-text';
    span.textContent = todo.text;

    // 삭제 버튼
    const deleteBtn = document.createElement('button');
    deleteBtn.className   = 'delete-btn';
    deleteBtn.textContent = '×';
    deleteBtn.addEventListener('click', () => handleDelete(todo.id));

    li.appendChild(checkbox);
    li.appendChild(span);
    li.appendChild(deleteBtn);
    todoList.appendChild(li);
  });

  updateUI();
}

document.addEventListener('DOMContentLoaded', initApp);
