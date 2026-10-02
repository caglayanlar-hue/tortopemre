import React, { useState } from 'react';
import { TaskItem, FamilyMember } from '../../types';
import {
  ClipboardList,
  Plus,
  Trash2,
  CheckCircle2,
  Users,
  Check
} from 'lucide-react';

interface TasksTabProps {
  tasks: TaskItem[];
  familyMembers: FamilyMember[];
  onAddTask: (text: string, priority?: 'normal' | 'onemli', assignee?: string) => void;
  onToggleTask: (id: number) => void;
  onDeleteTask: (id: number) => void;
  onAssignMember: (taskId: number, memberName: string) => void;
  onRemoveAssignee: (taskId: number, memberName: string) => void;
}

export const TasksTab: React.FC<TasksTabProps> = ({
  tasks,
  familyMembers,
  onAddTask,
  onToggleTask,
  onDeleteTask,
  onAssignMember,
  onRemoveAssignee
}) => {
  const [newTaskText, setNewTaskText] = useState('');
  const [newPriority, setNewPriority] = useState<'normal' | 'onemli'>('normal');
  const [selectedAssignee, setSelectedAssignee] = useState('');
  const [filterMode, setFilterMode] = useState<'all' | 'active' | 'completed'>('all');
  const [activeAssigneeDropdown, setActiveAssigneeDropdown] = useState<number | null>(null);

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTaskText.trim()) return;
    onAddTask(newTaskText.trim(), newPriority, selectedAssignee || undefined);
    setNewTaskText('');
    setSelectedAssignee('');
    setNewPriority('normal');
  };

  const filteredTasks = tasks.filter((t) => {
    if (filterMode === 'active') return !t.done;
    if (filterMode === 'completed') return t.done;
    return true;
  });

  // Calculate distribution of tasks among family members
  const memberTaskCounts: Record<string, { total: number; done: number }> = {};
  familyMembers.forEach((m) => {
    memberTaskCounts[m.name] = { total: 0, done: 0 };
  });

  tasks.forEach((t) => {
    t.assignees.forEach((name) => {
      if (!memberTaskCounts[name]) {
        memberTaskCounts[name] = { total: 0, done: 0 };
      }
      memberTaskCounts[name].total += 1;
      if (t.done) memberTaskCounts[name].done += 1;
    });
  });

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-emerald-800 mb-1">
          <ClipboardList className="w-4 h-4 text-emerald-700" />
          <span>Adil Görev & İş Bölümü Panosu</span>
        </div>
        <h1 className="font-serif text-3xl font-bold text-stone-900">
          Yuvayı Birlikte Omuzluyoruz
        </h1>
        <p className="text-sm sm:text-base text-stone-600 mt-1 max-w-3xl">
          Ev işlerini ve günlük sorumlulukları adilce paylaşmak; hem yorgunluğu azaltır hem de ailede
          "biz olma" ve dayanışma duygusunu perçinler.
        </p>
      </div>

      {/* Task Distribution / Fair Balance Bar */}
      {familyMembers.length > 0 && (
        <div className="bg-white rounded-3xl border border-stone-200/90 shadow-2xs p-5 sm:p-6 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-serif text-base font-bold text-stone-900 flex items-center gap-2">
              <Users className="w-4 h-4 text-emerald-700" />
              <span>Aile İçi Görev Dengesi</span>
            </h3>
            <span className="text-xs text-stone-500">
              Kimin ne kadar görevi var?
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
            {familyMembers.map((member) => {
              const count = memberTaskCounts[member.name] || { total: 0, done: 0 };
              return (
                <div
                  key={member.id}
                  className="bg-stone-50 rounded-2xl p-3 border border-stone-200/80 space-y-1"
                >
                  <p className="text-xs font-semibold text-stone-800 truncate">
                    {member.name}
                  </p>
                  <div className="flex items-baseline gap-1 text-sm font-bold text-stone-900 tabular-nums">
                    <span>{count.done}</span>
                    <span className="text-xs text-stone-400 font-normal">/ {count.total} tamamlandı</span>
                  </div>
                  <div className="w-full bg-stone-200 h-1.5 rounded-full overflow-hidden mt-1.5">
                    <div
                      className="bg-emerald-600 h-full rounded-full transition-all duration-500"
                      style={{
                        width: count.total > 0 ? `${(count.done / count.total) * 100}%` : '0%'
                      }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Main Board Container */}
      <div className="bg-white rounded-3xl border border-stone-200/90 shadow-2xs overflow-hidden">
        {/* New Task Input Bar */}
        <form onSubmit={handleAdd} className="p-5 sm:p-6 bg-stone-50/80 border-b border-stone-200/80">
          <div className="flex flex-col md:flex-row gap-3">
            <input
              type="text"
              value={newTaskText}
              onChange={(e) => setNewTaskText(e.target.value)}
              placeholder="Yeni bir ev veya aile görevi ekleyin (örn: Çamaşırları katlamak, çiçekleri sulamak...)"
              className="flex-grow px-4 py-3 text-sm bg-white border border-stone-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-600/15 focus:border-emerald-600 text-stone-900"
            />

            <select
              value={selectedAssignee}
              onChange={(e) => setSelectedAssignee(e.target.value)}
              className="px-3.5 py-3 text-sm bg-white border border-stone-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-600/15 focus:border-emerald-600 text-stone-700"
            >
              <option value="">Sorumlu Seç (İsteğe Bağlı)</option>
              {familyMembers.map((m) => (
                <option key={m.id} value={m.name}>
                  {m.name}
                </option>
              ))}
            </select>

            <select
              value={newPriority}
              onChange={(e) => setNewPriority(e.target.value as 'normal' | 'onemli')}
              className="px-3.5 py-3 text-sm bg-white border border-stone-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-600/15 focus:border-emerald-600 text-stone-700"
            >
              <option value="normal">Normal Öncelik</option>
              <option value="onemli">Önemli Görev</option>
            </select>

            <button
              type="submit"
              disabled={!newTaskText.trim()}
              className="px-6 py-3 bg-stone-900 hover:bg-stone-800 disabled:opacity-40 text-white rounded-xl text-sm font-semibold transition-all shadow-xs flex items-center justify-center gap-1.5 whitespace-nowrap"
            >
              <Plus className="w-4 h-4" />
              <span>Görev Ekle</span>
            </button>
          </div>
        </form>

        {/* Filter Controls (Segmented clean control) */}
        <div className="px-6 py-3 bg-white border-b border-stone-100 flex items-center justify-between flex-wrap gap-2 text-xs">
          <div className="flex items-center gap-1 p-1 bg-stone-100 rounded-xl">
            <button
              onClick={() => setFilterMode('all')}
              className={`px-3 py-1.5 rounded-lg font-medium transition-colors ${
                filterMode === 'all'
                  ? 'bg-white text-stone-900 shadow-2xs'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              Tümü ({tasks.length})
            </button>
            <button
              onClick={() => setFilterMode('active')}
              className={`px-3 py-1.5 rounded-lg font-medium transition-colors ${
                filterMode === 'active'
                  ? 'bg-white text-stone-900 shadow-2xs'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              Devam Edenler ({tasks.filter((t) => !t.done).length})
            </button>
            <button
              onClick={() => setFilterMode('completed')}
              className={`px-3 py-1.5 rounded-lg font-medium transition-colors ${
                filterMode === 'completed'
                  ? 'bg-white text-stone-900 shadow-2xs'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              Tamamlananlar ({tasks.filter((t) => t.done).length})
            </button>
          </div>

          <span className="text-stone-400">
            Toplam {tasks.length} kayıtlı görev
          </span>
        </div>

        {/* Task List Table */}
        <div className="divide-y divide-stone-100">
          {filteredTasks.length === 0 ? (
            <div className="text-center py-16 text-stone-400 text-sm space-y-2">
              <ClipboardList className="w-8 h-8 mx-auto text-stone-300" />
              <p className="font-serif text-base text-stone-600">Bu filtrede gösterilecek görev yok.</p>
              <p className="text-xs">Yukarıdaki alandan yeni bir ev işi veya aile görevi ekleyebilirsiniz.</p>
            </div>
          ) : (
            filteredTasks.map((task) => {
              const isDropdownOpen = activeAssigneeDropdown === task.id;

              return (
                <div
                  key={task.id}
                  className={`p-4 sm:p-5 flex items-start sm:items-center justify-between gap-4 transition-colors ${
                    task.done ? 'bg-stone-50/50' : 'hover:bg-stone-50/30'
                  }`}
                >
                  {/* Left: Checkbox & Text */}
                  <div className="flex items-start sm:items-center gap-3.5 flex-grow">
                    <button
                      onClick={() => onToggleTask(task.id)}
                      className={`w-6 h-6 rounded-lg border flex items-center justify-center transition-all shrink-0 mt-0.5 sm:mt-0 ${
                        task.done
                          ? 'bg-emerald-600 border-emerald-600 text-white'
                          : 'bg-white border-stone-300 hover:border-emerald-500'
                      }`}
                      aria-label="Görevi tamamla veya geri al"
                    >
                      {task.done && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                    </button>

                    <div className="space-y-1">
                      <p
                        className={`text-sm sm:text-base leading-snug ${
                          task.done
                            ? 'line-through text-stone-400 font-normal'
                            : 'text-stone-900 font-medium'
                        }`}
                      >
                        {task.text}
                      </p>

                      {task.priority === 'onemli' && (
                        <span className="text-[10px] text-amber-700 font-semibold tracking-wider uppercase">
                          • Önemli Görev
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Right: Assignees & Delete */}
                  <div className="flex items-center gap-3 shrink-0">
                    {/* Assignee badges and add button */}
                    <div className="relative flex items-center gap-1.5 flex-wrap justify-end">
                      {task.assignees.map((name) => (
                        <span
                          key={name}
                          className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-medium bg-stone-100 text-stone-800 border border-stone-200"
                        >
                          <span>{name}</span>
                          <button
                            onClick={() => onRemoveAssignee(task.id, name)}
                            className="text-stone-400 hover:text-rose-600 transition-colors"
                            title="Atamayı kaldır"
                          >
                            ×
                          </button>
                        </span>
                      ))}

                      {/* Add Assignee Trigger */}
                      <div className="relative">
                        <button
                          type="button"
                          onClick={() =>
                            setActiveAssigneeDropdown(isDropdownOpen ? null : task.id)
                          }
                          className="px-2 py-1 text-xs text-stone-500 hover:text-stone-800 bg-stone-50 hover:bg-stone-100 border border-dashed border-stone-300 rounded-lg transition-colors flex items-center gap-1"
                          title="Sorumlu Kişi Ekle"
                        >
                          <Plus className="w-3 h-3" />
                          <span className="hidden sm:inline">Kişi Ata</span>
                        </button>

                        {/* Assignee Selection Popup */}
                        {isDropdownOpen && (
                          <div className="absolute right-0 top-full mt-1 w-44 bg-white border border-stone-200 rounded-xl shadow-lg p-1.5 z-20 space-y-0.5 animate-in fade-in zoom-in-95 duration-150">
                            <div className="px-2 py-1 text-[10px] font-semibold text-stone-400 uppercase tracking-wider">
                              Aile Üyesi Ata:
                            </div>
                            {familyMembers.length === 0 ? (
                              <div className="px-2 py-1 text-xs text-stone-400 italic">
                                Kayıtlı üye yok
                              </div>
                            ) : (
                              familyMembers.map((m) => {
                                const isAssigned = task.assignees.includes(m.name);
                                return (
                                  <button
                                    key={m.id}
                                    onClick={() => {
                                      if (!isAssigned) {
                                        onAssignMember(task.id, m.name);
                                      }
                                      setActiveAssigneeDropdown(null);
                                    }}
                                    className={`w-full text-left px-2.5 py-1.5 text-xs rounded-lg transition-colors flex items-center justify-between ${
                                      isAssigned
                                        ? 'bg-emerald-50 text-emerald-800 font-semibold cursor-default'
                                        : 'hover:bg-stone-50 text-stone-700'
                                    }`}
                                  >
                                    <span>{m.name}</span>
                                    {isAssigned && (
                                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                                    )}
                                  </button>
                                );
                              })
                            )}
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Delete Task */}
                    <button
                      onClick={() => onDeleteTask(task.id)}
                      className="p-1.5 text-stone-300 hover:text-rose-600 rounded-lg transition-colors"
                      title="Görevi Sil"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
};
