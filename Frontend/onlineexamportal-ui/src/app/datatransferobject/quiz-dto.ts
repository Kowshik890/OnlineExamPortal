export interface QuizDTO {
    title: string;
    description: string;
    maxMarks: number;
    numberOfQuestions: number;
    active: boolean;
    category: {
        id: number;
    }
}