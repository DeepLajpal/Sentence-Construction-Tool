import React, { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { MdOutlineArrowForward } from "react-icons/md";
import { Key } from "lucide-react";

const Testbody = () => {
  const numberOfQuestions = 15;
  const [ansArr, setAnsArr] = useState<string[]>([]);
  const [data, setData] = useState<{
    testId: string;
    questions: [question: string];
  }>();
  //   const [currentQuestion, setCurrentQuestion] = useState<{
  //     options: string[];
  //   }>();
  const [currentQuestionId, setCurrentQuestionId] = useState<string>("0");
  const getTestPaper = async () => {
    try {
      const response = await (await fetch("http://localhost:3000/data")).json();
      console.log(response);
      setData(response);
    } catch (error) {
      console.error("Error Fetching paper: ", error);
    }
  };
  useEffect(() => {
    getTestPaper();
  }, []);

  return (
    <div className="h-full w-full flex flex-col justify-between">
      <div className="flex flex-col h-2/18 w-full justify-between">
        <div className="flex justify-between item-top">
          <p className="font-medium text-lg opacity-75">0:15</p>
          <Button variant="outline" className="cursor-pointer">
            Quit
          </Button>
        </div>

        <div
          className={`grid grid-cols-${data?.questions?.length} grid-flow-col w-full justify-items-center`}
        >
          {Array(data?.questions?.length)
            .fill(0)
            ?.map((_, index) => {
              return (
                <div
                  key={index}
                  className="bg-[#F2A531] w-[95%] h-[5px] rounded-[10px]"
                ></div>
              );
            })}
        </div>
      </div>

      <div className="grid justify-center items-center gap-[10%]">
        <p className="text-lg opacity-75 font-medium text-center">
          Select the missing words in the correct order
        </p>
        <p className="text-xl font-medium leading-[60px] px-[4%]">
          {data?.questions[0].question
            .split("_____________")
            .map((part, index) => {
              if (part.length === 0) return " .";
              const questionLength =
                data?.questions[0].question.split("_____________").length - 1;

              return (
                <span key={index}>
                  {index <= questionLength - 1 ? (
                    <>
                      {part}{" "}
                      <AnswerField
                        isFilled={ansArr[index] ? true : false}
                        ans={ansArr[index] ? ansArr[index] : "No Data"}
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
        <div className="grid grid-col-4 grid-flow-col justify-center gap-[3%]">
          <Button variant="outline" className="w-max">
            Different
          </Button>
        </div>
      </div>

      <div className="flex justify-end">
        <Button
          variant="outline"
          size="lg"
          className="cursor-pointer border-solid border-black-800 p-[3%] text-black-800"
        >
          <MdOutlineArrowForward className="text-black-800" />
        </Button>
      </div>
    </div>
  );
};

const AnswerField = ({ isFilled, ans }: { isFilled: boolean; ans: string }) => {
  return (
    <>
      {isFilled ? (
        <span
          className="px-[1%] border-b border-solid border-black pb-[12px]"
          size="sm"
        >
          <Button variant="outline">{ans ? ans : "Different"}</Button>
        </span>
      ) : (
        <span className="">_________</span>
      )}
    </>
  );
};

export default Testbody;
