import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { QuestionResponse } from '../models/question.response';

@Injectable({
  providedIn: 'root',
})
export class AiService {
  private http = inject(HttpClient);
  private apiUrl = `${environment.apiUrl}`;

  generateGeminiQuestion(topic: string): Observable<QuestionResponse> {
    const encodedTopic = encodeURIComponent(topic.trim());
    return this.http.get<QuestionResponse>(
      `${this.apiUrl}/gemini/question/${encodedTopic}`
    );
  }

  generateOpenAIQuestion(topic: string): Observable<QuestionResponse> {
    const encodedTopic = encodeURIComponent(topic.trim());
    return this.http.get<QuestionResponse>(
      `${this.apiUrl}/gpt/question/${encodedTopic}`
    );
  }

  validateAnswer(
    answerIndex: number,
    questionId: string
  ): Observable<QuestionResponse> {
    return this.http.post<QuestionResponse>(
      `${this.apiUrl}/question/check-answer`,
      {
        answerIndex: answerIndex.toString(),
        questionId: questionId,
      }
    );
  }
}
