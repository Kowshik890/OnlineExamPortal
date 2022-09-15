export interface QuestionDTO {
    content: string;
    option1: string;
    option2: string;
    option3: string;
    option4: string;
    answer: string;
    image: string;
    quiz: {
        id: number;
    }
}