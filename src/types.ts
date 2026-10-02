export interface FamilyMember {
  id: string;
  name: string;
  role?: string;
  avatarColor: string;
}

export interface Activity {
  id: string;
  day: string;
  dayShort: string;
  title: string;
  category: 'Oyun' | 'Sohbet' | 'Etkinlik';
  duration: string;
  iconName: string;
  desc: string;
  rules: string[];
  benefit: string;
}

export interface BookStory {
  id: string;
  title: string;
  author: string;
  intro: string;
  fullText?: string;
  chatTopic: string;
  questions: string[];
  keyTheme: string;
}

export interface MeetingRecord {
  id: number;
  date: string;
  reporter: string;
  attendees: string[];
  issues: string;
  decisions: string;
  treatNote?: string;
}

export interface TaskItem {
  id: number;
  text: string;
  assignees: string[];
  done: boolean;
  priority: 'normal' | 'onemli';
  category?: string;
}

export type TabType = 'home' | 'daily' | 'book' | 'chat' | 'tasks' | 'meeting';
