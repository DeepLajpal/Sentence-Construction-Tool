import React from 'react'
import { MdOutlineEditNote } from "react-icons/md";
import { Button } from "./ui/button";

const TestIntro = () => {
    return (
        <>
            <div className="flex flex-col items-center justify-evenly h-full">
                <MdOutlineEditNote className="text-7xl opacity-50" />
                <div className="flex flex-col align-center justify-center text-center">
                    <h2 className="text-3xl mb-2">Sentence Contruction</h2>
                    <p className="opacity-50">
                        Select the correct words to complete the sentence by arranging the
                        provided options in the right order.
                    </p>
                </div>
                <div className="flex justify-between w-full">
                    <div>
                        <h4>Time Per Question</h4>
                        <h5 className="text-center opacity-50">30 sec</h5>
                    </div>
                    <div>
                        <h4>Total Questions</h4>
                        <h5 className="text-center opacity-50">10</h5>
                    </div>
                    <div>
                        <h4>Coins</h4>
                        <h5 className="text-center opacity-50">0</h5>
                    </div>
                </div>
                <div className="grid grid-flow-col gap-[7px]">
                    <Button
                        variant="outline"
                        className="border-indigo-500 cursor-pointer text-[#453fe1] hover:text-[#453fe1]"
                    >
                        Back
                    </Button>
                    <Button className="cursor-pointer bg-[#453fe1] hover:bg-[#453fe1]">
                        Start
                    </Button>
                </div>
            </div></>
    )
}

export default TestIntro