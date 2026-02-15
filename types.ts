
export interface CourseModule {
  id: string;
  title: string;
  description: string;
  icon: string;
  duration: string;
}

export interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}

export interface FAQ {
  question: string;
  answer: string;
}
