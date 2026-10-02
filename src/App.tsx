import { useState, useEffect } from 'react';
import { TabType, FamilyMember, TaskItem, MeetingRecord } from './types';
import {
  ACTIVITIES_DATA,
  BOOK_STORIES,
  INITIAL_TASKS
} from './data/initialData';
import { Navbar } from './components/Navbar';
import { FamilyModal } from './components/FamilyModal';
import { CustomDialog } from './components/CustomDialog';
import { HomeTab } from './components/tabs/HomeTab';
import { DailyTab } from './components/tabs/DailyTab';
import { BookTab } from './components/tabs/BookTab';
import { CommunicationTab } from './components/tabs/CommunicationTab';
import { TasksTab } from './components/tabs/TasksTab';
import { MeetingTab } from './components/tabs/MeetingTab';
import { Heart } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<TabType>('home');
  const [isFamilyModalOpen, setIsFamilyModalOpen] = useState(false);
  const [isFirstTime, setIsFirstTime] = useState(false);

  // Dialog state for notifications/confirmations
  const [dialogState, setDialogState] = useState<{
    isOpen: boolean;
    title: string;
    description: string;
    onConfirm: () => void;
  }>({
    isOpen: false,
    title: '',
    description: '',
    onConfirm: () => {}
  });

  // 1. Family Members State with LocalStorage
  const [familyMembers, setFamilyMembers] = useState<FamilyMember[]>(() => {
    try {
      const saved = localStorage.getItem('aile_baglari_members');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch {
      // fallback
    }
    return [
      { id: '1', name: 'Anne', role: 'Ebeveyn', avatarColor: 'amber' },
      { id: '2', name: 'Baba', role: 'Ebeveyn', avatarColor: 'emerald' },
      { id: '3', name: 'Çocuk', role: 'Öğrenci', avatarColor: 'sky' }
    ];
  });

  // Check if first time setup is needed
  useEffect(() => {
    try {
      const seen = localStorage.getItem('aile_baglari_has_seen_welcome');
      if (!seen) {
        setIsFamilyModalOpen(true);
        setIsFirstTime(true);
        localStorage.setItem('aile_baglari_has_seen_welcome', 'true');
      }
    } catch {
      // noop
    }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem('aile_baglari_members', JSON.stringify(familyMembers));
    } catch {
      // noop
    }
  }, [familyMembers]);

  // 2. Tasks State with LocalStorage
  const [tasks, setTasks] = useState<TaskItem[]>(() => {
    try {
      const saved = localStorage.getItem('aile_baglari_tasks');
      if (saved) return JSON.parse(saved);
    } catch {
      // fallback
    }
    return INITIAL_TASKS;
  });

  useEffect(() => {
    try {
      localStorage.setItem('aile_baglari_tasks', JSON.stringify(tasks));
    } catch {
      // noop
    }
  }, [tasks]);

  // 3. Meetings State with LocalStorage
  const [meetings, setMeetings] = useState<MeetingRecord[]>(() => {
    try {
      const saved = localStorage.getItem('aile_baglari_meetings');
      if (saved) return JSON.parse(saved);
    } catch {
      // fallback
    }
    return [
      {
        id: 1,
        date: '28 Eylül 2026',
        reporter: 'Anne',
        attendees: ['Anne', 'Baba', 'Çocuk'],
        issues: 'Bu hafta akşamları yemek sofrasında herkesin gününü anlatması çok iyi geldi. Tek sorun, akşam saat 21:00\'den sonra ekran sürelerimizin biraz uzamış olması.',
        decisions: '1. Hafta içi saat 21:30\'dan sonra tüm telefonlar sepete konacak.\n2. Kitabımızdaki "Mirasın Gerçek Sahibi" hikayesi ailecek okunacak.\n3. Pazar sabahı menemen yapımını çocuk üstlenecek.',
        treatNote: 'Ihlamur çayı ve tarçınlı elmalı kurabiye'
      }
    ];
  });

  useEffect(() => {
    try {
      localStorage.setItem('aile_baglari_meetings', JSON.stringify(meetings));
    } catch {
      // noop
    }
  }, [meetings]);

  // 4. Completed Activity Ids State with LocalStorage
  const [completedActivityIds, setCompletedActivityIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('aile_baglari_completed_activities');
      if (saved) return JSON.parse(saved);
    } catch {
      // fallback
    }
    return ['act-1'];
  });

  useEffect(() => {
    try {
      localStorage.setItem(
        'aile_baglari_completed_activities',
        JSON.stringify(completedActivityIds)
      );
    } catch {
      // noop
    }
  }, [completedActivityIds]);

  // 5. Story Reflection Notes State with LocalStorage
  const [storyNotes, setStoryNotes] = useState<Record<string, string>>(() => {
    try {
      const saved = localStorage.getItem('aile_baglari_story_notes');
      if (saved) return JSON.parse(saved);
    } catch {
      // fallback
    }
    return {
      'story-0': 'Önsözü okuduk; evimizi sadece bir bina değil, birbirimize şefkatle sığındığımız bir ocak kılmaya karar verdik.'
    };
  });

  useEffect(() => {
    try {
      localStorage.setItem('aile_baglari_story_notes', JSON.stringify(storyNotes));
    } catch {
      // noop
    }
  }, [storyNotes]);

  // Member Handlers
  const handleAddMember = (name: string, role?: string) => {
    const newMember: FamilyMember = {
      id: Date.now().toString(),
      name,
      role,
      avatarColor: 'amber'
    };
    setFamilyMembers((prev) => [...prev, newMember]);
  };

  const handleRemoveMember = (id: string) => {
    setFamilyMembers((prev) => prev.filter((m) => m.id !== id));
  };

  // Activity Handlers
  const handleToggleActivity = (id: string) => {
    setCompletedActivityIds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  // Task Handlers
  const handleAddTask = (
    text: string,
    priority: 'normal' | 'onemli' = 'normal',
    assignee?: string
  ) => {
    const newTask: TaskItem = {
      id: Date.now(),
      text,
      assignees: assignee ? [assignee] : [],
      done: false,
      priority
    };
    setTasks((prev) => [newTask, ...prev]);
  };

  const handleToggleTask = (id: number) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, done: !t.done } : t))
    );
  };

  const handleDeleteTask = (id: number) => {
    setTasks((prev) => prev.filter((t) => t.id !== id));
  };

  const handleAssignMember = (taskId: number, memberName: string) => {
    setTasks((prev) =>
      prev.map((t) => {
        if (t.id === taskId && !t.assignees.includes(memberName)) {
          return { ...t, assignees: [...t.assignees, memberName] };
        }
        return t;
      })
    );
  };

  const handleRemoveAssignee = (taskId: number, memberName: string) => {
    setTasks((prev) =>
      prev.map((t) => {
        if (t.id === taskId) {
          return { ...t, assignees: t.assignees.filter((n) => n !== memberName) };
        }
        return t;
      })
    );
  };

  // Meeting Handlers
  const handleSaveMeeting = (newMeeting: Omit<MeetingRecord, 'id'>) => {
    const created: MeetingRecord = {
      ...newMeeting,
      id: Date.now()
    };
    setMeetings((prev) => [created, ...prev]);
  };

  const handleDeleteMeeting = (id: number) => {
    setDialogState({
      isOpen: true,
      title: 'Toplantı Tutanağını Sil',
      description: 'Bu haftalık toplantı tutanağını silmek istediğinize emin misiniz? Bu işlem geri alınamaz.',
      onConfirm: () => {
        setMeetings((prev) => prev.filter((m) => m.id !== id));
        setDialogState((prev) => ({ ...prev, isOpen: false }));
      }
    });
  };

  // Story Notes Handlers
  const handleSaveStoryNote = (storyId: string, note: string) => {
    setStoryNotes((prev) => ({
      ...prev,
      [storyId]: note
    }));
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF7F2] text-stone-800">
      {/* Top Bar Navigation (Strict 3-Zone Contract) */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        familyMembers={familyMembers}
        onOpenFamilyModal={() => {
          setIsFirstTime(false);
          setIsFamilyModalOpen(true);
        }}
      />

      {/* Main Workspace Frame */}
      <main className="flex-grow max-w-6xl w-full mx-auto px-4 sm:px-6 py-8 sm:py-10">
        {activeTab === 'home' && (
          <HomeTab
            setActiveTab={setActiveTab}
            familyMembers={familyMembers}
            activities={ACTIVITIES_DATA}
            tasks={tasks}
            meetings={meetings}
            completedActivityIds={completedActivityIds}
          />
        )}

        {activeTab === 'daily' && (
          <DailyTab
            activities={ACTIVITIES_DATA}
            completedActivityIds={completedActivityIds}
            onToggleComplete={handleToggleActivity}
          />
        )}

        {activeTab === 'book' && (
          <BookTab
            stories={BOOK_STORIES}
            storyNotes={storyNotes}
            onSaveStoryNote={handleSaveStoryNote}
          />
        )}

        {activeTab === 'chat' && <CommunicationTab />}

        {activeTab === 'tasks' && (
          <TasksTab
            tasks={tasks}
            familyMembers={familyMembers}
            onAddTask={handleAddTask}
            onToggleTask={handleToggleTask}
            onDeleteTask={handleDeleteTask}
            onAssignMember={handleAssignMember}
            onRemoveAssignee={handleRemoveAssignee}
          />
        )}

        {activeTab === 'meeting' && (
          <MeetingTab
            meetings={meetings}
            familyMembers={familyMembers}
            onSaveMeeting={handleSaveMeeting}
            onDeleteMeeting={handleDeleteMeeting}
          />
        )}
      </main>

      {/* Footer */}
      <footer className="mt-auto border-t border-stone-200/80 bg-white/70 py-8">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-stone-500">
          <div className="flex items-center gap-2">
            <span className="font-serif font-bold text-stone-900 text-sm">
              Aile Bağları
            </span>
            <span aria-hidden="true">·</span>
            <span>"Aile Dediğin" Kitap & İletişim Platformu</span>
          </div>

          <div className="flex items-center gap-1.5 text-stone-400">
            <span>Sevgiyle paylaşıldıkça çoğalan bir yuva için</span>
            <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" />
          </div>
        </div>
      </footer>

      {/* Family Roster / Onboarding Modal */}
      <FamilyModal
        isOpen={isFamilyModalOpen}
        onClose={() => setIsFamilyModalOpen(false)}
        familyMembers={familyMembers}
        onAddMember={handleAddMember}
        onRemoveMember={handleRemoveMember}
        isFirstTime={isFirstTime}
      />

      {/* Custom Confirmation / Alert Dialog */}
      <CustomDialog
        isOpen={dialogState.isOpen}
        title={dialogState.title}
        description={dialogState.description}
        onConfirm={dialogState.onConfirm}
        onCancel={() => setDialogState((prev) => ({ ...prev, isOpen: false }))}
      />
    </div>
  );
}
