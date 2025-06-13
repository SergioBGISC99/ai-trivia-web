import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { QuestionResponse } from '../models/question.response';

@Injectable({
  providedIn: 'root',
})
export class GeminiService {
  private http = inject(HttpClient);
  private apiUrl = `${environment.apiUrl}/gemini/question`;

  generateQuestion(topic: string): Observable<QuestionResponse> {
    const encodedTopic = encodeURIComponent(topic.trim());
    return this.http.get<QuestionResponse>(`${this.apiUrl}/${encodedTopic}`);
  }
}
