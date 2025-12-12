export interface SurveyForm {
    id?: number;
    created_date: string;
    expire_date: string;
    questions: Question[];
}

export interface Question {
    id?: number;
    questionText: string;
    questionType: 'single' | 'multiple';  //telling ts what value are allowed, called literal type
    showDirection: 'vertical' | 'horizontal';
    answers: Answer[];
}

export interface Answer {
    answerText: string;
}