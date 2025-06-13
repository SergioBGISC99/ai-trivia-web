import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
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
    return this.http
      .get<QuestionResponse>(`${this.apiUrl}/gemini/question/${encodedTopic}`)
      .pipe(
        catchError((err: HttpErrorResponse) => {
          if (err.status === 503) {
            return this.http.get<QuestionResponse>(
              `${this.apiUrl}/gpt/question/${encodedTopic}`
            );
          }

          return throwError(() => err);
        })
      );
  }
}
