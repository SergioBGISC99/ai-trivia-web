export interface QuestionResponse {
  id: string;
  question: string;
  answers: string[];
  yourAnswer: number;
  correctAnswer: number;
  isCorrect?: boolean;
}
