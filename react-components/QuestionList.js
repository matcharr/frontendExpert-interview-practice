import React, { useEffect, useState } from "react";

const QUESTIONS_API_BASE_URL = "https://api.frontendexpert.io/api/fe/questions";
const SUBMISSIONS_API_BASE_URL =
  "https://api.frontendexpert.io/api/fe/submissions";

export default function QuestionList() {
  const [questions, submissions] = useQuestionsAndSubmissions();
  const questionsByCategory = getQuestionsByCategory(questions);
  const categories = Object.keys(questionsByCategory);

  return (
    <>
      {categories.map((category) => (
        <Category
          key={category}
          category={category}
          questions={questionsByCategory[category]}
          submissions={submissions}
        />
      ))}
    </>
  );
}

function Category({ category, questions, submissions }) {
  const totalQuestions = questions.length;
  const numQuestionsCorrect = questions.reduce((sum, question) => {
    const submissionStatus = submissions[question.id];
    return submissionStatus === "CORRECT" ? sum + 1 : sum;
  }, 0);

  return (
    <div className="category">
      <h2>
        {category} - {numQuestionsCorrect} / {totalQuestions}
      </h2>
      {questions.map((question) => (
        <Question
          key={question.id}
          question={question}
          submissionStatus={submissions[question.id]}
        />
      ))}
    </div>
  );
}

function Question({ question, submissionStatus }) {
  const statusClass =
    submissionStatus == null
      ? "unattempted"
      : submissionStatus.toLowerCase().replace("_", "-");

  return (
    <div className="question">
      <div className={`status ${statusClass}`} />
      <h3>{question.name}</h3>
    </div>
  );
}

function useQuestionsAndSubmissions() {
  const [questions, setQuestions] = useState([]);
  const [submissions, setSubmissions] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [questionResponse, submissionsResponse] = await Promise.all([
          fetch(QUESTIONS_API_BASE_URL),
          fetch(SUBMISSIONS_API_BASE_URL),
        ]);
        const [questions, submissions] = await Promise.all([
          questionResponse.json(),
          submissionsResponse.json(),
        ]);

        setQuestions(questions);
        setSubmissions(getSubmissionsByQuestion(submissions));
      } catch (error) {
        console.error("Error fetching questions and submissions:", error);
      }
    };

    fetchData();
  }, []);

  return [questions, submissions];
}

function getQuestionsByCategory(questions) {
  return questions.reduce((questionsByCategory, question) => {
    const { category, ...rest } = question;
    questionsByCategory[category] = questionsByCategory[category] || [];
    questionsByCategory[category].push(rest);
    return questionsByCategory;
  }, {});
}

function getSubmissionsByQuestion(submissions) {
  return submissions.reduce((submissionsByQuestion, { questionId, status }) => {
    submissionsByQuestion[questionId] = status;
    return submissionsByQuestion;
  }, {});
}
