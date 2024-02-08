import { axiosInstance } from "@/code/api";
import { defineStore } from "pinia";
import { computed, reactive, ref } from "vue";
import { useRouter } from "vue-router";
import type { Question } from "@/model/Question";

export const useQuestionsStore = defineStore("questions", () => {
  const router = useRouter();
  let questions = reactive<Question[]>([]);
  const isLoading = ref(false);
  const error = ref<string | null>(null);

  const LS_QUESTIONS = "questions";

  const totalQuestions = computed<number>(() => questions.length);


  async function saveGameHistory(score: number, timestamp: Date) {
    const gameHistory = JSON.parse(localStorage.getItem('gameHistory') || "[]");

    gameHistory.push({
      score: score,
      timestamp: timestamp
    });

    localStorage.setItem('gameHistory', JSON.stringify(gameHistory));

    return {
      saveGameHistory,
    };
  }



  async function fetchSpecificQuestions(difficulty: string, limit: number, category: string) {
    isLoading.value = true;
    error.value = null;

    console.log(category);

    try {
      const params: { apiKey: string; difficulty: string; limit: number; category?: string } = {
        apiKey: 'EntkYwh9hsCR5CgKScXfYSR6lh5r4XfezAKtj4YY', // replace with your API key
        difficulty: difficulty,
        limit: limit,
      };

      if (category !== "Unspecified") {
        params.category = category;
      }

      const response = await axiosInstance.get('https://quizapi.io/api/v1/questions', { params });


      //throw new Error("Simulated error");
      questions.splice(0, questions.length);
      questions.push(...response.data);
      questions.value = response.data

      //questions = response

      localStorage.setItem(LS_QUESTIONS, JSON.stringify(questions));



    } catch (e: any) {
      console.error(e);
      error.value = "Cannot download questions. 😢";
    } finally {
      isLoading.value = false;
    }

  }

  function deleteQuestions() {
    questions.splice(0, questions.length);
  }

  function getQuestionById(questionId: number): Question | undefined {
    return questions.find((q) => q.id === questionId);
  }

  return {
    saveGameHistory,
    questions,
    isLoading,
    error,
    totalQuestions,
    deleteQuestions,
    fetchSpecificQuestions,
    getQuestionById,
  };
});