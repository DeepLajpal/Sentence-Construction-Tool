import React, { useEffect, useRef, useState } from "react";
import { Button } from "./ui/button";
import { MdOutlineArrowForward } from "react-icons/md";

type timerType = {
  [key: string]: number;
};
const Testbody = () => {
  const [ansArr, setAnsArr] = useState<any>({});
  const [data, setData] = useState<{
    testId: string;
    questions: { question: string; options: string[] }[];
  } | null>(null);
  const [currentQuestionId, setCurrentQuestionId] = useState<number>(0);
  const allQuestionsAnswered: boolean =
    ansArr[currentQuestionId]?.length ===
    data?.questions[currentQuestionId]?.correctAnswer.length;
  const timerSeconds: number = 3;
  const [timer, setTimer] = useState<timerType | null>(null);
  const intervalId = useRef<NodeJS.Timeout | null>(null);

  const getTestPaper = async () => {
    try {
      const response = await (await fetch("http://localhost:3000/data")).json();
      console.log(response);
      setData(response);
    } catch (error) {
      console.error("Error Fetching paper: ", error);
    }
  };
  const onOptionClick = (index: number, e: Event) => {
    const ansFullData = { ...ansArr };
    if (!ansFullData[currentQuestionId]) {
      ansFullData[currentQuestionId] = [];
    }
    // const copyAnsArr: string[] = [...ansFullData[currentQuestionId]];
    const copyData: string[] = data ? { ...data } : {};
    const buttonText = e?.target?.innerHTML;

    copyData.questions[currentQuestionId].options = copyData?.questions[
      currentQuestionId
    ]?.options?.filter((option: string) => {
      return option != buttonText;
    });

    ansFullData[currentQuestionId].push(buttonText);
    setData(copyData);
    setAnsArr(ansFullData);
  };

  const onFieldAnsClick = (ans: string, index: number) => {
    const copyData: string[] = data ? { ...data } : {};
    let copyAnsArr: string[] = { ...ansArr };
    if (copyAnsArr[currentQuestionId].length - 1 !== index) {
      return;
    }

    copyData?.questions[currentQuestionId]?.options?.push(ans);
    copyAnsArr[currentQuestionId] = copyAnsArr[currentQuestionId].filter(
      (answer) => answer != ans
    );

    setAnsArr(copyAnsArr);
    setData(copyData);
  };
  const onQuestionChange = () => {
    if (currentQuestionId >= data?.questions.length - 1) {
      return clearInterval(intervalId.current);
    }
    setCurrentQuestionId(currentQuestionId + 1);
  };

  useEffect(() => {
    const localTimer = { ...timer };
    localTimer[currentQuestionId] = timerSeconds;
    setTimer(localTimer); // Reset timer when question changes

    const localIntervalId = setInterval(() => {
      if (currentQuestionId > data?.questions?.length - 1) {
        clearInterval(localIntervalId);
        return;
      }

      setTimer((prev) => {
        const newTimer = { ...prev };
        if (newTimer[currentQuestionId] <= 0) {
          newTimer[currentQuestionId] = timerSeconds;
          clearInterval(localIntervalId);

          if (currentQuestionId < data?.questions.length - 1) {
            setCurrentQuestionId(currentQuestionId + 1);
          }
          return newTimer;
        }
        newTimer[currentQuestionId] = newTimer[currentQuestionId] - 1;
        return newTimer;
      });
    }, 1000);

    intervalId.current = localIntervalId;
    return () => {
      clearInterval(localIntervalId);
    };
  }, [currentQuestionId, data?.questions?.length, timerSeconds]);

  useEffect(() => {
    getTestPaper();
    const tempAns = { ...ansArr };
    const tempTimer = { ...timer };
    Array(data?.questions.length).map((_, index) => {
      tempAns[index] = [];
      tempTimer[index] = timerSeconds;
    });
    setAnsArr(tempAns);
    setTimer(tempTimer);
  }, []);

  return (
    <div className="h-full w-full flex flex-col justify-between">
      <div className="flex flex-col h-2/18 w-full justify-between">
        <div className="flex justify-between item-top">
          <p className="font-medium text-lg opacity-75">
            0:{timer && String(timer[currentQuestionId]).padStart(2, "0")}
          </p>
          <Button variant="outline" className="cursor-pointer">
            Quit
          </Button>
        </div>

        {/* Replace the dynamic grid with a fixed flex layout */}
        <div className="flex w-full justify-between gap-1 mt-2">
          {data?.questions?.map((_, index) => {
            // Calculate if this bar is active, completed, or upcoming
            const isActive = index === currentQuestionId;
            const isCompleted = index <= currentQuestionId;

            return (
              <div
                key={index}
                className="bg-[#b7b7b7] bg-opacity-75 h-[5px] rounded-[10px] flex-1"
              >
                <div
                  className={`${
                    isActive
                      ? "bg-[#F2A531]"
                      : isCompleted
                      ? "bg-[#F2A531]"
                      : "bg-transparent"
                  } transition-all duration-1000 ease-linear h-[5px] rounded-[10px]`}
                  style={{
                    width: isCompleted
                      ? "100%"
                      : isActive
                      ? `${
                          100 -
                          (timer?.[currentQuestionId] / timerSeconds) * 100
                        }%`
                      : "0%",
                  }}
                ></div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="grid justify-center items-center">
        <p className="text-lg opacity-75 font-medium text-center">
          Select the missing words in the correct order
        </p>
        <p className="text-xl font-medium leading-[60px] px-[4%] py-[3%]">
          {data?.questions[currentQuestionId]?.question
            .split("_____________")
            .map((part: string, index: number) => {
              if (part.length === 0) return " .";
              const questionLength =
                data?.questions[0]?.question.split("_____________").length - 1;

              return (
                <span key={index}>
                  {index <= questionLength - 1 ? (
                    <>
                      {part}{" "}
                      <AnswerField
                        index={index}
                        onFieldAnsClick={onFieldAnsClick}
                        isFilled={
                          ansArr[currentQuestionId]?.[index] ? true : false
                        }
                        ans={
                          ansArr[currentQuestionId]?.[index]
                            ? ansArr[currentQuestionId]?.[index]
                            : "No Data"
                        }
                      />
                    </>
                  ) : (
                    part
                  )}
                </span>
              );
            })}

          {/* discussion about the project, but it <AnswerField isFilled={false} />{" "}
          into an argument because everyone had <AnswerField isFilled={false} />{" "}
          opinions on the final <AnswerField isFilled={false} /> . */}
        </p>
        <div className="px-4">
          <div className="grid justify-center [grid-template-columns:repeat(auto-fit,minmax(120px,max-content))] justify-items-center">
            {data?.questions[currentQuestionId]?.options.map(
              (value: string, index: number) => {
                return (
                  <Button
                    key={index}
                    variant="outline"
                    className="cursor-pointer w-max"
                    onClick={(e) => onOptionClick(index, e)}
                  >
                    {value}
                  </Button>
                );
              }
            )}
          </div>
        </div>
      </div>

      <div className="flex justify-end">
        <Button
          variant="outline"
          size="lg"
          className={`cursor-pointer border-solid border-black-800 p-[3%] text-black ${
            allQuestionsAnswered
              ? "bg-[#453FE1] text-white hover:bg-[#453FE1] hover:text-white"
              : ""
          }`}
          onClick={onQuestionChange}
          disabled={!allQuestionsAnswered}
        >
          <MdOutlineArrowForward className="" />
        </Button>
      </div>
    </div>
  );
};

const AnswerField = ({
  isFilled,
  ans,
  onFieldAnsClick,
  index,
}: {
  isFilled: boolean;
  ans: string;
  onFieldAnsClick: (ans: string) => void;
  index: number;
}) => {
  return (
    <>
      {isFilled ? (
        <span
          className="px-[1%] border-b border-solid border-black pb-[12px]"
          size="sm"
        >
          <Button
            className="cursor-pointer"
            variant="outline"
            onClick={() => onFieldAnsClick(ans, index)}
          >
            {ans ? ans : "Different"}
          </Button>
        </span>
      ) : (
        <span className="">_________</span>
      )}
    </>
  );
};

export default Testbody;
